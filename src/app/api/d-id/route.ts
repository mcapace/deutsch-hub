import { NextRequest, NextResponse } from 'next/server';

const DID_API = 'https://api.d-id.com';
const AUTH = process.env.D_ID_API_KEY
  ? `Basic ${Buffer.from(process.env.D_ID_API_KEY!).toString('base64')}`
  : '';
const SOURCE_URL =
  'https://deutsch.whiskyadvocate.com/images/logos/photorealistic-portrait-of-a-male-barten_fHBB7tJfRkef7rPOHifBEQ_Z2KC48JUQWGzMVd82y338w_sd.jpeg';

export async function POST(req: NextRequest) {
  if (!AUTH) {
    return NextResponse.json({ error: 'D_ID_API_KEY is not configured' }, { status: 500 });
  }

  let body: { action?: string; talk_id?: string; text?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  const { action, talk_id, text } = body;

  if (action === 'talk') {
    const res = await fetch(`${DID_API}/talks`, {
      method: 'POST',
      headers: { Authorization: AUTH, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        source_url: SOURCE_URL,
        script: {
          type: 'text',
          input: text,
          provider: {
            type: 'microsoft',
            voice_id: 'en-US-GuyNeural',
          },
        },
        config: { fluent: true, pad_audio: 0.5 },
      }),
    });
    const data = await res.json();
    console.log('D-ID full response:', JSON.stringify(data));
    if (!res.ok) {
      console.error('D-ID talk error:', res.status, data);
      return NextResponse.json(data, { status: res.status });
    }
    return NextResponse.json(data);
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
