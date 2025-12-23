'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  const socialLinks = [
    { name: 'Twitter', icon: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z', href: 'https://x.com/whiskyadvocate' },
    { name: 'Instagram', icon: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z', href: 'https://www.instagram.com/whiskyadvocate' },
    { name: 'Facebook', icon: 'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z', href: 'https://www.facebook.com/whiskyadvocate' },
    { name: 'LinkedIn', icon: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z', href: 'https://www.linkedin.com/company/whisky-advocate' },
  ];

  const exploreLinks = [
    { name: 'Bib & Tucker', href: '#bib-tucker' },
    { name: 'Redemption', href: '#redemption' },
    { name: 'Holiday Hub', href: '#holiday-hub' },
    { name: 'Cocktails', href: '#cocktails' },
    { name: 'Food Pairings', href: '#pairings' },
  ];

  const legalLinks = [
    { name: 'Privacy Policy', href: 'https://whiskyadvocate.com/privacy-policy' },
    { name: 'Terms of Service', href: '#' },
    { name: 'About Whisky Advocate', href: 'https://whiskyadvocate.com/about' },
    { name: 'Subscribe', href: 'https://whiskyadvocate.com/subscribe' },
  ];

  return (
    <footer ref={ref} className="relative overflow-hidden" style={{ background: '#1A1410' }}>
      {/* Decorative gradient top */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, #BDA55D, transparent)' }}
      />

      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-1/2 -left-1/4 w-[600px] h-[600px] rounded-full opacity-10 blur-3xl"
          style={{ background: 'radial-gradient(circle, #C85A36, transparent 70%)' }}
        />
        <motion.div
          animate={{ x: [0, -20, 0], y: [0, 30, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -bottom-1/2 -right-1/4 w-[500px] h-[500px] rounded-full opacity-10 blur-3xl"
          style={{ background: 'radial-gradient(circle, #FD9419, transparent 70%)' }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 py-16 md:py-20">
        {/* Logo - Centered */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex justify-center mb-10"
        >
          <Link href="#hero" className="inline-block">
            <Image
              src="/images/logos/WA_BLUE-removebg-preview.png"
              alt="Whisky Advocate"
              width={200}
              height={60}
              className="h-12 md:h-16 w-auto object-contain brightness-0 invert opacity-90"
              priority
              unoptimized={true}
            />
          </Link>
        </motion.div>

        {/* Social Icons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="flex justify-center items-center gap-4 mb-10"
        >
          {socialLinks.map((social, i) => (
            <motion.a
              key={social.name}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 + i * 0.1, duration: 0.4 }}
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="w-10 h-10 rounded-full flex items-center justify-center transition-all"
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
              }}
              aria-label={social.name}
            >
              <svg className="w-4 h-4" style={{ color: '#BDA55D' }} fill="currentColor" viewBox="0 0 24 24">
                <path d={social.icon} />
              </svg>
            </motion.a>
          ))}
        </motion.div>

        {/* Divider */}
        <div className="border-t mb-10" style={{ borderColor: 'rgba(189, 165, 93, 0.2)' }} />

        {/* Navigation Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Explore Column */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <h4
              className="text-sm font-semibold uppercase tracking-wider mb-5"
              style={{ color: '#BDA55D' }}
            >
              Explore
            </h4>
            <ul className="space-y-3">
              {exploreLinks.map((link, i) => (
                <motion.li
                  key={link.name}
                  initial={{ opacity: 0, x: -10 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.3 + i * 0.05, duration: 0.4 }}
                >
                  <Link
                    href={link.href}
                    className="text-sm transition-colors inline-block"
                    style={{ color: 'rgba(255, 255, 255, 0.6)' }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = '#C85A36')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255, 255, 255, 0.6)')}
                  >
                    {link.name}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Resources Column */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <h4
              className="text-sm font-semibold uppercase tracking-wider mb-5"
              style={{ color: '#BDA55D' }}
            >
              Resources
            </h4>
            <ul className="space-y-3">
              {legalLinks.map((link, i) => (
                <motion.li
                  key={link.name}
                  initial={{ opacity: 0, x: -10 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.4 + i * 0.05, duration: 0.4 }}
                >
                  <Link
                    href={link.href}
                    target={link.href.startsWith('http') ? '_blank' : undefined}
                    rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="text-sm transition-colors"
                    style={{ color: 'rgba(255, 255, 255, 0.6)' }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = '#C85A36')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255, 255, 255, 0.6)')}
                  >
                    {link.name}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Brand Showcase - Takes 2 columns on large screens */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="lg:col-span-2 flex flex-col items-center lg:items-end justify-center"
          >
            <div className="flex items-center gap-6 mb-4">
              <span className="text-xl font-bold" style={{ color: '#C85A36' }}>
                Bib & Tucker
              </span>
              <div className="w-px h-6" style={{ background: 'rgba(189, 165, 93, 0.3)' }} />
              <span className="text-xl font-bold" style={{ color: '#FD9419' }}>
                Redemption
              </span>
            </div>
            <p className="text-xs text-center lg:text-right" style={{ color: 'rgba(255, 255, 255, 0.4)' }}>
              Premium American Whiskey
            </p>
          </motion.div>
        </div>

        {/* Age verification notice */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="rounded-2xl p-6 mb-10"
          style={{
            background: 'linear-gradient(135deg, rgba(200, 90, 54, 0.1), rgba(189, 165, 93, 0.05))',
            border: '1px solid rgba(189, 165, 93, 0.2)',
          }}
        >
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
            <div
              className="flex-shrink-0 w-14 h-14 rounded-xl flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, rgba(200, 90, 54, 0.2), rgba(189, 165, 93, 0.1))' }}
            >
              <span className="font-bold text-lg" style={{ color: '#BDA55D' }}>21+</span>
            </div>
            <div>
              <p className="font-semibold mb-1" style={{ color: '#FFFFFF' }}>
                Please Drink Responsibly
              </p>
              <p className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                This website is intended for adults of legal drinking age. Please enjoy
                our content and products responsibly. Do not share with anyone under the
                legal drinking age.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Bottom bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="pt-8"
          style={{ borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.4)' }}>
              &copy; {currentYear} Whisky Advocate. All rights reserved.
            </p>
            <p className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.4)' }}>
              Sponsored content in partnership with{' '}
              <span style={{ color: '#BDA55D' }}>Deutsch Family Wine & Spirits</span>
            </p>
          </div>
        </motion.div>
      </div>

      {/* Decorative bottom gradient */}
      <div
        className="h-1"
        style={{ background: 'linear-gradient(90deg, #C85A36, #BDA55D, #FD9419, #BDA55D, #C85A36)' }}
      />
    </footer>
  );
}
