import { NextRequest, NextResponse } from 'next/server';

const DID_API = 'https://api.d-id.com';
// Key is already base64-encoded by D-ID — use directly, no Buffer.from()
const AUTH = 'Basic bWNhcGFjZUBtc2hhbmtlbi5jb20:HC0ECVNq3_2OHFuX_iw4i';
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
    // Prefer ElevenLabs for more natural voice (paid D-ID plan or your own API key).
    // Set ELEVENLABS_VOICE_ID in env to override; default is your Bar Keep voice.
    const elevenLabsVoiceId =
      process.env.ELEVENLABS_VOICE_ID || '4HvexEZMAmq2M66Ae0nD';
    const useElevenLabs = !!process.env.USE_ELEVENLABS_VOICE;
    const script = useElevenLabs
      ? {
          type: 'text' as const,
          input: text,
          provider: {
            type: 'elevenlabs' as const,
            voice_id: elevenLabsVoiceId,
            ...(process.env.ELEVENLABS_API_KEY && {
              voice_config: {
                stability: 0.5,
                similarity_boost: 0.75,
              },
            }),
          },
        }
      : {
          type: 'text' as const,
          input: text,
          provider: { type: 'microsoft' as const, voice_id: 'en-US-GuyNeural' },
        };

    const headers: Record<string, string> = {
      Authorization: AUTH,
      'Content-Type': 'application/json',
    };
    if (process.env.ELEVENLABS_API_KEY) {
      headers['x-api-key-external'] = JSON.stringify({
        elevenlabs: process.env.ELEVENLABS_API_KEY,
      });
    }

    const res = await fetch(`${DID_API}/talks`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        source_url: SOURCE_URL,
        script,
        config: { fluent: true, pad_audio: 0.5 },
      }),
    });
    const data = await res.json();
    console.log('D-ID response:', res.status, JSON.stringify(data));
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
