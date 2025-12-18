'use client';

import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface HolidayFeature {
  id: string;
  title: string;
  description: string;
  icon: string;
  brand: 'bib' | 'redemption' | 'both';
  link?: string;
}

const holidayFeatures: HolidayFeature[] = [
  {
    id: 'gift-guide',
    title: 'Holiday Gift Guide',
    description: 'Perfect whiskey selections for every person on your list',
    icon: '🎁',
    brand: 'both',
    link: '#cocktails',
  },
  {
    id: 'gold-roast-feature',
    title: 'Gold Roast Holiday',
    description: 'The perfect after-dinner bourbon for holiday gatherings',
    icon: '☕',
    brand: 'bib',
    link: '#bib-tucker',
  },
  {
    id: 'cocktail-party',
    title: 'Cocktail Party Ready',
    description: 'Classic recipes that shine at any holiday celebration',
    icon: '🍸',
    brand: 'both',
    link: '#cocktails',
  },
  {
    id: 'food-pairings',
    title: 'Holiday Pairings',
    description: 'Elevate your feast with perfect whiskey pairings',
    icon: '🍽️',
    brand: 'both',
    link: '#pairings',
  },
];

const brandColors = {
  bib: {
    primary: '#C85A36',
    secondary: '#BDA55D',
    gradient: 'linear-gradient(135deg, #C85A36, #BDA55D)',
    bg: 'rgba(200, 90, 54, 0.1)',
    glow: 'rgba(200, 90, 54, 0.3)',
  },
  redemption: {
    primary: '#FD9419',
    secondary: '#D4A04A',
    gradient: 'linear-gradient(135deg, #FD9419, #D4A04A)',
    bg: 'rgba(253, 148, 25, 0.1)',
    glow: 'rgba(253, 148, 25, 0.3)',
  },
};

// Floating snowflake component
const Snowflake = ({ delay, x, duration }: { delay: number; x: number; duration: number }) => {
  const [height, setHeight] = useState(1000);
  
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setHeight(window.innerHeight);
    }
  }, []);

  return (
    <motion.div
      initial={{ y: -100, opacity: 0 }}
      animate={{
        y: height + 100,
        opacity: [0, 1, 1, 0],
        x: [x, x + 50, x - 50, x],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: 'linear',
      }}
      className="absolute text-white/30 text-2xl pointer-events-none"
      style={{ left: `${x}%` }}
    >
      ❄️
    </motion.div>
  );
};

// Holiday feature card
const HolidayFeatureCard = ({
  feature,
  index,
  isInView,
}: {
  feature: HolidayFeature;
  index: number;
  isInView: boolean;
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const colors =
    feature.brand === 'bib'
      ? brandColors.bib
      : feature.brand === 'redemption'
        ? brandColors.redemption
        : { gradient: 'linear-gradient(135deg, #C85A36, #FD9419)', bg: 'rgba(200, 90, 54, 0.1)' };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.9 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative group"
    >
      <Link href={feature.link || '#'}>
        <motion.div
          animate={{
            y: isHovered ? -8 : 0,
            scale: isHovered ? 1.02 : 1,
          }}
          transition={{ duration: 0.3 }}
          className="relative glass-card rounded-3xl p-6 h-full cursor-pointer overflow-hidden"
        >
          {/* Animated background gradient */}
          <motion.div
            animate={{
              opacity: isHovered ? 1 : 0,
              scale: isHovered ? 1.1 : 1,
            }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0 rounded-3xl"
            style={{ background: colors.gradient, opacity: 0.1 }}
          />

          {/* Icon */}
          <motion.div
            animate={{ scale: isHovered ? 1.2 : 1, rotate: isHovered ? 5 : 0 }}
            transition={{ duration: 0.3 }}
            className="text-5xl mb-4 relative z-10"
          >
            {feature.icon}
          </motion.div>

          {/* Content */}
          <div className="relative z-10">
            <h3 className="text-xl font-bold mb-2" style={{ color: '#1A1410' }}>
              {feature.title}
            </h3>
            <p className="text-sm leading-relaxed" style={{ color: '#6B6B6B' }}>
              {feature.description}
            </p>
          </div>

          {/* Hover arrow */}
          <motion.div
            initial={{ x: -10, opacity: 0 }}
            animate={{ x: isHovered ? 0 : -10, opacity: isHovered ? 1 : 0 }}
            className="absolute bottom-6 right-6"
          >
            <svg
              className="w-6 h-6"
              style={{ color: feature.brand === 'bib' ? brandColors.bib.primary : feature.brand === 'redemption' ? brandColors.redemption.primary : '#C85A36' }}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </motion.div>

          {/* Shimmer effect */}
          {isHovered && (
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: '100%' }}
              transition={{ duration: 0.6, repeat: Infinity, repeatDelay: 1 }}
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
            />
          )}
        </motion.div>
      </Link>
    </motion.div>
  );
};

