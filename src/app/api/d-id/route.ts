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
    const res = await fetch(`${DID_API}/talks`, {
      method: 'POST',
      headers: { Authorization: AUTH, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        source_url: SOURCE_URL,
        script: {
          type: 'text',
          input: text,
          provider: { type: 'microsoft', voice_id: 'en-US-GuyNeural' },
        },
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
