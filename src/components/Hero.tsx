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

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ background: '#FAF7F2' }}
    >
      {/* Main content */}
      <motion.div
        style={{ y, opacity }}
        className="relative z-10 max-w-6xl mx-auto px-6 text-center"
      >
        {/* Whisky Advocate Logo */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12"
        >
          <Image
            src="/images/logos/WA_BLUE-removebg-preview.png"
            alt="Whisky Advocate"
            width={250}
            height={75}
            className="h-14 md:h-20 lg:h-24 w-auto object-contain mx-auto"
            priority
          />
        </motion.div>

        {/* Main headline - Elegant and refined */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-serif font-bold leading-[0.9] mb-8 tracking-tight"
          style={{ color: '#2D2926' }}
        >
          Discover the Art of
          <br />
          <span style={{ color: '#C85A36' }}>American Whiskey</span>
        </motion.h1>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="max-w-2xl mx-auto text-xl md:text-2xl leading-relaxed mb-16 font-light"
          style={{ color: '#78716C' }}
        >
          Explore the heritage, craftsmanship, and bold character of{' '}
          <span className="font-medium" style={{ color: '#2D2926' }}>Bib & Tucker</span>
          {' '}and{' '}
          <span className="font-medium" style={{ color: '#2D2926' }}>Redemption</span>
        </motion.p>

        {/* CTA Buttons - Refined */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-24"
        >
          <motion.a
            href="#bib-tucker"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-10 py-4 rounded-full font-medium text-white transition-all text-lg"
            style={{ background: '#C85A36' }}
          >
            Explore the Collection
          </motion.a>
          <motion.a
            href="#cocktails"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-10 py-4 rounded-full font-medium border-2 transition-all text-lg"
            style={{ 
              borderColor: '#2D2926',
              color: '#2D2926',
              background: 'transparent',
            }}
          >
            Discover Cocktails
          </motion.a>
        </motion.div>
      </motion.div>

      {/* Elegant scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.6 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-3"
        >
          <span className="text-xs uppercase tracking-[0.2em] font-medium" style={{ color: '#78716C' }}>
            Scroll to explore
          </span>
          <div className="w-px h-12" style={{ background: 'linear-gradient(180deg, #2D2926, transparent)' }} />
        </motion.div>
      </motion.div>
    </section>
  );
}
