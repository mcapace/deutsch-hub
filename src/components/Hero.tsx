'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #FDFBF7 0%, #F5F0E8 100%)' }}
    >
      {/* Subtle texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      {/* Elegant gold accent line */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#BDA55D]/40 to-transparent" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-8 py-32 text-center">
        {/* Whisky Advocate Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12"
        >
          <div className="inline-flex flex-col items-center">
            <Image
              src="/images/logos/WA_BLUE-removebg-preview.png"
              alt="Whisky Advocate"
              width={180}
              height={54}
              className="h-10 w-auto object-contain mb-4"
              priority
              unoptimized={true}
            />
            <div className="flex items-center gap-4">
              <span className="h-[1px] w-12 bg-[#2D2926]/20" />
              <span className="text-[11px] tracking-[0.3em] uppercase text-[#78716C] font-light">
                Presents
              </span>
              <span className="h-[1px] w-12 bg-[#2D2926]/20" />
            </div>
          </div>
        </motion.div>

        {/* Main Headline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="mb-8"
        >
          <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-light tracking-tight text-[#1A1410] leading-[0.95]">
            The Art of
            <br />
            <span className="font-normal italic text-[#C85A36]">American Whiskey</span>
          </h1>
        </motion.div>

        {/* Elegant Divider */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="flex items-center justify-center gap-4 mb-10"
        >
          <span className="h-[1px] w-16 bg-gradient-to-r from-transparent to-[#BDA55D]/60" />
          <span className="w-1.5 h-1.5 rotate-45 border border-[#BDA55D]/60" />
          <span className="h-[1px] w-16 bg-gradient-to-l from-transparent to-[#BDA55D]/60" />
        </motion.div>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-lg md:text-xl text-[#5C5552] font-light leading-relaxed max-w-2xl mx-auto mb-12"
        >
          Discover the heritage and craftsmanship of{' '}
          <span className="text-[#1A1410] font-medium">Bib & Tucker</span>
          {' '}and{' '}
          <span className="text-[#1A1410] font-medium">Redemption</span>
          {' '}— two expressions of American whiskey tradition.
        </motion.p>

        {/* Brand Showcase */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-16 mb-16"
        >
          <a
            href="#bib-tucker"
            className="group flex flex-col items-center"
          >
            <span className="text-2xl md:text-3xl font-serif text-[#C85A36] tracking-wide group-hover:text-[#A34828] transition-colors duration-300">
              Bib & Tucker
            </span>
            <span className="text-xs tracking-[0.2em] uppercase text-[#8B8685] mt-1 group-hover:text-[#C85A36] transition-colors duration-300">
              Tennessee Bourbon
            </span>
          </a>

          <div className="hidden sm:block w-[1px] h-12 bg-[#2D2926]/10" />

          <a
            href="#redemption"
            className="group flex flex-col items-center"
          >
            <span className="text-2xl md:text-3xl font-serif text-[#D4872B] tracking-wide group-hover:text-[#B36E1F] transition-colors duration-300">
              Redemption
            </span>
            <span className="text-xs tracking-[0.2em] uppercase text-[#8B8685] mt-1 group-hover:text-[#D4872B] transition-colors duration-300">
              Rye Whiskey
            </span>
          </a>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
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

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#F5F0E8] to-transparent" />

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-[10px] tracking-[0.3em] uppercase text-[#8B8685]">Scroll</span>
          <div className="w-[1px] h-8 bg-gradient-to-b from-[#BDA55D]/60 to-transparent" />
        </motion.div>
      </motion.div>
    </section>
  );
}
