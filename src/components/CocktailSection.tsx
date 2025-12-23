'use client';

import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useRef, useState } from 'react';

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
  category: 'holiday' | 'winter' | 'nye' | 'classic';
  featured?: boolean;
}

const cocktails: Cocktail[] = [
  {
    id: 'gold-roast-fashioned',
    name: 'Gold Roast Elevated',
    brand: 'bib',
    spirit: 'Bib & Tucker Gold Roast',
    tagline: 'Coffee lovers rejoice',
    category: 'classic',
    featured: true,
    ingredients: [
      '2 oz Bib & Tucker Gold Roast',
      '0.25 oz Demerara Syrup',
      '2 dashes Angostura Bitters',
    ],
    instructions: [
      'Add ingredients to a mixing glass with ice',
      'Stir until well chilled',
      'Strain over a large ice cube',
      'Express orange peel over the drink',
    ],
    garnish: 'Orange peel',
    glassware: 'Rocks glass',
    occasion: 'After dinner',
  },
  {
    id: 'gold-roast-espresso-martini',
    name: 'Gold Roast Espresso Martini',
    brand: 'bib',
    spirit: 'Bib & Tucker Gold Roast',
    tagline: 'Double coffee, double delight',
    category: 'classic',
    featured: true,
    ingredients: [
      '1.5 oz Bib & Tucker Gold Roast',
      '1 oz Fresh Espresso',
      '0.5 oz Coffee Liqueur',
      '0.25 oz Simple Syrup',
    ],
    instructions: [
      'Brew fresh espresso and let cool',
      'Shake all ingredients vigorously with ice',
      'Double strain into a chilled coupe',
      'Garnish with coffee beans',
    ],
    garnish: '3 coffee beans',
    glassware: 'Coupe',
    occasion: 'Brunch or dessert',
  },
  {
    id: 'campfire-old-fashioned',
    name: 'Campfire Old Fashioned',
    brand: 'bib',
    spirit: 'Bib & Tucker Double Char',
    tagline: 'Smoky, rich, unforgettable',
    category: 'holiday',
    ingredients: [
      '2 oz Bib & Tucker Double Char',
      '0.25 oz Maple Syrup',
      '2 dashes Coffee Pecan Bitters',
      '2 dashes Black Walnut Bitters',
    ],
    instructions: [
      'Add all ingredients to a mixing glass with ice',
      'Stir until well chilled (about 30 seconds)',
      'Strain into a rocks glass over a large ice cube',
      'Express orange peel over the drink and garnish',
    ],
    garnish: 'Orange peel',
    glassware: 'Rocks glass',
    occasion: 'Fireside sipping',
  },
  {
    id: 'holiday-manhattan',
    name: 'Holiday Manhattan',
    brand: 'bib',
    spirit: 'Bib & Tucker Classic Six',
    tagline: 'Classic elegance',
    category: 'holiday',
    ingredients: [
      '2 oz Bib & Tucker Classic Six',
      '1 oz Sweet Vermouth',
      '2 dashes Angostura Bitters',
      '1 dash Orange Bitters',
    ],
    instructions: [
      'Stir all ingredients with ice until well chilled',
      'Strain into a chilled coupe glass',
      'Garnish with a brandied cherry',
    ],
    garnish: 'Brandied cherry',
    glassware: 'Coupe',
    occasion: 'Holiday gatherings',
  },
  {
    id: 'sazerac',
    name: 'Sazerac',
    brand: 'redemption',
    spirit: 'Redemption Rye',
    tagline: 'New Orleans classic',
    category: 'classic',
    ingredients: [
      '2 oz Redemption Rye',
      '0.5 oz Simple Syrup',
      "3 dashes Peychaud's Bitters",
      'Absinthe rinse',
    ],
    instructions: [
      'Rinse a chilled rocks glass with absinthe',
      'Stir rye, simple syrup, and bitters with ice',
      'Strain into the absinthe-rinsed glass',
      'Express lemon peel over the drink',
    ],
    garnish: 'Lemon peel',
    glassware: 'Rocks glass',
    occasion: 'Classic cocktail hour',
  },
  {
    id: 'redemption-manhattan',
    name: 'Redemption Manhattan',
    brand: 'redemption',
    spirit: 'Redemption Rye',
    tagline: 'Rye-forward perfection',
    category: 'classic',
    ingredients: [
      '2 oz Redemption Rye',
      '1 oz Sweet Vermouth',
      '2 dashes Angostura Bitters',
    ],
    instructions: [
      'Stir all ingredients with ice until well chilled',
      'Strain into a chilled coupe glass',
      'Garnish with a brandied cherry',
    ],
    garnish: 'Brandied cherry',
    glassware: 'Coupe',
    occasion: 'Evening sipping',
  },
];

