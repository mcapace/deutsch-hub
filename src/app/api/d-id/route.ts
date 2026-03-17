import { NextRequest, NextResponse } from 'next/server';

const DID_API = 'https://api.d-id.com';
const DID_KEY = 'mcapace@mshanken.com:xeVJLK-UtTu5RPQCxDsfA';
const AUTH = `Basic ${Buffer.from(DID_KEY).toString('base64')}`;
const SOURCE_URL =
  'https://deutsch.whiskyadvocate.com/images/logos/photorealistic-portrait-of-a-male-barten_fHBB7tJfRkef7rPOHifBEQ_Z2KC48JUQWGzMVd82y338w_sd.jpeg';

export async function POST(req: NextRequest) {
  let body: { action?: string; talk_id?: string; text?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  const { action, talk_id, text } = body;

  if (action === 'talk') {
    // Voice: set ELEVENLABS_VOICE_ID in Vercel / .env.local to the ID from https://elevenlabs.io/voice-lab
    const elevenLabsVoiceId =
      process.env.ELEVENLABS_VOICE_ID || 'uKlo6AMuCQF1Ee2FEe7F';
    const elevenLabsKey = process.env.ELEVENLABS_API_KEY;
    const useOwnElevenLabs = !!elevenLabsKey;
    const stability = process.env.ELEVENLABS_STABILITY != null ? Number(process.env.ELEVENLABS_STABILITY) : 0.5;
    const similarityBoost = process.env.ELEVENLABS_SIMILARITY_BOOST != null ? Number(process.env.ELEVENLABS_SIMILARITY_BOOST) : 0.75;

    // Path 1: Generate speech with ElevenLabs, upload to D-ID, then create talk (no D-ID ElevenLabs integration).
    if (useOwnElevenLabs) {
      try {
        // Use turbo model for lower latency (avatar appears sooner); override with ELEVENLABS_MODEL_ID if needed
        const modelId = process.env.ELEVENLABS_MODEL_ID || 'eleven_turbo_v2_5';
        const ttsRes = await fetch(
          `https://api.elevenlabs.io/v1/text-to-speech/${elevenLabsVoiceId}?optimize_streaming_latency=2`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'xi-api-key': elevenLabsKey,
            },
            body: JSON.stringify({
              text,
              model_id: modelId,
              voice_settings: { stability, similarity_boost: similarityBoost },
            }),
          }
        );
        if (!ttsRes.ok) {
          const err = await ttsRes.text();
          console.log('ElevenLabs TTS failed:', ttsRes.status, err);
          throw new Error('ElevenLabs TTS failed');
        }
        const audioBytes = await ttsRes.arrayBuffer();

        const form = new FormData();
        form.append(
          'audio',
          new Blob([audioBytes], { type: 'audio/mpeg' }),
          'audio.mp3'
        );
        const uploadRes = await fetch(`${DID_API}/audios`, {
          method: 'POST',
          headers: { Authorization: AUTH },
          body: form,
        });
        if (!uploadRes.ok) {
          const uploadErr = await uploadRes.json().catch(() => ({}));
          console.log('D-ID audio upload failed:', uploadRes.status, uploadErr);
          throw new Error('D-ID upload failed');
        }
        const { url: audioUrl } = (await uploadRes.json()) as { url: string };

        const talkRes = await fetch(`${DID_API}/talks`, {
          method: 'POST',
          headers: { Authorization: AUTH, 'Content-Type': 'application/json' },
          body: JSON.stringify({
            source_url: SOURCE_URL,
            script: { type: 'audio' as const, audio_url: audioUrl },
            config: { fluent: true, pad_audio: 0.5 },
          }),
        });
        const talkData = await talkRes.json();
        console.log('D-ID talk (ElevenLabs audio):', talkRes.status, talkData?.id ?? talkData?.description);
        if (!talkRes.ok) throw new Error('D-ID talk failed');
        return NextResponse.json(talkData, { status: 200 });
      } catch (e) {
        console.log('ElevenLabs path failed, falling back to Microsoft:', e);
      }
    }

    // Path 2: D-ID native TTS (Microsoft or D-ID premium ElevenLabs).
    const useDIDElevenLabs = !!process.env.USE_ELEVENLABS_VOICE && !useOwnElevenLabs;
    const script = useDIDElevenLabs
      ? {
          type: 'text' as const,
          input: text,
          provider: {
            type: 'elevenlabs' as const,
            voice_id: elevenLabsVoiceId,
          },
        }
      : {
          type: 'text' as const,
          input: text,
          provider: { type: 'microsoft' as const, voice_id: 'en-US-GuyNeural' },
        };

    const res = await fetch(`${DID_API}/talks`, {
      method: 'POST',
      headers: { Authorization: AUTH, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        source_url: SOURCE_URL,
        script,
        config: { fluent: true, pad_audio: 0.5 },
      }),
    });
    const data = await res.json();
    console.log('D-ID response:', res.status, data?.description ?? data?.error ?? data?.id);

    if (!res.ok && useDIDElevenLabs) {
      const fallbackRes = await fetch(`${DID_API}/talks`, {
        method: 'POST',
        headers: { Authorization: AUTH, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          source_url: SOURCE_URL,
          script: {
            type: 'text' as const,
            input: text,
            provider: { type: 'microsoft' as const, voice_id: 'en-US-GuyNeural' },
          },
          config: { fluent: true, pad_audio: 0.5 },
        }),
      });
      const fallbackData = await fallbackRes.json();
      return NextResponse.json(fallbackData, { status: fallbackRes.ok ? 200 : fallbackRes.status });
    }

    return NextResponse.json(data, { status: res.ok ? 200 : res.status });
  }

  if (action === 'get') {
    if (!talk_id) {
      return NextResponse.json({ error: 'talk_id required' }, { status: 400 });
    }
    const res = await fetch(`${DID_API}/talks/${talk_id}`, {
      headers: { Authorization: AUTH },
    });
    const data = await res.json();
    if (!res.ok) {
      return NextResponse.json(data, { status: res.status });
    }
    return NextResponse.json(data);
  }

  return NextResponse.json({ error: 'Unknown action' }, { status: 400 });
}
