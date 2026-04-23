'use client';

import Image from 'next/image';
import Link from 'next/link';
import { STORE_BIB_TUCKER, STORE_REDEMPTION } from '@/lib/store-links';
import {
  BIB_TUCKER_CLASSIC_SIX_BOTTLE,
  BIB_TUCKER_DOUBLE_CHAR_LOGO,
  REDEMPTION_CORE_TRIO_BOTTLES,
  REDEMPTION_LOGO,
} from '@/lib/brand-images';

export default function Brands() {
  return (
    <section className="bg-white py-20 lg:py-28" id="brands">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <header className="mb-16" data-reveal>
          <span className="font-display text-mist text-sm block mb-2">01</span>
          <h2 className="font-display text-4xl lg:text-5xl text-ink mb-4">The Brands</h2>
          <p className="text-muted max-w-xl">Two houses. One standard: exceptional American whiskey.</p>
        </header>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 lg:items-stretch">
          <article
            className="border border-rule p-8 lg:p-10 hover:bg-warm transition-colors relative flex flex-col h-full min-h-0"
            data-reveal
          >
            <span className="font-display text-mist text-6xl lg:text-7xl absolute top-6 right-6 opacity-40 pointer-events-none">
              01
            </span>
            <div className="relative z-10 flex flex-col flex-1 min-h-0 items-stretch">
              <div className="mb-6 self-start w-fit max-w-full shrink-0">
                <Image
                  src="/BAT_3D_Copper_Logo.png"
                  alt="Bib & Tucker"
                  width={240}
                  height={96}
                  className="block h-14 sm:h-16 w-auto max-w-[min(240px,85vw)] object-contain object-center"
                  unoptimized
                />
              </div>
              <h3 className="font-display text-2xl lg:text-3xl text-ink mb-4">
                Where Bold <span className="italic text-copper">&amp; Refined</span> Come Together
              </h3>
              <p className="text-muted leading-relaxed">
                Our name, bottle, and small batch approach were inspired by the turn of the century in America. A time of unprecedented progress and adventure when all bourbon was small batch and the time was taken to break out the best and raise a glass. Inspired by that time, we create award-winning small batch bourbon following the Lincoln County Process. Bold and refined, Bib &amp; Tucker is the perfect companion on your life&apos;s grand adventure.
              </p>
              <div className="flex-1 min-h-4" aria-hidden />
              <div className="flex flex-wrap items-center gap-4 pt-8">
                <Link href="#collection" className="text-walnut text-[9px] tracking-[0.22em] uppercase after:content-['→'] after:ml-1 hover:text-copper transition-colors">
                  Explore Bib & Tucker
                </Link>
                <a href={STORE_BIB_TUCKER} target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-4 py-2.5 bg-copper text-white text-[9px] tracking-[0.18em] uppercase hover:opacity-90 transition-opacity">
                  Shop collection ↗
                </a>
              </div>
            </div>
            {/* Expression row: shared baseline + cap height so columns align */}
            <div className="relative z-10 mt-10 grid grid-cols-3 gap-3 sm:gap-4 max-w-xl mx-auto w-full">
              <div className="flex flex-col items-center text-center min-h-[220px] sm:min-h-[240px] justify-end">
                <div className="flex flex-1 w-full min-h-[140px] items-end justify-center [&_img]:max-w-full">
                  <Image
                    src={BIB_TUCKER_CLASSIC_SIX_BOTTLE}
                    alt="Bib & Tucker Classic Six"
                    width={140}
                    height={300}
                    className="block object-contain object-bottom w-auto h-auto max-h-[min(200px,28vw)] sm:max-h-[220px]"
                    unoptimized
                  />
                </div>
                <p className="text-[9px] tracking-[0.18em] uppercase text-muted mt-3 min-h-[2.25rem] flex items-end justify-center">
                  Classic Six
                </p>
              </div>
              <div className="flex flex-col items-center text-center min-h-[220px] sm:min-h-[240px] justify-end">
                <div className="flex flex-1 w-full min-h-[140px] items-end justify-center pb-1 [&_img]:max-w-full">
                  <Image
                    src={BIB_TUCKER_DOUBLE_CHAR_LOGO}
                    alt="Bib & Tucker Double Char"
                    width={160}
                    height={160}
                    className="block object-contain object-bottom w-auto h-auto max-h-[min(100px,20vw)] sm:max-h-[112px] max-w-[min(160px,40vw)]"
                    unoptimized
                  />
                </div>
                <p className="text-[9px] tracking-[0.18em] uppercase text-muted mt-3 min-h-[2.25rem] flex items-end justify-center">
                  Double Char
                </p>
              </div>
              <div className="flex flex-col items-center text-center min-h-[220px] sm:min-h-[240px] justify-end">
                <div className="flex flex-1 w-full min-h-[140px] items-end justify-center px-1">
                  <span className="font-display text-xl sm:text-2xl text-copper leading-tight text-center max-w-[9rem]">
                    Gold Roast
                  </span>
                </div>
                <p className="text-[10px] text-muted mt-3 leading-snug max-w-[10rem] mx-auto min-h-[2.25rem] flex items-end justify-center">
                  Small batch bourbon with a coffee-kissed finish
                </p>
              </div>
            </div>
          </article>

          <article
            className="border border-rule p-8 lg:p-10 bg-warm hover:bg-cream transition-colors relative flex flex-col h-full min-h-0"
            data-reveal
          >
            <span className="font-display text-mist text-6xl lg:text-7xl absolute top-6 right-6 opacity-40 pointer-events-none">
              02
            </span>
            <div className="relative z-10 flex flex-col flex-1 min-h-0 items-stretch">
              <p className="text-[9px] tracking-[0.28em] uppercase text-muted mb-4 max-w-md">
                Born to Rise Above Ordinary Whiskey
              </p>
              <div className="mb-6 self-start w-fit max-w-full shrink-0">
                <Image
                  src={REDEMPTION_LOGO}
                  alt="Redemption"
                  width={220}
                  height={110}
                  className="block h-14 sm:h-16 w-auto max-w-[min(220px,85vw)] object-contain object-center"
                  unoptimized
                />
              </div>
              <p className="text-muted leading-relaxed">
                Redemption was created to unlock the potential of rye. Our ongoing journey to master its nuances has taught us to blend smooth whiskeys with extraordinary depth and character.
              </p>
              <div className="flex-1 min-h-4" aria-hidden />
              <div className="flex flex-wrap items-center gap-4 pt-8">
                <Link href="#collection" className="text-walnut text-[9px] tracking-[0.22em] uppercase after:content-['→'] after:ml-1 hover:text-copper transition-colors">
                  Explore Redemption
                </Link>
                <a href={STORE_REDEMPTION} target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-4 py-2.5 bg-copper text-white text-[9px] tracking-[0.18em] uppercase hover:opacity-90 transition-opacity">
                  Shop collection ↗
                </a>
              </div>
            </div>
            <div className="relative z-10 mt-10 flex flex-col items-center justify-end min-h-[220px] sm:min-h-[240px] max-w-xl mx-auto w-full">
              <div className="flex flex-1 w-full min-h-[140px] items-end justify-center px-1">
                <Image
                  src={REDEMPTION_CORE_TRIO_BOTTLES}
                  alt="Redemption Rye, Bourbon, and High Rye Bourbon"
                  width={480}
                  height={280}
                  className="block object-contain object-bottom w-auto h-auto max-w-full max-h-[min(220px,40vw)] sm:max-h-[240px]"
                  unoptimized
                />
              </div>
              <p className="text-[9px] tracking-[0.18em] uppercase text-muted mt-3 min-h-[2.25rem] flex items-end justify-center text-center">
                Rye · Bourbon · High Rye Bourbon
              </p>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
