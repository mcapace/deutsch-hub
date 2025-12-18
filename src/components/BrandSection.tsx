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
  logo,
}: BrandSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const themeColors = {
    bib: {
      primary: '#C85A36',
      secondary: '#BDA55D',
    },
    redemption: {
      primary: '#FD9419',
      secondary: '#D4A04A',
    },
  };

  const colors = themeColors[theme];

  return (
    <section
      id={id}
      ref={ref}
      className="relative py-20 md:py-32"
      style={{ background: '#FAF7F2' }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold mb-4" style={{ color: '#2D2926' }}>
            {brandName}
          </h2>
          <p className="text-xl md:text-2xl font-light italic" style={{ color: '#78716C' }}>
            {tagline}
          </p>
        </motion.div>

        {/* Main content grid */}
        <div className={`grid lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-20 ${reversed ? 'lg:flex-row-reverse' : ''}`}>
          {/* Image side */}
          <motion.div
            initial={{ opacity: 0, x: reversed ? 40 : -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className={reversed ? 'lg:order-2' : ''}
          >
            {bottleImage ? (
              <div className="relative aspect-[3/4] bg-white rounded-lg overflow-hidden shadow-lg">
                <div className="relative w-full h-full">
                  <Image
                    src={bottleImage}
                    alt={`${brandName} bottle`}
                    fill
                    className="object-contain p-8 md:p-12"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority
                    unoptimized={true}
                  />
                </div>
              </div>
            ) : (
              <div className="relative aspect-[3/4] bg-gray-100 rounded-lg flex items-center justify-center">
                <p style={{ color: '#8B8B8B' }}>Product Image</p>
              </div>
            )}
          </motion.div>

          {/* Content side */}
          <motion.div
            initial={{ opacity: 0, x: reversed ? -40 : 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className={reversed ? 'lg:order-1' : ''}
          >
            <div className="mb-10">
              <h3 className="text-3xl font-serif font-bold mb-5" style={{ color: '#2D2926' }}>
                The Story
              </h3>
              <p className="text-lg leading-relaxed mb-10" style={{ color: '#78716C' }}>
                {description}
              </p>
            </div>

            <div>
              <h3 className="text-3xl font-serif font-bold mb-5" style={{ color: '#2D2926' }}>
                Heritage
              </h3>
              <p className="text-lg leading-relaxed" style={{ color: '#78716C' }}>
                {heritage}
              </p>
            </div>
          </motion.div>
        </div>

        {/* Products Collection */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h3 className="text-4xl font-serif font-bold mb-12 text-center" style={{ color: '#2D2926' }}>
            The Collection
          </h3>

          <div className="grid md:grid-cols-2 gap-6">
            {[...products].sort((a, b) => {
              if (a.featured && !b.featured) return -1;
              if (!a.featured && b.featured) return 1;
              return 0;
            }).map((product) => (
              <div
                key={product.name}
                className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                {product.featured && (
                  <div className="inline-block px-3 py-1 rounded-full text-xs font-bold text-white mb-3" style={{ background: 'linear-gradient(135deg, #FFD700, #FFA500)' }}>
                    ⭐ Featured
                  </div>
                )}
                <div className="flex justify-between items-start mb-3">
                  <h4 className="text-xl font-bold" style={{ color: '#2D2926' }}>
                    {product.name}
                  </h4>
                  <span className="text-xs font-medium px-3 py-1 rounded-full" style={{ background: `${colors.primary}15`, color: colors.primary }}>
                    {product.proof}
                  </span>
                </div>
                <p className="text-sm leading-relaxed mb-4" style={{ color: '#78716C' }}>
                  {product.description}
                </p>
                <div>
                  <p className="text-xs uppercase tracking-wider mb-2" style={{ color: '#8B8B8B' }}>
                    Tasting Notes
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {product.notes.map((note) => (
                      <span
                        key={note}
                        className="text-xs px-3 py-1 rounded-full font-medium"
                        style={{ background: `${colors.primary}15`, color: colors.primary }}
                      >
                        {note}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
