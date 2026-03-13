'use client';

import Image from 'next/image';
import Link from 'next/link';

const exploreLinks = [
  { name: 'Bib & Tucker', href: '#brands' },
  { name: 'Redemption', href: '#brands' },
  { name: 'Cocktail Recipes', href: '#cocktails' },
  { name: 'Food Pairings', href: '#pairings' },
];

const resourceLinks = [
  { name: 'Whisky Advocate', href: 'https://whiskyadvocate.com', external: true },
  { name: 'About', href: 'https://whiskyadvocate.com/about', external: true },
  { name: 'Subscribe', href: 'https://whiskyadvocate.com/subscribe', external: true },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-ink text-white overflow-hidden">
      <div className="h-px bg-amber/40" />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16 lg:py-20">
        <div className="grid md:grid-cols-12 gap-12 md:gap-8 mb-12">
          <div className="md:col-span-5" data-reveal>
            <Image
              src="/images/logos/WA_WHITE-removebg-preview.png"
              alt="Whisky Advocate"
              width={180}
              height={54}
              className="h-10 w-auto object-contain opacity-90 mb-6"
              unoptimized
            />
            <p className="font-display italic text-[15px] leading-relaxed max-w-sm mb-8 text-white/80">
              Discover the art of American whiskey through the curated collection of Bib & Tucker and Redemption, presented by Whisky Advocate.
            </p>
            <div className="flex items-center gap-6">
              <span className="font-display text-2xl text-amber">Bib & Tucker</span>
              <span className="w-px h-6 bg-white/20" />
              <span className="font-display text-2xl text-amber">Redemption</span>
            </div>
          </div>
          <div className="hidden md:block md:col-span-1" />
          <div className="md:col-span-3" data-reveal>
            <h4 className="text-[11px] tracking-[0.3em] uppercase text-amber mb-6">Explore</h4>
            <ul className="space-y-4">
              {exploreLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-[15px] text-white/75 hover:text-white transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="md:col-span-3" data-reveal>
            <h4 className="text-[11px] tracking-[0.3em] uppercase text-amber mb-6">Resources</h4>
            <ul className="space-y-4">
              {resourceLinks.map((link) => (
                <li key={link.name}>
                  {link.external ? (
                    <a href={link.href} target="_blank" rel="noopener noreferrer" className="text-[15px] text-white/75 hover:text-white transition-colors">
                      {link.name}
                    </a>
                  ) : (
                    <Link href={link.href} className="text-[15px] text-white/75 hover:text-white transition-colors">
                      {link.name}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border border-white/10 rounded p-6 lg:p-8 mb-12" data-reveal>
          <div className="flex flex-col md:flex-row md:items-center gap-6">
            <div className="flex-shrink-0">
              <span className="inline-flex items-center justify-center w-14 h-14 border border-amber text-amber font-display text-xl">21+</span>
            </div>
            <div>
              <h5 className="text-white font-medium mb-1">Please Drink Responsibly</h5>
              <p className="text-sm leading-relaxed text-white/80">
                This website is intended for adults of legal drinking age. Enjoy our content and products responsibly. Do not share with anyone under the legal drinking age.
              </p>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4" data-reveal>
          <p className="text-[13px] text-white/80">&copy; {year} Whisky Advocate. All rights reserved.</p>
          <p className="text-[13px] text-white/80">
            Sponsored content in partnership with <span className="text-amber">Deutsch Family Wine & Spirits</span>
          </p>
        </div>
      </div>
      <div className="h-1 bg-gradient-to-r from-copper to-amber" />
    </footer>
  );
}
