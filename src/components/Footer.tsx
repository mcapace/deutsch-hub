'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-[#F5F3F0] border-t border-[#E5E3DD]">
      {/* Decorative gradient */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C4956A]/50 to-transparent" />

      <div className="container-custom py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <Link href="#hero" className="inline-flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#C4956A] to-[#A67B52] flex items-center justify-center">
                <span className="text-[#0D0D0D] font-bold text-lg">WA</span>
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-[#1A1A1A]">WHISKY ADVOCATE</span>
                <span className="text-xs text-[#C4956A]">Deutsch Spirits Collection</span>
              </div>
            </Link>
            <p className="text-[#4A4A4A] max-w-md mb-6">
              Whisky Advocate is the world's leading whisky authority, providing expert
              reviews, ratings, and insights into the finest spirits from around the globe.
            </p>
            <div className="flex items-center gap-4">
              {/* Social icons placeholders */}
              {['twitter', 'instagram', 'facebook', 'youtube'].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="w-10 h-10 rounded-full bg-white border border-[#E5E3DD] flex items-center justify-center hover:border-[#C4956A] hover:bg-[#FAFAF8] transition-all shadow-sm hover:shadow-md"
                  aria-label={social}
                >
                  <div className="w-4 h-4 rounded bg-[#C4956A]/30" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-sm font-semibold text-[#1A1A1A] uppercase tracking-wider mb-4">
              Explore
            </h4>
            <ul className="space-y-3">
              {[
                { name: 'Bib & Tucker', href: '#bib-tucker' },
                { name: 'Redemption', href: '#redemption' },
                { name: 'Featured Stories', href: '#articles' },
                { name: 'About Whisky Advocate', href: '#' },
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-[#4A4A4A] hover:text-[#C4956A] transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-sm font-semibold text-[#1A1A1A] uppercase tracking-wider mb-4">
              Legal
            </h4>
            <ul className="space-y-3">
              {[
                { name: 'Privacy Policy', href: '#' },
                { name: 'Terms of Service', href: '#' },
                { name: 'Cookie Policy', href: '#' },
                { name: 'Accessibility', href: '#' },
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-[#4A4A4A] hover:text-[#C4956A] transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Age verification notice */}
        <div className="glass-card rounded-xl p-6 mb-12">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#C4956A]/20 flex items-center justify-center">
              <span className="text-[#C4956A] font-bold text-lg">21+</span>
            </div>
            <div>
              <p className="text-[#1A1A1A] font-medium mb-1">
                Please Drink Responsibly
              </p>
              <p className="text-sm text-[#4A4A4A]">
                This website is intended for adults of legal drinking age. Please enjoy
                our content and products responsibly. Do not share with anyone under the
                legal drinking age.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-[#E5E3DD]">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-[#6B6B6B]">
              &copy; {currentYear} Whisky Advocate. All rights reserved.
            </p>
            <p className="text-sm text-[#6B6B6B]">
              Sponsored content presented in partnership with{' '}
              <span className="text-[#C4956A]">Deutsch Family Wine & Spirits</span>
            </p>
          </div>
        </div>
      </div>

      {/* Decorative bottom gradient */}
      <div className="h-1 bg-gradient-to-r from-[#E8D4B8] via-[#C4956A] to-[#FCD9A0]" />
    </footer>
  );
}
