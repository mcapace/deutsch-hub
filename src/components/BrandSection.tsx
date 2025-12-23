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
  const isInView = useInView(ref, { once: true, margin: '-50px' });

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
      className="relative py-16 md:py-24"
      style={{ background: '#FAF7F2' }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header - More refined */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-3" style={{ color: '#2D2926' }}>
            {brandName}
          </h2>
          <p className="text-lg md:text-xl font-light italic" style={{ color: '#78716C' }}>
            {tagline}
          </p>
        </motion.div>

        {/* Main content grid - Better spacing */}
        <div className={`grid lg:grid-cols-2 gap-10 lg:gap-16 items-center mb-16 ${reversed ? 'lg:flex-row-reverse' : ''}`}>
          {/* Image side */}
          <motion.div
            initial={{ opacity: 0, x: reversed ? 30 : -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className={reversed ? 'lg:order-2' : ''}
          >
            {bottleImage ? (
              <div className="relative aspect-[3/4] bg-white rounded-lg overflow-hidden shadow-md">
                <div className="relative w-full h-full">
                  <Image
                    src={bottleImage}
                    alt={`${brandName} bottle`}
                    fill
                    className="object-contain p-8 md:p-10"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority
                    unoptimized={true}
                  />
                </div>
              </div>
            ) : (
              <div className="relative aspect-[3/4] bg-gray-100 rounded-lg flex items-center justify-center">
                <p style={{ color: '#8B8B8B' }} className="text-sm">Product Image</p>
              </div>
            )}
          </motion.div>

          {/* Content side - Better storytelling */}
          <motion.div
            initial={{ opacity: 0, x: reversed ? -30 : 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className={reversed ? 'lg:order-1' : ''}
          >
            {/* Story */}
            <div className="mb-8">
              <h3 className="text-2xl md:text-3xl font-serif font-bold mb-4" style={{ color: '#2D2926' }}>
                The Story
              </h3>
              <p className="text-base md:text-lg leading-relaxed mb-6" style={{ color: '#78716C' }}>
                {description}
              </p>
            </div>

            {/* Heritage */}
            <div>
              <h3 className="text-2xl md:text-3xl font-serif font-bold mb-4" style={{ color: '#2D2926' }}>
                Heritage
              </h3>
              <p className="text-base md:text-lg leading-relaxed" style={{ color: '#78716C' }}>
                {heritage}
              </p>
            </div>
          </motion.div>
        </div>

        {/* Products Collection - More refined grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <h3 className="text-3xl md:text-4xl font-serif font-bold mb-10 text-center" style={{ color: '#2D2926' }}>
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
                className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-all duration-300"
              >
                {product.featured && (
                  <div className="inline-block px-3 py-1 rounded-full text-xs font-bold text-white mb-3" style={{ background: 'linear-gradient(135deg, #FFD700, #FFA500)' }}>
                    ⭐ Featured
                  </div>
                )}
                <div className="flex justify-between items-start mb-3">
                  <h4 className="text-lg md:text-xl font-bold pr-2" style={{ color: '#2D2926' }}>
                    {product.name}
                  </h4>
                  <span className="text-xs font-medium px-2.5 py-1 rounded-full whitespace-nowrap" style={{ background: `${colors.primary}15`, color: colors.primary }}>
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
                  <div className="flex flex-wrap gap-1.5">
                    {product.notes.map((note) => (
                      <span
                        key={note}
                        className="text-xs px-2.5 py-1 rounded-full font-medium"
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
