'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';

interface Product {
  name: string;
  description: string;
  proof: string;
  notes: string[];
  featured?: boolean;
}

interface BrandSectionProps {
  id: string;
  brandName: string;
  tagline: string;
  description: string;
  heritage: string;
  products: Product[];
  theme: 'bib' | 'redemption';
  reversed?: boolean;
  bottleImage?: string;
  logo?: string;
}

export default function BrandSection({
  id,
  brandName,
  tagline,
  description,
  heritage,
  products,
  theme,
  reversed = false,
  bottleImage,
}: BrandSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const themeColors = {
    bib: {
      primary: '#C85A36',
      accent: '#BDA55D',
    },
    redemption: {
      primary: '#D4872B',
      accent: '#BDA55D',
    },
  };

  const colors = themeColors[theme];

  const shopLinks = {
    bib: 'https://store.whiskyadvocate.com/products/bib-tucker-6-year-old-small-batch-no-24?_pos=1&_psq=bib&_ss=e&_v=1.0',
    redemption: 'https://store.whiskyadvocate.com/products/redemption-sur-lee-straight-rye-whiskey?_pos=1&_psq=redempt&_ss=e&_v=1.0',
  };

  return (
    <section
      id={id}
      ref={ref}
      className="relative py-20 md:py-28"
      style={{ background: '#FDFBF7' }}
    >
      {/* Top border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-[#E5E2DC]" />

      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        {/* Section Header - Centered with Logo */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span
            className="inline-block text-xs tracking-[0.25em] uppercase mb-4 font-medium"
            style={{ color: colors.primary }}
          >
            {theme === 'bib' ? 'Tennessee Bourbon' : 'American Rye'}
          </span>
          <div className="flex justify-center mb-4">
            <Image
              src={theme === 'bib' ? '/BAT_3D_Copper_Logo.png' : '/Redemption logo /Redemption_Whiskey_Logo.png'}
              alt={brandName}
              width={280}
              height={100}
              className="h-20 md:h-28 w-auto object-contain"
              unoptimized={true}
            />
          </div>
          <p className="text-lg text-[#5C5552] italic">{tagline}</p>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-20">
          {/* Bottle Image */}
          <motion.div
            initial={{ opacity: 0, x: reversed ? 40 : -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className={reversed ? 'lg:order-2' : ''}
          >
            {bottleImage ? (
              <div className="relative aspect-[3/4] max-w-md mx-auto">
                <Image
                  src={bottleImage}
                  alt={`${brandName} bottle`}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                  unoptimized={true}
                />
              </div>
            ) : (
              <div className="aspect-[3/4] bg-[#F0EDE8] flex items-center justify-center">
                <p className="text-[#8B8685]">Product Image</p>
              </div>
            )}
          </motion.div>

          {/* Story Content */}
          <motion.div
            initial={{ opacity: 0, x: reversed ? -40 : 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className={reversed ? 'lg:order-1' : ''}
          >
            {/* The Story */}
            <div className="mb-10">
              <h3
                className="text-xs tracking-[0.25em] uppercase mb-4 font-medium"
                style={{ color: colors.primary }}
              >
                The Story
              </h3>
              <p className="text-base md:text-lg leading-relaxed text-[#3A3735]">
                {description}
              </p>
            </div>

            {/* Heritage */}
            <div>
              <h3
                className="text-xs tracking-[0.25em] uppercase mb-4 font-medium"
                style={{ color: colors.primary }}
              >
                Heritage
              </h3>
              <p className="text-base md:text-lg leading-relaxed text-[#3A3735]">
                {heritage}
              </p>
            </div>
          </motion.div>
        </div>

        {/* Collection Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mb-10"
        >
          <h3 className="font-serif text-2xl md:text-3xl text-[#1A1410] mb-3">
            The Collection
          </h3>
          <div className="flex items-center justify-center gap-3">
            <span className="h-px w-10 bg-[#BDA55D]" />
            <span className="w-1.5 h-1.5 rotate-45 bg-[#BDA55D]" />
            <span className="h-px w-10 bg-[#BDA55D]" />
          </div>
        </motion.div>

        {/* Products Grid - 2x2 Symmetric */}
        <div className="grid md:grid-cols-2 gap-6">
          {[...products]
            .sort((a, b) => {
              if (a.featured && !b.featured) return -1;
              if (!a.featured && b.featured) return 1;
              return 0;
            })
            .map((product, index) => (
              <motion.article
                key={product.name}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                className="relative bg-white border border-[#E5E2DC] p-6 md:p-8 hover:border-[#BDA55D]/50 hover:shadow-lg transition-all duration-300"
              >
                {/* Featured Badge */}
                {product.featured && (
                  <span
                    className="absolute -top-3 left-6 px-3 py-1 text-[10px] tracking-[0.15em] uppercase text-white font-medium"
                    style={{ background: colors.primary }}
                  >
                    Featured
                  </span>
                )}

                {/* Product Header */}
                <div className="flex items-start justify-between gap-4 mb-4">
                  <h4 className="font-serif text-xl md:text-2xl text-[#1A1410]">
                    {product.name}
                  </h4>
                  <span
                    className="flex-shrink-0 text-xs font-semibold px-3 py-1"
                    style={{
                      background: `${colors.primary}15`,
                      color: colors.primary,
                    }}
                  >
                    {product.proof}
                  </span>
                </div>

                {/* Description - Darker text for readability */}
                <p className="text-[#3A3735] leading-relaxed mb-6 text-sm md:text-base">
                  {product.description}
                </p>

                {/* Tasting Notes - Better contrast */}
                <div>
                  <span className="text-[10px] tracking-[0.2em] uppercase text-[#78716C] font-medium block mb-3">
                    Tasting Notes
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {product.notes.map((note) => (
                      <span
                        key={note}
                        className="text-xs px-3 py-1.5 font-medium"
                        style={{
                          background: '#F5F3F0',
                          color: '#3A3735',
                        }}
                      >
                        {note}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.article>
            ))}
        </div>

        {/* Shop CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-12 pt-10 border-t border-[#E5E2DC]"
        >
          <p className="text-sm text-[#5C5552] mb-4">
            Ready to experience {brandName}?
          </p>
          <a
            href={shopLinks[theme]}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 text-sm tracking-[0.1em] uppercase font-medium transition-opacity hover:opacity-90"
            style={{ backgroundColor: colors.primary, color: '#FFFFFF' }}
          >
            Shop Now
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
