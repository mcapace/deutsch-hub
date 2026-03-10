'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  const exploreLinks = [
    { name: 'Bib & Tucker', href: '#bib-tucker' },
    { name: 'Redemption', href: '#redemption' },
    { name: 'Cocktail Recipes', href: '#cocktails' },
    { name: 'Food Pairings', href: '#pairings' },
  ];

  const resourceLinks = [
    { name: 'Whisky Advocate', href: 'https://whiskyadvocate.com', external: true },
    { name: 'About', href: 'https://whiskyadvocate.com/about', external: true },
    { name: 'Subscribe', href: 'https://whiskyadvocate.com/subscribe', external: true },
  ];

  return (
    <footer
      ref={ref}
      className="relative text-white overflow-hidden"
      style={{ backgroundColor: 'var(--bt-black)' }}
    >
      {/* Top accent line */}
      <div className="h-[1px] bg-gradient-to-r from-transparent via-[var(--bt-gold)]/40 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20 md:py-24">
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-12 gap-12 md:gap-8 mb-16">
          {/* Brand Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="md:col-span-5"
          >
            <Image
              src="/images/logos/WA_BLUE-removebg-preview.png"
              alt="Whisky Advocate"
              width={180}
              height={54}
              className="h-10 w-auto object-contain brightness-0 invert opacity-80 mb-6"
              unoptimized={true}
            />
            <p className="text-[15px] leading-relaxed max-w-sm mb-8" style={{ color: 'rgba(255,255,255,0.5)' }}>
              Discover the art of American whiskey through the curated collection
              of Bib & Tucker and Redemption, presented by Whisky Advocate.
            </p>
            <div className="flex items-center gap-6">
              <span className="text-2xl font-serif" style={{ color: 'var(--bt-rust)' }}>Bib & Tucker</span>
              <span className="w-[1px] h-6" style={{ background: 'rgba(255,255,255,0.2)' }} />
              <span className="text-2xl font-serif" style={{ color: 'var(--redemption-orange)' }}>Redemption</span>
            </div>
          </motion.div>

          {/* Spacer */}
          <div className="hidden md:block md:col-span-1" />

          {/* Explore Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="md:col-span-3"
          >
            <h4 className="text-[11px] tracking-[0.3em] uppercase mb-6" style={{ color: 'var(--bt-gold)' }}>
              Explore
            </h4>
            <ul className="space-y-4">
              {exploreLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-[15px] transition-colors duration-300 hover:text-white"
                    style={{ color: 'rgba(255,255,255,0.5)' }}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Resources Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="md:col-span-3"
          >
            <h4 className="text-[11px] tracking-[0.3em] uppercase mb-6" style={{ color: 'var(--bt-gold)' }}>
              Resources
            </h4>
            <ul className="space-y-4">
              {resourceLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    target={link.external ? '_blank' : undefined}
                    rel={link.external ? 'noopener noreferrer' : undefined}
                    className="text-[15px] transition-colors duration-300 hover:text-white"
                    style={{ color: 'rgba(255,255,255,0.5)' }}
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Responsible Drinking Notice */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="border rounded-sm p-6 md:p-8 mb-16"
          style={{ borderColor: 'rgba(255,255,255,0.1)' }}
        >
          <div className="flex flex-col md:flex-row md:items-center gap-6">
            <div className="flex-shrink-0">
              <span
                className="inline-flex items-center justify-center w-14 h-14 border font-serif text-xl"
                style={{ borderColor: 'var(--bt-gold)', color: 'var(--bt-gold)' }}
              >
                21+
              </span>
            </div>
            <div>
              <h5 className="text-white font-medium mb-1">Please Drink Responsibly</h5>
              <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.4)' }}>
                This website is intended for adults of legal drinking age. Enjoy our content
                and products responsibly. Do not share with anyone under the legal drinking age.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="pt-8 border-t"
          style={{ borderColor: 'rgba(255,255,255,0.1)' }}
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <p className="text-[13px]" style={{ color: 'rgba(255,255,255,0.3)' }}>
              &copy; {currentYear} Whisky Advocate. All rights reserved.
            </p>
            <p className="text-[13px]" style={{ color: 'rgba(255,255,255,0.3)' }}>
              Sponsored content in partnership with{' '}
              <span style={{ color: 'var(--bt-gold)' }}>Deutsch Family Wine & Spirits</span>
            </p>
          </div>
        </motion.div>
      </div>

      {/* Bottom accent */}
      <div
        className="h-1"
        style={{ background: 'linear-gradient(to right, var(--bt-rust), var(--bt-gold), var(--redemption-orange))' }}
      />
    </footer>
  );
}
