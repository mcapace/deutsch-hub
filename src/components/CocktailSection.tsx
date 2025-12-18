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
  image?: string;
}

const cocktails: Cocktail[] = [
  {
    id: 'campfire-old-fashioned',
    name: 'Campfire Old Fashioned',
    brand: 'bib',
    spirit: 'Bib & Tucker Double Char',
    tagline: 'Smoky, rich, unforgettable',
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
];

// Liquid fill animation component
const LiquidFill = ({ isHovered, color }: { isHovered: boolean; color: string }) => (
  <motion.div
    initial={{ height: '0%' }}
    animate={{ height: isHovered ? '100%' : '0%' }}
    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    className="absolute bottom-0 left-0 right-0 pointer-events-none"
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

  const colors = brandColors[cocktail.brand];

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
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
        <div className="relative glass-card rounded-2xl p-6 h-full overflow-hidden">
          <LiquidFill isHovered={isHovered} color={colors.primary} />

          {/* Brand tag */}
          <div className="flex items-center justify-between mb-4 relative z-10">
            <span
              className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full"
              style={{
                background: colors.bg,
                color: colors.primary,
              }}
            >
              {cocktail.brand === 'bib' ? 'Bib & Tucker' : 'Redemption'}
            </span>
            <motion.div
              animate={{ rotate: isHovered ? 45 : 0 }}
              transition={{ duration: 0.3 }}
              className="w-8 h-8 rounded-full flex items-center justify-center"
              style={{ background: colors.bg }}
            >
              <svg
                className="w-4 h-4"
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
            className="text-2xl font-bold mb-2 relative z-10"
            style={{ color: '#1A1410' }}
          >
            {cocktail.name}
          </h3>

          {/* Tagline */}
          <p className="text-sm mb-4 relative z-10" style={{ color: '#6B6B6B' }}>
            {cocktail.tagline}
          </p>

          {/* Spirit */}
          <div className="flex items-center gap-2 mb-4 relative z-10">
            <div
              className="w-2 h-2 rounded-full"
              style={{ background: colors.gradient }}
            />
            <span className="text-sm font-medium" style={{ color: colors.primary }}>
              {cocktail.spirit}
            </span>
          </div>

          {/* Quick info */}
          <div className="flex items-center gap-4 text-xs relative z-10" style={{ color: '#8B8B8B' }}>
            <span className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              {cocktail.glassware}
            </span>
            <span className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
              </svg>
              {cocktail.occasion}
            </span>
          </div>

          {/* View recipe prompt */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 10 }}
            transition={{ duration: 0.3 }}
            className="absolute bottom-6 left-6 right-6 text-center"
          >
            <span
              className="text-sm font-medium"
              style={{ color: colors.primary }}
            >
              Click for full recipe →
            </span>
          </motion.div>
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
                className="h-32 relative"
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
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <span className="text-sm font-medium opacity-80 uppercase tracking-wider">
                    {cocktail.brand === 'bib' ? 'Bib & Tucker' : 'Redemption'}
                  </span>
                  <h2 className="text-3xl font-bold mt-1">{cocktail.name}</h2>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 space-y-6">
                {/* Spirit highlight */}
                <div
                  className="flex items-center gap-3 p-4 rounded-xl"
                  style={{ background: colors.bg }}
                >
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center"
                    style={{ background: colors.gradient }}
                  >
                    <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm" style={{ color: '#6B6B6B' }}>Base Spirit</p>
                    <p className="font-semibold" style={{ color: colors.primary }}>{cocktail.spirit}</p>
                  </div>
                </div>

                {/* Ingredients */}
                <div>
                  <h3 className="text-lg font-bold mb-3" style={{ color: '#1A1410' }}>Ingredients</h3>
                  <ul className="space-y-2">
                    {cocktail.ingredients.map((ingredient, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="flex items-center gap-3"
                      >
                        <div
                          className="w-2 h-2 rounded-full flex-shrink-0"
                          style={{ background: colors.gradient }}
                        />
                        <span style={{ color: '#4A4A4A' }}>{ingredient}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>

                {/* Instructions */}
                <div>
                  <h3 className="text-lg font-bold mb-3" style={{ color: '#1A1410' }}>Instructions</h3>
                  <ol className="space-y-3">
                    {cocktail.instructions.map((step, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 + i * 0.1 }}
                        className="flex gap-3"
                      >
                        <span
                          className="w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0"
                          style={{ background: colors.bg, color: colors.primary }}
                        >
                          {i + 1}
                        </span>
                        <span style={{ color: '#4A4A4A' }}>{step}</span>
                      </motion.li>
                    ))}
                  </ol>
                </div>

                {/* Garnish & Glassware */}
                <div className="flex gap-4">
                  <div className="flex-1 p-4 rounded-xl" style={{ background: '#F5F3F0' }}>
                    <p className="text-xs uppercase tracking-wider mb-1" style={{ color: '#8B8B8B' }}>Garnish</p>
                    <p className="font-medium" style={{ color: '#1A1410' }}>{cocktail.garnish}</p>
                  </div>
                  <div className="flex-1 p-4 rounded-xl" style={{ background: '#F5F3F0' }}>
                    <p className="text-xs uppercase tracking-wider mb-1" style={{ color: '#8B8B8B' }}>Glassware</p>
                    <p className="font-medium" style={{ color: '#1A1410' }}>{cocktail.glassware}</p>
                  </div>
                </div>

                {/* Perfect for */}
                <div
                  className="p-4 rounded-xl text-center"
                  style={{ background: colors.bg }}
                >
                  <p className="text-sm" style={{ color: '#6B6B6B' }}>Perfect for</p>
                  <p className="font-semibold text-lg" style={{ color: colors.primary }}>{cocktail.occasion}</p>
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
  const [activeFilter, setActiveFilter] = useState<'all' | 'bib' | 'redemption'>('all');

  const filteredCocktails = cocktails.filter(
    (c) => activeFilter === 'all' || c.brand === activeFilter
  );

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
          className="text-center mb-16"
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
            Expertly crafted recipes to celebrate the season with Bib & Tucker and Redemption whiskeys.
          </p>
        </motion.div>

        {/* Filter tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex justify-center gap-2 mb-12"
        >
          {[
            { id: 'all', label: 'All Cocktails' },
            { id: 'bib', label: 'Bib & Tucker' },
            { id: 'redemption', label: 'Redemption' },
          ].map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id as typeof activeFilter)}
              className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                activeFilter === filter.id
                  ? 'text-white shadow-lg'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
              style={{
                background:
                  activeFilter === filter.id
                    ? filter.id === 'bib'
                      ? 'linear-gradient(135deg, #C85A36, #BDA55D)'
                      : filter.id === 'redemption'
                      ? 'linear-gradient(135deg, #FD9419, #D4A04A)'
                      : 'linear-gradient(135deg, #C85A36, #FD9419)'
                    : 'rgba(255, 255, 255, 0.8)',
                backdropFilter: 'blur(10px)',
              }}
            >
              {filter.label}
            </button>
          ))}
        </motion.div>

        {/* Cocktail grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredCocktails.map((cocktail, index) => (
              <CocktailCard key={cocktail.id} cocktail={cocktail} index={index} />
            ))}
          </AnimatePresence>
        </div>

        {/* View more prompt */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-12"
        >
          <p className="text-sm mb-4" style={{ color: '#8B8B8B' }}>
            More recipes coming throughout the holiday season
          </p>
          <motion.a
            href="#articles"
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center gap-2 btn-outline"
          >
            <span>Explore More Content</span>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
