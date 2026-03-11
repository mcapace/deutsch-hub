'use client';

import { useReveal } from '@/app/hooks/useReveal';
import Nav from '@/components/Nav';
import Hero from '@/components/Hero';
import Ribbon from '@/components/Ribbon';
import Brands from '@/components/Brands';
import Stats from '@/components/Stats';
import Collection from '@/components/Collection';
import Stories from '@/components/Stories';
import Cocktails from '@/components/Cocktails';
import Pairings from '@/components/Pairings';
import Footer from '@/components/Footer';
import BarKeep from '@/components/BarKeep';

export default function Home() {
  useReveal();

  return (
    <main className="relative bg-white">
      <Nav />
      <Hero />
      <Ribbon />
      <Brands />
      <Stats />
      <Collection />
      <Stories />
      <Cocktails />
      <Pairings />
      <Footer />
      <BarKeep />
    </main>
  );
}
