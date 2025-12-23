'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center"
      style={{ background: '#FDFBF7' }}
    >
      {/* Content Container - Focused */}
      <div className="relative z-10 w-full max-w-4xl mx-auto px-6 py-24 text-center">
        {/* Whisky Advocate Logo */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <Image
            src="/images/logos/WA_BLUE-removebg-preview.png"
            alt="Whisky Advocate"
            width={200}
            height={60}
            className="h-12 w-auto object-contain mx-auto mb-3"
            priority
            unoptimized={true}
          />
          <p className="text-xs tracking-[0.25em] uppercase text-[#78716C]">
            Presents
          </p>
        </motion.div>

        {/* Main Headline - Centered Focus */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-light text-[#1A1410] leading-[1.1] mb-6"
        >
          The Art of
          <br />
          <span className="italic text-[#C85A36]">American Whiskey</span>
        </motion.h1>

        {/* Centered Divider */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex items-center justify-center gap-3 mb-8"
        >
          <span className="h-px w-12 bg-[#BDA55D]" />
          <span className="w-2 h-2 rotate-45 border border-[#BDA55D]" />
          <span className="h-px w-12 bg-[#BDA55D]" />
        </motion.div>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-lg md:text-xl text-[#4A4543] leading-relaxed max-w-xl mx-auto mb-12"
        >
          Discover the heritage and craftsmanship of{' '}
          <strong className="font-semibold text-[#1A1410]">Bib & Tucker</strong>
          {' '}and{' '}
          <strong className="font-semibold text-[#1A1410]">Redemption</strong>.
        </motion.p>

        {/* Brand Links - Symmetric */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex items-center justify-center gap-12 mb-12"
        >
          <a href="#bib-tucker" className="group text-center">
            <span className="block text-2xl font-serif text-[#C85A36] group-hover:text-[#A34828] transition-colors">
              Bib & Tucker
            </span>
            <span className="text-[11px] tracking-[0.2em] uppercase text-[#78716C]">
              Tennessee Bourbon
            </span>
          </a>

          <span className="w-px h-10 bg-[#D4D1C8]" />

          <a href="#redemption" className="group text-center">
            <span className="block text-2xl font-serif text-[#D4872B] group-hover:text-[#B36E1F] transition-colors">
              Redemption
            </span>
            <span className="text-[11px] tracking-[0.2em] uppercase text-[#78716C]">
              American Rye
            </span>
          </a>
        </motion.div>

        {/* CTA Buttons - Symmetric */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="flex items-center justify-center gap-4"
        >
          <a
            href="#bib-tucker"
            className="px-8 py-4 text-sm tracking-[0.15em] uppercase font-medium transition-all duration-300 hover:opacity-90"
            style={{ backgroundColor: '#C85A36', color: '#FFFFFF' }}
          >
            Explore the Collection
          </a>
          <a
            href="#cocktails"
            className="px-8 py-4 border text-sm tracking-[0.15em] uppercase font-medium transition-all duration-300"
            style={{ borderColor: '#2D2926', color: '#2D2926' }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = '#C85A36';
              e.currentTarget.style.color = '#C85A36';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = '#2D2926';
              e.currentTarget.style.color = '#2D2926';
            }}
          >
            Cocktails
          </a>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <svg className="w-6 h-6 text-[#BDA55D]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
}
