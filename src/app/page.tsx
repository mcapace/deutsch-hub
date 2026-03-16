'use client';

import { useReveal } from '@/app/hooks/useReveal';
import Nav from '@/components/Nav';
import HeroSection from '@/components/HeroSection';
import Ribbon from '@/components/Ribbon';
import Brands from '@/components/Brands';
import Stats from '@/components/Stats';
import Collection from '@/components/Collection';
import Stories from '@/components/Stories';
import Cocktails from '@/components/Cocktails';
import Pairings from '@/components/Pairings';
import Footer from '@/components/Footer';
import BarKeep from '@/components/BarKeep';
import ParallaxSection from '@/components/ParallaxSection';

export default function Home() {
  useReveal();

  return (
    <main className="relative bg-white">
      <Nav />
      <HeroSection />
      <ParallaxSection speed={0.04}>
        <Ribbon />
      </ParallaxSection>
      <ParallaxSection speed={0.1}>
        <Brands />
      </ParallaxSection>
      <ParallaxSection speed={-0.06}>
        <Stats />
      </ParallaxSection>
      <ParallaxSection speed={0.08}>
        <Collection />
      </ParallaxSection>
      <ParallaxSection speed={0.06}>
        <Stories />
      </ParallaxSection>
      <ParallaxSection speed={0.1}>
        <Cocktails />
      </ParallaxSection>
      <ParallaxSection speed={0.05}>
        <Pairings />
      </ParallaxSection>
      <Footer />
      <BarKeep />
    </main>
  );
}
