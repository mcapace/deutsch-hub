'use client';

import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';

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
  image?: string;
  featured?: boolean;
}

// Curated selection - only the best, most relevant cocktails
const cocktails: Cocktail[] = [
  // Featured Gold Roast cocktails
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
    image: '/Bib & Tucker Bottle Images/BT_FY24_Classic 6_New Bottles_BS_Render.png',
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
    image: '/Bib & Tucker Bottle Images/BT_FY24_Classic 6_New Bottles_BS_Render.png',
  },
  // Holiday favorites
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
    image: '/BAT_FY24_DoubleChar_Logo.png',
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
    image: '/Bib & Tucker Bottle Images/BT_FY24_Classic 6_New Bottles_BS_Render.png',
  },
  // Redemption classics
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
      '3 dashes Peychaud\'s Bitters',
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
    image: '/Redemption Bottle Images/Redpt_FY27_FLOW_Pho_BS_AmW_HR Bour_Ind_750ML.png',
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
    image: '/Redemption Bottle Images/Redpt_FY27_FLOW_Pho_BS_AmW_HR Bour_Ind_750ML.png',
  },
  // NYE special
  {
    id: 'midnight-manhattan',
    name: 'Midnight Manhattan',
    brand: 'bib',
    spirit: 'Bib & Tucker Classic Six',
    tagline: 'Toast to the new year',
    category: 'nye',
    ingredients: [
      '1.5 oz Bib & Tucker Classic Six',
      '0.75 oz Sweet Vermouth',
      '2 dashes Angostura Bitters',
      'Champagne Float',
    ],
    instructions: [
      'Stir bourbon, vermouth, and bitters with ice',
      'Strain into a coupe glass',
      'Top with a float of champagne',
      'Garnish with a lemon twist',
    ],
    garnish: 'Lemon twist',
    glassware: 'Coupe',
    occasion: "New Year's Eve",
    image: '/Bib & Tucker Bottle Images/BT_FY24_Classic 6_New Bottles_BS_Render.png',
  },
];

const brandColors = {
  bib: {
    primary: '#C85A36',
    secondary: '#BDA55D',
    bg: 'rgba(200, 90, 54, 0.08)',
    gradient: 'linear-gradient(135deg, #C85A36, #BDA55D)',
  },
  redemption: {
    primary: '#FD9419',
    secondary: '#D4A04A',
    bg: 'rgba(253, 148, 25, 0.08)',
    gradient: 'linear-gradient(135deg, #FD9419, #D4A04A)',
  },
};

// Elegant category labels (no emojis)
const categoryLabels = {
  holiday: 'Holiday',
  winter: 'Winter',
  nye: 'New Year',
  classic: 'Classic',
};

