'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';

interface Pairing {
  food: string;
  description: string;
}

interface WhiskeyPairing {
  name: string;
  proof: string;
  pairings: Pairing[];
}

interface BrandPairings {
  brand: string;
  brandId: 'bib' | 'redemption';
  tagline: string;
  whiskeys: WhiskeyPairing[];
}

const pairingsData: BrandPairings[] = [
  {
    brand: 'Bib & Tucker',
    brandId: 'bib',
    tagline: 'Bold flavors for bold pairings',
    whiskeys: [
      {
        name: 'The Classic Six',
        proof: '92 Proof',
        pairings: [
          { food: 'Grilled Ribeye', description: 'The caramel notes complement charred meat beautifully' },
          { food: 'Dark Chocolate Truffles', description: 'Vanilla and oak meet rich cocoa' },
          { food: 'Aged Cheddar', description: 'Sharp cheese balances the bourbon sweetness' },
          { food: 'Pecan Pie', description: 'A Southern classic pairing' },
        ],
      },
      {
        name: 'Double Char',
        proof: '88 Proof',
        pairings: [
          { food: 'BBQ Brisket', description: 'Smoke meets smoke in perfect harmony' },
          { food: 'Maple-Glazed Bacon', description: 'Sugar maple notes amplified' },
          { food: 'Smoked Salmon', description: 'Elegant smokiness pairs beautifully' },
          { food: "S'mores", description: 'Campfire flavors come alive' },
        ],
      },
      {
        name: 'Gold Roast',
        proof: '92 Proof',
        pairings: [
          { food: 'Tiramisu', description: 'Coffee meets coffee in dessert heaven' },
          { food: 'Chocolate Espresso Beans', description: 'Triple coffee indulgence' },
          { food: 'Brunch Dishes', description: 'Perfect morning-after pairing' },
          { food: 'Affogato', description: 'Pour over vanilla ice cream' },
        ],
      },
      {
        name: 'Tennessee Ten',
        proof: '92 Proof',
        pairings: [
          { food: 'Charcuterie Board', description: 'Complex flavors for complex whiskey' },
          { food: 'Aged Gouda', description: 'Deep, nutty notes complement each other' },
          { food: 'Crème Brûlée', description: 'Caramelized sugar and vanilla' },
          { food: 'Dark Chocolate', description: 'Rich cocoa and oak tannins' },
        ],
      },
    ],
  },
  {
    brand: 'Redemption',
    brandId: 'redemption',
    tagline: 'Spice-forward whiskeys, bold pairings',
    whiskeys: [
      {
        name: 'Bourbon',
        proof: '88 Proof',
        pairings: [
          { food: 'Bacon-Wrapped Dates', description: 'Sweet and savory with caramel notes' },
          { food: 'Brie & Crackers', description: 'Creamy cheese softens the spice' },
          { food: 'Glazed Ham', description: 'Classic sweet and savory pairing' },
          { food: 'Caramel Desserts', description: 'Toffee notes shine through' },
        ],
      },
      {
        name: 'Rye',
        proof: '92 Proof',
        pairings: [
          { food: 'Pastrami on Rye', description: 'The ultimate rye-on-rye experience' },
          { food: 'Sharp Aged Cheese', description: 'Bold flavors match bold whiskey' },
          { food: 'Spiced Nuts', description: 'Spice meets spice' },
          { food: 'Smoked Fish', description: 'Allspice and anise complement smoke' },
        ],
      },
      {
        name: 'High Rye Bourbon',
        proof: '92 Proof',
        pairings: [
          { food: 'Gingerbread', description: 'Spiced perfection' },
          { food: 'Spicy Thai Food', description: 'Heat meets heat harmoniously' },
          { food: 'Dark Chocolate Chili', description: 'Complex spice layers' },
          { food: 'Spiced Pecans', description: 'Cinnamon and pepper unite' },
        ],
      },
      {
        name: 'Wheated Bourbon',
        proof: '96 Proof',
        pairings: [
          { food: 'Hazelnut Desserts', description: 'Nutty notes amplified' },
          { food: 'French Toast', description: 'Bread and malty sweetness' },
          { food: 'Coffee Cake', description: 'Coffee and lavender notes' },
          { food: 'Soft Cheeses', description: 'Silky texture matches silky whiskey' },
        ],
      },
    ],
  },
];

// Pairing card component - elegant, no emojis
const PairingCard = ({
  pairing,
  index,
  brandColor,
}: {
  pairing: Pairing;
  index: number;
  brandColor: string;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05, duration: 0.5 }}
      className="group"
    >
      <div className="bg-[#F7F2E8] border border-[#D8CEBC] p-5 h-full transition-all duration-300 rounded-sm elevated-card hover:bg-[#EDE5D3]"
      >
        {/* Food name */}
        <h4 className="font-serif text-lg mb-2 transition-colors group-hover:text-[var(--copper)]" style={{ color: 'var(--ink)' }}>
          {pairing.food}
        </h4>

        {/* Description */}
        <p className="text-sm leading-relaxed" style={{ color: 'var(--fog)' }}>
          {pairing.description}
        </p>

        {/* Bottom accent line */}
        <div
          className="mt-4 h-px w-0 group-hover:w-full transition-all duration-300"
          style={{ background: brandColor }}
        />
      </div>
    </motion.div>
  );
};

