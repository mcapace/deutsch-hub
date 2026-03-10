import { NextResponse } from 'next/server';

const D_ID_API_KEY = process.env.D_ID_API_KEY;
const BASE = 'https://api.d-id.com';

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!D_ID_API_KEY) {
    return NextResponse.json({ error: 'D_ID_API_KEY is not configured' }, { status: 500 });
  }

  const { id: streamId } = await params;
  if (!streamId) {
    return NextResponse.json({ error: 'Stream id required' }, { status: 400 });
  }

  try {
    const body = await request.json();
    const { answer, session_id } = body;
    if (!answer?.sdp) {
      return NextResponse.json({ error: 'SDP answer required' }, { status: 400 });
    }

    const res = await fetch(`${BASE}/talks/streams/${streamId}/sdp`, {
      method: 'POST',
      headers: {
        Authorization: `Basic ${Buffer.from(D_ID_API_KEY).toString('base64')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ answer, session_id }),
    });

    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      return NextResponse.json(
        { error: 'D-ID SDP failed', details: data.description ?? data.details ?? JSON.stringify(data) },
        { status: res.status }
      );
    }

    return NextResponse.json(data);
  } catch (e) {
    return NextResponse.json(
      { error: 'Failed to send SDP answer', details: String(e) },
      { status: 500 }
    );
  }
}
