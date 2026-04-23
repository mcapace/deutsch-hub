'use client';

import Image from 'next/image';
import Link from 'next/link';
import { STORE_BIB_TUCKER, STORE_REDEMPTION } from '@/lib/store-links';

export default function Brands() {
  return (
    <section className="bg-white py-20 lg:py-28" id="brands">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <header className="mb-16" data-reveal>
          <span className="font-display text-mist text-sm block mb-2">01</span>
          <h2 className="font-display text-4xl lg:text-5xl text-ink mb-4">The Brands</h2>
          <p className="text-muted max-w-xl">Two houses. One standard: exceptional American whiskey.</p>
        </header>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          <article className="border border-rule p-8 lg:p-10 hover:bg-warm transition-colors relative" data-reveal>
            <span className="font-display text-mist text-6xl lg:text-7xl absolute top-6 right-6 opacity-40">01</span>
            <div className="relative z-10">
              <Image src="/BAT_3D_Copper_Logo.png" alt="Bib & Tucker" width={200} height={80} className="h-16 w-auto mb-6" unoptimized />
              <h3 className="font-display text-2xl lg:text-3xl text-ink mb-4">
                Where Bold <span className="italic text-copper">&amp; Refined</span> Come Together
              </h3>
              <p className="text-muted leading-relaxed mb-6">
                Our name, bottle, and small batch approach were inspired by the turn of the century in America. A time of unprecedented progress and adventure when all bourbon was small batch and the time was taken to break out the best and raise a glass. Inspired by that time, we create award-winning small batch bourbon following the Lincoln County Process. Bold and refined, Bib &amp; Tucker is the perfect companion on your life&apos;s grand adventure.
              </p>
              <div className="flex flex-wrap items-center gap-4">
                <Link href="#collection" className="text-walnut text-[9px] tracking-[0.22em] uppercase after:content-['→'] after:ml-1 hover:text-copper transition-colors">
                  Explore Bib & Tucker
                </Link>
                <a href={STORE_BIB_TUCKER} target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-4 py-2.5 bg-copper text-white text-[9px] tracking-[0.18em] uppercase hover:opacity-90 transition-opacity">
                  Shop collection ↗
                </a>
              </div>
            </div>
            <div className="mt-10 grid grid-cols-3 gap-4 items-end max-w-lg mx-auto">
              <div className="flex flex-col items-center text-center">
                <Image
                  src="/Bib & Tucker Bottle Images/BT_FY24_Classic 6_New Bottles_BS_Render.png"
                  alt="Bib & Tucker Classic Six"
                  width={100}
                  height={220}
                  className="object-contain object-bottom h-36 w-auto"
                  unoptimized
                />
                <p className="text-[9px] tracking-[0.18em] uppercase text-muted mt-2">Classic Six</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <Image
                  src="/BAT_FY24_DoubleChar_Logo.png"
                  alt="Bib & Tucker Double Char"
                  width={120}
                  height={120}
                  className="object-contain h-24 w-auto mb-2"
                  unoptimized
                />
                <p className="text-[9px] tracking-[0.18em] uppercase text-muted mt-2">Double Char</p>
              </div>
              <div className="flex flex-col items-center justify-end text-center pb-1">
                <span className="font-display text-lg text-copper leading-tight">Gold Roast</span>
                <p className="text-[10px] text-muted mt-1 leading-snug">Small batch bourbon with a coffee-kissed finish</p>
              </div>
            </div>
          </article>

          <article className="border border-rule p-8 lg:p-10 bg-warm hover:bg-cream transition-colors relative" data-reveal>
            <span className="font-display text-mist text-6xl lg:text-7xl absolute top-6 right-6 opacity-40">02</span>
            <div className="relative z-10">
              <p className="text-[9px] tracking-[0.28em] uppercase text-muted mb-4 max-w-md">
                Born to Rise Above Ordinary Whiskey
              </p>
              <Image src="/Redemption logo /Redemption_Whiskey_Logo.png" alt="Redemption" width={200} height={80} className="h-16 w-auto mb-6" unoptimized />
              <p className="text-muted leading-relaxed mb-6">
                Redemption was created to unlock the potential of rye. Our ongoing journey to master its nuances has taught us to blend smooth whiskeys with extraordinary depth and character.
              </p>
              <div className="flex flex-wrap items-center gap-4">
                <Link href="#collection" className="text-walnut text-[9px] tracking-[0.22em] uppercase after:content-['→'] after:ml-1 hover:text-copper transition-colors">
                  Explore Redemption
                </Link>
                <a href={STORE_REDEMPTION} target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-4 py-2.5 bg-copper text-white text-[9px] tracking-[0.18em] uppercase hover:opacity-90 transition-opacity">
                  Shop collection ↗
                </a>
              </div>
            </div>
            <div className="mt-10 flex justify-center">
              <Image
                src="/Redemption Bottle Images/dfws_rdpn_trio-set_750ml_BLK_14OCT25.png"
                alt="Redemption Rye, Bourbon, and High Rye Bourbon"
                width={360}
                height={200}
                className="object-contain object-bottom w-full max-w-md h-auto max-h-52"
                unoptimized
              />
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
