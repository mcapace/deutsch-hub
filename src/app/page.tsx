import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import BrandSection from '@/components/BrandSection';
import HolidayHubSection from '@/components/HolidayHubSection';
import CocktailSection from '@/components/CocktailSection';
import FoodPairingsSection from '@/components/FoodPairingsSection';
import CocktailQuiz from '@/components/CocktailQuiz';
import ArticlesSection from '@/components/ArticlesSection';
import Footer from '@/components/Footer';

// Bib & Tucker data - VERIFIED from official website
const bibAndTuckerData = {
  id: 'bib-tucker',
  brandName: 'Bib & Tucker',
  tagline: 'Where Bold and Refined Come Together',
  description:
    'Bib & Tucker draws inspiration from the turn-of-the-century American era, when unprecedented progress and invention defined the age. Named after the colloquial expression for "finest attire," each bourbon is crafted worthy of your finest moments — a celebration of the Gilded Age spirit.',
  heritage:
    'In the early 1900s, all bourbon was small batch, and great accomplishments were celebrated with quality spirits. Bib & Tucker honors this tradition with Tennessee whiskey made using the Lincoln County process — filtered through sugar maple charcoal for exceptional smoothness.',
  products: [
    {
      name: 'The Classic Six',
      description:
        'Aged 6 years in new American white oak with light char, then filtered through sugar maple charcoal in the Tennessee tradition. Complex yet refined with a chestnut finish.',
      proof: '92 Proof',
      notes: ['Oak', 'Caramel', 'Vanilla', 'Dried Dark Fruit', 'Toasted Corn'],
    },
    {
      name: 'Double Char',
      description:
        'First aged 6 years in Tennessee, then finished minimum 5 months in heavily charred barrels smoked with sugar maple. Fire-forged for a smoky, savory profile.',
      proof: '88 Proof',
      notes: ['White Smoke', 'Sugar Maple', 'Dulce de Leche', 'Toasted Cinnamon', 'Vanilla'],
    },
    {
      name: 'Gold Roast Bourbon',
      description:
        'Premium Arabica coffee beans steeped in cask strength 6-year whiskey, then expertly blended. A custom roast developed with a local Tennessee roaster. A truly one-of-a-kind bourbon that\'s complex, yet remarkably smooth with bold roasted notes.',
      proof: '92 Proof',
      notes: ['Fresh Coffee', 'Molasses', 'Milk Chocolate', 'Young Oak', 'Brown Spice'],
      featured: true,
    },
    {
      name: 'The Tennessee Ten',
      description:
        'A decade of patient aging creates an exceptionally refined bourbon with powerful depth. Subtle oak and vanilla meet complex character.',
      proof: '92 Proof',
      notes: ['Refined Oak', 'Vanilla', 'Leather', 'Dark Chocolate', 'Deep Spice'],
    },
  ],
  theme: 'bib' as const,
  bottleImage: '/Bib & Tucker Bottle Images/BT_FY24_Classic 6_New Bottles_BS_Render.png',
  logo: '/BAT_3D_Copper_Logo.png',
};

// Redemption data - VERIFIED from official website with mash bills
const redemptionData = {
  id: 'redemption',
  brandName: 'Redemption',
  tagline: 'This is the Rye Revival',
  description:
    'Redemption stands at the forefront of reviving pre-Prohibition American rye whiskey culture. Before Prohibition, rye was America\'s #1 spirit — nearly eliminated for a century. Our mission: reintroduce you to the spirit of your ancestors through rye-forward recipes inspired by historical formulations.',
  heritage:
    'Born from the golden age of classic cocktails, Redemption whiskeys are bartenders\' whiskeys. Sourced from MGP in Indiana — renowned for quality rye production — and crafted with the spice and character that defined American whiskey before Prohibition changed everything.',
  products: [
    {
      name: 'Redemption Bourbon',
      description:
        '75% corn, 21% rye, 4% malt. A truly easy drinking whiskey with a classic sweet backbone and assertive rye spice. Toffee, baking spice, and anise on the palate.',
      proof: '88 Proof',
      notes: ['Caramel', 'Baking Spice', 'Anise', 'Black Pepper', 'Toffee'],
    },
    {
      name: 'Redemption Rye',
      description:
        '95% rye, 5% malt. Big and spicy with toasted oak, allspice, and anise on the nose. The rye-forward profile pairs beautifully with classic cocktails.',
      proof: '92 Proof',
      notes: ['Toasted Oak', 'Allspice', 'Anise', 'Mint', 'Black Pepper'],
    },
    {
      name: 'High Rye Bourbon',
      description:
        '60% corn, 36% rye, 4% malt. Approaching the upper limit for bourbon, delivering bold spice with silky texture. Vanilla, red berries, and fennel-like licorice.',
      proof: '92 Proof',
      notes: ['Vanilla', 'Red Berries', 'Fennel', 'Black Pepper', 'Spiced Oak'],
    },
    {
      name: 'Wheated Bourbon',
      description:
        '51% corn, 45% wheat, 4% malt. Double Gold winner with candied ginger, sage, and lavender. Silky and harmonious yet robust — fresh pear over vanilla and cedar.',
      proof: '96 Proof',
      notes: ['Candied Ginger', 'Lavender', 'Hazelnut', 'Coffee', 'Toasted Bread'],
    },
  ],
  theme: 'redemption' as const,
  reversed: true,
  bottleImage: '/Redemption Bottle Images/Redpt_FY27_FLOW_Pho_BS_AmW_HR Bour_Ind_750ML.png',
};

export default function Home() {
  return (
    <main className="relative bg-[#FDFBF7]">
      <Navigation />
      <Hero />
      <ArticlesSection />
      <BrandSection {...bibAndTuckerData} />
      <BrandSection {...redemptionData} />
      <HolidayHubSection />
      <CocktailSection />
      <FoodPairingsSection />
      <Footer />
      <CocktailQuiz />
    </main>
  );
}
