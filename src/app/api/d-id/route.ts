import { NextRequest, NextResponse } from 'next/server';

const D_ID_API = 'https://api.d-id.com';
const D_ID_API_KEY = process.env.D_ID_API_KEY || process.env.DID_API_KEY;
const DID_PRESENTER_ID = process.env.NEXT_PUBLIC_DID_PRESENTER_ID;
const DID_SOURCE_URL = process.env.NEXT_PUBLIC_DID_SOURCE_URL;
const ELEVENLABS_VOICE_ID = process.env.ELEVENLABS_VOICE_ID || 'pNInz6obpgDQGcFmaJgB';

const AUTH = D_ID_API_KEY
  ? `Basic ${Buffer.from(D_ID_API_KEY).toString('base64')}`
  : '';

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
} as const;

function jsonResponse(data: unknown, status = 200, init?: ResponseInit) {
  return NextResponse.json(data, {
    status,
    ...init,
    headers: { ...CORS_HEADERS, ...init?.headers },
  });
}

export async function OPTIONS() {
  return new NextResponse(null, { status: 200, headers: CORS_HEADERS });
}

export async function POST(req: NextRequest) {
  if (!AUTH) {
    return jsonResponse({ error: 'D_ID_API_KEY is not configured' }, 500);
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return jsonResponse({ error: 'Invalid JSON body' }, 400);
  }

  const { action, sessionId, streamId, offer, candidate, text } = body;

  try {
    if (action === 'create') {
      const base = (process.env.NEXT_PUBLIC_BASE_URL || '').replace(/\/$/, '');
      const source_url =
        process.env.NEXT_PUBLIC_DID_SOURCE_URL?.trim() ||
        (base ? `${base}/images/logos/photorealistic-portrait-of-a-male-barten_fHBB7tJfRkef7rPOHifBEQ_Z2KC48JUQWGzMVd82y338w_sd.jpeg` : '') ||
        'https://create-images-results.d-id.com/DefaultPresenters/Noelle_f/image.png';
      const res = await fetch(`${D_ID_API}/talks/streams`, {
        method: 'POST',
        headers: { Authorization: AUTH, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          source_url,
          driver_url: 'bank://lively',
          output_resolution: 512,
          stream_warmup: true,
        }),
      });
      const data = (await res.json()) as Record<string, unknown>;
      if (!res.ok) {
        console.error('D-ID create error:', res.status, data);
        const msg = (data && typeof data === 'object' && 'description' in data && data.description)
          ? String(data.description)
          : (data && typeof data === 'object' && 'error' in data ? String(data.error) : 'D-ID create failed');
        return jsonResponse(
          { error: `${msg} (${res.status})`, details: data },
          res.status
        );
      }
      const streamId = (data.id ?? data.stream_id) as string;
      const sessionId = data.session_id as string;
      const rawOffer = data.offer ?? data.jsep ?? data.offer_jsep;
      let offerPayload: { type: string; sdp: string };
      if (typeof rawOffer === 'string') {
        offerPayload = { type: 'offer', sdp: rawOffer };
      } else if (rawOffer && typeof rawOffer === 'object' && rawOffer !== null && 'sdp' in rawOffer) {
        const o = rawOffer as { type?: string; sdp?: string };
        offerPayload = { type: (o.type ?? 'offer') as string, sdp: String(o.sdp ?? '') };
      } else {
        return jsonResponse({ error: 'D-ID create: missing offer in response', details: data }, 502);
      }
      const iceServers = (data.ice_servers ?? data.iceServers ?? []) as Array<{ urls: string | string[]; username?: string; credential?: string }>;
      return jsonResponse({
        streamId,
        sessionId,
        offer: offerPayload,
        iceServers: Array.isArray(iceServers) ? iceServers : [],
      });
    }

    if (action === 'sdp') {
      if (!streamId || !offer) {
        return jsonResponse({ error: 'streamId and offer required' }, 400);
      }
      const res = await fetch(`${D_ID_API}/talks/streams/${streamId}/sdp`, {
        method: 'POST',
        headers: { Authorization: AUTH, 'Content-Type': 'application/json' },
        body: JSON.stringify({ answer: offer, session_id: sessionId }),
      });
      const data = await res.json();
      if (!res.ok) {
        console.error('D-ID sdp error:', data);
        return jsonResponse({ error: 'D-ID sdp failed', details: data }, res.status);
      }
      return jsonResponse(data);
    }

    if (action === 'ice') {
      if (!streamId || !candidate) {
        return jsonResponse({ error: 'streamId and candidate required' }, 400);
      }
      const res = await fetch(`${D_ID_API}/talks/streams/${streamId}/ice`, {
        method: 'POST',
        headers: { Authorization: AUTH, 'Content-Type': 'application/json' },
        body: JSON.stringify({ candidate, session_id: sessionId }),
      });
      const data = await res.json();
      if (!res.ok) return jsonResponse({ error: 'D-ID ice failed', details: data }, res.status);
      return jsonResponse(data);
    }

    if (action === 'talk') {
      if (!streamId || !sessionId || typeof text !== 'string') {
        return jsonResponse({ error: 'streamId, sessionId and text required' }, 400);
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
        return jsonResponse({ error: 'D-ID talk failed', details: data }, res.status);
      }
      return jsonResponse(data);
    }

    if (action === 'destroy') {
      if (!streamId || !sessionId) {
        return jsonResponse({ error: 'streamId and sessionId required' }, 400);
      }
      const res = await fetch(`${D_ID_API}/talks/streams/${streamId}`, {
        method: 'DELETE',
        headers: { Authorization: AUTH, 'Content-Type': 'application/json' },
        body: JSON.stringify({ session_id: sessionId }),
      });
      return jsonResponse({ ok: res.ok });
    }

    return jsonResponse({ error: 'Unknown action' }, 400);
  } catch (err) {
    console.error('D-ID API error:', err);
    return jsonResponse({ error: String(err) }, 500);
  }
}
