'use client';

import Link from 'next/link';
import { STORE_BIB_TUCKER, STORE_REDEMPTION, STORE_HOME } from '@/lib/store-links';

const collectionFeatures = [
  { id: 'gift-guide', title: 'Gift Guide', description: 'Perfect whiskey selections for every person on your list', brand: 'both', link: '#cocktails' },
  { id: 'cocktail-party', title: 'Cocktail Recipes', description: 'Classic recipes that shine at any celebration', brand: 'both', link: '#cocktails' },
  { id: 'food-pairings', title: 'Food Pairings', description: 'Elevate your table with expert whiskey pairings', brand: 'both', link: '#pairings' },
  { id: 'gold-roast-feature', title: 'Gold Roast Bourbon', description: 'The perfect after-dinner bourbon for any gathering', brand: 'bib', link: '#brands' },
];

export default function Collection() {
  return (
    <section className="bg-warm border-t border-rule py-20 lg:py-28" id="collection">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <header className="text-center mb-14" data-reveal>
          <span className="font-display text-mist text-sm block mb-2">02</span>
          <span className="text-[9px] tracking-[0.25em] uppercase text-copper block mb-3">Year-Round Collection</span>
          <h2 className="font-display text-4xl lg:text-5xl text-ink mb-4">Celebrate Every <span className="italic text-copper">Moment</span></h2>
          <p className="text-muted max-w-2xl mx-auto">
            Discover how Bib & Tucker and Redemption elevate any occasion—from quiet evenings to big gatherings.
          </p>
        </header>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {collectionFeatures.map((feature) => (
            <Link key={feature.id} href={feature.link || '#'} className="group block" data-reveal>
              <div className="bg-warm border border-rule p-6 h-full hover:bg-cream transition-colors">
                <h3 className="font-display text-xl text-ink mb-2 group-hover:text-copper transition-colors">{feature.title}</h3>
                <p className="text-muted text-sm leading-relaxed mb-4">{feature.description}</p>
                <span className="text-copper text-sm font-medium after:content-['→'] after:ml-1">Learn more</span>
              </div>
            </Link>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-6 mb-16">
          <div className="bg-ink text-white p-8 lg:p-10 min-h-[280px] flex flex-col" data-reveal>
            <span className="text-[10px] tracking-[0.2em] uppercase text-white font-medium block mb-2">
              Tennessee Small Batch Bourbon Whiskey
            </span>
            <h3 className="font-display text-3xl lg:text-4xl mb-3 text-white">Bib & Tucker</h3>
            <p className="text-sm lg:text-base text-white mb-6 flex-grow">
              From Gold Roast after-dinner sipping to Double Char by the fire — award-winning bourbons for every moment.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="#brands" className="inline-flex items-center gap-2 text-sm font-medium text-white hover:text-amber-100 transition-colors">
                Explore →
              </Link>
              <a href={STORE_BIB_TUCKER} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm font-medium px-4 py-2.5 bg-white text-ink hover:bg-amber-50 transition-colors">
                Shop Bib &amp; Tucker ↗
              </a>
            </div>
          </div>
          <div className="bg-ink text-white p-8 lg:p-10 min-h-[280px] flex flex-col" data-reveal>
            <span className="text-[10px] tracking-[0.2em] uppercase text-white font-medium block mb-2">Rye-Built Whiskeys</span>
            <h3 className="font-display text-3xl lg:text-4xl mb-3 text-white">Redemption</h3>
            <p className="text-sm lg:text-base text-white/95 mb-3">
              Three classic expressions all crafted with a rye backbone for depth and character.
            </p>
            <p className="text-sm lg:text-base text-white mb-6 flex-grow">
              Redemption was created to unlock the potential of rye. Our ongoing journey to master its nuances has taught us to blend smooth whiskeys with extraordinary depth and character.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="#brands" className="inline-flex items-center gap-2 text-sm font-medium text-white hover:text-amber-100 transition-colors">
                Explore →
              </Link>
              <a href={STORE_REDEMPTION} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm font-medium px-4 py-2.5 bg-white text-ink hover:bg-amber-50 transition-colors">
                Shop Redemption ↗
              </a>
            </div>
          </div>
        </div>

        <div className="border border-rule bg-white p-10 max-w-2xl mx-auto text-center" data-reveal>
          <h3 className="font-display text-2xl lg:text-3xl text-ink mb-3">Make Every Moment Unforgettable</h3>
          <p className="text-muted mb-8 max-w-lg mx-auto">
            Whether hosting a gathering or finding the perfect gift, our collections offer something special for every whiskey lover—all year long.
          </p>
          <div className="flex flex-col sm:flex-row flex-wrap gap-4 justify-center">
            <a href={STORE_BIB_TUCKER} target="_blank" rel="noopener noreferrer" className="px-8 py-4 text-sm tracking-[0.1em] uppercase font-medium bg-copper text-white hover:opacity-90 transition-opacity text-center">
              Shop Bib &amp; Tucker
            </a>
            <a href={STORE_REDEMPTION} target="_blank" rel="noopener noreferrer" className="px-8 py-4 text-sm tracking-[0.1em] uppercase font-medium bg-ink text-white hover:bg-copper transition-colors text-center">
              Shop Redemption
            </a>
            <Link href="#cocktails" className="px-8 py-4 text-sm tracking-[0.1em] uppercase font-medium border-2 border-rule text-ink hover:bg-warm transition-colors text-center">
              View Cocktails
            </Link>
            <Link href="#pairings" className="px-8 py-4 text-sm tracking-[0.1em] uppercase font-medium border-2 border-rule text-ink hover:bg-warm transition-colors text-center">
              Food Pairings
            </Link>
            <a href={STORE_HOME} target="_blank" rel="noopener noreferrer" className="px-8 py-4 text-sm tracking-[0.1em] uppercase font-medium text-muted hover:text-copper transition-colors text-center">
              Full store ↗
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
