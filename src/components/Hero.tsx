'use client';

import Image from 'next/image';
import Link from 'next/link';

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
        <div className="relative flex items-end justify-center gap-2 sm:gap-4 lg:gap-8 w-full max-w-full">
          <div className="w-72 sm:w-80 lg:w-[24rem] xl:w-[28rem] 2xl:w-[30rem] h-96 sm:h-[28rem] lg:h-[32rem] xl:h-[36rem] 2xl:h-[40rem] flex items-end drop-shadow-2xl" style={{ transform: 'rotate(-2.5deg)' }}>
            <Image
              src="/Bib & Tucker Bottle Images/BT_FY24_Classic 6_New Bottles_BS_Render.png"
              alt="Bib & Tucker Classic Six"
              width={224}
              height={508}
              className="w-full h-full object-contain object-bottom"
              unoptimized
            />
          </div>
          <div className="w-72 sm:w-80 lg:w-[24rem] xl:w-[28rem] 2xl:w-[30rem] h-96 sm:h-[28rem] lg:h-[32rem] xl:h-[36rem] 2xl:h-[40rem] flex items-end drop-shadow-2xl" style={{ transform: 'rotate(2deg)' }}>
            <Image
              src="/Redemption Bottle Images/Redpt_FY27_FLOW_Pho_BS_AmW_HR Bour_Ind_750ML.png"
              alt="Redemption Bourbon"
              width={224}
              height={508}
              className="w-full h-full object-contain object-bottom"
              unoptimized
            />
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 grid grid-cols-2 border-t border-white/20 py-3 sm:py-4 px-4 sm:px-6 bg-ink">
          <div className="text-center">
            <p className="font-display text-white text-sm">Bib & Tucker</p>
            <p className="text-white/85 text-[9px] tracking-[0.2em] uppercase">Tennessee Bourbon</p>
          </div>
          <div className="text-center border-l border-white/20">
            <p className="font-display text-white text-sm">Redemption</p>
            <p className="text-white/85 text-[9px] tracking-[0.2em] uppercase">American Rye</p>
          </div>
        </div>
      </div>
    </section>
  );
}
