'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function Hero() {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 min-h-screen pt-[68px]">
      <div className="bg-white flex flex-col justify-center px-8 lg:px-16 py-16 order-2 lg:order-1" data-reveal>
        <div className="h-px w-12 mb-6" style={{ background: 'var(--rule)' }} />
        <p className="text-fog text-[9px] tracking-[0.28em] uppercase mb-4">Whisky Advocate Presents</p>
        <h1 className="font-display text-[clamp(2.5rem,6vw,5.375rem)] leading-tight mb-6 text-ink">
          <span className="italic text-copper">The Art of</span>
          <br />
          American
          <br />
          Whiskey
        </h1>
        <div className="w-12 h-px my-6" style={{ background: 'var(--rule)' }} />
        <p className="text-fog text-lg max-w-md mb-10">
          Discover Bib & Tucker and Redemption — Tennessee bourbon and American rye, crafted for the moment.
        </p>
        <div className="flex flex-wrap gap-4">
          <Link
            href="#collection"
            className="bg-ink text-white px-8 py-3 text-[9px] tracking-[0.24em] uppercase hover:bg-copper transition-colors inline-block"
          >
            Explore Collection
          </Link>
          <Link
            href="#cocktails"
            className="text-walnut text-[9px] tracking-[0.22em] uppercase after:content-['→'] after:ml-1 hover:text-copper transition-colors inline-block"
          >
            Cocktail Recipes
          </Link>
        </div>
      </div>

      <div className="bg-warm relative flex items-end justify-center px-8 py-16 lg:py-24 order-1 lg:order-2 min-h-[50vh] lg:min-h-0" data-reveal>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_60%,rgba(196,135,62,0.08),transparent)] pointer-events-none" />
        <div className="relative flex items-end justify-center gap-4 lg:gap-8">
          <div className="w-32 lg:w-44 drop-shadow-2xl" style={{ transform: 'rotate(-2.5deg)' }}>
            <Image
              src="/Bib & Tucker Bottle Images/BT_FY24_Classic 6_New Bottles_BS_Render.png"
              alt="Bib & Tucker Classic Six"
              width={176}
              height={400}
              className="w-full h-auto object-contain object-bottom"
              unoptimized
            />
          </div>
          <div className="w-32 lg:w-44 drop-shadow-2xl" style={{ transform: 'rotate(2deg)' }}>
            <Image
              src="/Redemption Bottle Images/Redpt_FY27_FLOW_Pho_BS_AmW_HR Bour_Ind_750ML.png"
              alt="Redemption Bourbon"
              width={176}
              height={400}
              className="w-full h-auto object-contain object-bottom"
              unoptimized
            />
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 grid grid-cols-2 border-t border-rule py-4 px-6" style={{ background: 'rgba(247,242,232,0.95)' }}>
          <div className="text-center">
            <p className="font-display text-ink text-sm">Bib & Tucker</p>
            <p className="text-fog text-[9px] tracking-[0.2em] uppercase">Tennessee Bourbon</p>
          </div>
          <div className="text-center border-l border-rule">
            <p className="font-display text-ink text-sm">Redemption</p>
            <p className="text-fog text-[9px] tracking-[0.2em] uppercase">American Rye</p>
          </div>
        </div>
      </div>
    </section>
  );
}
