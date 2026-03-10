'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Bib & Tucker', href: '#bib-tucker' },
    { name: 'Redemption', href: '#redemption' },
    { name: 'Cocktails', href: '#cocktails' },
    { name: 'Pairings', href: '#pairings' },
  ];

  return (
    <>
      {/* Ribbon / Sponsored Content - dark */}
      <div
        className="fixed top-0 left-0 right-0 z-50 py-2 text-center"
        style={{ backgroundColor: '#1E1408' }}
      >
        <p className="text-[10px] md:text-xs tracking-[0.15em] uppercase" style={{ color: 'rgba(255,255,255,0.55)' }}>
          Sponsored Content from Deutsch Family Wine & Spirits
        </p>
      </div>

      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled ? 'py-4' : 'py-6'
        }`}
        style={{
          top: '32px',
          background: 'rgba(253,250,245,0.97)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid #D8CEBC',
        }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo - dark, no invert */}
            <Link href="#hero" className="flex-shrink-0 group">
              <Image
                src="/images/logos/WA_BLUE-removebg-preview.png"
                alt="Whisky Advocate"
                width={160}
                height={48}
                className="h-8 md:h-10 w-auto object-contain transition-opacity duration-300 group-hover:opacity-70"
                priority
                unoptimized={true}
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1" aria-label="Main navigation">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="px-5 py-2 text-[13px] tracking-[0.05em] transition-colors duration-300 hover:text-[var(--copper)]"
                  style={{ color: 'var(--fog)' }}
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            {/* CTA Button - copper */}
            <a
              href="#cocktails"
              className="hidden lg:inline-flex px-5 py-2.5 text-sm font-medium tracking-wide rounded-sm transition-colors hover:opacity-90"
              style={{ backgroundColor: '#A0622A', color: '#fff' }}
            >
              Cocktails
            </a>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden relative w-10 h-10 flex items-center justify-center"
              aria-label="Toggle menu"
            >
              <div className="flex flex-col gap-1.5">
                <motion.span
                  animate={{
                    rotate: isMobileMenuOpen ? 45 : 0,
                    y: isMobileMenuOpen ? 6 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                  className="w-6 h-[1.5px] origin-center"
                  style={{ backgroundColor: 'var(--ink)' }}
                />
                <motion.span
                  animate={{ opacity: isMobileMenuOpen ? 0 : 1 }}
                  transition={{ duration: 0.3 }}
                  className="w-6 h-[1.5px]"
                  style={{ backgroundColor: 'var(--ink)' }}
                />
                <motion.span
                  animate={{
                    rotate: isMobileMenuOpen ? -45 : 0,
                    y: isMobileMenuOpen ? -6 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                  className="w-6 h-[1.5px] origin-center"
                  style={{ backgroundColor: 'var(--ink)' }}
                />
              </div>
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 lg:hidden"
            style={{ top: '32px' }}
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 backdrop-blur-sm"
              style={{ backgroundColor: 'rgba(30, 20, 8, 0.2)' }}
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Menu Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="absolute right-0 top-0 bottom-0 w-full max-w-sm shadow-2xl"
              style={{ background: 'var(--white)', boxShadow: 'var(--shadow-elevated)' }}
            >
              <div className="flex flex-col h-full pt-24 px-8 pb-12">
                {/* Nav Links */}
                <div className="flex-1">
                  {navItems.map((item, index) => (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + index * 0.05 }}
                    >
                        <Link
                        href={item.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="block py-4 text-2xl font-serif transition-colors border-b hover:[color:var(--bt-rust)]"
                        style={{ color: 'var(--ink)', borderColor: 'var(--rule)' }}
                      >
                        {item.name}
                      </Link>
                    </motion.div>
                  ))}
                </div>

                {/* Footer */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="pt-8 border-t"
              style={{ borderColor: 'var(--rule)' }}
                >
                  <p className="text-xs tracking-[0.2em] uppercase" style={{ color: 'var(--fog)' }}>
                    Deutsch Family Spirits
                  </p>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
