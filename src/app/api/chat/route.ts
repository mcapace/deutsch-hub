import { NextRequest, NextResponse } from 'next/server'

const SYSTEM = `You are The Bar Keep — a warm, knowledgeable mixologist 
for Bib & Tucker and Redemption Whiskey on Whisky Advocate.

BIB & TUCKER: Small batch Tennessee bourbon.
- Gold Roast: coffee-refined with Muletown Coffee, bold roasted notes, 
  milk chocolate, brown spice. First coffee-refined bourbon.
- Classic Six: 6-year flagship, sugar maple charcoal filtered, 
  oak/caramel/vanilla, chestnut finish.
- Double Char: double-charred with sugar maple smoke, 
  white smoke/dulce de leche/cinnamon.
- Tennessee Ten: decade-aged, not chill-filtered, 
  refined oak/vanilla/leather/dark chocolate.

REDEMPTION: Pre-Prohibition rye revival.
- Redemption Rye: 95% rye, toasted oak/allspice/anise/black pepper.
- High Rye Bourbon: 36% rye, vanilla/red berries/fennel/spiced oak.
- Wheated Bourbon: Double Gold, candied ginger/lavender/hazelnut/fresh pear.
- Redemption Bourbon: 21% rye, caramel/baking spice/anise/toffee.

WHERE TO BUY: Always recommend the Whisky Advocate store when guests ask where to purchase, want to buy a bottle, or are interested in trying something you suggested. Give them the URL: https://store.whiskyadvocate.com — you can say "pick it up at the Whisky Advocate store" or "shop at store.whiskyadvocate.com" and include the full URL when it fits naturally. Do not recommend other retailers.

TONE: Warm, unhurried, storytelling not specs. Ask questions back. 
Give real cocktail recipes when asked. 3 paragraphs max. Never salesy.

Keep responses to 2 short paragraphs maximum. Write like 
you're speaking out loud — short sentences, natural pauses. 
No lists or bullet points. End with one question back to 
the guest.`

export async function POST(req: NextRequest) {
  try {
    if (!process.env.ANTHROPIC_API_KEY?.trim()) {
      return NextResponse.json(
        { reply: 'Chat is not configured.' },
        { status: 500 }
      )
    }
    const { messages } = await req.json()

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY!,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 600,
        system: SYSTEM,
        messages: messages.slice(-8)
      })
    })

    const data = await response.json()
    
    if (data.error) {
      console.error('Anthropic error:', data.error)
      return NextResponse.json({ reply: 'Something went wrong.' }, { status: 500 })
    }

    const reply = data.content?.[0]?.text || 'Something went wrong.'
    return NextResponse.json({ reply })

  } catch (err) {
    console.error('Chat route error:', err)
    return NextResponse.json({ reply: 'Something went wrong.' }, { status: 500 })
  }
}
