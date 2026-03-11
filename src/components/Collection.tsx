'use client';

import Link from 'next/link';

const collectionFeatures = [
  { id: 'gift-guide', title: 'Gift Guide', description: 'Perfect whiskey selections for every person on your list', brand: 'both', link: '#cocktails' },
  { id: 'gold-roast-feature', title: 'Gold Roast Bourbon', description: 'The perfect after-dinner bourbon for any gathering', brand: 'bib', link: '#brands' },
  { id: 'cocktail-party', title: 'Cocktail Recipes', description: 'Classic recipes that shine at any celebration', brand: 'both', link: '#cocktails' },
  { id: 'food-pairings', title: 'Food Pairings', description: 'Elevate your table with expert whiskey pairings', brand: 'both', link: '#pairings' },
];

export default function Collection() {
  return (
    <section className="bg-warm border-t border-rule py-20 lg:py-28" id="collection">
      <div className="max-w-6xl mx-auto px-6">
        <header className="text-center mb-14" data-reveal>
          <span className="font-display text-mist text-sm block mb-2">02</span>
          <span className="text-[9px] tracking-[0.25em] uppercase text-copper block mb-3">Year-Round Collection</span>
          <h2 className="font-display text-4xl lg:text-5xl text-ink mb-4">Celebrate Every <span className="italic text-copper">Moment</span></h2>
          <p className="text-fog max-w-2xl mx-auto">
            Discover how Bib & Tucker and Redemption elevate any occasion—from quiet evenings to big gatherings.
          </p>
        </header>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {collectionFeatures.map((feature) => (
            <Link key={feature.id} href={feature.link || '#'} className="group block" data-reveal>
              <div className="bg-warm border border-rule p-6 h-full hover:bg-cream transition-colors">
                <h3 className="font-display text-xl text-ink mb-2 group-hover:text-copper transition-colors">{feature.title}</h3>
                <p className="text-fog text-sm leading-relaxed mb-4">{feature.description}</p>
                <span className="text-copper text-sm font-medium after:content-['→'] after:ml-1">Learn more</span>
              </div>
            </Link>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-6 mb-16">
          <div className="bg-ink text-white p-8 lg:p-10 min-h-[280px] flex flex-col" data-reveal>
            <span className="text-[9px] tracking-[0.2em] uppercase opacity-80 block mb-2">Tennessee Bourbon</span>
            <h3 className="font-display text-3xl lg:text-4xl mb-3">Bib & Tucker</h3>
            <p className="text-sm lg:text-base opacity-90 mb-6 flex-grow">
              From Gold Roast after-dinner sipping to Double Char by the fire — award-winning bourbons for every moment.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="#brands" className="inline-flex items-center gap-2 text-sm font-medium hover:opacity-90">
                Explore Collection →
              </Link>
              <a href="https://store.whiskyadvocate.com/products/bib-tucker-gold-roast-small-batch-bourbon-whiskey" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm font-medium px-4 py-2 bg-white/20 hover:bg-white/30 transition-colors">
                Shop Now ↗
              </a>
            </div>
          </div>
          <div className="bg-walnut text-white p-8 lg:p-10 min-h-[280px] flex flex-col" data-reveal>
            <span className="text-[9px] tracking-[0.2em] uppercase opacity-80 block mb-2">American Rye</span>
            <h3 className="font-display text-3xl lg:text-4xl mb-3">Redemption</h3>
            <p className="text-sm lg:text-base opacity-90 mb-6 flex-grow">
              High-rye character with rich warmth. Perfect for Manhattans and all your favorite classics.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="#brands" className="inline-flex items-center gap-2 text-sm font-medium hover:opacity-90">
                Explore Collection →
              </Link>
              <a href="https://store.whiskyadvocate.com/products/redemption-rye-whiskey" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm font-medium px-4 py-2 bg-white/20 hover:bg-white/30 transition-colors">
                Shop Now ↗
              </a>
            </div>
          </div>
        </div>

        <div className="border border-rule bg-white p-10 max-w-2xl mx-auto text-center" data-reveal>
          <h3 className="font-display text-2xl lg:text-3xl text-ink mb-3">Make Every Moment Unforgettable</h3>
          <p className="text-fog mb-8 max-w-lg mx-auto">
            Whether hosting a gathering or finding the perfect gift, our collections offer something special for every whiskey lover—all year long.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="#cocktails" className="px-8 py-4 text-sm tracking-[0.1em] uppercase font-medium bg-copper text-white hover:opacity-90 transition-opacity">
              View Cocktails
            </Link>
            <Link href="#pairings" className="px-8 py-4 text-sm tracking-[0.1em] uppercase font-medium border-2 border-rule text-ink hover:bg-warm transition-colors">
              Food Pairings
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
