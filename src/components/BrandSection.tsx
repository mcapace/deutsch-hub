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
  shopUrl?: string;
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

  const shopLinks = {
    bib: 'https://store.whiskyadvocate.com/products/bib-tucker-gold-roast-small-batch-bourbon-whiskey',
    redemption: 'https://store.whiskyadvocate.com/products/redemption-rye-whiskey',
  };

  return (
    <section
      id={id}
      ref={ref}
      className="relative py-24 md:py-32"
      style={{ background: id === 'redemption' ? 'var(--white)' : 'var(--warm)' }}
    >
      {/* Top border - 1px rule */}
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'var(--rule)' }} />

      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        {/* Section Header - Centered with Logo */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span
            className="inline-block text-[8px] tracking-[0.28em] uppercase mb-4 font-medium"
            style={{ color: 'var(--copper)' }}
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
          <p className="text-lg italic" style={{ color: 'var(--fog)' }}>{tagline}</p>
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
              <div className="aspect-[3/4] flex items-center justify-center" style={{ background: 'var(--color-bg-alt)' }}>
                <p style={{ color: 'var(--color-text-light)' }}>Product Image</p>
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
                style={{ color: 'var(--copper)' }}
              >
                The Story
              </h3>
              <p className="text-base md:text-lg leading-relaxed" style={{ color: 'var(--ink)' }}>
                {description}
              </p>
            </div>

            {/* Heritage */}
            <div>
              <h3
                className="text-xs tracking-[0.25em] uppercase mb-4 font-medium"
                style={{ color: 'var(--copper)' }}
              >
                Heritage
              </h3>
              <p className="text-base md:text-lg leading-relaxed" style={{ color: 'var(--ink)' }}>
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
          <h3 className="font-serif text-2xl md:text-3xl mb-3" style={{ color: 'var(--ink)' }}>
            The Collection
          </h3>
          <div className="flex items-center justify-center gap-3">
            <span className="h-px w-10" style={{ background: 'var(--rule)' }} />
            <span className="w-1.5 h-1.5 rotate-45" style={{ background: 'var(--mist)' }} />
            <span className="h-px w-10" style={{ background: 'var(--rule)' }} />
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
            className="relative bg-[#F7F2E8] p-6 md:p-8 elevated-card rounded-sm border border-[#D8CEBC] hover:bg-[#EDE5D3]"
              >
                {/* Featured Badge */}
                {product.featured && (
                  <span
                    className="absolute -top-3 left-6 px-3 py-1 text-[10px] tracking-[0.15em] uppercase text-white font-medium"
                    style={{ background: 'var(--copper)' }}
                  >
                    Featured
                  </span>
                )}

                {/* Product Header */}
                <div className="flex items-start justify-between gap-4 mb-4">
                  <h4 className="font-serif product-name text-xl md:text-2xl" style={{ color: 'var(--ink)' }}>
                    {product.name}
                  </h4>
                  <span
                    className="flex-shrink-0 text-xs font-semibold px-3 py-1"
                    style={{
                      background: 'color-mix(in srgb, var(--copper) 15%, transparent)',
                      color: 'var(--copper)',
                    }}
                  >
                    {product.proof}
                  </span>
                </div>

                {/* Description */}
                <p className="leading-relaxed mb-6 text-sm md:text-base" style={{ color: 'var(--ink)' }}>
                  {product.description}
                </p>

                {/* Tasting Notes - border rule, white bg, fog text */}
                <div className="mb-6">
                  <span className="text-[10px] tracking-[0.2em] uppercase font-medium block mb-3" style={{ color: 'var(--fog)' }}>
                    Tasting Notes
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {product.notes.map((note) => (
                      <span
                        key={note}
                        className="text-xs px-3 py-1.5 font-medium border border-[#D8CEBC] bg-white"
                        style={{ color: 'var(--fog)' }}
                      >
                        {note}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Shop Link - copper with arrow after */}
                {product.shopUrl && (
                  <a
                    href={product.shopUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.1em] transition-colors hover:opacity-80"
                    style={{ color: 'var(--copper)' }}
                  >
                    Shop This Bottle
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </a>
                )}
              </motion.article>
            ))}
        </div>

        {/* Shop CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-12 pt-10 border-t border-[#D8CEBC]"
        >
          <p className="text-sm mb-4" style={{ color: 'var(--fog)' }}>
            Ready to experience {brandName}?
          </p>
          <a
            href={shopLinks[theme]}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 text-sm tracking-[0.1em] uppercase font-medium transition-opacity hover:opacity-90 text-white"
            style={{ backgroundColor: 'var(--copper)' }}
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
