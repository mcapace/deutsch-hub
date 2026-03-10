import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const key = process.env.DID_API_KEY || process.env.D_ID_API_KEY;
    const auth = key ? `Basic ${Buffer.from(key).toString('base64')}` : '';
    const res = await fetch('https://api.d-id.com/talks/streams', {
      method: 'POST',
      headers: {
        Authorization: auth,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        source_url: 'https://create-images-results.d-id.com/DefaultPresenters/Noelle_f/image.png',
      }),
    });
    const data = await res.json();
    return NextResponse.json({ status: res.status, data });
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : String(e);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
