'use client';

export default function Stats() {
  const stats = [
    { value: '6', label: 'Years Aged · Classic Six' },
    { value: '10', label: 'Years Aged · Tennessee Ten' },
    { value: '95%', label: 'Rye Mash · Redemption Rye' },
  ];

  return (
    <section className="bg-cream border-y border-rule py-12">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 text-center" data-reveal>
          {stats.map((stat, i) => (
            <div key={i}>
              <p className="font-display text-copper text-5xl lg:text-6xl mb-2">{stat.value}</p>
              <p className="text-muted text-[9px] tracking-[0.24em] uppercase">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
