import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import BrandSection from '@/components/BrandSection';
import ArticlesSection from '@/components/ArticlesSection';
import Footer from '@/components/Footer';

// Bib & Tucker data
const bibAndTuckerData = {
  id: 'bib-tucker',
  brandName: 'Bib & Tucker',
  tagline: 'Where Bold and Refined Come Together',
  description:
    'Bib & Tucker Small Batch Bourbon draws its name from the colloquial expression meaning "your finest attire." Just as you would dress in your best for a special occasion, Bib & Tucker represents bourbon at its finest—crafted with meticulous attention to detail and aged to perfection.',
  heritage:
    'Inspired by the adventurous spirit of the early 1900s, when bold pioneers pushed the boundaries of American craftsmanship, Bib & Tucker pays homage to an era when quality was paramount and shortcuts were unheard of. Each bottle reflects the dedication and expertise of master distillers who understand that great bourbon is a work of art.',
  products: [
    {
      name: 'Bib & Tucker 6 Year Small Batch',
      description:
        'A harmonious blend of hand-selected barrels aged for six years, delivering a smooth yet complex profile.',
      proof: '92 Proof',
      notes: ['Vanilla', 'Caramel', 'Oak', 'Honey'],
    },
    {
      name: 'Bib & Tucker 10 Year',
      description:
        'A decade of patient aging creates an exceptionally refined bourbon with deep character.',
      proof: '92 Proof',
      notes: ['Dried Fruit', 'Leather', 'Dark Chocolate', 'Spice'],
    },
    {
      name: 'Bib & Tucker Double Char',
      description:
        'Finished in double-charred barrels for an extra layer of smoky sweetness.',
      proof: '92 Proof',
      notes: ['Smoke', 'Brown Sugar', 'Toasted Oak', 'Maple'],
    },
  ],
  theme: 'bib' as const,
};

// Redemption data
const redemptionData = {
  id: 'redemption',
  brandName: 'Redemption',
  tagline: 'High Rye. High Standards.',
  description:
    'Redemption Whiskey stands as a testament to the revival of pre-Prohibition whiskey-making traditions. With a distinctively high rye content, Redemption delivers bold, spicy character that sets it apart from conventional bourbons—a true redemption of American whiskey heritage.',
  heritage:
    'Founded on the principle that great whiskey should honor its roots while pushing boundaries, Redemption has quickly become a favorite among enthusiasts who appreciate complexity and craftsmanship. Each expression showcases the versatility of high-rye mashbills, from approachable everyday sippers to premium aged releases.',
  products: [
    {
      name: 'Redemption Bourbon',
      description:
        'A high-rye bourbon that delivers exceptional smoothness with a spicy kick.',
      proof: '84 Proof',
      notes: ['Rye Spice', 'Vanilla', 'Citrus', 'Caramel'],
    },
    {
      name: 'Redemption High-Rye Bourbon',
      description:
        'Even bolder rye character for those who crave intensity and complexity.',
      proof: '92 Proof',
      notes: ['Pepper', 'Cinnamon', 'Dark Fruit', 'Toast'],
    },
    {
      name: 'Redemption Wheated Bourbon',
      description:
        'A softer, sweeter expression featuring wheat in the mashbill.',
      proof: '96 Proof',
      notes: ['Honey', 'Wheat', 'Butterscotch', 'Vanilla'],
    },
  ],
  theme: 'redemption' as const,
  reversed: true,
};

export default function Home() {
  return (
    <main className="relative">
      <Navigation />
      <Hero />
      <BrandSection {...bibAndTuckerData} />
      <BrandSection {...redemptionData} />
      <ArticlesSection />
      <Footer />
    </main>
  );
}
