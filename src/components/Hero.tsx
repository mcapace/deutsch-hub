'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden grain-overlay"
      style={{
        background: 'radial-gradient(ellipse 85% 75% at 50% 45%, var(--bt-warm-white) 0%, var(--color-bg) 45%, var(--color-bg-alt) 100%)',
      }}
    >
      {/* Content Container - Focused */}
        <div className="relative z-10 w-full max-w-4xl mx-auto px-6 py-28 md:py-32 text-center">
        {/* Whisky Advocate Logo */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-20"
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
          <p className="text-[11px] tracking-[0.3em] uppercase font-medium" style={{ color: 'var(--color-text-muted)' }}>
            Presents
          </p>
        </motion.div>

        {/* Main Headline - Centered Focus */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-light leading-[1.05] tracking-tight mb-8"
          style={{ color: 'var(--color-text)' }}
        >
          The Art of
          <br />
          <span className="italic tracking-normal" style={{ color: 'var(--bt-rust)' }}>American Whiskey</span>
        </motion.h1>

        {/* Centered Divider */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex items-center justify-center gap-4 mb-10"
        >
          <span className="h-px w-14" style={{ background: 'var(--bt-gold)' }} />
          <span className="w-2 h-2 rotate-45 border" style={{ borderColor: 'var(--bt-gold)' }} />
          <span className="h-px w-14" style={{ background: 'var(--bt-gold)' }} />
        </motion.div>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-lg md:text-xl leading-relaxed max-w-3xl mx-auto mb-14 md:whitespace-nowrap"
          style={{ color: 'var(--color-text-muted)' }}
        >
          Discover the heritage and craftsmanship of Bib & Tucker and Redemption.
        </motion.p>

        {/* Brand Logos - Symmetric */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex items-center justify-center gap-20 mb-14"
        >
          <a href="#bib-tucker" className="group text-center flex flex-col items-center">
            <Image
              src="/BAT_3D_Copper_Logo.png"
              alt="Bib & Tucker"
              width={220}
              height={80}
              className="h-20 md:h-24 w-auto object-contain mb-2 group-hover:scale-[1.04] transition-transform duration-500"
              unoptimized={true}
            />
            <span className="text-[10px] tracking-[0.25em] uppercase font-medium" style={{ color: 'var(--color-text-light)' }}>
              Tennessee Bourbon
            </span>
          </a>

          <span className="w-px h-20" style={{ background: 'var(--color-border)' }} />

          <a href="#redemption" className="group text-center flex flex-col items-center">
            <Image
              src="/Redemption logo /Redemption_Whiskey_Logo.png"
              alt="Redemption"
              width={220}
              height={80}
              className="h-20 md:h-24 w-auto object-contain mb-2 group-hover:scale-[1.04] transition-transform duration-500"
              unoptimized={true}
            />
            <span className="text-[10px] tracking-[0.25em] uppercase font-medium" style={{ color: 'var(--color-text-light)' }}>
              American Rye
            </span>
          </a>
        </motion.div>

        {/* CTA Buttons - Symmetric */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="flex items-center justify-center gap-5"
        >
          <a
            href="#bib-tucker"
            className="px-10 py-4 text-sm tracking-[0.2em] uppercase font-medium transition-all duration-300 hover:opacity-90 rounded-sm"
            style={{
              backgroundColor: 'var(--bt-rust)',
              color: '#FFFFFF',
              boxShadow: 'var(--shadow-glow-rust)',
            }}
          >
            Explore the Collection
          </a>
          <a
            href="#cocktails"
            className="px-10 py-4 border text-sm tracking-[0.2em] uppercase font-medium transition-all duration-300 rounded-sm hover:shadow-[var(--shadow-card)]"
            style={{ borderColor: 'var(--color-text)', color: 'var(--color-text)' }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'var(--bt-rust)';
              e.currentTarget.style.color = 'var(--bt-rust)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'var(--color-text)';
              e.currentTarget.style.color = 'var(--color-text)';
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
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <svg className="w-6 h-6" style={{ color: 'var(--bt-gold)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
}
