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
      gradient: 'from-[#C85A36] to-[#A34828]',
    },
    redemption: {
      primary: '#D4872B',
      accent: '#BDA55D',
      gradient: 'from-[#D4872B] to-[#B36E1F]',
    },
  };

  const colors = themeColors[theme];
  const bgColor = theme === 'bib' ? '#FDFBF7' : '#F8F6F1';

  return (
    <section
      id={id}
      ref={ref}
      className="relative py-24 md:py-32"
      style={{ background: bgColor }}
    >
      {/* Top decorative line */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#2D2926]/10 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16 md:mb-24"
        >
          <span
            className="inline-block text-[11px] tracking-[0.3em] uppercase mb-4"
            style={{ color: colors.primary }}
          >
            {theme === 'bib' ? 'Tennessee Bourbon' : 'American Rye'}
          </span>
          <h2
            className="font-serif text-5xl md:text-6xl lg:text-7xl font-light tracking-tight mb-4"
            style={{ color: '#1A1410' }}
          >
            {brandName}
          </h2>
          <p className="text-xl md:text-2xl font-light italic text-[#5C5552]">
            {tagline}
          </p>
        </motion.div>

        {/* Main Content - Story & Bottle */}
        <div className={`grid lg:grid-cols-2 gap-16 lg:gap-24 items-center mb-24 ${reversed ? '' : ''}`}>
          {/* Bottle Image */}
          <motion.div
            initial={{ opacity: 0, x: reversed ? 50 : -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className={reversed ? 'lg:order-2' : ''}
          >
            {bottleImage ? (
              <div className="relative">
                {/* Subtle background shape */}
                <div
                  className="absolute inset-0 rounded-full opacity-5 blur-3xl scale-90"
                  style={{ background: colors.primary }}
                />
                <div className="relative aspect-[3/4]">
                  <Image
                    src={bottleImage}
                    alt={`${brandName} bottle`}
                    fill
                    className="object-contain drop-shadow-2xl"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority
                    unoptimized={true}
                  />
                </div>
              </div>
            ) : (
              <div className="relative aspect-[3/4] bg-[#F5F0E8] rounded-lg flex items-center justify-center">
                <p className="text-[#8B8685] text-sm">Product Image</p>
              </div>
            )}
          </motion.div>

          {/* Story Content */}
          <motion.div
            initial={{ opacity: 0, x: reversed ? -50 : 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className={reversed ? 'lg:order-1' : ''}
          >
            <div className="space-y-10">
              {/* The Story */}
              <div>
                <div className="flex items-center gap-4 mb-4">
                  <span
                    className="h-[1px] w-8"
                    style={{ background: colors.primary }}
                  />
                  <h3
                    className="text-[11px] tracking-[0.3em] uppercase"
                    style={{ color: colors.primary }}
                  >
                    The Story
                  </h3>
                </div>
                <p className="text-lg md:text-xl leading-relaxed text-[#3D3935] font-light">
                  {description}
                </p>
              </div>

              {/* Heritage */}
              <div>
                <div className="flex items-center gap-4 mb-4">
                  <span
                    className="h-[1px] w-8"
                    style={{ background: colors.primary }}
                  />
                  <h3
                    className="text-[11px] tracking-[0.3em] uppercase"
                    style={{ color: colors.primary }}
                  >
                    Heritage
                  </h3>
                </div>
                <p className="text-lg md:text-xl leading-relaxed text-[#3D3935] font-light">
                  {heritage}
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Collection Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center mb-12"
        >
          <h3 className="font-serif text-3xl md:text-4xl font-light text-[#1A1410] mb-2">
            The Collection
          </h3>
          <div className="flex items-center justify-center gap-4">
            <span className="h-[1px] w-12 bg-gradient-to-r from-transparent to-[#BDA55D]/40" />
            <span className="w-1 h-1 rotate-45 bg-[#BDA55D]/40" />
            <span className="h-[1px] w-12 bg-gradient-to-l from-transparent to-[#BDA55D]/40" />
          </div>
        </motion.div>

        {/* Products Grid */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {[...products]
            .sort((a, b) => {
              if (a.featured && !b.featured) return -1;
              if (!a.featured && b.featured) return 1;
              return 0;
            })
            .map((product, index) => (
              <motion.article
                key={product.name}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.8,
                  delay: 0.5 + index * 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className={`group relative bg-white p-8 lg:p-10 transition-all duration-500 hover:shadow-xl ${
                  product.featured ? 'ring-1 ring-[#BDA55D]/30' : ''
                }`}
              >
                {/* Featured Badge */}
                {product.featured && (
                  <div className="absolute -top-3 left-8">
                    <span
                      className="inline-block px-4 py-1.5 text-[10px] tracking-[0.2em] uppercase text-white font-medium"
                      style={{ background: `linear-gradient(135deg, ${colors.primary}, ${colors.accent})` }}
                    >
                      Featured
                    </span>
                  </div>
                )}

                {/* Product Header */}
                <div className="flex items-start justify-between gap-4 mb-6">
                  <div>
                    <h4 className="font-serif text-2xl lg:text-3xl text-[#1A1410] mb-1 group-hover:text-[#C85A36] transition-colors duration-300">
                      {product.name}
                    </h4>
                  </div>
                  <span
                    className="flex-shrink-0 text-xs tracking-wider font-medium px-3 py-1.5 rounded-sm"
                    style={{
                      background: `${colors.primary}10`,
                      color: colors.primary,
                    }}
                  >
                    {product.proof}
                  </span>
                </div>

                {/* Description */}
                <p className="text-[#5C5552] leading-relaxed mb-8 font-light">
                  {product.description}
                </p>

                {/* Tasting Notes */}
                <div>
                  <span className="text-[10px] tracking-[0.2em] uppercase text-[#8B8685] block mb-3">
                    Tasting Notes
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {product.notes.map((note) => (
                      <span
                        key={note}
                        className="text-xs px-3 py-1.5 border transition-all duration-300 group-hover:border-[#BDA55D]/40"
                        style={{
                          borderColor: '#E5E2DC',
                          color: '#5C5552',
                        }}
                      >
                        {note}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Hover accent line */}
                <div
                  className="absolute bottom-0 left-0 right-0 h-[2px] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
                  style={{ background: `linear-gradient(90deg, ${colors.primary}, ${colors.accent})` }}
                />
              </motion.article>
            ))}
        </div>
      </div>
    </section>
  );
}
