'use client';

import { motion, useInView, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
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
  featured?: boolean; // For Gold Roast emphasis
}

const cocktails: Cocktail[] = [
  // Gold Roast Featured - Big Push
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
    image: '/BAT_FY24_DoubleChar_Logo.png',
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
    image: '/Redemption Bottle Images/dfws_rdpn_trio-set_750ml_BLK_14OCT25.png',
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
    image: '/Bib & Tucker Bottle Images/BT_FY24_Classic 6_New Bottles_BS_Render.png',
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
    image: '/Redemption Bottle Images/Redpt_FY27_FLOW_Pho_BS_AmW_HR Bour_Ind_750ML.png',
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
    image: '/Redemption Bottle Images/Redpt_FY27_FLOW_Pho_BS_AmW_HR Bour_Ind_750ML.png',
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
    image: '/Bib & Tucker Bottle Images/BT_FY24_Classic 6_New Bottles_BS_Render.png',
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
    image: '/Bib & Tucker Bottle Images/BT_FY24_Classic 6_New Bottles_BS_Render.png',
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
    image: '/Redemption Bottle Images/Redpt_FY27_FLOW_Pho_BS_AmW_HR Bour_Ind_750ML.png',
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
    image: '/Bib & Tucker Bottle Images/BT_FY24_Classic 6_New Bottles_BS_Render.png',
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
    image: '/Redemption Bottle Images/Redpt_FY27_FLOW_Pho_BS_AmW_HR Bour_Ind_750ML.png',
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
    image: '/Redemption Bottle Images/Redpt_FY27_FLOW_Pho_BS_AmW_HR Bour_Ind_750ML.png',
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
    image: '/Redemption Bottle Images/dfws_rdpn_trio-set_750ml_BLK_14OCT25.png',
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
    image: '/Redemption Bottle Images/Redpt_FY27_FLOW_Pho_BS_AmW_HR Bour_Ind_750ML.png',
  },
];

