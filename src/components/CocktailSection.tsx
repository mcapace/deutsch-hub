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
  image?: string;
}

const cocktails: Cocktail[] = [
  // Holiday Cocktails
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
    brand: 'redemption',
    spirit: 'Redemption Rye',
    tagline: 'Classic elegance, perfected',
    category: 'holiday',
    ingredients: [
      '2 oz Redemption Rye',
      '1 oz Sweet Vermouth',
      '2 dashes Angostura Bitters',
    ],
    instructions: [
      'Add all ingredients to a mixing glass with ice',
      'Stir until well chilled',
      'Strain into a chilled coupe glass',
      'Garnish with luxardo cherries',
    ],
    garnish: 'Luxardo cherry',
    glassware: 'Coupe',
    occasion: 'Elegant celebrations',
  },
  {
    id: 'gold-rush',
    name: 'Gold Rush',
    brand: 'redemption',
    spirit: 'Redemption Bourbon',
    tagline: 'Smooth honey meets bold bourbon',
    category: 'classic',
    ingredients: [
      '2 oz Redemption Bourbon',
      '1 oz Honey Syrup',
      '0.75 oz Fresh Lemon Juice',
    ],
    instructions: [
      'Make honey syrup: equal parts honey and hot water',
      'Shake all ingredients vigorously with ice',
      'Strain over a large ice cube in a rocks glass',
      'Garnish with lemon peel or bee pollen',
    ],
    garnish: 'Lemon peel',
    glassware: 'Rocks glass',
    occasion: 'Any celebration',
  },
  {
    id: 'tennessee-winter',
    name: 'Tennessee Winter',
    brand: 'bib',
    spirit: 'Bib & Tucker Classic Six',
    tagline: 'Warm spices, holiday spirit',
    category: 'holiday',
    ingredients: [
      '2 oz Bib & Tucker Classic Six',
      '0.5 oz Port Wine',
      '0.25 oz Allspice Dram',
      '2 dashes Orange Bitters',
    ],
    instructions: [
      'Combine all ingredients in a mixing glass with ice',
      'Stir until well chilled',
      'Strain into a coupe or nick & nora glass',
      'Express orange peel and garnish',
    ],
    garnish: 'Orange peel, cinnamon stick',
    glassware: 'Coupe',
    occasion: 'Holiday dinners',
  },
  {
    id: 'spiced-gold-rush',
    name: 'Spiced Gold Rush',
    brand: 'redemption',
    spirit: 'Redemption Bourbon',
    tagline: 'Ginger warmth meets honey sweetness',
    category: 'holiday',
    ingredients: [
      '2 oz Redemption Bourbon',
      '1 oz Honey-Ginger Syrup',
      '0.75 oz Fresh Lemon Juice',
    ],
    instructions: [
      'Make syrup: simmer honey, water, fresh ginger',
      'Shake all ingredients with ice',
      'Double strain into a rocks glass',
      'Garnish with candied ginger',
    ],
    garnish: 'Candied ginger',
    glassware: 'Rocks glass',
    occasion: 'Holiday entertaining',
  },
  {
    id: 'gold-roast-fashioned',
    name: 'Gold Roast Elevated',
    brand: 'bib',
    spirit: 'Bib & Tucker Gold Roast',
    tagline: 'Coffee lovers rejoice',
    category: 'classic',
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
  // Winter Warmers
  {
    id: 'hot-toddy',
    name: 'Classic Hot Toddy',
    brand: 'bib',
    spirit: 'Bib & Tucker Classic Six',
    tagline: 'The ultimate winter warmer',
    category: 'winter',
    ingredients: [
      '2 oz Bib & Tucker Classic Six',
      '0.75 oz Honey',
      '0.5 oz Fresh Lemon Juice',
      '4 oz Hot Water',
    ],
    instructions: [
      'Add honey and lemon juice to a mug',
      'Pour in hot water and stir to dissolve',
      'Add bourbon and stir gently',
      'Garnish with cinnamon stick and lemon wheel',
    ],
    garnish: 'Cinnamon stick, lemon wheel',
    glassware: 'Mug',
    occasion: 'Cold nights',
  },
  {
    id: 'hot-buttered-bourbon',
    name: 'Hot Buttered Bourbon',
    brand: 'bib',
    spirit: 'Bib & Tucker Classic Six',
    tagline: 'Rich, decadent, warming',
    category: 'winter',
    ingredients: [
      '2 oz Bib & Tucker Classic Six',
      '1 tbsp Butter',
      '1 tbsp Brown Sugar',
      'Pinch of Cinnamon, Nutmeg, Cloves',
      '4 oz Hot Water',
    ],
    instructions: [
      'Mix softened butter, brown sugar, and spices into a batter',
      'Add 1 tbsp of batter to a mug',
      'Pour in bourbon and hot water',
      'Stir until butter melts and top with nutmeg',
    ],
    garnish: 'Fresh grated nutmeg',
    glassware: 'Mug',
    occasion: 'Holiday gatherings',
  },
  {
    id: 'maple-apple-cider',
    name: 'Maple Apple Cider',
    brand: 'redemption',
    spirit: 'Redemption Bourbon',
    tagline: 'Autumn in a glass',
    category: 'winter',
    ingredients: [
      '2 oz Redemption Bourbon',
      '4 oz Warm Apple Cider',
      '0.5 oz Maple Syrup',
      '2 dashes Angostura Bitters',
    ],
    instructions: [
      'Warm apple cider in a saucepan (don\'t boil)',
      'Add bourbon, maple syrup, and bitters to a mug',
      'Pour warm cider over and stir',
      'Garnish with apple slice and cinnamon',
    ],
    garnish: 'Apple slice, cinnamon stick',
    glassware: 'Mug',
    occasion: 'Cozy nights',
  },
  // NYE Cocktails
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
  },
  {
    id: 'resolution-fizz',
    name: 'Resolution Fizz',
    brand: 'redemption',
    spirit: 'Redemption Rye',
    tagline: 'Sparkling new beginnings',
    category: 'nye',
    ingredients: [
      '1.5 oz Redemption Rye',
      '0.5 oz Elderflower Liqueur',
      '0.5 oz Fresh Lemon Juice',
      'Sparkling Wine',
    ],
    instructions: [
      'Shake rye, elderflower, and lemon with ice',
      'Strain into a flute glass',
      'Top with sparkling wine',
      'Garnish with a lemon twist',
    ],
    garnish: 'Lemon twist',
    glassware: 'Flute',
    occasion: 'Celebrations',
  },
  {
    id: 'gold-rush-royale',
    name: 'Gold Rush Royale',
    brand: 'redemption',
    spirit: 'Redemption Bourbon',
    tagline: 'Effervescent elegance',
    category: 'nye',
    ingredients: [
      '1.5 oz Redemption Bourbon',
      '0.75 oz Honey Syrup',
      '0.5 oz Fresh Lemon Juice',
      'Prosecco',
    ],
    instructions: [
      'Shake bourbon, honey syrup, and lemon with ice',
      'Strain into a coupe glass',
      'Top with prosecco',
      'Optional: rim with gold luster dust',
    ],
    garnish: 'Lemon peel, gold sugar rim',
    glassware: 'Coupe',
    occasion: 'Midnight toast',
  },
  // Classic Cocktails
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
      'In a mixing glass, combine rye, syrup, and bitters',
      'Stir with ice until well chilled',
      'Strain into the prepared glass (neat)',
    ],
    garnish: 'Lemon peel (expressed)',
    glassware: 'Rocks glass',
    occasion: 'Sophisticated sipping',
  },
  {
    id: 'whiskey-sour',
    name: 'Whiskey Sour',
    brand: 'redemption',
    spirit: 'Redemption High Rye Bourbon',
    tagline: 'Perfectly balanced',
    category: 'classic',
    ingredients: [
      '2 oz Redemption High Rye Bourbon',
      '0.75 oz Fresh Lemon Juice',
      '0.5 oz Simple Syrup',
      '1 Egg White (optional)',
    ],
    instructions: [
      'If using egg white, dry shake all ingredients first',
      'Add ice and shake vigorously',
      'Strain into a rocks glass with ice',
      'Garnish with cherry and orange',
    ],
    garnish: 'Luxardo cherry, orange slice',
    glassware: 'Rocks glass',
    occasion: 'Any occasion',
  },
];

