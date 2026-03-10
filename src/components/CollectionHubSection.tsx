'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Link from 'next/link';

interface CollectionFeature {
  id: string;
  title: string;
  description: string;
  brand: 'bib' | 'redemption' | 'both';
  link?: string;
}

const collectionFeatures: CollectionFeature[] = [
  {
    id: 'gift-guide',
    title: 'Gift Guide',
    description: 'Perfect whiskey selections for every person on your list',
    brand: 'both',
    link: '#cocktails',
  },
  {
    id: 'gold-roast-feature',
    title: 'Gold Roast Bourbon',
    description: 'The perfect after-dinner bourbon for any gathering',
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
    description: 'Elevate your table with expert whiskey pairings',
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

const CollectionFeatureCard = ({
  feature,
  index,
  isInView,
}: {
  feature: CollectionFeature;
  index: number;
  isInView: boolean;
}) => {
  const brandColor =
    feature.brand === 'bib'
      ? 'var(--bt-rust)'
      : feature.brand === 'redemption'
        ? 'var(--redemption-orange)'
        : 'var(--bt-rust)';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group"
    >
      <Link href={feature.link || '#'} className="block h-full">
        <div className="bg-[#F7F2E8] border border-[#D8CEBC] p-6 h-full elevated-card rounded-sm hover:bg-[#EDE5D3]">
          <h3 className="font-serif cocktail-name text-xl mb-2 transition-colors group-hover:text-[var(--copper)]" style={{ color: 'var(--ink)' }}>
            {feature.title}
          </h3>
          <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--muted)' }}>
            {feature.description}
          </p>
          <div className="flex items-center gap-2 text-sm font-medium" style={{ color: 'var(--copper)' }}>
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

export default function CollectionHubSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section
      ref={ref}
      id="collection"
      className="relative py-20 md:py-28"
      style={{ background: 'var(--warm)' }}
    >
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'var(--rule)' }} />

      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-block text-xs tracking-[0.25em] uppercase mb-3 font-medium" style={{ color: 'var(--copper)' }}>
            Year-Round Collection
          </span>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl mb-3" style={{ color: 'var(--ink)' }}>
            Celebrate Every Moment
          </h2>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: 'var(--muted)' }}>
            Discover how Bib & Tucker and Redemption elevate any occasion—from quiet evenings to big gatherings.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {collectionFeatures.map((feature, index) => (
            <CollectionFeatureCard key={feature.id} feature={feature} index={index} isInView={isInView} />
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-6 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div
              className="relative overflow-hidden h-full"
              style={{ background: 'linear-gradient(135deg, var(--bt-rust), var(--bt-gold))', minHeight: '280px' }}
            >
              <div className="p-8 md:p-10 text-white flex flex-col h-full">
                <span className="text-xs tracking-[0.2em] uppercase opacity-80 block mb-2">Tennessee Bourbon</span>
                <h3 className="font-serif text-3xl md:text-4xl mb-3">Bib & Tucker</h3>
                <p className="text-sm md:text-base opacity-90 mb-6 flex-grow">
                  From Gold Roast after-dinner sipping to Double Char by the fire — award-winning bourbons for every moment.
                </p>
                <div className="flex flex-wrap items-center gap-4">
                  <Link href="#bib-tucker" className="inline-flex items-center gap-2 text-sm font-medium hover:gap-3 transition-all">
                    Explore Collection
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                  <a
                    href="https://store.whiskyadvocate.com/products/bib-tucker-gold-roast-small-batch-bourbon-whiskey"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-medium px-4 py-2 bg-white/20 hover:bg-white/30 transition-colors"
                  >
                    Shop Now
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <div
              className="relative overflow-hidden h-full"
              style={{ background: 'linear-gradient(135deg, var(--redemption-orange), var(--bt-gold))', minHeight: '280px' }}
            >
              <div className="p-8 md:p-10 text-white flex flex-col h-full">
                <span className="text-xs tracking-[0.2em] uppercase opacity-80 block mb-2">American Rye</span>
                <h3 className="font-serif text-3xl md:text-4xl mb-3">Redemption</h3>
                <p className="text-sm md:text-base opacity-90 mb-6 flex-grow">
                  High-rye character with rich warmth. Perfect for Manhattans and all your favorite classics.
                </p>
                <div className="flex flex-wrap items-center gap-4">
                  <Link href="#redemption" className="inline-flex items-center gap-2 text-sm font-medium hover:gap-3 transition-all">
                    Explore Collection
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                  <a
                    href="https://store.whiskyadvocate.com/products/redemption-rye-whiskey"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-medium px-4 py-2 bg-white/20 hover:bg-white/30 transition-colors"
                  >
                    Shop Now
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center"
        >
        <div className="border bg-white p-10 max-w-2xl mx-auto elevated-card rounded-sm border-[#D8CEBC]">
          <h3 className="font-serif text-2xl md:text-3xl mb-3" style={{ color: 'var(--ink)' }}>
            Make Every Moment Unforgettable
          </h3>
          <p className="mb-8 max-w-lg mx-auto" style={{ color: 'var(--muted)' }}>
              Whether hosting a gathering or finding the perfect gift, our collections offer something special for every whiskey lover—all year long.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="#cocktails"
                className="px-8 py-4 text-sm tracking-[0.1em] uppercase font-medium transition-opacity hover:opacity-90 text-white"
                style={{ backgroundColor: 'var(--copper)' }}
              >
                View Cocktails
              </Link>
              <Link
                href="#pairings"
                className="px-8 py-4 text-sm tracking-[0.1em] uppercase font-medium transition-all border-2 border-[#D8CEBC]"
                style={{ color: 'var(--ink)' }}
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
