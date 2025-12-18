'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative border-t" style={{ background: 'var(--color-bg-secondary)', borderColor: 'var(--color-border)' }}>
      {/* Decorative gradient */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--bt-rust)]/50 to-transparent" />

      <div className="container-custom py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <Link href="#hero" className="inline-flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: 'linear-gradient(135deg, var(--bt-rust), var(--bt-copper))' }}>
                <span className="font-bold text-lg" style={{ color: 'var(--color-text-primary)' }}>WA</span>
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-semibold" style={{ color: 'var(--color-text-primary)' }}>WHISKY ADVOCATE</span>
                <span className="text-xs" style={{ color: 'var(--bt-rust)' }}>Deutsch Spirits Collection</span>
              </div>
            </Link>
            <p className="max-w-md mb-6" style={{ color: 'var(--color-text-secondary)' }}>
              Whisky Advocate is the world's leading whisky authority, providing expert
              reviews, ratings, and insights into the finest spirits from around the globe.
            </p>
            <div className="flex items-center gap-4">
              {/* Social icons placeholders */}
              {['twitter', 'instagram', 'facebook', 'youtube'].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="w-10 h-10 rounded-full border flex items-center justify-center transition-all shadow-sm hover:shadow-md"
                  style={{ 
                    background: 'var(--color-bg-card-solid)',
                    borderColor: 'var(--color-border)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'var(--bt-rust)';
                    e.currentTarget.style.background = 'var(--color-bg-primary)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'var(--color-border)';
                    e.currentTarget.style.background = 'var(--color-bg-card-solid)';
                  }}
                  aria-label={social}
                >
                  <div className="w-4 h-4 rounded" style={{ background: 'var(--bt-rust)' }} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider mb-4" style={{ color: 'var(--color-text-primary)' }}>
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
                    className="transition-colors text-sm"
                    style={{ color: 'var(--color-text-secondary)' }}
                    onMouseEnter={(e) => e.currentTarget.style.color = 'var(--bt-rust)'}
                    onMouseLeave={(e) => e.currentTarget.style.color = 'var(--color-text-secondary)'}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider mb-4" style={{ color: 'var(--color-text-primary)' }}>
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
                    className="transition-colors text-sm"
                    style={{ color: 'var(--color-text-secondary)' }}
                    onMouseEnter={(e) => e.currentTarget.style.color = 'var(--bt-rust)'}
                    onMouseLeave={(e) => e.currentTarget.style.color = 'var(--color-text-secondary)'}
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
            <div className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center" style={{ background: 'rgba(200, 90, 54, 0.15)' }}>
              <span className="font-bold text-lg" style={{ color: 'var(--bt-rust)' }}>21+</span>
            </div>
            <div>
              <p className="font-medium mb-1" style={{ color: 'var(--color-text-primary)' }}>
                Please Drink Responsibly
              </p>
              <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                This website is intended for adults of legal drinking age. Please enjoy
                our content and products responsibly. Do not share with anyone under the
                legal drinking age.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t" style={{ borderColor: 'var(--color-border)' }}>
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
              &copy; {currentYear} Whisky Advocate. All rights reserved.
            </p>
            <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
              Sponsored content presented in partnership with{' '}
              <span style={{ color: 'var(--bt-rust)' }}>Deutsch Family Wine & Spirits</span>
            </p>
          </div>
        </div>
      </div>

      {/* Decorative bottom gradient */}
      <div className="h-1" style={{ background: 'linear-gradient(90deg, var(--bt-cream), var(--bt-rust), var(--redemption-cream))' }} />
    </footer>
  );
}
