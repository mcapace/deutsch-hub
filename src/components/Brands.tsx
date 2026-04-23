'use client';

import Image from 'next/image';
import Link from 'next/link';
import { STORE_BIB_TUCKER, STORE_REDEMPTION } from '@/lib/store-links';
import {
  BIB_TUCKER_CLASSIC_SIX_BOTTLE,
  BIB_TUCKER_DOUBLE_CHAR_BOTTLE,
  BIB_TUCKER_GOLD_ROAST_BOTTLE,
  REDEMPTION_CORE_TRIO_BOTTLES,
  REDEMPTION_LOGO,
} from '@/lib/brand-images';

/** Fixed slot + `fill` + object-bottom — sources share similar aspect after alpha-trim on Double/Gold. */
const bibBottleSlotClass =
  'relative h-[284px] sm:h-[304px] w-[124px] sm:w-[142px] shrink-0 overflow-hidden';
const bibBottleImageClass = 'object-contain object-bottom';

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
              <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 pt-8 text-center">
                <Link href="#collection" className="text-walnut text-[9px] tracking-[0.22em] uppercase after:content-['→'] after:ml-1 hover:text-copper transition-colors">
                  Explore Bib & Tucker
                </Link>
                <a href={STORE_BIB_TUCKER} target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-4 py-2.5 bg-copper text-white text-[9px] tracking-[0.18em] uppercase hover:opacity-90 transition-opacity">
                  Shop collection ↗
                </a>
              </div>
            </div>
            {/* Two-row grid: bottles share one baseline; captions share column gutters */}
            <div className="relative z-10 mt-10 max-w-xl mx-auto w-full space-y-4">
              <div className="grid grid-cols-3 gap-3 sm:gap-5 w-full items-end min-h-[296px] sm:min-h-[316px]">
                <div className="flex justify-center">
                  <div className={bibBottleSlotClass}>
                    <Image
                      src={BIB_TUCKER_CLASSIC_SIX_BOTTLE}
                      alt="Bib & Tucker Classic Six"
                      fill
                      unoptimized
                      className={bibBottleImageClass}
                      sizes="142px"
                    />
                  </div>
                </div>
                <div className="flex justify-center">
                  <div className={bibBottleSlotClass}>
                    <Image
                      src={BIB_TUCKER_DOUBLE_CHAR_BOTTLE}
                      alt="Bib & Tucker Double Char bourbon bottle"
                      fill
                      unoptimized
                      className={bibBottleImageClass}
                      sizes="142px"
                    />
                  </div>
                </div>
                <div className="flex justify-center">
                  <div className={bibBottleSlotClass}>
                    <Image
                      src={BIB_TUCKER_GOLD_ROAST_BOTTLE}
                      alt="Bib & Tucker Gold Roast bourbon bottle"
                      fill
                      unoptimized
                      className={bibBottleImageClass}
                      sizes="142px"
                    />
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-3 sm:gap-5 w-full">
                <p className="text-[9px] tracking-[0.18em] uppercase text-muted text-center px-0.5 pt-3">
                  Classic Six
                </p>
                <p className="text-[9px] tracking-[0.18em] uppercase text-muted text-center px-0.5 pt-3">
                  Double Char
                </p>
                <p className="text-[9px] tracking-[0.18em] uppercase text-copper text-center px-0.5 pt-3">
                  Gold Roast
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
              <div className="mb-6 self-start w-fit max-w-full shrink-0">
                <Image
                  src={REDEMPTION_LOGO}
                  alt="Redemption"
                  width={220}
                  height={110}
                  className="redemption-logo-on-light block h-14 sm:h-16 w-auto max-w-[min(220px,85vw)] object-contain object-center"
                  unoptimized
                />
              </div>
              <h3 className="font-display text-2xl lg:text-3xl text-ink mb-4">
                Born to Rise Above <span className="italic text-copper">Ordinary Whiskey</span>
              </h3>
              <p className="text-muted leading-relaxed">
                Redemption was created to unlock the potential of rye. Our ongoing journey to master its nuances has taught us to blend smooth whiskeys with extraordinary depth and character.
              </p>
              <div className="flex-1 min-h-4" aria-hidden />
              <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 pt-8 text-center">
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
