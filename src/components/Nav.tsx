'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { STORE_BIB_TUCKER, STORE_REDEMPTION, STORE_HOME } from '@/lib/store-links';

export default function Nav() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 h-[68px] bg-white/95 backdrop-blur border-b border-rule flex items-center justify-between px-6">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/images/logos/WA_BLUE-removebg-preview.png"
              alt="Whisky Advocate"
              width={120}
              height={36}
              className="h-8 w-auto"
              unoptimized
            />
          </Link>
          <span className="text-muted text-[9px] tracking-[0.22em] uppercase hidden sm:inline">|</span>
          <span className="text-muted text-[9px] tracking-[0.22em] uppercase hidden sm:inline">Deutsch Family Wine & Spirits</span>
        </div>

        <div className="hidden md:flex items-center gap-8">
          <Link href="#brands" className="text-muted hover:text-copper text-[10px] tracking-[0.18em] uppercase transition-colors">Brands</Link>
          <Link href="#collection" className="text-muted hover:text-copper text-[10px] tracking-[0.18em] uppercase transition-colors">Collection</Link>
          <Link href="#cocktails" className="text-muted hover:text-copper text-[10px] tracking-[0.18em] uppercase transition-colors">Cocktails</Link>
          <Link href="#pairings" className="text-muted hover:text-copper text-[10px] tracking-[0.18em] uppercase transition-colors">Pairings</Link>
        </div>

        <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
          <a
            href={STORE_BIB_TUCKER}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted hover:text-copper text-[8px] tracking-[0.14em] uppercase transition-colors hidden lg:inline"
          >
            Shop Bib &amp; Tucker
          </a>
          <a
            href={STORE_REDEMPTION}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted hover:text-copper text-[8px] tracking-[0.14em] uppercase transition-colors hidden lg:inline"
          >
            Shop Redemption
          </a>
          <a
            href={STORE_HOME}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-ink text-white px-4 sm:px-6 py-2.5 text-[8px] sm:text-[9px] tracking-[0.2em] sm:tracking-[0.24em] uppercase hover:bg-copper transition-colors"
          >
            Shop Store
          </a>
          <button
            type="button"
            className="md:hidden w-10 h-10 flex flex-col justify-center gap-1.5"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Menu"
          >
            <span className="w-6 h-px bg-ink block" />
            <span className="w-6 h-px bg-ink block" />
            <span className="w-6 h-px bg-ink block" />
          </button>
        </div>
      </nav>

      {mobileOpen && (
        <div className="fixed inset-0 z-40 md:hidden pt-[68px] bg-white">
          <div className="flex flex-col p-6 gap-4">
            <Link href="#brands" className="text-muted hover:text-copper text-[10px] tracking-[0.18em] uppercase" onClick={() => setMobileOpen(false)}>Brands</Link>
            <Link href="#collection" className="text-muted hover:text-copper text-[10px] tracking-[0.18em] uppercase" onClick={() => setMobileOpen(false)}>Collection</Link>
            <Link href="#cocktails" className="text-muted hover:text-copper text-[10px] tracking-[0.18em] uppercase" onClick={() => setMobileOpen(false)}>Cocktails</Link>
            <Link href="#pairings" className="text-muted hover:text-copper text-[10px] tracking-[0.18em] uppercase" onClick={() => setMobileOpen(false)}>Pairings</Link>
            <a href={STORE_BIB_TUCKER} target="_blank" rel="noopener noreferrer" className="text-muted hover:text-copper text-[10px] tracking-[0.18em] uppercase border border-rule px-4 py-2 w-fit">Shop Bib &amp; Tucker ↗</a>
            <a href={STORE_REDEMPTION} target="_blank" rel="noopener noreferrer" className="text-muted hover:text-copper text-[10px] tracking-[0.18em] uppercase border border-rule px-4 py-2 w-fit">Shop Redemption ↗</a>
            <a href={STORE_HOME} target="_blank" rel="noopener noreferrer" className="bg-ink text-white px-6 py-3 text-[9px] tracking-[0.24em] uppercase w-fit">Whisky Advocate Store</a>
          </div>
        </div>
      )}
    </>
  );
}