export default function HolidayHubSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [activeBrand, setActiveBrand] = useState<'bib' | 'redemption' | 'both'>('both');

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const parallaxY = useTransform(scrollYProgress, [0, 1], ['-20%', '20%']);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  // Generate snowflakes
  const snowflakes = Array.from({ length: 20 }, (_, i) => ({
    delay: i * 0.5,
    x: Math.random() * 100,
    duration: 10 + Math.random() * 10,
  }));

  const filteredFeatures =
    activeBrand === 'both'
      ? holidayFeatures
      : holidayFeatures.filter((f) => f.brand === activeBrand || f.brand === 'both');

  return (
    <section
      ref={ref}
      id="holiday-hub"
      className="relative py-32 md:py-40 overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #FAFAF8 0%, #F5EDE0 30%, #FAFAF8 100%)',
      }}
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Snowflakes */}
        {snowflakes.map((snow, i) => (
          <Snowflake key={i} {...snow} />
        ))}

        {/* Floating orbs */}
        <motion.div
          style={{
            y: parallaxY,
            opacity,
            background: 'radial-gradient(circle, rgba(200, 90, 54, 0.15) 0%, transparent 70%)',
          }}
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl"
        />
        <motion.div
          style={{
            y: parallaxY,
            opacity,
            background: 'radial-gradient(circle, rgba(253, 148, 25, 0.15) 0%, transparent 70%)',
          }}
          className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full blur-3xl"
        />

        {/* Decorative grid */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(200, 90, 54, 0.5) 1px, transparent 1px),
              linear-gradient(90deg, rgba(200, 90, 54, 0.5) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
          }}
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
          {/* Holiday badge */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={isInView ? { scale: 1, rotate: 0 } : {}}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full mb-6"
            style={{ background: 'linear-gradient(135deg, #C85A36, #FD9419)' }}
          >
            <span className="text-2xl">🎄</span>
            <span className="text-sm font-bold text-white uppercase tracking-wider">
              Holiday Hub
            </span>
          </motion.div>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="decorative-line mx-auto mb-8"
          />

          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6" style={{ color: '#1A1410' }}>
            Celebrate the{' '}
            <span
              className="inline-block"
              style={{
                background: 'linear-gradient(135deg, #C85A36, #FD9419)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Season
            </span>
          </h2>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed" style={{ color: '#6B6B6B' }}>
            Discover how Bib & Tucker and Redemption elevate every holiday moment — from intimate
            gatherings to grand celebrations.
          </p>
        </motion.div>

        {/* Brand toggle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex justify-center gap-3 mb-12"
        >
          {[
            { id: 'both', label: 'Both Brands', icon: '🎁' },
            { id: 'bib', label: 'Bib & Tucker', icon: '🟤' },
            { id: 'redemption', label: 'Redemption', icon: '🟠' },
          ].map((brand) => (
            <motion.button
              key={brand.id}
              onClick={() => setActiveBrand(brand.id as typeof activeBrand)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 rounded-xl font-medium transition-all duration-300 flex items-center gap-2"
              style={{
                background:
                  activeBrand === brand.id
                    ? brand.id === 'bib'
                      ? brandColors.bib.gradient
                      : brand.id === 'redemption'
                        ? brandColors.redemption.gradient
                        : 'linear-gradient(135deg, #C85A36, #FD9419)'
                    : 'rgba(255, 255, 255, 0.8)',
                color: activeBrand === brand.id ? '#FFFFFF' : '#6B6B6B',
                boxShadow:
                  activeBrand === brand.id
                    ? `0 8px 30px ${brand.id === 'bib' ? brandColors.bib.glow : brand.id === 'redemption' ? brandColors.redemption.glow : 'rgba(200, 90, 54, 0.3)'}`
                    : 'none',
              }}
            >
              <span>{brand.icon}</span>
              <span>{brand.label}</span>
            </motion.button>
          ))}
        </motion.div>

        {/* Features grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {filteredFeatures.map((feature, index) => (
            <HolidayFeatureCard key={feature.id} feature={feature} index={index} isInView={isInView} />
          ))}
        </div>

        {/* Split brand showcase */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {/* Bib & Tucker Holiday */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="relative rounded-3xl overflow-hidden group cursor-pointer"
            style={{ background: brandColors.bib.gradient }}
          >
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />
            <div className="relative p-8 md:p-12 text-white">
              <div className="flex items-center gap-3 mb-4">
                <Image
                  src="/BAT_3D_Copper_Logo.png"
                  alt="Bib & Tucker"
                  width={60}
                  height={60}
                  className="object-contain"
                />
                <div>
                  <h3 className="text-2xl font-bold">Bib & Tucker</h3>
                  <p className="text-sm opacity-90">Holiday Collection</p>
                </div>
              </div>
              <h4 className="text-3xl md:text-4xl font-bold mb-4">
                Tennessee Tradition Meets Holiday Spirit
              </h4>
              <p className="text-lg mb-6 opacity-90 leading-relaxed">
                From Gold Roast after-dinner sipping to Double Char by the fire, discover how our
                award-winning bourbons elevate every holiday moment.
              </p>
              <Link href="#bib-tucker">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 rounded-full font-semibold bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-colors"
                >
                  Explore Collection →
                </motion.button>
              </Link>
            </div>
          </motion.div>

          {/* Redemption Holiday */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="relative rounded-3xl overflow-hidden group cursor-pointer"
            style={{ background: brandColors.redemption.gradient }}
          >
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />
            <div className="relative p-8 md:p-12 text-white">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                  <span className="text-2xl font-bold">REDEMPTION</span>
                </div>
                <div>
                  <h3 className="text-2xl font-bold">Redemption</h3>
                  <p className="text-sm opacity-90">Rye Revival</p>
                </div>
              </div>
              <h4 className="text-3xl md:text-4xl font-bold mb-4">
                Classic Cocktails for Modern Celebrations
              </h4>
              <p className="text-lg mb-6 opacity-90 leading-relaxed">
                High-rye character meets holiday warmth. Perfect for Manhattans, Old Fashioneds, and
                all your favorite classic cocktails.
              </p>
              <Link href="#redemption">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 rounded-full font-semibold bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-colors"
                >
                  Explore Collection →
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Holiday CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center"
        >
          <div className="glass-card rounded-3xl p-8 md:p-12 max-w-4xl mx-auto">
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-6xl mb-6"
            >
              🎄
            </motion.div>
            <h3 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: '#1A1410' }}>
              Make This Holiday Unforgettable
            </h3>
            <p className="text-lg mb-8 max-w-2xl mx-auto" style={{ color: '#6B6B6B' }}>
              Whether you're hosting a gathering or finding the perfect gift, our collections offer
              something special for every whiskey lover.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="#cocktails">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-primary"
                >
                  View Holiday Cocktails
                </motion.button>
              </Link>
              <Link href="#pairings">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-outline"
                >
                  Explore Food Pairings
                </motion.button>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

