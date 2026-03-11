'use client';

export default function Ribbon() {
  const part = 'Bib & Tucker · Tennessee Bourbon · Gold Roast · Double Char · Tennessee Ten · Redemption · American Rye · High Rye Bourbon · Whisky Advocate ';
  const full = part + part;

  return (
    <div className="bg-ink overflow-hidden py-3 border-y border-ink">
      <div className="animate-ribbon inline-flex whitespace-nowrap text-[10px] tracking-[0.2em] uppercase" style={{ color: 'rgba(255,255,255,0.55)' }}>
        {full}
        <span className="text-amber">·</span> {full}
      </div>
    </div>
  );
}