// Enhanced cocktail card with image
const CocktailCard = ({ cocktail, index }: { cocktail: Cocktail; index: number }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const brandColors = {
    bib: {
      primary: 'var(--bt-rust)',
      secondary: 'var(--bt-gold)',
      bg: 'rgba(200, 90, 54, 0.08)',
      gradient: 'linear-gradient(135deg, var(--bt-rust), var(--bt-gold))',
      glow: 'rgba(200, 90, 54, 0.2)',
    },
    redemption: {
      primary: 'var(--redemption-orange)',
      secondary: 'var(--redemption-gold)',
      bg: 'rgba(253, 148, 25, 0.08)',
      gradient: 'linear-gradient(135deg, var(--redemption-orange), var(--redemption-gold))',
      glow: 'rgba(253, 148, 25, 0.2)',
    },
  };

  const categoryIcons = {
    holiday: '🎄',
    winter: '❄️',
    nye: '🎆',
    classic: '🥃',
  };

  const colors = brandColors[cocktail.brand];

  // ESC key to close
  useEffect(() => {
    if (!isExpanded) return;
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsExpanded(false);
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isExpanded]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isExpanded) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isExpanded]);

  return (
    <>
      <motion.div
        ref={cardRef}
        layout
        initial={{ opacity: 0, y: 40, scale: 0.9 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.6, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => setIsExpanded(true)}
        className="relative cursor-pointer group"
        whileHover={{ y: -8 }}
      >
        {/* Featured badge for Gold Roast */}
        {cocktail.featured && (
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: index * 0.1 + 0.3, type: 'spring' }}
            className="absolute -top-3 -right-3 z-20 px-3 py-1 rounded-full text-xs font-bold text-white shadow-lg"
            style={{ background: 'linear-gradient(135deg, #FFD700, #FFA500)' }}
          >
            ⭐ Featured
          </motion.div>
        )}

        {/* Animated border glow */}
        <motion.div
          animate={{
            opacity: isHovered ? 1 : 0,
            scale: isHovered ? 1.02 : 1,
          }}
          transition={{ duration: 0.3 }}
          className="absolute -inset-1 rounded-3xl blur-xl"
          style={{ background: colors.gradient, opacity: 0.4 }}
        />

        {/* Card content */}
        <div className="relative glass-card rounded-3xl overflow-hidden h-full backdrop-blur-xl">
          {/* Image section */}
          <div className="relative h-48 overflow-hidden bg-white">
            {cocktail.image ? (
              <div className="relative w-full h-full">
                <Image
                  src={cocktail.image}
                  alt={cocktail.name}
                  fill
                  className={cocktail.image.includes('Logo') ? 'object-contain p-4' : 'object-cover'}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  quality={90}
                />
                {/* Gradient overlay */}
                <div
                  className="absolute inset-0"
                  style={{
                    background: `linear-gradient(180deg, transparent 0%, ${colors.primary}40 100%)`,
                  }}
                />
              </div>
            ) : (
              <div
                className="w-full h-full flex items-center justify-center"
                style={{ background: colors.gradient }}
              >
                <span className="text-6xl opacity-50">{categoryIcons[cocktail.category]}</span>
              </div>
            )}

            {/* Category badge */}
            <div className="absolute top-3 left-3">
              <div
                className="px-3 py-1.5 rounded-full backdrop-blur-md flex items-center gap-2"
                style={{ background: 'rgba(255, 255, 255, 0.9)' }}
              >
                <span className="text-lg">{categoryIcons[cocktail.category]}</span>
                <span
                  className="text-xs font-bold uppercase tracking-wider"
                  style={{ color: colors.primary }}
              >
                {cocktail.brand === 'bib' ? 'B&T' : 'Redemption'}
              </span>
            </div>
            </div>

            {/* Hover overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: isHovered ? 1 : 0 }}
              className="absolute inset-0 flex items-center justify-center bg-black/20"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: isHovered ? 1 : 0 }}
                transition={{ type: 'spring', stiffness: 300 }}
                className="w-16 h-16 rounded-full backdrop-blur-md flex items-center justify-center"
                style={{ background: 'rgba(255, 255, 255, 0.9)' }}
            >
              <svg
                  className="w-8 h-8"
                style={{ color: colors.primary }}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              </motion.div>
            </motion.div>
          </div>

          {/* Content section */}
          <div className="p-5 relative">
          {/* Cocktail name */}
            <h3 className="text-xl font-bold mb-1" style={{ color: '#1A1410' }}>
            {cocktail.name}
          </h3>

          {/* Tagline */}
            <p className="text-sm mb-3 line-clamp-2" style={{ color: '#6B6B6B' }}>
            {cocktail.tagline}
          </p>

          {/* Spirit */}
            <div className="flex items-center gap-2 mb-3">
            <div
              className="w-2 h-2 rounded-full"
              style={{ background: colors.gradient }}
            />
            <span className="text-xs font-medium" style={{ color: colors.primary }}>
              {cocktail.spirit}
            </span>
          </div>

          {/* Quick info */}
            <div className="flex items-center gap-3 text-xs" style={{ color: '#8B8B6B' }}>
            <span>{cocktail.glassware}</span>
            <span>•</span>
            <span>{cocktail.occasion}</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Enhanced expanded modal */}
      <AnimatePresence>
        {isExpanded && (
          <>
            {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsExpanded(false)}
              className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-md"
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="fixed inset-4 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 z-[101] w-full md:w-auto md:max-w-3xl max-h-[90vh] overflow-hidden rounded-3xl shadow-2xl"
              style={{ background: '#FAFAF8' }}
            >
              {/* Header with image */}
              <div className={`relative h-64 overflow-hidden ${cocktail.image?.includes('Logo') ? 'bg-gradient-to-br from-gray-50 to-gray-100' : ''}`}>
                {cocktail.image ? (
                  <Image
                    src={cocktail.image}
                    alt={cocktail.name}
                    fill
                    className={cocktail.image.includes('Logo') ? 'object-contain p-6' : 'object-cover'}
                    quality={90}
                    priority
                  />
                ) : (
                  <div
                    className="w-full h-full"
                style={{ background: colors.gradient }}
                  />
                )}
                {/* Gradient overlay */}
                <div
                  className="absolute inset-0"
                  style={{
                    background: `linear-gradient(180deg, transparent 0%, ${colors.primary} 100%)`,
                  }}
                />

                {/* Close button - Enhanced */}
                <motion.button
                  onClick={() => setIsExpanded(false)}
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  className="absolute top-4 right-4 w-12 h-12 rounded-full bg-white/20 backdrop-blur-xl flex items-center justify-center text-white hover:bg-white/30 transition-all shadow-lg z-10"
                  aria-label="Close"
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </motion.button>

                {/* Header content */}
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-2xl">{categoryIcons[cocktail.category]}</span>
                    <span className="text-sm font-medium opacity-90 uppercase tracking-wider">
                      {cocktail.brand === 'bib' ? 'Bib & Tucker' : 'Redemption'}
                    </span>
                    {cocktail.featured && (
                      <span className="px-2 py-1 rounded-full text-xs font-bold bg-yellow-400/30 backdrop-blur-sm">
                        ⭐ Featured
                      </span>
                    )}
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold mb-1">{cocktail.name}</h2>
                  <p className="text-lg opacity-90">{cocktail.tagline}</p>
                </div>
              </div>

              {/* Scrollable content */}
              <div className="overflow-y-auto max-h-[calc(90vh-16rem)] p-6 space-y-6">
                {/* Spirit highlight */}
                <div
                  className="flex items-center gap-4 p-4 rounded-2xl"
                  style={{ background: colors.bg }}
                >
                  <div
                    className="w-14 h-14 rounded-full flex items-center justify-center shadow-lg"
                    style={{ background: colors.gradient }}
                  >
                    <span className="text-2xl">🥃</span>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wider mb-1" style={{ color: '#8B8B8B' }}>
                      Base Spirit
                    </p>
                    <p className="text-lg font-bold" style={{ color: colors.primary }}>
                      {cocktail.spirit}
                    </p>
                  </div>
                </div>

                {/* Ingredients */}
                <div>
                  <h3 className="text-xl font-bold mb-3" style={{ color: '#1A1410' }}>
                    Ingredients
                  </h3>
                  <ul className="space-y-2">
                    {cocktail.ingredients.map((ingredient, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className="flex items-center gap-3 p-3 rounded-xl"
                        style={{ background: '#F5F3F0' }}
                      >
                        <div
                          className="w-2 h-2 rounded-full flex-shrink-0"
                          style={{ background: colors.gradient }}
                        />
                        <span className="text-sm font-medium" style={{ color: '#4A4A4A' }}>
                          {ingredient}
                        </span>
                      </motion.li>
                    ))}
                  </ul>
                </div>

                {/* Instructions */}
                <div>
                  <h3 className="text-xl font-bold mb-3" style={{ color: '#1A1410' }}>
                    Instructions
                  </h3>
                  <ol className="space-y-3">
                    {cocktail.instructions.map((step, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 + i * 0.05 }}
                        className="flex gap-4"
                      >
                        <span
                          className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 shadow-sm"
                          style={{ background: colors.gradient, color: '#FFFFFF' }}
                        >
                          {i + 1}
                        </span>
                        <span className="text-sm leading-relaxed pt-1" style={{ color: '#4A4A4A' }}>
                          {step}
                        </span>
                      </motion.li>
                    ))}
                  </ol>
                </div>

                {/* Garnish & Glassware */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl" style={{ background: '#F5F3F0' }}>
                    <p className="text-xs uppercase tracking-wider mb-2" style={{ color: '#8B8B8B' }}>
                      Garnish
                    </p>
                    <p className="font-semibold text-sm" style={{ color: '#1A1410' }}>
                      {cocktail.garnish}
                    </p>
                  </div>
                  <div className="p-4 rounded-xl" style={{ background: '#F5F3F0' }}>
                    <p className="text-xs uppercase tracking-wider mb-2" style={{ color: '#8B8B8B' }}>
                      Glassware
                    </p>
                    <p className="font-semibold text-sm" style={{ color: '#1A1410' }}>
                      {cocktail.glassware}
                    </p>
                  </div>
                </div>

                {/* Perfect for */}
                <div
                  className="p-4 rounded-xl text-center"
                  style={{ background: colors.bg }}
                >
                  <p className="text-xs uppercase tracking-wider mb-1" style={{ color: '#8B8B8B' }}>
                    Perfect for
                  </p>
                  <p className="text-lg font-bold" style={{ color: colors.primary }}>
                    {cocktail.occasion}
                  </p>
                </div>
              </div>
            </motion.div>
          </>
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

  // Sort to show featured (Gold Roast) first
  const sortedCocktails = [...filteredCocktails].sort((a, b) => {
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;
    return 0;
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
            <motion.button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id as typeof activeFilter)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
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
            </motion.button>
          ))}
        </motion.div>

        {/* Cocktail grid */}
        <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <AnimatePresence mode="popLayout">
            {sortedCocktails.map((cocktail, index) => (
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
