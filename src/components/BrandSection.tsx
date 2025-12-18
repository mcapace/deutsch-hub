'use client';

import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';
import Image from 'next/image';

interface Product {
  name: string;
  description: string;
  proof: string;
  notes: string[];
  featured?: boolean; // For Gold Roast emphasis
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

// Product card with 3D hover effect
const ProductCard = ({
  product,
  theme,
  index,
  isInView,
}: {
  product: Product;
  theme: 'bib' | 'redemption';
  index: number;
  isInView: boolean;
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const themeColors = {
    bib: {
      primary: '#C85A36',
      secondary: '#BDA55D',
      bg: 'rgba(200, 90, 54, 0.08)',
      noteBg: 'rgba(200, 90, 54, 0.15)',
      noteText: '#C85A36',
    },
    redemption: {
      primary: '#FD9419',
      secondary: '#D4A04A',
      bg: 'rgba(253, 148, 25, 0.08)',
      noteBg: 'rgba(253, 148, 25, 0.15)',
      noteText: '#D4850A',
    },
  };

  const colors = themeColors[theme];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: 0.4 + index * 0.15, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative group"
    >
      {/* Glow effect on hover */}
      <motion.div
        animate={{
          opacity: isHovered ? 0.5 : 0,
          scale: isHovered ? 1 : 0.95,
        }}
        transition={{ duration: 0.4 }}
        className="absolute -inset-1 rounded-2xl blur-xl"
        style={{ background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})` }}
      />

      {/* Featured badge for Gold Roast */}
      {product.featured && (
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.4 + index * 0.15 + 0.2, type: 'spring', stiffness: 200 }}
          className="absolute -top-3 -right-3 z-20 px-3 py-1.5 rounded-full text-xs font-bold text-white shadow-xl"
          style={{ background: 'linear-gradient(135deg, #FFD700, #FFA500)' }}
        >
          ⭐ Featured
        </motion.div>
      )}

      {/* Card */}
      <motion.div
        animate={{
          y: isHovered ? -8 : 0,
          rotateX: isHovered ? 2 : 0,
          rotateY: isHovered ? -2 : 0,
          borderColor: product.featured && isHovered ? '#FFD700' : 'transparent',
        }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className={`relative glass-card rounded-2xl p-6 h-full ${product.featured ? 'border-2' : ''}`}
        style={{
          transformStyle: 'preserve-3d',
          borderColor: product.featured ? 'rgba(255, 215, 0, 0.3)' : 'transparent',
        }}
      >
        {/* Liquid fill effect */}
        <motion.div
          initial={{ height: '0%' }}
          animate={{ height: isHovered ? '100%' : '0%' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="absolute bottom-0 left-0 right-0 rounded-2xl pointer-events-none"
          style={{
            background: `linear-gradient(180deg, transparent 0%, ${colors.bg} 100%)`,
          }}
        />

        {/* Content */}
        <div className="relative z-10">
          {/* Header */}
          <div className="flex justify-between items-start mb-4">
            <h4
              className="text-xl font-bold leading-tight pr-4"
              style={{ color: product.featured ? '#FF8C00' : colors.primary }}
            >
              {product.name}
            </h4>
            <span
              className="text-xs font-medium px-3 py-1.5 rounded-full whitespace-nowrap"
              style={{
                background: product.featured ? 'rgba(255, 215, 0, 0.2)' : colors.bg,
                color: product.featured ? '#FF8C00' : colors.primary,
              }}
            >
              {product.proof}
            </span>
          </div>

          {/* Description */}
          <p className="text-sm leading-relaxed mb-5" style={{ color: 'var(--color-text-secondary)' }}>
            {product.description}
          </p>

          {/* Tasting notes */}
          <div>
            <p className="text-xs uppercase tracking-wider mb-3" style={{ color: 'var(--color-text-light)' }}>
              Tasting Notes
            </p>
            <div className="flex flex-wrap gap-2">
              {product.notes.map((note, i) => (
                <motion.span
                  key={note}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.6 + index * 0.15 + i * 0.05, duration: 0.4 }}
                  className="text-xs px-3 py-1.5 rounded-full font-medium"
                  style={{
                    background: colors.noteBg,
                    color: colors.noteText,
                  }}
                >
                  {note}
                </motion.span>
              ))}
            </div>
          </div>
        </div>

        {/* Decorative corner accent */}
        <div
          className="absolute top-0 right-0 w-24 h-24 opacity-5 pointer-events-none"
          style={{
            background: `radial-gradient(circle at top right, ${colors.primary}, transparent 70%)`,
          }}
        />
      </motion.div>
    </motion.div>
  );
};

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

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const parallaxY = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1, 0.95]);

  const themeColors = {
    bib: {
      primary: 'var(--bt-rust)',
      secondary: 'var(--bt-gold)',
      textGradient: 'text-gradient-bib',
      bgGradient: 'linear-gradient(180deg, var(--color-bg-primary) 0%, rgba(200, 90, 54, 0.05) 50%, var(--color-bg-primary) 100%)',
      accentBg: 'rgba(200, 90, 54, 0.08)',
    },
    redemption: {
      primary: 'var(--redemption-orange)',
      secondary: 'var(--redemption-gold)',
      textGradient: 'text-gradient-redemption',
      bgGradient: 'linear-gradient(180deg, var(--color-bg-primary) 0%, rgba(253, 148, 25, 0.05) 50%, var(--color-bg-primary) 100%)',
      accentBg: 'rgba(253, 148, 25, 0.08)',
    },
  };

  const colors = themeColors[theme];

  return (
    <section
      id={id}
      ref={ref}
      className="relative py-24 md:py-32 overflow-hidden"
      style={{ background: colors.bgGradient }}
    >
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          style={{ y: parallaxY }}
          className="absolute -top-1/4 left-0 w-[600px] h-[600px] rounded-full blur-3xl opacity-20"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 0.2 } : {}}
          transition={{ duration: 1 }}
        >
          <div
            className="w-full h-full rounded-full liquid-blob"
            style={{ background: colors.primary }}
          />
        </motion.div>
        <motion.div
          style={{ y: parallaxY }}
          className="absolute -bottom-1/4 right-0 w-[500px] h-[500px] rounded-full blur-3xl opacity-15"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 0.15 } : {}}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <div
            className="w-full h-full rounded-full liquid-blob"
            style={{ background: colors.secondary, animationDelay: '-5s' }}
          />
        </motion.div>
      </div>

      <div className="container-custom relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="decorative-line mx-auto mb-6"
            style={{ background: `linear-gradient(90deg, ${colors.primary}, ${colors.secondary})` }}
          />
          <h2
            className={`text-4xl md:text-5xl lg:text-6xl font-bold mb-5 leading-tight ${colors.textGradient}`}
          >
            {brandName}
          </h2>
          <p className="text-lg md:text-xl italic leading-relaxed px-4" style={{ color: 'var(--color-text-muted)' }}>
            "{tagline}"
          </p>
        </motion.div>

        {/* Main content grid */}
        <div
          className={`grid lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-20 ${
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
            <motion.div
              style={{ scale: imageScale }}
              className="relative aspect-[4/5] rounded-3xl overflow-hidden"
            >
              {/* Glass container */}
              <div
                className="absolute inset-0 rounded-3xl"
                style={{
                  background: `linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.6) 100%)`,
                  boxShadow: `
                    0 25px 50px -12px rgba(0, 0, 0, 0.1),
                    0 0 0 1px rgba(255, 255, 255, 0.5),
                    inset 0 1px 0 rgba(255, 255, 255, 0.8)
                  `,
                }}
              />

              {/* Decorative glow */}
              <div
                className="absolute inset-0 rounded-3xl animate-glow-pulse"
                style={{
                  background: `radial-gradient(circle at 50% 100%, ${colors.primary}20 0%, transparent 60%)`,
                }}
              />

              {bottleImage ? (
                <motion.div
                  whileHover={{ scale: 1.05, rotateY: -5 }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                  className="relative h-full flex items-center justify-center p-8 perspective-1000 group cursor-pointer"
                >
                  <motion.div
                    whileHover={{ rotateY: -10, rotateX: 3 }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                    className="relative w-full h-full preserve-3d"
                  >
                    <Image
                      src={bottleImage}
                      alt={`${brandName} bottle`}
                      fill
                      className="object-contain object-center p-8 whiskey-glow transition-all duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 50vw"
                      quality={90}
                      priority
                      placeholder="blur"
                      blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                    />
                    {/* Enhanced decorative overlay */}
                    <div
                      className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{
                        background: `linear-gradient(135deg, ${colors.primary}10 0%, transparent 50%, ${colors.secondary}10 100%)`,
                      }}
                    />
                  </motion.div>
                </motion.div>
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center p-8">
                  <div
                    className="w-32 h-48 mx-auto mb-6 rounded-lg border-2 border-dashed flex items-center justify-center"
                      style={{ borderColor: `${colors.primary}40` }}
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
                    <p style={{ color: '#8B8B8B' }} className="text-sm">
                      Product Image
                    </p>
                  </div>
                </div>
              )}
            </motion.div>
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
              className="mb-8"
            >
              <h3
                className="text-2xl font-bold mb-4"
                style={{ color: '#1A1410' }}
              >
                The Story
              </h3>
              <p className="leading-relaxed" style={{ color: '#4A4A4A' }}>
                {description}
              </p>
            </motion.div>

            {/* Heritage */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="mb-8"
            >
              <h3
                className="text-2xl font-bold mb-4"
                style={{ color: '#1A1410' }}
              >
                Heritage
              </h3>
              <p className="leading-relaxed" style={{ color: '#4A4A4A' }}>
                {heritage}
              </p>
            </motion.div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.7, duration: 0.6 }}
            >
              <motion.a
                href="#cocktails"
                whileHover={{ scale: 1.02, x: 5 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-2 font-medium transition-colors"
                style={{ color: colors.primary }}
              >
                Discover Cocktails
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </motion.a>
            </motion.div>
          </motion.div>
        </div>

        {/* Products section */}
        <div>
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-xl md:text-2xl font-bold leading-tight mb-8 text-center"
            style={{ color: 'var(--color-text-primary)' }}
          >
            The Collection
          </motion.h3>

          <div className="grid md:grid-cols-2 gap-6">
            {[...products].sort((a, b) => {
              if (a.featured && !b.featured) return -1;
              if (!a.featured && b.featured) return 1;
              return 0;
            }).map((product, index) => (
              <ProductCard
                key={product.name}
                product={product}
                theme={theme}
                index={index}
                isInView={isInView}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Section divider */}
      <div className="absolute bottom-0 left-0 right-0">
        <div className="section-divider" />
      </div>
    </section>
  );
}
