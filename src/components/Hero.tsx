'use client';

import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import Image from 'next/image';

// Particle component for floating effects
const Particle = ({ delay, duration, x, size }: { delay: number; duration: number; x: number; size: number }) => (
  <motion.div
    initial={{ y: '100vh', opacity: 0, scale: 0 }}
    animate={{
      y: '-10vh',
      opacity: [0, 1, 1, 0],
      scale: [0, 1, 1, 0.5],
    }}
    transition={{
      duration,
      delay,
      repeat: Infinity,
      ease: 'linear',
    }}
    className="absolute rounded-full"
    style={{
      left: `${x}%`,
      width: size,
      height: size,
      background: `radial-gradient(circle, rgba(189, 165, 93, 0.6) 0%, transparent 70%)`,
    }}
  />
);

// Liquid blob background
const LiquidBlob = ({ className, color, delay = 0 }: { className: string; color: string; delay?: number }) => (
  <motion.div
    initial={{ scale: 0.8, opacity: 0 }}
    animate={{
      scale: [0.8, 1.1, 0.9, 1, 0.8],
      opacity: [0.3, 0.5, 0.4, 0.5, 0.3],
      borderRadius: [
        '60% 40% 30% 70% / 60% 30% 70% 40%',
        '30% 60% 70% 40% / 50% 60% 30% 60%',
        '50% 60% 30% 60% / 30% 40% 70% 50%',
        '60% 40% 60% 30% / 70% 50% 40% 60%',
        '60% 40% 30% 70% / 60% 30% 70% 40%',
      ],
    }}
    transition={{
      duration: 20,
      delay,
      repeat: Infinity,
      ease: 'easeInOut',
    }}
    className={`absolute blur-3xl ${className}`}
    style={{ background: color }}
  />
);

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  // Parallax transforms
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '40%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);
  const blur = useTransform(scrollYProgress, [0, 0.5], [0, 10]);

  // Mouse parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothMouseX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const smoothMouseY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      mouseX.set((clientX - innerWidth / 2) / 50);
      mouseY.set((clientY - innerHeight / 2) / 50);
      setMousePosition({ x: clientX, y: clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  // Generate particles
  const particles = Array.from({ length: 15 }, (_, i) => ({
    delay: i * 2,
    duration: 15 + Math.random() * 10,
    x: Math.random() * 100,
    size: 4 + Math.random() * 8,
  }));

  // Text animation variants
  const letterVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.03,
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1],
      },
    }),
  };

  const titleText = "American Whiskey";

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #FAFAF8 0%, #F5EDE0 100%)' }}
    >
      {/* Animated gradient background */}
      <div className="absolute inset-0">
        {/* Liquid blobs */}
        <LiquidBlob
          className="w-[600px] h-[600px] top-0 -left-48"
          color="rgba(200, 90, 54, 0.15)"
          delay={0}
        />
        <LiquidBlob
          className="w-[500px] h-[500px] bottom-0 right-0"
          color="rgba(189, 165, 93, 0.2)"
          delay={5}
        />
        <LiquidBlob
          className="w-[400px] h-[400px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          color="rgba(184, 115, 51, 0.1)"
          delay={10}
        />

        {/* Redemption accent blob */}
        <motion.div
          animate={{
            x: [0, 30, 0],
            y: [0, -20, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/3 right-1/4 w-[300px] h-[300px] rounded-full blur-3xl"
          style={{ background: 'rgba(253, 148, 25, 0.12)' }}
        />
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particles.map((particle, i) => (
          <Particle key={i} {...particle} />
        ))}
      </div>

      {/* Decorative grid pattern */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(rgba(200, 90, 54, 0.5) 1px, transparent 1px),
              linear-gradient(90deg, rgba(200, 90, 54, 0.5) 1px, transparent 1px)
            `,
            backgroundSize: '100px 100px',
          }}
        />
      </div>

      {/* Animated decorative lines */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <svg className="absolute w-full h-full" viewBox="0 0 1920 1080" preserveAspectRatio="none">
          <defs>
            <linearGradient id="heroLineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#C85A36" stopOpacity="0" />
              <stop offset="30%" stopColor="#C85A36" stopOpacity="0.3" />
              <stop offset="50%" stopColor="#BDA55D" stopOpacity="0.5" />
              <stop offset="70%" stopColor="#C85A36" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#C85A36" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="heroLineGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#BDA55D" stopOpacity="0" />
              <stop offset="50%" stopColor="#BDA55D" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#BDA55D" stopOpacity="0" />
            </linearGradient>
          </defs>

          <motion.path
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 2, ease: 'easeInOut', delay: 0.5 }}
            d="M0,400 Q480,200 960,400 T1920,400"
            stroke="url(#heroLineGradient)"
            strokeWidth="1.5"
            fill="none"
          />
          <motion.path
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 2.5, ease: 'easeInOut', delay: 0.8 }}
            d="M0,600 Q480,800 960,600 T1920,600"
            stroke="url(#heroLineGradient2)"
            strokeWidth="1"
            fill="none"
          />
        </svg>
      </div>

      {/* Main content with parallax */}
      <motion.div
        style={{ y, opacity, scale }}
        className="relative z-10 container-custom text-center px-4"
      >
        {/* 3D perspective wrapper */}
        <motion.div
          style={{ x: smoothMouseX, y: smoothMouseY }}
          className="relative"
        >
          {/* Whisky Advocate Logo - Prominent */}
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="mb-8 md:mb-10"
          >
            <Image
              src="/WA_BLUE-removebg-preview.png"
              alt="Whisky Advocate"
              width={250}
              height={75}
              className="h-12 sm:h-16 md:h-20 lg:h-24 w-auto object-contain mx-auto"
              priority
            />
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="text-xs md:text-sm font-medium tracking-wider mt-3 text-center"
              style={{ color: 'var(--color-text-muted)' }}
            >
              Deutsch Spirits Collection
            </motion.p>
          </motion.div>

          {/* Main headline with stagger animation */}
          <div className="overflow-hidden mb-3 md:mb-4">
            <motion.h1
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1]"
              style={{ color: 'var(--color-text-primary)' }}
            >
              Discover the Art of
            </motion.h1>
          </div>

          <div className="overflow-hidden mb-6 md:mb-8">
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1]"
            >
              <span className="text-gradient inline-block">
                {titleText.split('').map((char, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 + i * 0.03, duration: 0.5 }}
                    className="inline-block"
                    style={{ textShadow: '0 0 30px rgba(200, 90, 54, 0.2)' }}
                  >
                    {char === ' ' ? '\u00A0' : char}
                  </motion.span>
                ))}
              </span>
            </motion.div>
          </div>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="max-w-2xl mx-auto text-base md:text-lg lg:text-xl leading-relaxed mb-10 md:mb-12 px-4"
            style={{ color: 'var(--color-text-secondary)' }}
          >
            Explore the heritage, craftsmanship, and bold character of{' '}
            <motion.span
              whileHover={{ scale: 1.05 }}
              className="font-semibold inline-block cursor-pointer"
              style={{ color: 'var(--bt-rust)' }}
            >
              Bib & Tucker
            </motion.span>{' '}
            and{' '}
            <motion.span
              whileHover={{ scale: 1.05 }}
              className="font-semibold inline-block cursor-pointer"
              style={{ color: 'var(--redemption-orange)' }}
            >
              Redemption
            </motion.span>
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.1 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6"
          >
            <motion.a
              href="#bib-tucker"
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="btn-primary shimmer relative group"
            >
              <span className="relative z-10">Explore the Collection</span>
            </motion.a>
            <motion.a
              href="#cocktails"
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="btn-outline relative overflow-hidden"
            >
              <span className="relative z-10">Discover Cocktails</span>
            </motion.a>
          </motion.div>

          {/* Brand showcase */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.4 }}
            className="mt-20 flex items-center justify-center gap-8 md:gap-16 flex-wrap"
          >
            {/* Bib & Tucker Logo */}
            <motion.div
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="group cursor-pointer"
            >
              <div className="relative w-36 h-36 md:w-44 md:h-44 rounded-2xl glass-card flex items-center justify-center p-5 glow-border">
                <Image
                  src="/BAT_3D_Copper_Logo.png"
                  alt="Bib & Tucker Logo"
                  width={120}
                  height={120}
                  className="object-contain transition-transform duration-500 group-hover:scale-110"
                />
                <motion.div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: 'radial-gradient(circle at center, rgba(200, 90, 54, 0.1) 0%, transparent 70%)',
                  }}
                />
              </div>
              <motion.p
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                className="text-center text-sm mt-3 font-medium"
                style={{ color: '#C85A36' }}
              >
                Tennessee Bourbon
              </motion.p>
            </motion.div>

            {/* Decorative divider */}
            <div className="hidden md:block">
              <motion.div
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ duration: 1, delay: 1.6 }}
                className="w-px h-24 origin-top"
                style={{ background: 'linear-gradient(180deg, transparent, #BDA55D, transparent)' }}
              />
            </div>

            {/* Redemption Logo */}
            <motion.div
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="group cursor-pointer"
            >
              <div className="relative w-36 h-36 md:w-44 md:h-44 rounded-2xl glass-card flex items-center justify-center p-5 glow-border">
                <div className="text-center">
                  <span
                    className="text-2xl md:text-3xl font-bold tracking-wider"
                    style={{ color: '#FD9419' }}
                  >
                    REDEMPTION
                  </span>
                  <div className="mt-2 text-xs tracking-[0.3em] uppercase" style={{ color: '#6B6B6B' }}>
                    Whiskey
                  </div>
                </div>
                <motion.div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: 'radial-gradient(circle at center, rgba(253, 148, 25, 0.1) 0%, transparent 70%)',
                  }}
                />
              </div>
              <motion.p
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                className="text-center text-sm mt-3 font-medium"
                style={{ color: '#FD9419' }}
              >
                Rye Revival
              </motion.p>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 0.8 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-3"
        >
          <span className="text-xs uppercase tracking-[0.2em]" style={{ color: '#8B8B8B' }}>
            Scroll to Explore
          </span>
          <div
            className="w-7 h-12 rounded-full flex justify-center pt-3"
            style={{ border: '2px solid #C2B8A3' }}
          >
            <motion.div
              animate={{ y: [0, 16, 0], opacity: [1, 0.5, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: 'linear-gradient(180deg, #C85A36, #BDA55D)' }}
            />
          </div>
        </motion.div>
      </motion.div>

      {/* Bottom gradient fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{ background: 'linear-gradient(180deg, transparent, #FAFAF8)' }}
      />
    </section>
  );
}
