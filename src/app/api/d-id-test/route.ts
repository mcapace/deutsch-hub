import { NextResponse } from 'next/server';

/**
 * Diagnostic endpoint: GET /api/d-id-test
 * Tests D-ID API connectivity. Uses source_url (same as main create). Visit in browser or curl.
 * Remove or restrict in production.
 */
const D_ID_API = 'https://api.d-id.com';
const API_KEY = process.env.D_ID_API_KEY || process.env.DID_API_KEY;
const SOURCE_URL = process.env.NEXT_PUBLIC_DID_SOURCE_URL?.trim();
const defaultSourceUrl = 'https://create-images-results.d-id.com/DefaultPresenters/Noelle_f/image.png';

export async function GET() {
  if (!API_KEY?.trim()) {
    return NextResponse.json(
      { error: 'D_ID_API_KEY or DID_API_KEY is not set in .env.local' },
      { status: 500 }
    );
  }

  try {
    const auth = `Basic ${Buffer.from(API_KEY).toString('base64')}`;
    const res = await fetch(`${D_ID_API}/talks/streams`, {
      method: 'POST',
      headers: { Authorization: auth, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        source_url: SOURCE_URL || defaultSourceUrl,
      }),
    });
    const data = await res.json();
    return NextResponse.json({
      status: res.status,
      ok: res.ok,
      data: data as Record<string, unknown>,
      hint:
        res.status === 401
          ? 'Regenerate API key at studio.d-id.com'
          : res.status === 402 || res.status === 403
            ? 'Trial may be expired; upgrade to D-ID Pro at studio.d-id.com'
            : undefined,
    });
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : String(e);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
