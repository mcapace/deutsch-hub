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

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '10%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative py-16 md:py-24 overflow-hidden"
      style={{ background: '#FAF7F2' }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Whisky Advocate Logo - Smaller, more refined */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 text-center"
        >
          <Image
            src="/images/logos/WA_BLUE-removebg-preview.png"
            alt="Whisky Advocate"
            width={200}
            height={60}
            className="h-10 md:h-14 w-auto object-contain mx-auto"
            priority
            unoptimized={true}
          />
          <p className="text-xs mt-2 tracking-wider" style={{ color: '#78716C' }}>
            Deutsch Spirits Collection
          </p>
        </motion.div>

        {/* Main headline - More refined, smaller */}
        <motion.div
          style={{ y, opacity }}
          className="text-center max-w-4xl mx-auto"
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-bold mb-4 leading-tight tracking-tight"
            style={{ color: '#2D2926' }}
          >
            Discover the Art of
            <br />
            <span style={{ color: '#C85A36' }}>American Whiskey</span>
          </motion.h1>

          {/* Tagline - More refined */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl leading-relaxed mb-8 font-light max-w-2xl mx-auto"
            style={{ color: '#78716C' }}
          >
            Explore the heritage, craftsmanship, and bold character of{' '}
            <span className="font-medium" style={{ color: '#2D2926' }}>Bib & Tucker</span>
            {' '}and{' '}
            <span className="font-medium" style={{ color: '#2D2926' }}>Redemption</span>
          </motion.p>

          {/* Holiday CTA - More prominent */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-6"
          >
            <motion.a
              href="#holiday-hub"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-8 py-3 rounded-full font-medium text-white text-base"
              style={{ background: '#C85A36' }}
            >
              Holiday Inspiration
            </motion.a>
            <motion.a
              href="#bib-tucker"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-8 py-3 rounded-full font-medium border-2 text-base"
              style={{ 
                borderColor: '#2D2926',
                color: '#2D2926',
              }}
            >
              Explore Collections
            </motion.a>
          </motion.div>

          {/* Storytelling element */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-sm md:text-base italic max-w-xl mx-auto"
            style={{ color: '#8B8B8B' }}
          >
            Where tradition meets innovation, and every sip tells a story
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
