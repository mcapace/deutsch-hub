'use client';

import { useState } from 'react';

interface Pairing {
  food: string;
  description: string;
}

interface WhiskeyPairing {
  name: string;
  proof: string;
  pairings: Pairing[];
}

interface BrandPairings {
  brand: string;
  brandId: 'bib' | 'redemption';
  tagline: string;
  whiskeys: WhiskeyPairing[];
}

const pairingsData: BrandPairings[] = [
  {
    brand: 'Bib & Tucker',
    brandId: 'bib',
    tagline: 'Bold flavors for bold pairings',
    whiskeys: [
      { name: 'The Classic Six', proof: '92 Proof', pairings: [{ food: 'Grilled Ribeye', description: 'The caramel notes complement charred meat beautifully' }, { food: 'Dark Chocolate Truffles', description: 'Vanilla and oak meet rich cocoa' }, { food: 'Aged Cheddar', description: 'Sharp cheese balances the bourbon sweetness' }] },
      { name: 'Double Char', proof: '88 Proof', pairings: [{ food: 'BBQ Brisket', description: 'Smoke meets smoke in perfect harmony' }, { food: 'Maple-Glazed Bacon', description: 'Sugar maple notes amplified' }] },
      { name: 'Gold Roast', proof: '92 Proof', pairings: [{ food: 'Tiramisu', description: 'Coffee meets coffee in dessert heaven' }, { food: 'Chocolate Espresso Beans', description: 'Triple coffee indulgence' }] },
    ],
  },
  {
    brand: 'Redemption',
    brandId: 'redemption',
    tagline: 'Spice-forward whiskeys, bold pairings',
    whiskeys: [
      { name: 'Bourbon', proof: '88 Proof', pairings: [{ food: 'Bacon-Wrapped Dates', description: 'Sweet and savory with caramel notes' }, { food: 'Brie & Crackers', description: 'Creamy cheese softens the spice' }] },
      { name: 'Rye', proof: '92 Proof', pairings: [{ food: 'Pastrami on Rye', description: 'The ultimate rye-on-rye experience' }, { food: 'Sharp Aged Cheese', description: 'Bold flavors match bold whiskey' }] },
      { name: 'High Rye Bourbon', proof: '92 Proof', pairings: [{ food: 'Gingerbread', description: 'Spiced perfection' }, { food: 'Spiced Pecans', description: 'Cinnamon and pepper unite' }] },
    ],
  },
];

export default function Pairings() {
  const [activeBrand, setActiveBrand] = useState<'bib' | 'redemption'>('bib');
  const [openWhiskeys, setOpenWhiskeys] = useState<string[]>(['The Classic Six', 'Bourbon']);

  const current = pairingsData.find((b) => b.brandId === activeBrand)!;

  const toggle = (name: string) => {
    setOpenWhiskeys((prev) => (prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name]));
  };

  return (
    <section className="bg-white py-20 lg:py-28" id="pairings">
      <div className="max-w-6xl mx-auto px-6">
        <header className="text-center mb-12" data-reveal>
          <span className="font-display text-mist text-sm block mb-2">05</span>
          <h2 className="font-display text-4xl lg:text-5xl text-ink mb-4">Perfect <span className="italic text-copper">Pairings</span></h2>
          <p className="text-fog max-w-2xl mx-auto">
            Elevate your tasting experience with expertly curated food pairings for each expression.
          </p>
        </header>

        <div className="flex justify-center gap-4 mb-8" data-reveal>
          {pairingsData.map((b) => (
            <button
              key={b.brandId}
              type="button"
              onClick={() => setActiveBrand(b.brandId)}
              className={`px-8 py-3 font-medium transition-colors ${activeBrand === b.brandId ? 'bg-copper text-white' : 'bg-white border border-rule text-fog hover:text-ink'}`}
            >
              {b.brand}
            </button>
          ))}
        </div>

        <p className="text-center text-copper italic mb-10" data-reveal>&ldquo;{current.tagline}&rdquo;</p>

        <div className="max-w-4xl mx-auto space-y-4">
          {current.whiskeys.map((whiskey) => {
            const isOpen = openWhiskeys.includes(whiskey.name);
            return (
              <div key={whiskey.name} className="mb-4" data-reveal>
                <button
                  type="button"
                  onClick={() => toggle(whiskey.name)}
                  className="w-full text-left bg-warm border border-rule p-5 flex items-center justify-between hover:bg-cream transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <span className="w-3 h-3 rounded-full bg-copper" />
                    <div>
                      <h4 className="font-display text-lg text-ink">{whiskey.name}</h4>
                      <span className="text-sm text-fog">{whiskey.proof} · {whiskey.pairings.length} pairings</span>
                    </div>
                  </div>
                  <svg className={`w-6 h-6 text-copper transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {isOpen && (
                  <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {whiskey.pairings.map((p) => (
                      <div key={p.food} className="bg-warm border border-rule p-5 hover:bg-cream transition-colors">
                        <h4 className="font-display text-lg text-ink mb-2">{p.food}</h4>
                        <p className="text-fog text-sm leading-relaxed">{p.description}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-12 max-w-2xl mx-auto border border-rule bg-warm p-8 text-center" data-reveal>
          <span className="text-[9px] tracking-[0.25em] uppercase text-copper block mb-3">Pro Tip</span>
          <p className="text-ink leading-relaxed">
            Let your whiskey sit for a few minutes after pouring to open up the flavors. Take small sips between bites to cleanse your palate and enhance both the food and whiskey experience.
          </p>
        </div>
      </div>
    </section>
  );
}
