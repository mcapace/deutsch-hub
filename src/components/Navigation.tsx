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
    { name: 'Home', href: '#hero' },
    { name: 'Bib & Tucker', href: '#bib-tucker' },
    { name: 'Redemption', href: '#redemption' },
    { name: 'Cocktails', href: '#cocktails' },
    { name: 'Pairings', href: '#pairings' },
    { name: 'Stories', href: '#articles' },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'backdrop-blur-xl shadow-md shadow-black/5 border-b'
            : 'bg-transparent'
        }`}
        style={isScrolled ? {
          background: 'rgba(250, 247, 242, 0.98)',
          backdropFilter: 'blur(12px)',
          borderColor: 'rgba(45, 41, 38, 0.15)',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
        } : {
          backdropFilter: 'blur(12px)',
        }}
      >
        <div className="container-custom">
          <div className="flex items-center justify-between h-20">
            {/* Whisky Advocate Logo */}
            <Link 
              href="#hero" 
              className="flex items-center focus:outline-none focus:ring-2 focus:ring-amber focus:ring-offset-2 rounded flex-shrink-0 group"
            >
              <Image
                src="/WA_BLUE-removebg-preview.png"
                alt="Whisky Advocate"
                width={200}
                height={60}
                className="h-8 md:h-10 lg:h-12 w-auto object-contain transition-opacity duration-300 group-hover:opacity-80"
                priority
                unoptimized={false}
                onError={(e) => {
                  console.error('Navigation WA logo failed to load');
                  e.currentTarget.style.display = 'none';
                }}
              />
              <span className="ml-3 text-xs font-medium tracking-wide opacity-70 group-hover:opacity-100 transition-opacity" style={{ color: 'var(--color-text-muted)' }}>
                Deutsch Spirits Collection
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center flex-1 justify-center px-6" aria-label="Main navigation">
              {navItems.map((item, index) => (
                <div key={item.name} className="flex items-center">
                  <Link
                    href={item.href}
                    className="px-3 py-2 font-serif text-sm font-semibold tracking-wide whitespace-nowrap transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-amber focus:ring-offset-2 rounded"
                    style={{ color: 'var(--color-text-muted)' }}
                    onMouseEnter={(e) => e.currentTarget.style.color = 'var(--bt-rust)'}
                    onMouseLeave={(e) => e.currentTarget.style.color = 'var(--color-text-muted)'}
                  >
                    {item.name}
                  </Link>
                  {index < navItems.length - 1 && (
                    <span className="mx-2 text-[9px] leading-none opacity-30" style={{ color: 'var(--bt-rust)' }}>◆</span>
                  )}
                </div>
              ))}
            </nav>

            {/* Right Side Actions */}
            <div className="flex items-center gap-3 flex-shrink-0">
              {/* Mobile Navigation Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden relative w-10 h-10 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-amber focus:ring-offset-2 rounded"
                aria-label="Toggle menu"
              >
                <div className="flex flex-col gap-1.5">
                  <motion.span
                    animate={{
                      rotate: isMobileMenuOpen ? 45 : 0,
                      y: isMobileMenuOpen ? 6 : 0,
                    }}
                    className="w-6 h-0.5 origin-center"
                    style={{ background: 'var(--bt-rust)' }}
                  />
                  <motion.span
                    animate={{ opacity: isMobileMenuOpen ? 0 : 1 }}
                    className="w-6 h-0.5"
                    style={{ background: 'var(--bt-rust)' }}
                  />
                  <motion.span
                    animate={{
                      rotate: isMobileMenuOpen ? -45 : 0,
                      y: isMobileMenuOpen ? -6 : 0,
                    }}
                    className="w-6 h-0.5 origin-center"
                    style={{ background: 'var(--bt-rust)' }}
                  />
                </div>
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <div
              className="absolute inset-0 bg-black/20 backdrop-blur-sm"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="absolute right-0 top-0 bottom-0 w-72 bg-white border-l shadow-xl pt-24 px-6"
              style={{ borderColor: 'var(--color-border)' }}
            >
              <div className="flex flex-col gap-6">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="text-lg font-medium transition-colors font-serif"
                      style={{ color: 'var(--color-text-primary)' }}
                      onMouseEnter={(e) => e.currentTarget.style.color = 'var(--bt-rust)'}
                      onMouseLeave={(e) => e.currentTarget.style.color = 'var(--color-text-primary)'}
                    >
                      {item.name}
                    </Link>
                  </motion.div>
                ))}
              </div>

              {/* Decorative element */}
              <div className="absolute bottom-12 left-6 right-6">
                <div className="h-px bg-gradient-to-r from-transparent via-[var(--bt-rust)]/50 to-transparent" />
                <p className="text-xs text-center mt-4" style={{ color: 'var(--color-text-light)' }}>
                  Premium Spirits by Deutsch Family
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
