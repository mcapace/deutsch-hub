'use client';

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';

interface Cocktail {
  id: string;
  name: string;
  brand: 'bib' | 'redemption';
  spirit: string;
  tagline: string;
  ingredients: string[];
  instructions: string[];
  garnish: string;
  glassware: string;
  occasion: string;
  featured?: boolean;
}

const cocktails: Cocktail[] = [
  { id: 'gold-roast-fashioned', name: 'Gold Roast Elevated', brand: 'bib', spirit: 'Bib & Tucker Gold Roast', tagline: 'Coffee lovers rejoice', featured: true, ingredients: ['2 oz Bib & Tucker Gold Roast', '0.25 oz Demerara Syrup', '2 dashes Angostura Bitters'], instructions: ['Add ingredients to a mixing glass with ice', 'Stir until well chilled', 'Strain over a large ice cube', 'Express orange peel over the drink'], garnish: 'Orange peel', glassware: 'Rocks glass', occasion: 'After dinner' },
  { id: 'gold-roast-espresso', name: 'Gold Roast Espresso Martini', brand: 'bib', spirit: 'Bib & Tucker Gold Roast', tagline: 'Double coffee, double delight', featured: true, ingredients: ['1.5 oz Bib & Tucker Gold Roast', '1 oz Fresh Espresso', '0.5 oz Coffee Liqueur', '0.25 oz Simple Syrup'], instructions: ['Brew fresh espresso and let cool', 'Shake all ingredients vigorously with ice', 'Double strain into a chilled coupe', 'Garnish with coffee beans'], garnish: '3 coffee beans', glassware: 'Coupe', occasion: 'Brunch or dessert' },
  { id: 'campfire-of', name: 'Campfire Old Fashioned', brand: 'bib', spirit: 'Bib & Tucker Double Char', tagline: 'Smoky, rich, unforgettable', ingredients: ['2 oz Bib & Tucker Double Char', '0.25 oz Maple Syrup', '2 dashes Coffee Pecan Bitters', '2 dashes Black Walnut Bitters'], instructions: ['Add all ingredients to a mixing glass with ice', 'Stir until well chilled', 'Strain into a rocks glass over a large ice cube', 'Express orange peel and garnish'], garnish: 'Orange peel', glassware: 'Rocks glass', occasion: 'Fireside sipping' },
  { id: 'sazerac', name: 'Sazerac', brand: 'redemption', spirit: 'Redemption Rye', tagline: 'New Orleans classic', ingredients: ['2 oz Redemption Rye', '0.5 oz Simple Syrup', "3 dashes Peychaud's Bitters", 'Absinthe rinse'], instructions: ['Rinse a chilled rocks glass with absinthe', 'Stir rye, simple syrup, and bitters with ice', 'Strain into the absinthe-rinsed glass', 'Express lemon peel over the drink'], garnish: 'Lemon peel', glassware: 'Rocks glass', occasion: 'Classic cocktail hour' },
  { id: 'redemption-manhattan', name: 'Redemption Manhattan', brand: 'redemption', spirit: 'Redemption Rye', tagline: 'Rye-forward perfection', ingredients: ['2 oz Redemption Rye', '1 oz Sweet Vermouth', '2 dashes Angostura Bitters'], instructions: ['Stir all ingredients with ice until well chilled', 'Strain into a chilled coupe glass', 'Garnish with a brandied cherry'], garnish: 'Brandied cherry', glassware: 'Coupe', occasion: 'Evening sipping' },
];

function CocktailCard({ cocktail, onSelect }: { cocktail: Cocktail; onSelect: () => void }) {
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        onSelect();
      }}
      onKeyDown={(e) => e.key === 'Enter' && onSelect()}
      className="bg-warm border border-rule p-8 h-full hover:bg-cream transition-colors cursor-pointer group"
      data-reveal
    >
      <div className="flex items-center justify-between mb-6">
        <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-copper">
          {cocktail.brand === 'bib' ? 'Bib & Tucker' : 'Redemption'}
        </span>
        {cocktail.featured && (
          <span className="text-[9px] uppercase tracking-[0.15em] px-2 py-1 border border-rule text-copper">Featured</span>
        )}
      </div>
      <h3 className="font-display text-2xl text-ink mb-2 group-hover:text-copper transition-colors">{cocktail.name}</h3>
      <p className="text-muted text-sm mb-6">{cocktail.tagline}</p>
      <div className="border-t border-rule pt-5 mb-5">
        <p className="text-[10px] uppercase tracking-[0.2em] text-muted mb-1">Base Spirit</p>
        <p className="text-sm font-medium text-ink">{cocktail.spirit}</p>
      </div>
      <div className="flex items-center justify-between text-xs text-muted">
        <span>{cocktail.glassware}</span>
        <span className="w-1 h-1 rounded-full bg-amber" />
        <span>{cocktail.occasion}</span>
      </div>
      <div className="mt-6 pt-5 border-t border-rule">
        <span className="text-copper text-xs font-medium uppercase tracking-[0.15em]">View Recipe →</span>
      </div>
    </div>
  );
}

