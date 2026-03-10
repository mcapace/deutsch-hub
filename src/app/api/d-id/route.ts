import { NextRequest, NextResponse } from 'next/server';

const D_ID_API = 'https://api.d-id.com';
const D_ID_API_KEY = process.env.D_ID_API_KEY;
const DID_PRESENTER_ID = process.env.NEXT_PUBLIC_DID_PRESENTER_ID;
const ELEVENLABS_VOICE_ID = process.env.ELEVENLABS_VOICE_ID || 'pNInz6obpgDQGcFmaJgB';

const AUTH = D_ID_API_KEY
  ? `Basic ${Buffer.from(D_ID_API_KEY).toString('base64')}`
  : '';

export async function POST(req: NextRequest) {
  if (!AUTH) {
    return NextResponse.json({ error: 'D_ID_API_KEY is not configured' }, { status: 500 });
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  const { action, sessionId, streamId, offer, candidate, text } = body;

  try {
    if (action === 'create') {
      if (!DID_PRESENTER_ID?.trim()) {
        return NextResponse.json({ error: 'NEXT_PUBLIC_DID_PRESENTER_ID is not set' }, { status: 400 });
      }
      const res = await fetch(`${D_ID_API}/talks/streams`, {
        method: 'POST',
        headers: { Authorization: AUTH, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          presenter_id: DID_PRESENTER_ID,
          driver_url: 'bank://lively/driver-06',
          output_resolution: 512,
          stream_warmup: true,
        }),
      });
      const data = (await res.json()) as Record<string, unknown>;
      if (!res.ok) {
        console.error('D-ID create error:', data);
        return NextResponse.json(
          { error: 'D-ID create failed', details: data },
          { status: res.status }
        );
      }
      return NextResponse.json({
        streamId: data.id ?? data.stream_id,
        sessionId: data.session_id,
        offer: data.offer ?? data.jsep,
        iceServers: data.ice_servers ?? [],
      });
    }

    if (action === 'sdp') {
      if (!streamId || !offer) {
        return NextResponse.json({ error: 'streamId and offer required' }, { status: 400 });
      }
      const res = await fetch(`${D_ID_API}/talks/streams/${streamId}/sdp`, {
        method: 'POST',
        headers: { Authorization: AUTH, 'Content-Type': 'application/json' },
        body: JSON.stringify({ answer: offer, session_id: sessionId }),
      });
      const data = await res.json();
      if (!res.ok) {
        console.error('D-ID sdp error:', data);
        return NextResponse.json({ error: 'D-ID sdp failed', details: data }, { status: res.status });
      }
      return NextResponse.json(data);
    }

    if (action === 'ice') {
      if (!streamId || !candidate) {
        return NextResponse.json({ error: 'streamId and candidate required' }, { status: 400 });
      }
      const res = await fetch(`${D_ID_API}/talks/streams/${streamId}/ice`, {
        method: 'POST',
        headers: { Authorization: AUTH, 'Content-Type': 'application/json' },
        body: JSON.stringify({ candidate, session_id: sessionId }),
      });
      const data = await res.json();
      if (!res.ok) return NextResponse.json({ error: 'D-ID ice failed', details: data }, { status: res.status });
      return NextResponse.json(data);
    }

    if (action === 'talk') {
      if (!streamId || !sessionId || typeof text !== 'string') {
        return NextResponse.json({ error: 'streamId, sessionId and text required' }, { status: 400 });
      }
      const res = await fetch(`${D_ID_API}/talks/streams/${streamId}`, {
        method: 'POST',
        headers: { Authorization: AUTH, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          session_id: sessionId,
          script: {
            type: 'text',
            input: text,
            provider: {
              type: 'elevenlabs',
              voice_id: ELEVENLABS_VOICE_ID,
              voice_config: { stability: 0.55, similarity_boost: 0.85 },
            },
          },
          config: { stitch: true },
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        console.error('D-ID talk error:', data);
        return NextResponse.json({ error: 'D-ID talk failed', details: data }, { status: res.status });
      }
      return NextResponse.json(data);
    }

    if (action === 'destroy') {
      if (!streamId || !sessionId) {
        return NextResponse.json({ error: 'streamId and sessionId required' }, { status: 400 });
      }
      const res = await fetch(`${D_ID_API}/talks/streams/${streamId}`, {
        method: 'DELETE',
        headers: { Authorization: AUTH, 'Content-Type': 'application/json' },
        body: JSON.stringify({ session_id: sessionId }),
      });
      return NextResponse.json({ ok: res.ok });
    }

    return NextResponse.json({ error: 'Unknown action' }, { status: 400 });
  } catch (err) {
    console.error('D-ID API error:', err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
