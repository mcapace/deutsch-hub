'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-warmWhite text-charcoal border-t border-charcoal/10" style={{ background: 'var(--color-bg-secondary)', borderColor: 'var(--color-border)' }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        {/* Logo - Centered */}
        <div className="flex justify-center mb-8">
          <Link href="#hero" className="inline-block focus:outline-none focus:ring-2 focus:ring-amber focus:ring-offset-2 rounded">
            <Image
              src="/images/logos/WA_BLUE-removebg-preview.png"
              alt="Whisky Advocate"
              width={200}
              height={60}
              className="h-12 md:h-16 w-auto object-contain"
              priority
              unoptimized={true}
            />
          </Link>
        </div>

        {/* Social Media Icons - Centered */}
        <div className="flex justify-center items-center gap-4 mb-8">
          <a
            href="https://www.facebook.com/whiskyadvocate"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-200"
            style={{ 
              background: 'var(--color-text-primary)',
              color: 'var(--color-bg-primary)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'var(--bt-rust)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'var(--color-text-primary)';
            }}
            aria-label="Facebook"
          >
            <Facebook size={18} />
          </a>
          <a
            href="https://x.com/whiskyadvocate"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-200"
            style={{ 
              background: 'var(--color-text-primary)',
              color: 'var(--color-bg-primary)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'var(--bt-rust)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'var(--color-text-primary)';
            }}
            aria-label="Twitter/X"
          >
            <Twitter size={18} />
          </a>
          <a
            href="https://www.instagram.com/whiskyadvocate"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-200"
            style={{ 
              background: 'var(--color-text-primary)',
              color: 'var(--color-bg-primary)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'var(--bt-rust)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'var(--color-text-primary)';
            }}
            aria-label="Instagram"
          >
            <Instagram size={18} />
          </a>
          <a
            href="https://www.linkedin.com/company/whisky-advocate"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-200"
            style={{ 
              background: 'var(--color-text-primary)',
              color: 'var(--color-bg-primary)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'var(--bt-rust)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'var(--color-text-primary)';
            }}
            aria-label="LinkedIn"
          >
            <Linkedin size={18} />
          </a>
        </div>

        {/* Divider with color accent */}
        <div className="border-t-2 mb-8" style={{ borderColor: 'rgba(200, 90, 54, 0.3)' }} />

        {/* Navigation Links - Three Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Column 1 */}
          <div className="space-y-2 text-center">
            <Link
              href="#bib-tucker"
              className="block transition-colors duration-200 font-serif text-sm font-medium"
              style={{ color: 'var(--color-text-secondary)' }}
              onMouseEnter={(e) => e.currentTarget.style.color = 'var(--bt-rust)'}
              onMouseLeave={(e) => e.currentTarget.style.color = 'var(--color-text-secondary)'}
            >
              Bib & Tucker
            </Link>
            <Link
              href="#redemption"
              className="block transition-colors duration-200 font-serif text-sm font-medium"
              style={{ color: 'var(--color-text-secondary)' }}
              onMouseEnter={(e) => e.currentTarget.style.color = 'var(--bt-rust)'}
              onMouseLeave={(e) => e.currentTarget.style.color = 'var(--color-text-secondary)'}
            >
              Redemption
            </Link>
            <Link
              href="#cocktails"
              className="block transition-colors duration-200 font-serif text-sm font-medium"
              style={{ color: 'var(--color-text-secondary)' }}
              onMouseEnter={(e) => e.currentTarget.style.color = 'var(--bt-rust)'}
              onMouseLeave={(e) => e.currentTarget.style.color = 'var(--color-text-secondary)'}
            >
              Holiday Cocktails
            </Link>
          </div>

          {/* Column 2 */}
          <div className="space-y-2 text-center">
            <Link
              href="#pairings"
              className="block transition-colors duration-200 font-serif text-sm font-medium"
              style={{ color: 'var(--color-text-secondary)' }}
              onMouseEnter={(e) => e.currentTarget.style.color = 'var(--bt-rust)'}
              onMouseLeave={(e) => e.currentTarget.style.color = 'var(--color-text-secondary)'}
            >
              Food Pairings
            </Link>
            <Link
              href="#articles"
              className="block transition-colors duration-200 font-serif text-sm font-medium"
              style={{ color: 'var(--color-text-secondary)' }}
              onMouseEnter={(e) => e.currentTarget.style.color = 'var(--bt-rust)'}
              onMouseLeave={(e) => e.currentTarget.style.color = 'var(--color-text-secondary)'}
            >
              Featured Stories
            </Link>
            <Link
              href="https://whiskyadvocate.com/about"
              target="_blank"
              rel="noopener noreferrer"
              className="block transition-colors duration-200 font-serif text-sm font-medium"
              style={{ color: 'var(--color-text-secondary)' }}
              onMouseEnter={(e) => e.currentTarget.style.color = 'var(--bt-rust)'}
              onMouseLeave={(e) => e.currentTarget.style.color = 'var(--color-text-secondary)'}
            >
              About Whisky Advocate
            </Link>
          </div>

          {/* Column 3 */}
          <div className="space-y-2 text-center">
            <Link
              href="https://whiskyadvocate.com/subscribe"
              target="_blank"
              rel="noopener noreferrer"
              className="block transition-colors duration-200 font-serif text-sm font-medium"
              style={{ color: 'var(--color-text-secondary)' }}
              onMouseEnter={(e) => e.currentTarget.style.color = 'var(--bt-rust)'}
              onMouseLeave={(e) => e.currentTarget.style.color = 'var(--color-text-secondary)'}
            >
              Subscribe
            </Link>
            <Link
              href="https://whiskyadvocate.com/privacy-policy"
              target="_blank"
              rel="noopener noreferrer"
              className="block transition-colors duration-200 font-serif text-sm font-medium"
              style={{ color: 'var(--color-text-secondary)' }}
              onMouseEnter={(e) => e.currentTarget.style.color = 'var(--bt-rust)'}
              onMouseLeave={(e) => e.currentTarget.style.color = 'var(--color-text-secondary)'}
            >
              Privacy Policy
            </Link>
            <Link
              href="https://whiskyadvocate.com/contact"
              target="_blank"
              rel="noopener noreferrer"
              className="block transition-colors duration-200 font-serif text-sm font-medium"
              style={{ color: 'var(--color-text-secondary)' }}
              onMouseEnter={(e) => e.currentTarget.style.color = 'var(--bt-rust)'}
              onMouseLeave={(e) => e.currentTarget.style.color = 'var(--color-text-secondary)'}
            >
              Contact Us
            </Link>
          </div>
        </div>

        {/* Age Verification Notice */}
        <div className="glass-card rounded-xl p-6 mb-8">
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

        {/* Bottom Divider */}
        <div className="border-t-2 pt-8" style={{ borderColor: 'rgba(200, 90, 54, 0.3)' }}>
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-center text-xs font-sans" style={{ color: 'var(--color-text-muted)' }}>
              © {currentYear} Whisky Advocate. All rights reserved.
            </p>
            <p className="text-center text-xs font-sans" style={{ color: 'var(--color-text-muted)' }}>
              Sponsored content presented in partnership with{' '}
              <span style={{ color: 'var(--bt-rust)' }}>Deutsch Family Wine & Spirits</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
