'use client';

import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';
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
  const [imageError, setImageError] = useState(false);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const parallaxY = useTransform(scrollYProgress, [0, 1], [50, -50]);

  const themeColors = {
    bib: {
      primary: '#C85A36',
      secondary: '#BDA55D',
      textGradient: 'text-gradient-bib',
      bgGradient: 'linear-gradient(180deg, #FAF7F2 0%, rgba(200, 90, 54, 0.05) 50%, #FAF7F2 100%)',
      accentBg: 'rgba(200, 90, 54, 0.08)',
    },
    redemption: {
      primary: '#FD9419',
      secondary: '#D4A04A',
      textGradient: 'text-gradient-redemption',
      bgGradient: 'linear-gradient(180deg, #FAF7F2 0%, rgba(253, 148, 25, 0.05) 50%, #FAF7F2 100%)',
      accentBg: 'rgba(253, 148, 25, 0.08)',
    },
  };

  const colors = themeColors[theme];

  return (
    <section
      id={id}
      ref={ref}
      className="relative py-32 md:py-40 overflow-hidden"
      style={{ background: '#FAF7F2' }}
    >
      {/* Minimal background decoration */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-10">
        <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] rounded-full blur-3xl" style={{ background: colors.primary }} />
        <div className="absolute bottom-1/3 right-1/4 w-[500px] h-[500px] rounded-full blur-3xl" style={{ background: colors.secondary }} />
      </div>

      <div className="container-custom relative z-10">
        {/* Section Header - Elegant and refined */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-20"
        >
          <h2
            className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold mb-6 leading-tight tracking-tight"
            style={{ color: '#2D2926' }}
          >
            {brandName}
          </h2>
          <p className="text-xl md:text-2xl font-light italic leading-relaxed max-w-2xl mx-auto" style={{ color: '#78716C' }}>
            {tagline}
          </p>
        </motion.div>

        {/* Main content grid - Generous spacing */}
        <div
          className={`grid lg:grid-cols-2 gap-16 lg:gap-24 items-center mb-24 ${
            reversed ? 'lg:flex-row-reverse' : ''
          }`}
        >
          {/* Image side */}
          <motion.div
            initial={{ opacity: 0, x: reversed ? 60 : -60 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className={reversed ? 'lg:order-2' : ''}
          >
            {bottleImage && !imageError ? (
              <div className="relative aspect-[3/4] rounded-lg overflow-hidden bg-white" style={{ boxShadow: '0 4px 24px rgba(0, 0, 0, 0.08)' }}>
                <div className="relative w-full h-full flex items-center justify-center p-8 md:p-12">
                  <Image
                    src={bottleImage}
                    alt={`${brandName} bottle`}
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    quality={90}
                    priority
                    onError={() => {
                      console.error('Image failed to load:', bottleImage);
                      setImageError(true);
                    }}
                  />
                </div>
              </div>
            ) : (
              <div className="relative aspect-[3/4] rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="w-32 h-48 mx-auto mb-6 rounded-lg border-2 border-dashed flex items-center justify-center" style={{ borderColor: `${colors.primary}40` }}>
                    <svg className="w-16 h-16 opacity-30" style={{ color: colors.primary }} fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C9.79 2 8 3.79 8 6v2H5v14h14V8h-3V6c0-2.21-1.79-4-4-4zm0 2c1.1 0 2 .9 2 2v2h-4V6c0-1.1.9-2 2-2z" />
                    </svg>
                  </div>
                  <p style={{ color: '#8B8B8B' }} className="text-sm">Product Image</p>
                </div>
              </div>
            )}
          </motion.div>

          {/* Content side */}
          <motion.div
            initial={{ opacity: 0, x: reversed ? -60 : 60 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className={reversed ? 'lg:order-1' : ''}
          >
            {/* Story */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="mb-12"
            >
              <h3
                className="text-2xl md:text-3xl font-serif font-bold mb-6 leading-tight"
                style={{ color: '#2D2926' }}
              >
                The Story
              </h3>
              <p className="text-lg leading-relaxed mb-12" style={{ color: '#78716C' }}>
                {description}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="mb-12"
            >
              <h3
                className="text-2xl md:text-3xl font-serif font-bold mb-6 leading-tight"
                style={{ color: '#2D2926' }}
              >
                Heritage
              </h3>
              <p className="text-lg leading-relaxed" style={{ color: '#78716C' }}>
                {heritage}
              </p>
            </motion.div>
          </motion.div>
        </div>

        {/* Products Collection */}
        <div>
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-3xl md:text-4xl font-serif font-bold leading-tight mb-12 text-center"
            style={{ color: '#2D2926' }}
          >
            The Collection
          </motion.h3>

          <div className="grid md:grid-cols-2 gap-8">
            {[...products].sort((a, b) => {
              if (a.featured && !b.featured) return -1;
              if (!a.featured && b.featured) return 1;
              return 0;
            }).map((product, index) => (
              <motion.div
                key={product.name}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.4 + index * 0.1, duration: 0.6 }}
                className="bg-white rounded-lg p-8 shadow-sm hover:shadow-md transition-shadow"
              >
                {product.featured && (
                  <div className="inline-block px-3 py-1 rounded-full text-xs font-bold text-white mb-4" style={{ background: 'linear-gradient(135deg, #FFD700, #FFA500)' }}>
                    ⭐ Featured
                  </div>
                )}
                <div className="flex justify-between items-start mb-4">
                  <h4 className="text-xl font-bold leading-tight pr-4" style={{ color: '#2D2926' }}>
                    {product.name}
                  </h4>
                  <span className="text-xs font-medium px-3 py-1.5 rounded-full whitespace-nowrap" style={{ background: colors.accentBg, color: colors.primary }}>
                    {product.proof}
                  </span>
                </div>
                <p className="text-sm leading-relaxed mb-5" style={{ color: '#78716C' }}>
                  {product.description}
                </p>
                <div>
                  <p className="text-xs uppercase tracking-wider mb-3" style={{ color: '#8B8B8B' }}>
                    Tasting Notes
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {product.notes.map((note) => (
                      <span
                        key={note}
                        className="text-xs px-3 py-1.5 rounded-full font-medium"
                        style={{ background: colors.accentBg, color: colors.primary }}
                      >
                        {note}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

