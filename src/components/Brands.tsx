'use client';

import Image from 'next/image';
import Link from 'next/link';

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
                Where Bold <span className="italic text-copper">Meets Refined</span>
              </h3>
              <p className="text-muted leading-relaxed mb-6">
                Small batch Tennessee bourbon. Six years in American white oak, filtered through sugar maple charcoal — the Lincoln County Process that defines the house style.
              </p>
              <Link href="#collection" className="text-walnut text-[9px] tracking-[0.22em] uppercase after:content-['→'] after:ml-1 hover:text-copper transition-colors">
                Explore Bib & Tucker
              </Link>
            </div>
            <div className="mt-10 flex justify-center">
              <Image
                src="/Bib & Tucker Bottle Images/BT_FY24_Classic 6_New Bottles_BS_Render.png"
                alt="Classic Six"
                width={120}
                height={280}
                className="object-contain object-bottom h-48 w-auto"
                unoptimized
              />
            </div>
          </article>

          <article className="border border-rule p-8 lg:p-10 bg-warm hover:bg-cream transition-colors relative" data-reveal>
            <span className="font-display text-mist text-6xl lg:text-7xl absolute top-6 right-6 opacity-40">02</span>
            <div className="relative z-10">
              <Image src="/Redemption logo /Redemption_Whiskey_Logo.png" alt="Redemption" width={200} height={80} className="h-16 w-auto mb-6" unoptimized />
              <h3 className="font-display text-2xl lg:text-3xl text-ink mb-4">
                America&apos;s Original <span className="italic text-copper">Spirit</span>
              </h3>
              <p className="text-muted leading-relaxed mb-6">
                Pre-Prohibition rye revival. From 95% rye mash to high-rye bourbon, Redemption brings back the character that made American whiskey legendary.
              </p>
              <Link href="#collection" className="text-walnut text-[9px] tracking-[0.22em] uppercase after:content-['→'] after:ml-1 hover:text-copper transition-colors">
                Explore Redemption
              </Link>
            </div>
            <div className="mt-10 flex justify-center">
              <Image
                src="/Redemption Bottle Images/Redpt_FY27_FLOW_Pho_BS_AmW_HR Bour_Ind_750ML.png"
                alt="Redemption Bourbon"
                width={120}
                height={280}
                className="object-contain object-bottom h-48 w-auto"
                unoptimized
              />
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
