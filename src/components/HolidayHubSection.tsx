'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Link from 'next/link';

interface HolidayFeature {
  id: string;
  title: string;
  description: string;
  brand: 'bib' | 'redemption' | 'both';
  link?: string;
}

const holidayFeatures: HolidayFeature[] = [
  {
    id: 'gift-guide',
    title: 'Holiday Gift Guide',
    description: 'Perfect whiskey selections for every person on your list',
    brand: 'both',
    link: '#cocktails',
  },
  {
    id: 'gold-roast-feature',
    title: 'Gold Roast Holiday',
    description: 'The perfect after-dinner bourbon for holiday gatherings',
    brand: 'bib',
    link: '#bib-tucker',
  },
  {
    id: 'cocktail-party',
    title: 'Cocktail Recipes',
    description: 'Classic recipes that shine at any celebration',
    brand: 'both',
    link: '#cocktails',
  },
  {
    id: 'food-pairings',
    title: 'Food Pairings',
    description: 'Elevate your feast with expert whiskey pairings',
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


// Holiday feature card - elegant, no emojis
const HolidayFeatureCard = ({
  feature,
  index,
  isInView,
}: {
  feature: HolidayFeature;
  index: number;
  isInView: boolean;
}) => {
  const brandColor =
    feature.brand === 'bib'
      ? '#C85A36'
      : feature.brand === 'redemption'
        ? '#D4872B'
        : '#C85A36';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group"
    >
      <Link href={feature.link || '#'} className="block h-full">
        <div className="bg-white border border-[#E5E2DC] p-6 h-full hover:border-[#BDA55D]/50 hover:shadow-lg transition-all duration-300">
          {/* Title */}
          <h3 className="font-serif text-xl mb-2 text-[#1A1410] group-hover:text-[#C85A36] transition-colors">
            {feature.title}
          </h3>

          {/* Description */}
          <p className="text-sm text-[#5C5552] leading-relaxed mb-4">
            {feature.description}
          </p>

          {/* Link indicator */}
          <div className="flex items-center gap-2 text-sm font-medium" style={{ color: brandColor }}>
            <span>Learn more</span>
            <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default function HolidayHubSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section
      ref={ref}
      id="holiday-hub"
      className="relative py-20 md:py-28"
      style={{ background: '#FDFBF7' }}
    >
      {/* Top border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-[#E5E2DC]" />

      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-block text-xs tracking-[0.25em] uppercase mb-3 font-medium text-[#C85A36]">
            Holiday Collection
          </span>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-[#1A1410] mb-3">
            Celebrate the Season
          </h2>
          <p className="text-lg text-[#5C5552] max-w-2xl mx-auto">
            Discover how Bib & Tucker and Redemption elevate every holiday moment.
          </p>
        </motion.div>

        {/* Features grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {holidayFeatures.map((feature, index) => (
            <HolidayFeatureCard key={feature.id} feature={feature} index={index} isInView={isInView} />
          ))}
        </div>

        {/* Brand showcase - symmetric boxes */}
        <div className="grid lg:grid-cols-2 gap-6 mb-16">
          {/* Bib & Tucker */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Link href="#bib-tucker" className="block group h-full">
              <div
                className="relative overflow-hidden h-full"
                style={{ background: 'linear-gradient(135deg, #C85A36, #BDA55D)', minHeight: '280px' }}
              >
                <div className="p-8 md:p-10 text-white flex flex-col h-full">
                  <span className="text-xs tracking-[0.2em] uppercase opacity-80 block mb-2">Tennessee Bourbon</span>
                  <h3 className="font-serif text-3xl md:text-4xl mb-3">Bib & Tucker</h3>
                  <p className="text-sm md:text-base opacity-90 mb-6 flex-grow">
                    From Gold Roast after-dinner sipping to Double Char by the fire — award-winning bourbons for every moment.
                  </p>
                  <span className="inline-flex items-center gap-2 text-sm font-medium group-hover:gap-3 transition-all">
                    Explore Collection
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </span>
                </div>
              </div>
            </Link>
          </motion.div>

          {/* Redemption */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <Link href="#redemption" className="block group h-full">
              <div
                className="relative overflow-hidden h-full"
                style={{ background: 'linear-gradient(135deg, #D4872B, #BDA55D)', minHeight: '280px' }}
              >
                <div className="p-8 md:p-10 text-white flex flex-col h-full">
                  <span className="text-xs tracking-[0.2em] uppercase opacity-80 block mb-2">American Rye</span>
                  <h3 className="font-serif text-3xl md:text-4xl mb-3">Redemption</h3>
                  <p className="text-sm md:text-base opacity-90 mb-6 flex-grow">
                    High-rye character meets holiday warmth. Perfect for Manhattans and all your favorite classics.
                  </p>
                  <span className="inline-flex items-center gap-2 text-sm font-medium group-hover:gap-3 transition-all">
                    Explore Collection
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </span>
                </div>
              </div>
            </Link>
          </motion.div>
        </div>

        {/* CTA - simplified */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center"
        >
          <div className="border border-[#E5E2DC] bg-white p-10 max-w-2xl mx-auto">
            <h3 className="font-serif text-2xl md:text-3xl text-[#1A1410] mb-3">
              Make This Holiday Unforgettable
            </h3>
            <p className="text-[#5C5552] mb-8 max-w-lg mx-auto">
              Whether hosting a gathering or finding the perfect gift, our collections offer something special for every whiskey lover.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="#cocktails"
                className="px-8 py-4 text-sm tracking-[0.1em] uppercase font-medium transition-opacity hover:opacity-90"
                style={{ backgroundColor: '#C85A36', color: '#FFFFFF' }}
              >
                View Cocktails
              </Link>
              <Link
                href="#pairings"
                className="px-8 py-4 text-sm tracking-[0.1em] uppercase font-medium transition-all"
                style={{ border: '2px solid #1A1410', color: '#1A1410' }}
              >
                Food Pairings
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
