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

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9]);

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden gradient-hero noise-overlay"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating orbs */}
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-[#E8D4B8]/30 blur-3xl"
        />
        <motion.div
          animate={{
            x: [0, -80, 0],
            y: [0, 80, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-[#FCD9A0]/30 blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#F5EDE0]/40 blur-3xl"
        />
      </div>

      {/* Decorative lines */}
      <div className="absolute inset-0 pointer-events-none">
        <svg className="absolute w-full h-full opacity-10" viewBox="0 0 1920 1080">
          <motion.path
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, ease: 'easeInOut' }}
            d="M0,540 Q480,200 960,540 T1920,540"
            stroke="url(#lineGradient)"
            strokeWidth="1"
            fill="none"
          />
          <defs>
            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#B87333" stopOpacity="0" />
              <stop offset="50%" stopColor="#C4956A" stopOpacity="1" />
              <stop offset="100%" stopColor="#FD9419" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Content */}
      <motion.div
        style={{ y, opacity, scale }}
        className="relative z-10 container-custom text-center"
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-[#C4956A] animate-pulse" />
          <span className="text-sm text-[#6B6B6B]">Presented by Whisky Advocate</span>
        </motion.div>

        {/* Main headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6"
        >
          <span className="block text-[#1A1A1A]">Discover the Art of</span>
          <span className="block text-gradient mt-2">American Whiskey</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="max-w-2xl mx-auto text-lg md:text-xl text-[#4A4A4A] mb-10 leading-relaxed"
        >
          Explore the heritage, craftsmanship, and bold character of{' '}
          <span className="text-[#B87333]">Bib & Tucker</span> and{' '}
          <span className="text-[#FD9419]">Redemption</span> — two exceptional expressions
          from the Deutsch Family portfolio.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a href="#bib-tucker" className="btn-primary">
            Explore the Collection
          </a>
          <a href="#articles" className="btn-outline">
            Read Featured Stories
          </a>
        </motion.div>

        {/* Brand logos placeholder */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="mt-20 flex items-center justify-center gap-12 flex-wrap"
        >
          <div className="flex flex-col items-center gap-3 opacity-70 hover:opacity-100 transition-opacity">
            <div className="w-32 h-32 rounded-xl bg-white/90 backdrop-blur-sm flex items-center justify-center border border-[#E5E3DD] shadow-sm hover:shadow-md transition-all p-4">
              <Image
                src="/BAT_3D_Copper_Logo.png"
                alt="Bib & Tucker Logo"
                width={80}
                height={80}
                className="object-contain"
              />
            </div>
          </div>
          <div className="w-px h-16 bg-gradient-to-b from-transparent via-[#D4D1C8] to-transparent" />
          <div className="flex flex-col items-center gap-3 opacity-70 hover:opacity-100 transition-opacity">
            <div className="w-32 h-32 rounded-xl bg-white/90 backdrop-blur-sm flex items-center justify-center border border-[#E5E3DD] shadow-sm hover:shadow-md transition-all">
              <span className="text-[#D97706] text-sm font-bold text-center px-3 tracking-wide">
                REDEMPTION
              </span>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-xs text-[#8B8B8B] uppercase tracking-widest">Scroll</span>
          <div className="w-6 h-10 rounded-full border border-[#D4D1C8] flex justify-center pt-2">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1.5 h-1.5 rounded-full bg-[#C4956A]"
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