function RecipeModal({ cocktail, onClose }: { cocktail: Cocktail; onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-[100] overflow-y-auto flex items-center justify-center p-4"
      style={{ backgroundColor: 'rgba(0,0,0,0.75)' }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="recipe-modal-title"
    >
      <div
        className="relative z-[101] max-w-2xl w-full bg-white border border-rule overflow-hidden max-h-[90vh] overflow-y-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-8 lg:p-10 border-b border-rule relative">
          <button type="button" onClick={onClose} className="absolute top-6 right-6 text-muted hover:text-ink p-2" aria-label="Close">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
          <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-copper block mb-3">
            {cocktail.brand === 'bib' ? 'Bib & Tucker' : 'Redemption'} — {cocktail.spirit}
          </span>
          <h2 id="recipe-modal-title" className="font-display text-4xl text-ink mb-2">{cocktail.name}</h2>
          <p className="text-muted">{cocktail.tagline}</p>
        </div>
        <div className="p-8 lg:p-10">
          <div className="grid md:grid-cols-2 gap-10 mb-10">
            <div>
              <h3 className="text-[11px] uppercase tracking-[0.2em] text-muted mb-4 font-semibold">Ingredients</h3>
              <ul className="space-y-3">
                {cocktail.ingredients.map((ing, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0 bg-copper" />
                    <span className="text-ink">{ing}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-[11px] uppercase tracking-[0.2em] text-muted mb-4 font-semibold">Details</h3>
              <div className="space-y-4">
                <div><p className="text-[10px] uppercase tracking-[0.15em] text-muted mb-1">Glassware</p><p className="font-medium text-ink">{cocktail.glassware}</p></div>
                <div><p className="text-[10px] uppercase tracking-[0.15em] text-muted mb-1">Garnish</p><p className="font-medium text-ink">{cocktail.garnish}</p></div>
                <div><p className="text-[10px] uppercase tracking-[0.15em] text-muted mb-1">Occasion</p><p className="font-medium text-ink">{cocktail.occasion}</p></div>
              </div>
            </div>
          </div>
          <div className="pt-8 border-t border-rule">
            <h3 className="text-[11px] uppercase tracking-[0.2em] text-muted mb-6 font-semibold">Method</h3>
            <ol className="space-y-4">
              {cocktail.instructions.map((step, i) => (
                <li key={i} className="flex gap-4">
                  <span className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-medium flex-shrink-0 bg-copper text-white">{i + 1}</span>
                  <span className="text-ink leading-relaxed pt-0.5">{step}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Cocktails() {
  const [filter, setFilter] = useState<'all' | 'bib' | 'redemption'>('all');
  const [selected, setSelected] = useState<Cocktail | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const filtered = cocktails.filter((c) => filter === 'all' || c.brand === filter);

  return (
    <section className="bg-warm py-20 lg:py-28" id="cocktails">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <header className="text-center mb-12" data-reveal>
          <span className="font-display text-mist text-sm block mb-2">04</span>
          <span className="text-[9px] tracking-[0.3em] uppercase text-copper block mb-3">Crafted Recipes</span>
          <h2 className="font-display text-4xl lg:text-5xl text-ink mb-4">Signature <span className="italic text-copper">Cocktails</span></h2>
          <p className="text-muted max-w-xl mx-auto">
            Expertly crafted recipes that showcase the distinct character of each spirit.
          </p>
        </header>

        <div className="flex justify-center mb-14" data-reveal>
          <div className="inline-flex border border-rule bg-white">
            {[
              { id: 'all', label: 'All Recipes' },
              { id: 'bib', label: 'Bib & Tucker' },
              { id: 'redemption', label: 'Redemption' },
            ].map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => setFilter(f.id as 'all' | 'bib' | 'redemption')}
                className={`px-8 py-3 text-xs uppercase tracking-[0.15em] font-medium transition-colors ${
                  filter === f.id
                    ? 'bg-ink text-white [color:white]'
                    : 'text-muted hover:text-ink'
                }`}
                style={filter === f.id ? { color: '#ffffff' } : undefined}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((cocktail) => (
            <CocktailCard key={cocktail.id} cocktail={cocktail} onSelect={() => setSelected(cocktail)} />
          ))}
        </div>

        <p className="text-center text-muted text-sm mt-12 pt-12 border-t border-rule" data-reveal>
          Showing {filtered.length} of {cocktails.length} recipes
        </p>
      </div>

      {mounted && selected &&
        createPortal(
          <RecipeModal cocktail={selected} onClose={() => setSelected(null)} />,
          document.body
        )}
    </section>
  );
}