const brandColors = {
  bib: {
    primary: '#C85A36',
    secondary: '#BDA55D',
  },
  redemption: {
    primary: '#D4872B',
    secondary: '#D4A04A',
  },
};

// Elegant Cocktail Card - Text-focused, no images
const CocktailCard = ({ cocktail, index, onSelect }: { cocktail: Cocktail; index: number; onSelect: () => void }) => {
  const colors = brandColors[cocktail.brand];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      onClick={onSelect}
      className="group cursor-pointer"
    >
      <div className="bg-white border border-[#E8E4DE] p-8 h-full transition-all duration-300 hover:border-[#BDA55D]/50 hover:shadow-lg">
        {/* Top Row - Brand & Category */}
        <div className="flex items-center justify-between mb-6">
          <span
            className="text-[10px] font-semibold uppercase tracking-[0.2em]"
            style={{ color: colors.primary }}
          >
            {cocktail.brand === 'bib' ? 'Bib & Tucker' : 'Redemption'}
          </span>
          {cocktail.featured && (
            <span className="text-[9px] uppercase tracking-[0.15em] px-2 py-1 border" style={{ borderColor: colors.primary, color: colors.primary }}>
              Featured
            </span>
          )}
        </div>

        {/* Name */}
        <h3 className="font-serif text-2xl text-[#1A1410] mb-2 group-hover:text-[#C85A36] transition-colors">
          {cocktail.name}
        </h3>

        {/* Tagline */}
        <p className="text-sm text-[#78716C] mb-6 leading-relaxed">
          {cocktail.tagline}
        </p>

        {/* Spirit */}
        <div className="border-t border-[#E8E4DE] pt-5 mb-5">
          <p className="text-[10px] uppercase tracking-[0.2em] text-[#9A9590] mb-1">Base Spirit</p>
          <p className="text-sm font-medium text-[#3A3735]">{cocktail.spirit}</p>
        </div>

        {/* Key Info Row */}
        <div className="flex items-center justify-between text-xs text-[#78716C]">
          <span>{cocktail.glassware}</span>
          <span className="w-1 h-1 rounded-full bg-[#BDA55D]" />
          <span>{cocktail.occasion}</span>
        </div>

        {/* View Recipe Link */}
        <div className="mt-6 pt-5 border-t border-[#E8E4DE]">
          <span
            className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.15em] transition-colors"
            style={{ color: colors.primary }}
          >
            View Recipe
            <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </span>
        </div>
      </div>
    </motion.div>
  );
};

