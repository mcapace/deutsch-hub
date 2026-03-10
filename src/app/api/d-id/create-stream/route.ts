import { NextResponse } from 'next/server';

const D_ID_API_KEY = process.env.D_ID_API_KEY;
const DID_PRESENTER_ID = process.env.NEXT_PUBLIC_DID_PRESENTER_ID;
const BASE = 'https://api.d-id.com';

export async function POST(request: Request) {
  if (!D_ID_API_KEY) {
    return NextResponse.json({ error: 'D_ID_API_KEY is not configured' }, { status: 500 });
  }
  if (!DID_PRESENTER_ID?.trim()) {
    return NextResponse.json({ error: 'NEXT_PUBLIC_DID_PRESENTER_ID is not set' }, { status: 400 });
  }

  try {
    const body = await request.json().catch(() => ({}));
    const scriptText = (body.script as string) || 'Welcome. How can I help you today?';

    const res = await fetch(`${BASE}/talks/streams`, {
      method: 'POST',
      headers: {
        Authorization: `Basic ${Buffer.from(D_ID_API_KEY).toString('base64')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        source_url: DID_PRESENTER_ID.startsWith('http') ? DID_PRESENTER_ID : `bank://${DID_PRESENTER_ID}`,
        script: { type: 'text', input: scriptText },
      }),
    });

    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      return NextResponse.json(
        { error: 'D-ID create stream failed', details: data.description ?? data.details ?? JSON.stringify(data) },
        { status: res.status }
      );
    }

    return NextResponse.json({
      id: data.id,
      session_id: data.session_id,
      offer: data.offer ?? data.jsep,
      ice_servers: data.ice_servers ?? [],
    });
  } catch (e) {
    return NextResponse.json(
      { error: 'Failed to create D-ID stream', details: String(e) },
      { status: 500 }
    );
  }
}
