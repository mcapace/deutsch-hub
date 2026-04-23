'use client';

import Image from 'next/image';
import Link from 'next/link';
import { BIB_TUCKER_CLASSIC_SIX_BOTTLE, REDEMPTION_CORE_TRIO_BOTTLES } from '@/lib/brand-images';

export default function Hero() {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 min-h-screen pt-[68px]">
      <div className="bg-white flex flex-col justify-center px-5 sm:px-8 lg:px-16 py-12 sm:py-16 order-2 lg:order-1" data-reveal>
        <div className="h-px w-12 mb-6" style={{ background: 'var(--rule)' }} />
        <p className="text-muted text-[9px] tracking-[0.28em] uppercase mb-4">Whisky Advocate Presents</p>
        <h1 className="font-display text-[clamp(2.5rem,6vw,5.375rem)] leading-tight mb-6 text-ink">
          <span className="italic text-copper">The Art of</span>
          <br />
          American
          <br />
          Whiskey
        </h1>
        <div className="w-12 h-px my-6" style={{ background: 'var(--rule)' }} />
        <p className="text-muted text-lg max-w-md mb-10">
          Discover Bib & Tucker and Redemption — Tennessee bourbon and American rye, crafted for the moment.
        </p>
        <div className="flex flex-wrap gap-3 sm:gap-4">
          <Link
            href="#collection"
            className="bg-ink text-white px-6 sm:px-8 py-3 min-h-[44px] inline-flex items-center justify-center text-[9px] tracking-[0.24em] uppercase hover:bg-copper transition-colors touch-manipulation"
          >
            Explore Collection
          </Link>
          <Link
            href="#cocktails"
            className="text-walnut text-[9px] tracking-[0.22em] uppercase after:content-['→'] after:ml-1 hover:text-copper transition-colors inline-flex items-center min-h-[44px] py-3 touch-manipulation"
          >
            Cocktail Recipes
          </Link>
        </div>
      </div>

      <div className="bg-warm relative flex items-end justify-center px-4 sm:px-8 py-12 sm:py-16 lg:py-24 order-1 lg:order-2 min-h-[50vh] lg:min-h-0 overflow-hidden" data-reveal>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_60%,rgba(196,135,62,0.08),transparent)] pointer-events-none" />
        <div className="relative grid grid-cols-2 items-end justify-items-center gap-3 sm:gap-5 lg:gap-8 w-full max-w-3xl mx-auto px-3 sm:px-6">
          <div className="w-full min-w-0 flex items-end justify-center h-[min(40vh,420px)] sm:h-[min(44vh,450px)] lg:h-[min(48vh,480px)] drop-shadow-2xl">
            <Image
              src={BIB_TUCKER_CLASSIC_SIX_BOTTLE}
              alt="Bib & Tucker Classic Six"
              width={400}
              height={900}
              className="h-full w-auto max-h-full max-w-[min(220px,78%)] object-contain object-bottom [transform:rotate(-1.5deg)]"
              unoptimized
            />
          </div>
          <div className="w-full min-w-0 flex items-end justify-center h-[min(40vh,420px)] sm:h-[min(44vh,450px)] lg:h-[min(48vh,480px)] drop-shadow-2xl">
            <Image
              src={REDEMPTION_CORE_TRIO_BOTTLES}
              alt="Redemption Rye, Bourbon, and High Rye Bourbon"
              width={900}
              height={500}
              className="h-full w-auto max-h-full max-w-full object-contain object-bottom [transform:rotate(1.5deg)]"
              unoptimized
            />
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 grid grid-cols-2 border-t border-white/20 py-3 sm:py-4 px-4 sm:px-6 bg-ink">
          <div className="text-center">
            <p className="font-display text-white text-sm">Bib & Tucker</p>
            <p className="text-white/85 text-[8px] sm:text-[9px] tracking-[0.18em] sm:tracking-[0.2em] uppercase leading-snug px-1">
              Tennessee Small Batch Bourbon Whiskey
            </p>
          </div>
          <div className="text-center border-l border-white/20">
            <p className="font-display text-white text-sm">Redemption</p>
            <p className="text-white/85 text-[9px] tracking-[0.2em] uppercase">Rye-Built Whiskeys</p>
          </div>
        </div>
      </div>
    </section>
  );
}