// Liquid fill animation component
const LiquidFill = ({ isHovered, color }: { isHovered: boolean; color: string }) => (
  <motion.div
    initial={{ height: '0%' }}
    animate={{ height: isHovered ? '100%' : '0%' }}
    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    className="absolute bottom-0 left-0 right-0 pointer-events-none rounded-2xl"
    style={{
      background: `linear-gradient(180deg, transparent 0%, ${color}15 100%)`,
    }}
  />
);

// Cocktail card component
const CocktailCard = ({ cocktail, index }: { cocktail: Cocktail; index: number }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

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

  const categoryIcons = {
    holiday: '🎄',
    winter: '❄️',
    nye: '🎆',
    classic: '🥃',
  };

  const colors = brandColors[cocktail.brand];

  return (
    <>
      <motion.div
        layout
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.6, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => setIsExpanded(true)}
        className="relative cursor-pointer group"
      >
        {/* Animated border glow */}
        <motion.div
          animate={{
            opacity: isHovered ? 1 : 0,
            scale: isHovered ? 1 : 0.95,
          }}
          transition={{ duration: 0.3 }}
          className="absolute -inset-0.5 rounded-2xl blur-sm"
          style={{ background: colors.gradient }}
        />

        {/* Card content */}
        <div className="relative glass-card rounded-2xl p-5 h-full overflow-hidden">
          <LiquidFill isHovered={isHovered} color={colors.primary} />

          {/* Category & Brand tags */}
          <div className="flex items-center justify-between mb-3 relative z-10">
            <div className="flex items-center gap-2">
              <span className="text-lg">{categoryIcons[cocktail.category]}</span>
              <span
                className="text-xs font-bold uppercase tracking-wider px-2 py-1 rounded-full"
                style={{
                  background: colors.bg,
                  color: colors.primary,
                }}
              >
                {cocktail.brand === 'bib' ? 'B&T' : 'Redemption'}
              </span>
            </div>
            <motion.div
              animate={{ rotate: isHovered ? 45 : 0 }}
              transition={{ duration: 0.3 }}
              className="w-7 h-7 rounded-full flex items-center justify-center"
              style={{ background: colors.bg }}
            >
              <svg
                className="w-3.5 h-3.5"
                style={{ color: colors.primary }}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </motion.div>
          </div>

          {/* Cocktail name */}
          <h3
            className="text-xl font-bold mb-1 relative z-10"
            style={{ color: '#1A1410' }}
          >
            {cocktail.name}
          </h3>

          {/* Tagline */}
          <p className="text-sm mb-3 relative z-10" style={{ color: '#6B6B6B' }}>
            {cocktail.tagline}
          </p>

          {/* Spirit */}
          <div className="flex items-center gap-2 mb-3 relative z-10">
            <div
              className="w-2 h-2 rounded-full"
              style={{ background: colors.gradient }}
            />
            <span className="text-xs font-medium" style={{ color: colors.primary }}>
              {cocktail.spirit}
            </span>
          </div>

          {/* Quick info */}
          <div className="flex items-center gap-3 text-xs relative z-10" style={{ color: '#8B8B8B' }}>
            <span>{cocktail.glassware}</span>
            <span>•</span>
            <span>{cocktail.occasion}</span>
          </div>
        </div>
      </motion.div>

      {/* Expanded modal */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsExpanded(false)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl"
              style={{ background: '#FAFAF8' }}
            >
              {/* Header gradient */}
              <div
                className="h-28 relative"
                style={{ background: colors.gradient }}
              >
                <div className="absolute inset-0 bg-black/20" />
                <button
                  onClick={() => setIsExpanded(false)}
                  className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/30 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
                <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-lg">{categoryIcons[cocktail.category]}</span>
                    <span className="text-sm font-medium opacity-80 uppercase tracking-wider">
                      {cocktail.brand === 'bib' ? 'Bib & Tucker' : 'Redemption'}
                    </span>
                  </div>
                  <h2 className="text-2xl font-bold">{cocktail.name}</h2>
                </div>
              </div>

              {/* Content */}
              <div className="p-5 space-y-5">
                {/* Spirit highlight */}
                <div
                  className="flex items-center gap-3 p-3 rounded-xl"
                  style={{ background: colors.bg }}
                >
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center"
                    style={{ background: colors.gradient }}
                  >
                    <span className="text-white text-lg">🥃</span>
                  </div>
                  <div>
                    <p className="text-xs" style={{ color: '#6B6B6B' }}>Base Spirit</p>
                    <p className="font-semibold" style={{ color: colors.primary }}>{cocktail.spirit}</p>
                  </div>
                </div>

                {/* Ingredients */}
                <div>
                  <h3 className="text-lg font-bold mb-2" style={{ color: '#1A1410' }}>Ingredients</h3>
                  <ul className="space-y-1.5">
                    {cocktail.ingredients.map((ingredient, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="flex items-center gap-2"
                      >
                        <div
                          className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                          style={{ background: colors.gradient }}
                        />
                        <span className="text-sm" style={{ color: '#4A4A4A' }}>{ingredient}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>

                {/* Instructions */}
                <div>
                  <h3 className="text-lg font-bold mb-2" style={{ color: '#1A1410' }}>Instructions</h3>
                  <ol className="space-y-2">
                    {cocktail.instructions.map((step, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 + i * 0.1 }}
                        className="flex gap-2"
                      >
                        <span
                          className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5"
                          style={{ background: colors.bg, color: colors.primary }}
                        >
                          {i + 1}
                        </span>
                        <span className="text-sm" style={{ color: '#4A4A4A' }}>{step}</span>
                      </motion.li>
                    ))}
                  </ol>
                </div>

                {/* Garnish & Glassware */}
                <div className="flex gap-3">
                  <div className="flex-1 p-3 rounded-xl" style={{ background: '#F5F3F0' }}>
                    <p className="text-xs uppercase tracking-wider mb-0.5" style={{ color: '#8B8B8B' }}>Garnish</p>
                    <p className="font-medium text-sm" style={{ color: '#1A1410' }}>{cocktail.garnish}</p>
                  </div>
                  <div className="flex-1 p-3 rounded-xl" style={{ background: '#F5F3F0' }}>
                    <p className="text-xs uppercase tracking-wider mb-0.5" style={{ color: '#8B8B8B' }}>Glassware</p>
                    <p className="font-medium text-sm" style={{ color: '#1A1410' }}>{cocktail.glassware}</p>
                  </div>
                </div>

                {/* Perfect for */}
                <div
                  className="p-3 rounded-xl text-center"
                  style={{ background: colors.bg }}
                >
                  <p className="text-xs" style={{ color: '#6B6B6B' }}>Perfect for</p>
                  <p className="font-semibold" style={{ color: colors.primary }}>{cocktail.occasion}</p>
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
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [activeFilter, setActiveFilter] = useState<'all' | 'holiday' | 'winter' | 'nye' | 'classic' | 'bib' | 'redemption'>('all');

  const filteredCocktails = cocktails.filter((c) => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'bib' || activeFilter === 'redemption') return c.brand === activeFilter;
    return c.category === activeFilter;
  });

  const filters = [
    { id: 'all', label: 'All', icon: '🍸' },
    { id: 'holiday', label: 'Holiday', icon: '🎄' },
    { id: 'winter', label: 'Warmers', icon: '❄️' },
    { id: 'nye', label: 'NYE', icon: '🎆' },
    { id: 'classic', label: 'Classics', icon: '🥃' },
    { id: 'bib', label: 'B&T', icon: '🟤' },
    { id: 'redemption', label: 'Redemption', icon: '🟠' },
  ];

  return (
    <section
      id="cocktails"
      ref={ref}
      className="relative py-24 md:py-32 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #FAFAF8 0%, #F5EDE0 50%, #FAFAF8 100%)' }}
    >
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full blur-3xl opacity-30"
          style={{ background: 'radial-gradient(circle, rgba(200, 90, 54, 0.15) 0%, transparent 70%)' }}
        />
        <div
          className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full blur-3xl opacity-30"
          style={{ background: 'radial-gradient(circle, rgba(253, 148, 25, 0.15) 0%, transparent 70%)' }}
        />
      </div>

      <div className="container-custom relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="decorative-line mx-auto mb-6"
          />
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4" style={{ color: '#1A1410' }}>
            Seasonal <span className="text-gradient">Cocktails</span>
          </h2>
          <p className="text-lg md:text-xl max-w-2xl mx-auto" style={{ color: '#6B6B6B' }}>
            {filteredCocktails.length} expertly crafted recipes to celebrate any occasion.
          </p>
        </motion.div>

        {/* Filter tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-wrap justify-center gap-2 mb-10"
        >
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id as typeof activeFilter)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-1.5 ${
                activeFilter === filter.id
                  ? 'text-white shadow-lg'
                  : 'text-gray-600 hover:text-gray-900 bg-white/80'
              }`}
              style={{
                background:
                  activeFilter === filter.id
                    ? 'linear-gradient(135deg, #C85A36, #FD9419)'
                    : undefined,
              }}
            >
              <span>{filter.icon}</span>
              <span>{filter.label}</span>
            </button>
          ))}
        </motion.div>

        {/* Cocktail grid */}
        <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          <AnimatePresence mode="popLayout">
            {filteredCocktails.map((cocktail, index) => (
              <CocktailCard key={cocktail.id} cocktail={cocktail} index={index} />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-12"
        >
          <p className="text-sm mb-4" style={{ color: '#8B8B8B' }}>
            More seasonal recipes added throughout the campaign
          </p>
        </motion.div>
      </div>
    </section>
  );
}