// Whiskey accordion item
const WhiskeyAccordion = ({
  whiskey,
  brandId,
  isOpen,
  onToggle,
}: {
  whiskey: WhiskeyPairing;
  brandId: 'bib' | 'redemption';
  isOpen: boolean;
  onToggle: () => void;
}) => {
  const colors = {
    bib: { primary: 'var(--copper)', secondary: 'var(--amber)' },
    redemption: { primary: 'var(--copper)', secondary: 'var(--amber)' },
  };

  const brandColors = colors[brandId];

  return (
    <div className="mb-4">
      {/* Accordion header */}
        <motion.button
        onClick={onToggle}
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
        className="w-full rounded-xl p-5 flex items-center justify-between border border-[#D8CEBC] transition-all duration-300 hover:shadow-[var(--shadow-card)]"
        style={{ background: 'var(--warm)', boxShadow: 'var(--shadow-sm)' }}
      >
        <div className="flex items-center gap-4">
          <div
            className="w-3 h-3 rounded-full"
            style={{ background: `linear-gradient(135deg, ${brandColors.primary}, ${brandColors.secondary})` }}
          />
          <div className="text-left">
            <h4 className="font-bold text-lg" style={{ color: 'var(--ink)' }}>
              {whiskey.name}
            </h4>
            <span className="text-sm" style={{ color: 'var(--fog)' }}>
              {whiskey.proof} • {whiskey.pairings.length} pairings
            </span>
          </div>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          style={{ color: brandColors.primary }}
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </motion.div>
      </motion.button>

      {/* Accordion content */}
      <motion.div
        initial={false}
        animate={{
          height: isOpen ? 'auto' : 0,
          opacity: isOpen ? 1 : 0,
        }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="overflow-hidden"
      >
        <div className="pt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
          {whiskey.pairings.map((pairing, index) => (
            <PairingCard
              key={pairing.food}
              pairing={pairing}
              index={index}
              brandColor={brandColors.primary}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default function FoodPairingsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [activeBrand, setActiveBrand] = useState<'bib' | 'redemption'>('bib');
  const [openWhiskeys, setOpenWhiskeys] = useState<string[]>(['The Classic Six', 'Bourbon']);

  const toggleWhiskey = (name: string) => {
    setOpenWhiskeys((prev) =>
      prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name]
    );
  };

  const currentBrand = pairingsData.find((b) => b.brandId === activeBrand)!;
  const brandColors = {
    bib: { primary: 'var(--bt-rust)', secondary: 'var(--bt-gold)', bg: 'rgba(200, 90, 54, 0.05)' },
    redemption: { primary: 'var(--redemption-orange)', secondary: 'var(--redemption-gold)', bg: 'rgba(253, 148, 25, 0.05)' },
  };

  return (
    <section
      id="pairings"
      ref={ref}
      className="relative py-24 md:py-32 overflow-hidden"
      style={{ background: 'var(--warm)' }}
    >
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{
            background: activeBrand === 'bib'
              ? 'radial-gradient(ellipse 80% 60% at 20% 80%, rgba(168, 74, 40, 0.08), transparent 60%)'
              : 'radial-gradient(ellipse 80% 60% at 80% 80%, rgba(199, 122, 36, 0.08), transparent 60%)',
          }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0"
        />
      </div>

      <div className="container-custom relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="h-px w-24 mx-auto mb-6"
            style={{ background: 'var(--rule)' }}
          />
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-normal mb-4 font-serif" style={{ color: 'var(--ink)' }}>
            Perfect <span className="italic" style={{ color: 'var(--copper)' }}>Pairings</span>
          </h2>
          <p className="text-lg md:text-xl max-w-2xl mx-auto" style={{ color: 'var(--fog)' }}>
            Elevate your tasting experience with expertly curated food pairings for each expression.
          </p>
        </motion.div>

        {/* Brand toggle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex justify-center gap-4 mb-12"
        >
          {pairingsData.map((brand) => (
            <motion.button
              key={brand.brandId}
              onClick={() => setActiveBrand(brand.brandId)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-8 py-3 rounded-xl font-medium transition-all duration-300"
              style={{
                background: activeBrand === brand.brandId ? 'var(--copper)' : 'var(--white)',
                color: activeBrand === brand.brandId ? '#FFFFFF' : 'var(--fog)',
                boxShadow: activeBrand === brand.brandId ? 'var(--shadow-card)' : 'var(--shadow-sm)',
              }}
            >
              {brand.brand}
            </motion.button>
          ))}
        </motion.div>

        {/* Brand tagline */}
        <motion.p
          key={currentBrand.tagline}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-center text-lg italic mb-8"
          style={{ color: brandColors[activeBrand].primary }}
        >
          "{currentBrand.tagline}"
        </motion.p>

        {/* Whiskey accordions */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          {currentBrand.whiskeys.map((whiskey) => (
            <WhiskeyAccordion
              key={whiskey.name}
              whiskey={whiskey}
              brandId={activeBrand}
              isOpen={openWhiskeys.includes(whiskey.name)}
              onToggle={() => toggleWhiskey(whiskey.name)}
            />
          ))}
        </motion.div>

        {/* Pro tip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-12 max-w-2xl mx-auto"
        >
          <div className="border border-[#D8CEBC] bg-white p-8 text-center rounded-sm elevated-card">
            <span className="text-xs tracking-[0.25em] uppercase font-medium block mb-3" style={{ color: 'var(--copper)' }}>
              Pro Tip
            </span>
            <p className="leading-relaxed" style={{ color: 'var(--ink)' }}>
              Let your whiskey sit for a few minutes after pouring to open up the flavors.
              Take small sips between bites to cleanse your palate and enhance both the food and whiskey experience.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
