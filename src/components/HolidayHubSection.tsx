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
    primary: 'var(--bt-rust)',
    secondary: 'var(--bt-gold)',
    gradient: 'linear-gradient(135deg, var(--bt-rust), var(--bt-gold))',
    bg: 'rgba(200, 90, 54, 0.08)',
    glow: 'rgba(200, 90, 54, 0.2)',
  },
  redemption: {
    primary: 'var(--redemption-orange)',
    secondary: 'var(--redemption-gold)',
    gradient: 'linear-gradient(135deg, var(--redemption-orange), var(--redemption-gold))',
    bg: 'rgba(253, 148, 25, 0.08)',
    glow: 'rgba(253, 148, 25, 0.2)',
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
        opacity: [0, 0.3, 0.3, 0],
        x: [x, x + 30, x - 30, x],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: 'linear',
      }}
      className="absolute text-white/20 text-xl pointer-events-none"
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
        : { gradient: 'linear-gradient(135deg, var(--bt-rust), var(--redemption-orange))', bg: 'rgba(200, 90, 54, 0.08)' };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative group"
    >
      <Link href={feature.link || '#'} className="block h-full">
        <motion.div
          animate={{
            y: isHovered ? -6 : 0,
          }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="relative glass-card rounded-2xl p-6 h-full cursor-pointer overflow-hidden"
        >
          {/* Subtle background gradient on hover */}
          <motion.div
            animate={{
              opacity: isHovered ? 0.08 : 0,
            }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 rounded-2xl"
            style={{ background: colors.gradient }}
          />

          {/* Icon */}
          <motion.div
            animate={{ scale: isHovered ? 1.1 : 1 }}
            transition={{ duration: 0.3 }}
            className="text-4xl mb-4 relative z-10"
          >
            {feature.icon}
          </motion.div>

          {/* Content */}
          <div className="relative z-10">
            <h3 className="text-lg font-semibold mb-2 leading-tight" style={{ color: 'var(--color-text-primary)' }}>
              {feature.title}
            </h3>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
              {feature.description}
            </p>
          </div>

          {/* Hover arrow */}
          <motion.div
            initial={{ x: -8, opacity: 0 }}
            animate={{ x: isHovered ? 0 : -8, opacity: isHovered ? 1 : 0 }}
            className="absolute bottom-5 right-5"
          >
            <svg
              className="w-5 h-5"
              style={{ color: feature.brand === 'bib' ? 'var(--bt-rust)' : feature.brand === 'redemption' ? 'var(--redemption-orange)' : 'var(--bt-rust)' }}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </motion.div>
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

  const parallaxY = useTransform(scrollYProgress, [0, 1], ['-15%', '15%']);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  // Generate fewer, more subtle snowflakes
  const snowflakes = Array.from({ length: 12 }, (_, i) => ({
    delay: i * 0.8,
    x: Math.random() * 100,
    duration: 15 + Math.random() * 10,
  }));

  const filteredFeatures =
    activeBrand === 'both'
      ? holidayFeatures
      : holidayFeatures.filter((f) => f.brand === activeBrand || f.brand === 'both');

  return (
    <section
      ref={ref}
      id="holiday-hub"
      className="relative py-24 md:py-32 overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, var(--color-bg-primary) 0%, var(--bt-cream) 25%, var(--color-bg-primary) 100%)',
      }}
    >
      {/* Subtle background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Snowflakes */}
        {snowflakes.map((snow, i) => (
          <Snowflake key={i} {...snow} />
        ))}

        {/* Floating orbs - more subtle */}
        <motion.div
          style={{
            y: parallaxY,
            opacity,
            background: 'radial-gradient(circle, rgba(200, 90, 54, 0.08) 0%, transparent 70%)',
          }}
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl"
        />
        <motion.div
          style={{
            y: parallaxY,
            opacity,
            background: 'radial-gradient(circle, rgba(253, 148, 25, 0.08) 0%, transparent 70%)',
          }}
          className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full blur-3xl"
        />
      </div>

      <div className="container-custom relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-12 md:mb-16"
        >
          {/* Holiday badge */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={isInView ? { scale: 1, rotate: 0 } : {}}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full mb-6"
            style={{ background: 'linear-gradient(135deg, var(--bt-rust), var(--redemption-orange))' }}
          >
            <span className="text-xl">🎄</span>
            <span className="text-xs font-semibold text-white uppercase tracking-wider">
              Holiday Hub
            </span>
          </motion.div>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="decorative-line mx-auto mb-8"
          />

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-5 leading-tight" style={{ color: 'var(--color-text-primary)' }}>
            Celebrate the{' '}
            <span
              className="inline-block"
              style={{
                background: 'linear-gradient(135deg, var(--bt-rust), var(--redemption-orange))',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Season
            </span>
          </h2>
          <p className="text-base md:text-lg max-w-2xl mx-auto leading-relaxed px-4" style={{ color: 'var(--color-text-muted)' }}>
            Discover how Bib & Tucker and Redemption elevate every holiday moment — from intimate
            gatherings to grand celebrations.
          </p>
        </motion.div>

        {/* Brand toggle */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-wrap justify-center gap-2.5 mb-10 md:mb-12 px-4"
        >
          {[
            { id: 'both', label: 'Both Brands', icon: '🎁' },
            { id: 'bib', label: 'Bib & Tucker', icon: '🟤' },
            { id: 'redemption', label: 'Redemption', icon: '🟠' },
          ].map((brand) => (
            <motion.button
              key={brand.id}
              onClick={() => setActiveBrand(brand.id as typeof activeBrand)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 flex items-center gap-2"
              style={{
                background:
                  activeBrand === brand.id
                    ? brand.id === 'bib'
                      ? brandColors.bib.gradient
                      : brand.id === 'redemption'
                        ? brandColors.redemption.gradient
                        : 'linear-gradient(135deg, var(--bt-rust), var(--redemption-orange))'
                    : 'var(--glass-bg)',
                color: activeBrand === brand.id ? '#FFFFFF' : 'var(--color-text-muted)',
                boxShadow:
                  activeBrand === brand.id
                    ? `0 4px 20px ${brand.id === 'bib' ? brandColors.bib.glow : brand.id === 'redemption' ? brandColors.redemption.glow : 'rgba(200, 90, 54, 0.2)'}`
                    : 'none',
              }}
            >
              <span className="text-base">{brand.icon}</span>
              <span>{brand.label}</span>
            </motion.button>
          ))}
        </motion.div>

        {/* Features grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6 mb-12 md:mb-16 px-4">
          {filteredFeatures.map((feature, index) => (
            <HolidayFeatureCard key={feature.id} feature={feature} index={index} isInView={isInView} />
          ))}
        </div>

        {/* Split brand showcase */}
        <div className="grid lg:grid-cols-2 gap-6 md:gap-8 mb-12 md:mb-16 px-4">
          {/* Bib & Tucker Holiday */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="relative rounded-2xl overflow-hidden group cursor-pointer"
            style={{ background: brandColors.bib.gradient }}
          >
            <div className="absolute inset-0 bg-black/15 group-hover:bg-black/25 transition-colors duration-300" />
            <div className="relative p-6 md:p-10 text-white">
              <div className="flex items-center gap-3 mb-5">
                <div className="relative w-14 h-14 md:w-16 md:h-16 flex-shrink-0">
                  <Image
                    src="/BAT_3D_Copper_Logo.png"
                    alt="Bib & Tucker"
                    fill
                    className="object-contain"
                    sizes="64px"
                    unoptimized={true}
                  />
                </div>
                <div>
                  <h3 className="text-xl md:text-2xl font-bold leading-tight">Bib & Tucker</h3>
                  <p className="text-xs md:text-sm opacity-90 mt-0.5">Holiday Collection</p>
                </div>
              </div>
              <h4 className="text-2xl md:text-3xl font-bold mb-4 leading-tight">
                Tennessee Tradition Meets Holiday Spirit
              </h4>
              <p className="text-sm md:text-base mb-6 opacity-90 leading-relaxed">
                From Gold Roast after-dinner sipping to Double Char by the fire, discover how our
                award-winning bourbons elevate every holiday moment.
              </p>
              <Link href="#bib-tucker">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-5 py-2.5 rounded-full text-sm font-semibold bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-colors"
                >
                  Explore Collection →
                </motion.button>
              </Link>
            </div>
          </motion.div>

          {/* Redemption Holiday */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="relative rounded-2xl overflow-hidden group cursor-pointer"
            style={{ background: brandColors.redemption.gradient }}
          >
            <div className="absolute inset-0 bg-black/15 group-hover:bg-black/25 transition-colors duration-300" />
            <div className="relative p-6 md:p-10 text-white">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center flex-shrink-0">
                  <span className="text-lg md:text-xl font-bold leading-none">REDEMPTION</span>
                </div>
                <div>
                  <h3 className="text-xl md:text-2xl font-bold leading-tight">Redemption</h3>
                  <p className="text-xs md:text-sm opacity-90 mt-0.5">Rye Revival</p>
                </div>
              </div>
              <h4 className="text-2xl md:text-3xl font-bold mb-4 leading-tight">
                Classic Cocktails for Modern Celebrations
              </h4>
              <p className="text-sm md:text-base mb-6 opacity-90 leading-relaxed">
                High-rye character meets holiday warmth. Perfect for Manhattans, Old Fashioneds, and
                all your favorite classic cocktails.
              </p>
              <Link href="#redemption">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-5 py-2.5 rounded-full text-sm font-semibold bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-colors"
                >
                  Explore Collection →
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Holiday CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-center px-4"
        >
          <div className="glass-card rounded-2xl p-8 md:p-10 max-w-3xl mx-auto">
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              className="text-5xl mb-5"
            >
              🎄
            </motion.div>
            <h3 className="text-2xl md:text-3xl font-bold mb-4 leading-tight" style={{ color: 'var(--color-text-primary)' }}>
              Make This Holiday Unforgettable
            </h3>
            <p className="text-base md:text-lg mb-8 max-w-xl mx-auto leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
              Whether you're hosting a gathering or finding the perfect gift, our collections offer
              something special for every whiskey lover.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="#cocktails">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="btn-primary text-sm px-6 py-3"
                >
                  View Holiday Cocktails
                </motion.button>
              </Link>
              <Link href="#pairings">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="btn-outline text-sm px-6 py-3"
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
