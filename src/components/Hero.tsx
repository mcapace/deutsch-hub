'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #FAF7F2 0%, #FFFDF9 100%)' }}
    >
      {/* Simple background gradient */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl" style={{ background: 'rgba(200, 90, 54, 0.1)' }} />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl" style={{ background: 'rgba(253, 148, 25, 0.1)' }} />
      </div>

      {/* Main content */}
      <motion.div
        style={{ y, opacity }}
        className="relative z-10 container-custom text-center px-4"
      >
        {/* Whisky Advocate Logo */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-8 md:mb-12"
        >
          <Image
            src="/images/logos/WA_BLUE-removebg-preview.png"
            alt="Whisky Advocate"
            width={250}
            height={75}
            className="h-12 sm:h-16 md:h-20 lg:h-24 w-auto object-contain mx-auto"
            priority
          />
          <p className="text-xs md:text-sm font-medium tracking-wider mt-4 text-center" style={{ color: '#78716C' }}>
            Deutsch Spirits Collection
          </p>
        </motion.div>

        {/* Main headline */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-serif font-bold leading-tight mb-6"
          style={{ color: '#2D2926' }}
        >
          Discover the Art of
          <br />
          <span
            className="inline-block mt-2"
            style={{
              background: 'linear-gradient(135deg, #C85A36, #FD9419)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            American Whiskey
          </span>
        </motion.h1>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="max-w-2xl mx-auto text-lg md:text-xl lg:text-2xl leading-relaxed mb-12"
          style={{ color: '#78716C' }}
        >
          Explore the heritage, craftsmanship, and bold character of{' '}
          <span className="font-semibold" style={{ color: '#C85A36' }}>Bib & Tucker</span>
          {' '}and{' '}
          <span className="font-semibold" style={{ color: '#FD9419' }}>Redemption</span>
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <motion.a
            href="#bib-tucker"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-8 py-4 rounded-full font-semibold text-white transition-all"
            style={{ background: 'linear-gradient(135deg, #C85A36, #BDA55D)' }}
          >
            Explore the Collection
          </motion.a>
          <motion.a
            href="#cocktails"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-8 py-4 rounded-full font-semibold border-2 transition-all"
            style={{ 
              borderColor: '#C85A36',
              color: '#C85A36',
              background: 'transparent',
            }}
          >
            Discover Cocktails
          </motion.a>
        </motion.div>

        {/* Brand showcase */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="mt-20 flex items-center justify-center gap-12 md:gap-20 flex-wrap"
        >
          {/* Bib & Tucker Logo */}
          <div className="flex flex-col items-center">
            <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-2xl flex items-center justify-center p-6" style={{ background: 'rgba(255, 255, 255, 0.8)', boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)' }}>
              <Image
                src="/BAT_3D_Copper_Logo.png"
                alt="Bib & Tucker Logo"
                width={120}
                height={120}
                className="object-contain"
              />
            </div>
            <p className="text-sm mt-4 font-medium" style={{ color: '#C85A36' }}>
              Tennessee Bourbon
            </p>
          </div>

          {/* Decorative divider */}
          <div className="hidden md:block w-px h-24" style={{ background: 'linear-gradient(180deg, transparent, #BDA55D, transparent)' }} />

          {/* Redemption Logo */}
          <div className="flex flex-col items-center">
            <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-2xl flex items-center justify-center p-6" style={{ background: 'rgba(255, 255, 255, 0.8)', boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)' }}>
              <div className="text-center">
                <span className="text-2xl md:text-3xl font-bold tracking-wider" style={{ color: '#FD9419' }}>
                  REDEMPTION
                </span>
                <div className="mt-2 text-xs tracking-[0.3em] uppercase" style={{ color: '#78716C' }}>
                  Whiskey
                </div>
              </div>
            </div>
            <p className="text-sm mt-4 font-medium" style={{ color: '#FD9419' }}>
              Rye Revival
            </p>
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-xs uppercase tracking-wider" style={{ color: '#78716C' }}>
            Scroll to Explore
          </span>
          <div className="w-6 h-10 rounded-full flex justify-center pt-2" style={{ border: '2px solid #C2B8A3' }}>
            <motion.div
              animate={{ y: [0, 12, 0], opacity: [1, 0.5, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: 'linear-gradient(180deg, #C85A36, #BDA55D)' }}
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
