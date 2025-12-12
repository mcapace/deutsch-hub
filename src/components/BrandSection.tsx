'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';

interface Product {
  name: string;
  description: string;
  proof: string;
  notes: string[];
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
}: BrandSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const themeColors = {
    bib: {
      primary: '#B87333',
      secondary: '#F5E6D3',
      gradient: 'gradient-bib',
      textGradient: 'text-gradient-bib',
      glow: 'glow-bib',
      accent: 'text-[#B87333]',
      accentBg: 'bg-[#B87333]',
      border: 'border-[#B87333]',
    },
    redemption: {
      primary: '#FD9419',
      secondary: '#FFB347',
      gradient: 'gradient-redemption',
      textGradient: 'text-gradient-redemption',
      glow: 'glow-redemption',
      accent: 'text-[#FD9419]',
      accentBg: 'bg-[#FD9419]',
      border: 'border-[#FD9419]',
    },
  };

  const colors = themeColors[theme];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <section
      id={id}
      ref={ref}
      className={`relative py-24 md:py-32 overflow-hidden ${colors.gradient} noise-overlay`}
    >
      <div className="container-custom">
        {/* Section Header */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="text-center mb-16"
        >
          <motion.div variants={itemVariants} className="inline-block mb-4">
            <div className={`decorative-line mx-auto mb-4`} style={{ background: `linear-gradient(90deg, ${colors.primary}, ${colors.secondary})` }} />
          </motion.div>
          <motion.h2
            variants={itemVariants}
            className={`text-4xl md:text-5xl lg:text-6xl font-bold ${colors.textGradient} mb-4`}
          >
            {brandName}
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-xl md:text-2xl text-[#A3A3A3] italic"
          >
            {tagline}
          </motion.p>
        </motion.div>

        {/* Main content grid */}
        <div className={`grid lg:grid-cols-2 gap-12 lg:gap-20 items-center ${reversed ? 'lg:flex-row-reverse' : ''}`}>
          {/* Image/Placeholder side */}
          <motion.div
            initial={{ opacity: 0, x: reversed ? 50 : -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className={reversed ? 'lg:order-2' : ''}
          >
            <div className={`relative aspect-[4/5] rounded-2xl overflow-hidden ${colors.glow}`}>
              {/* Placeholder bottle display */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a1a] to-[#0D0D0D] flex items-center justify-center">
                <div className="text-center p-8">
                  <div
                    className="w-32 h-48 mx-auto mb-6 rounded-lg border-2 border-dashed flex items-center justify-center"
                    style={{ borderColor: colors.primary + '40' }}
                  >
                    <svg
                      className="w-16 h-16 opacity-30"
                      style={{ color: colors.primary }}
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2C9.79 2 8 3.79 8 6v2H5v14h14V8h-3V6c0-2.21-1.79-4-4-4zm0 2c1.1 0 2 .9 2 2v2h-4V6c0-1.1.9-2 2-2z" />
                    </svg>
                  </div>
                  <p className="text-[#737373] text-sm">Product Image Placeholder</p>
                </div>
              </div>
              {/* Decorative overlay */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: `linear-gradient(135deg, ${colors.primary}10 0%, transparent 50%, ${colors.secondary}10 100%)`,
                }}
              />
            </div>
          </motion.div>

          {/* Content side */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className={reversed ? 'lg:order-1' : ''}
          >
            <motion.div variants={itemVariants} className="mb-8">
              <h3 className="text-2xl font-semibold text-[#FAFAFA] mb-4">The Story</h3>
              <p className="text-[#A3A3A3] leading-relaxed">{description}</p>
            </motion.div>

            <motion.div variants={itemVariants} className="mb-8">
              <h3 className="text-2xl font-semibold text-[#FAFAFA] mb-4">Heritage</h3>
              <p className="text-[#A3A3A3] leading-relaxed">{heritage}</p>
            </motion.div>

            {/* Products */}
            <motion.div variants={itemVariants}>
              <h3 className="text-2xl font-semibold text-[#FAFAFA] mb-6">The Collection</h3>
              <div className="space-y-4">
                {products.map((product, index) => (
                  <motion.div
                    key={product.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    className="glass-card rounded-xl p-5 hover:scale-[1.02] transition-transform duration-300"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <h4 className={`font-semibold ${colors.accent}`}>{product.name}</h4>
                      <span className="text-xs text-[#737373] bg-[#1a1a1a] px-2 py-1 rounded">
                        {product.proof}
                      </span>
                    </div>
                    <p className="text-sm text-[#A3A3A3] mb-3">{product.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {product.notes.map((note) => (
                        <span
                          key={note}
                          className="text-xs px-2 py-1 rounded-full"
                          style={{
                            backgroundColor: colors.primary + '20',
                            color: colors.secondary,
                          }}
                        >
                          {note}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* CTA */}
            <motion.div variants={itemVariants} className="mt-8">
              <a
                href="#articles"
                className="inline-flex items-center gap-2 text-sm font-medium transition-colors"
                style={{ color: colors.primary }}
              >
                Read the Full Story
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Section divider */}
      <div className="absolute bottom-0 left-0 right-0">
        <div className="section-divider" />
      </div>
    </section>
  );
}