// Recipe Modal
const RecipeModal = ({ cocktail, onClose }: { cocktail: Cocktail; onClose: () => void }) => {
  const colors = brandColors[cocktail.brand];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4"
      style={{ backgroundColor: 'rgba(26, 20, 16, 0.85)' }}
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 30, scale: 0.98 }}
        transition={{ duration: 0.3 }}
        className="max-w-2xl w-full bg-[#FDFBF7] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="relative px-10 pt-10 pb-8 border-b border-[#E8E4DE]">
          <button
            onClick={onClose}
            className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center text-[#78716C] hover:text-[#1A1410] transition-colors"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <span
            className="text-[10px] font-semibold uppercase tracking-[0.2em] mb-3 block"
            style={{ color: colors.primary }}
          >
            {cocktail.brand === 'bib' ? 'Bib & Tucker' : 'Redemption'} — {cocktail.spirit}
          </span>
          <h2 className="font-serif text-4xl text-[#1A1410] mb-2">{cocktail.name}</h2>
          <p className="text-[#78716C]">{cocktail.tagline}</p>
        </div>

        {/* Content */}
        <div className="px-10 py-8">
          {/* Two Column Layout */}
          <div className="grid md:grid-cols-2 gap-10">
            {/* Ingredients */}
            <div>
              <h3 className="text-[11px] uppercase tracking-[0.2em] text-[#9A9590] mb-4 font-semibold">Ingredients</h3>
              <ul className="space-y-3">
                {cocktail.ingredients.map((ingredient, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: colors.primary }} />
                    <span className="text-[#3A3735]">{ingredient}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Details */}
            <div>
              <h3 className="text-[11px] uppercase tracking-[0.2em] text-[#9A9590] mb-4 font-semibold">Details</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.15em] text-[#9A9590] mb-1">Glassware</p>
                  <p className="text-[#3A3735] font-medium">{cocktail.glassware}</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.15em] text-[#9A9590] mb-1">Garnish</p>
                  <p className="text-[#3A3735] font-medium">{cocktail.garnish}</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.15em] text-[#9A9590] mb-1">Occasion</p>
                  <p className="text-[#3A3735] font-medium">{cocktail.occasion}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Instructions */}
          <div className="mt-10 pt-8 border-t border-[#E8E4DE]">
            <h3 className="text-[11px] uppercase tracking-[0.2em] text-[#9A9590] mb-6 font-semibold">Method</h3>
            <ol className="space-y-4">
              {cocktail.instructions.map((step, i) => (
                <li key={i} className="flex gap-4">
                  <span
                    className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-medium flex-shrink-0"
                    style={{ backgroundColor: colors.primary, color: '#FFFFFF' }}
                  >
                    {i + 1}
                  </span>
                  <span className="text-[#3A3735] leading-relaxed pt-0.5">{step}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default function CocktailSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const [activeFilter, setActiveFilter] = useState<'all' | 'bib' | 'redemption'>('all');
  const [selectedCocktail, setSelectedCocktail] = useState<Cocktail | null>(null);

  const filteredCocktails = cocktails.filter((c) => {
    if (activeFilter === 'all') return true;
    return c.brand === activeFilter;
  });

  return (
    <section
      id="cocktails"
      ref={ref}
      className="relative py-24 md:py-32"
      style={{ backgroundColor: '#FAF8F5' }}
    >
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-[11px] uppercase tracking-[0.3em] text-[#BDA55D] font-medium mb-4 block">
            Crafted Recipes
          </span>
          <h2 className="font-serif text-4xl md:text-5xl text-[#1A1410] mb-4">
            Signature Cocktails
          </h2>
          <p className="text-lg text-[#78716C] font-light max-w-xl mx-auto">
            Expertly crafted recipes that showcase the distinct character of each spirit.
          </p>
        </motion.div>

        {/* Elegant Filter Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex justify-center mb-14"
        >
          <div className="inline-flex border border-[#E8E4DE] bg-white">
            {[
              { id: 'all', label: 'All Recipes' },
              { id: 'bib', label: 'Bib & Tucker' },
              { id: 'redemption', label: 'Redemption' },
            ].map((filter) => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id as 'all' | 'bib' | 'redemption')}
                className="px-8 py-3 text-xs uppercase tracking-[0.15em] font-medium transition-all duration-300"
                style={
                  activeFilter === filter.id
                    ? {
                        backgroundColor: filter.id === 'bib' ? '#C85A36' : filter.id === 'redemption' ? '#D4872B' : '#1A1410',
                        color: '#FFFFFF'
                      }
                    : { color: '#5C5552' }
                }
              >
                {filter.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Cocktails Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="wait">
            {filteredCocktails.map((cocktail, index) => (
              <CocktailCard
                key={cocktail.id}
                cocktail={cocktail}
                index={index}
                onSelect={() => setSelectedCocktail(cocktail)}
              />
            ))}
          </AnimatePresence>
        </div>

        {/* Recipe Count */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-12 pt-12 border-t border-[#E8E4DE]"
        >
          <p className="text-sm text-[#9A9590]">
            Showing {filteredCocktails.length} of {cocktails.length} recipes
          </p>
        </motion.div>
      </div>

      {/* Recipe Modal */}
      <AnimatePresence>
        {selectedCocktail && (
          <RecipeModal
            cocktail={selectedCocktail}
            onClose={() => setSelectedCocktail(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