// Simplified Cocktail Card
const CocktailCard = ({ cocktail, index }: { cocktail: Cocktail; index: number }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const colors = brandColors[cocktail.brand];

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        onClick={() => setIsExpanded(true)}
        className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer group"
      >
        {/* Image */}
        <div className="relative h-56 overflow-hidden bg-white">
          {cocktail.image ? (
            <Image
              src={cocktail.image}
              alt={cocktail.name}
              fill
              className={cocktail.image.includes('Logo') ? 'object-contain p-6' : 'object-cover'}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              quality={90}
              unoptimized={true}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center" style={{ background: colors.gradient }}>
              <span className="text-sm font-medium text-white/60 uppercase tracking-wider">{categoryLabels[cocktail.category]}</span>
            </div>
          )}
          {cocktail.featured && (
            <div className="absolute top-4 right-4 px-3 py-1 text-[10px] font-semibold text-white uppercase tracking-wider" style={{ background: colors.primary }}>
              Featured
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full" style={{ background: colors.bg, color: colors.primary }}>
              {cocktail.brand === 'bib' ? 'Bib & Tucker' : 'Redemption'}
            </span>
            <span className="text-[10px] uppercase tracking-wider" style={{ color: '#8B8B8B' }}>
              {categoryLabels[cocktail.category]}
            </span>
          </div>
          <h3 className="text-xl font-bold mb-2" style={{ color: '#2D2926' }}>
            {cocktail.name}
          </h3>
          <p className="text-sm mb-4" style={{ color: '#78716C' }}>
            {cocktail.tagline}
          </p>
          <div className="flex items-center gap-2 text-sm font-medium" style={{ color: colors.primary }}>
            <span>View Recipe</span>
            <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </div>
        </div>
      </motion.div>

      {/* Modal */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 overflow-y-auto"
            style={{ background: 'rgba(0, 0, 0, 0.8)' }}
            onClick={() => setIsExpanded(false)}
          >
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              className="min-h-screen flex items-center justify-center p-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="max-w-2xl w-full bg-white rounded-xl shadow-2xl overflow-hidden">
                {/* Header */}
                <div className="relative h-64 overflow-hidden bg-white">
                  {cocktail.image ? (
                    <Image
                      src={cocktail.image}
                      alt={cocktail.name}
                      fill
                      className={cocktail.image.includes('Logo') ? 'object-contain p-8' : 'object-cover'}
                      quality={90}
                      priority
                      unoptimized={true}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center" style={{ background: colors.gradient }}>
                      <span className="text-lg font-medium text-white/60 uppercase tracking-wider">{categoryLabels[cocktail.category]}</span>
                    </div>
                  )}
                  <button
                    onClick={() => setIsExpanded(false)}
                    className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                {/* Content */}
                <div className="p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full" style={{ background: colors.bg, color: colors.primary }}>
                      {cocktail.brand === 'bib' ? 'Bib & Tucker' : 'Redemption'}
                    </span>
                    <span className="text-sm" style={{ color: '#8B8B8B' }}>
                      {cocktail.spirit}
                    </span>
                  </div>
                  <h2 className="text-3xl font-bold mb-2" style={{ color: '#2D2926' }}>
                    {cocktail.name}
                  </h2>
                  <p className="text-lg mb-8" style={{ color: '#78716C' }}>
                    {cocktail.tagline}
                  </p>

                  {/* Ingredients */}
                  <div className="mb-8">
                    <h3 className="text-xl font-bold mb-4" style={{ color: '#2D2926' }}>
                      Ingredients
                    </h3>
                    <ul className="space-y-2">
                      {cocktail.ingredients.map((ingredient, i) => (
                        <li key={i} className="flex items-center gap-3">
                          <div className="w-2 h-2 rounded-full" style={{ background: colors.primary }} />
                          <span className="text-base" style={{ color: '#4A4A4A' }}>
                            {ingredient}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Instructions */}
                  <div className="mb-8">
                    <h3 className="text-xl font-bold mb-4" style={{ color: '#2D2926' }}>
                      Instructions
                    </h3>
                    <ol className="space-y-3">
                      {cocktail.instructions.map((step, i) => (
                        <li key={i} className="flex gap-4">
                          <span className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0" style={{ background: colors.gradient, color: '#FFFFFF' }}>
                            {i + 1}
                          </span>
                          <span className="text-base leading-relaxed pt-1" style={{ color: '#4A4A4A' }}>
                            {step}
                          </span>
                        </li>
                      ))}
                    </ol>
                  </div>

                  {/* Details */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-lg" style={{ background: '#F5F3F0' }}>
                      <p className="text-xs uppercase tracking-wider mb-2" style={{ color: '#8B8B8B' }}>
                        Garnish
                      </p>
                      <p className="font-semibold" style={{ color: '#2D2926' }}>
                        {cocktail.garnish}
                      </p>
                    </div>
                    <div className="p-4 rounded-lg" style={{ background: '#F5F3F0' }}>
                      <p className="text-xs uppercase tracking-wider mb-2" style={{ color: '#8B8B8B' }}>
                        Glassware
                      </p>
                      <p className="font-semibold" style={{ color: '#2D2926' }}>
                        {cocktail.glassware}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default function CocktailSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const [activeFilter, setActiveFilter] = useState<'all' | 'holiday' | 'classic' | 'nye' | 'bib' | 'redemption'>('all');

  const filteredCocktails = cocktails.filter((c) => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'bib' || activeFilter === 'redemption') return c.brand === activeFilter;
    return c.category === activeFilter;
  });

  const filters = [
    { id: 'all', label: 'All' },
    { id: 'holiday', label: 'Holiday' },
    { id: 'classic', label: 'Classic' },
    { id: 'bib', label: 'Bib & Tucker' },
    { id: 'redemption', label: 'Redemption' },
  ] as const;

  return (
    <section
      id="cocktails"
      ref={ref}
      className="relative py-16 md:py-24"
      style={{ background: '#FAF7F2' }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-4" style={{ color: '#2D2926' }}>
            Signature Cocktails
          </h2>
          <p className="text-lg md:text-xl font-light" style={{ color: '#78716C' }}>
            Curated recipes for every occasion
          </p>
        </motion.div>

        {/* Filters - Simplified */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex justify-center gap-3 mb-12 flex-wrap"
        >
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all ${
                activeFilter === filter.id
                  ? 'text-white shadow-md'
                  : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
              style={
                activeFilter === filter.id
                  ? {
                      background:
                        filter.id === 'bib'
                          ? 'linear-gradient(135deg, #C85A36, #BDA55D)'
                          : filter.id === 'redemption'
                            ? 'linear-gradient(135deg, #FD9419, #D4A04A)'
                            : 'linear-gradient(135deg, #2D2926, #4A4A4A)',
                    }
                  : {}
              }
            >
              {filter.label}
            </button>
          ))}
        </motion.div>

        {/* Cocktails Grid - Cleaner, less cluttered */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCocktails.map((cocktail, index) => (
            <CocktailCard key={cocktail.id} cocktail={cocktail} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
