import { NextResponse } from 'next/server';

const D_ID_API_KEY = process.env.D_ID_API_KEY;
const BASE = 'https://api.d-id.com';

export async function GET(request: Request) {
  if (!D_ID_API_KEY) {
    return NextResponse.json(
      { error: 'D_ID_API_KEY is not configured' },
      { status: 500 }
    );
  }

  const origin = request.headers.get('origin') || '';
  const allowedDomains = [
    'http://localhost:3000',
    'http://127.0.0.1:3000',
    'https://deutsch-hub.vercel.app',
  ];
  if (origin && !allowedDomains.includes(origin)) {
    allowedDomains.push(origin);
  }

  try {
    const res = await fetch(`${BASE}/agents/client-key`, {
      method: 'POST',
      headers: {
        Authorization: `Basic ${Buffer.from(D_ID_API_KEY).toString('base64')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ allowed_domains: allowedDomains }),
    });

    if (!res.ok) {
      const err = await res.text();
      return NextResponse.json(
        { error: 'D-ID client key failed', details: err },
        { status: res.status }
      );
    }

    const data = (await res.json()) as { client_key: string };
    return NextResponse.json({ clientKey: data.client_key });
  } catch (e) {
    return NextResponse.json(
      { error: 'Failed to get D-ID client key', details: String(e) },
      { status: 500 }
    );
  }
}
