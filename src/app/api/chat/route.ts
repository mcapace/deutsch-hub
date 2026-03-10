import { NextRequest, NextResponse } from 'next/server';

const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;
const ANTHROPIC_API_URL = 'https://api.anthropic.com/v1/messages';

export async function POST(req: NextRequest) {
  if (!ANTHROPIC_API_KEY?.trim()) {
    return NextResponse.json(
      { error: 'ANTHROPIC_API_KEY is not configured. Add it in Vercel env (or .env.local).' },
      { status: 500 }
    );
  }

  let body: { message?: string; history?: Array<{ role: string; content: string }> };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  const message = typeof body.message === 'string' ? body.message.trim() : '';
  if (!message) {
    return NextResponse.json({ error: 'message is required' }, { status: 400 });
  }

  const systemPrompt = `You are "The Bar Keep," a friendly whiskey expert for Bib & Tucker (Tennessee bourbon) and Redemption (American rye). Keep replies concise and conversational—they will be read aloud via text-to-speech. Suggest pours, pairings, or recipes when relevant.`;

  const messages: Array<{ role: 'user' | 'assistant'; content: string }> = [
    ...(Array.isArray(body.history) ? body.history : []),
    { role: 'user', content: message },
  ].filter(
    (m): m is { role: 'user' | 'assistant'; content: string } =>
      m && typeof (m as { role?: string }).role === 'string' && typeof (m as { content?: string }).content === 'string'
  );

  try {
    const res = await fetch(ANTHROPIC_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-3-5-sonnet-20241022',
        max_tokens: 300,
        system: systemPrompt,
        messages,
      }),
    });

    const data = (await res.json()) as {
      content?: Array<{ type: string; text?: string }>;
      error?: { message?: string };
    };

    if (!res.ok) {
      console.error('Anthropic API error:', data);
      return NextResponse.json(
        { error: data?.error?.message || 'Anthropic request failed', details: data },
        { status: res.status }
      );
    }

    const text =
      data.content?.find((c) => c.type === 'text')?.text?.trim() ||
      'I’m not sure what to say to that. Ask me about Bib & Tucker or Redemption.';
    return NextResponse.json({ text });
  } catch (err) {
    console.error('Chat API error:', err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
