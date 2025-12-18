'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';

interface Article {
  id: string;
  brand: 'bib' | 'redemption' | 'general';
  title: string;
  excerpt: string;
  readTime: string;
  category: string;
  icon: string;
  featured?: boolean;
}

const articles: Article[] = [
  {
    id: '1',
    brand: 'bib',
    title: 'The Bold Legacy of Bib & Tucker',
    excerpt:
      'Named after the colloquial expression for "finest attire," Bib & Tucker draws inspiration from the Gilded Age. Discover how Tennessee tradition meets small-batch excellence through the Lincoln County process.',
    readTime: '8 min read',
    category: 'Brand Story',
    icon: '🥃',
    featured: true,
  },
  {
    id: '2',
    brand: 'redemption',
    title: 'The Rye Revival: Redemption\'s Mission',
    excerpt:
      'Before Prohibition, rye was America\'s #1 spirit. Redemption stands at the forefront of reviving pre-Prohibition rye culture with bartender-approved, spice-forward whiskeys.',
    readTime: '7 min read',
    category: 'Brand Story',
    icon: '🌾',
    featured: true,
  },
  {
    id: '3',
    brand: 'general',
    title: 'Winter Whiskey Cocktail Guide',
    excerpt:
      'From Hot Toddies to Buttered Bourbons, master the art of warming cocktails this season. Expert tips for crafting drinks that celebrate the cold months.',
    readTime: '5 min read',
    category: 'Cocktail Guide',
    icon: '❄️',
  },
  {
    id: '4',
    brand: 'bib',
    title: 'Coffee Meets Whiskey: Gold Roast Story',
    excerpt:
      'How a partnership with a Tennessee roaster created the perfect fusion of premium Arabica beans and 6-year aged whiskey. The making of Gold Roast bourbon.',
    readTime: '6 min read',
    category: 'Behind the Barrel',
    icon: '☕',
  },
  {
    id: '5',
    brand: 'redemption',
    title: 'Understanding Mash Bills',
    excerpt:
      'From 95% rye to wheated bourbon, learn how grain ratios shape flavor profiles. A deep dive into Redemption\'s diverse expressions and what makes each unique.',
    readTime: '10 min read',
    category: 'Education',
    icon: '📚',
  },
  {
    id: '6',
    brand: 'general',
    title: 'Perfect Food & Whiskey Pairings',
    excerpt:
      'Elevate your tasting experience with expertly curated pairings. From grilled ribeye with bourbon to spiced nuts with rye, discover complementary flavors.',
    readTime: '6 min read',
    category: 'Pairing Guide',
    icon: '🍽️',
  },
];

const themeColors = {
  bib: {
    primary: 'var(--bt-rust)',
    secondary: 'var(--bt-gold)',
    gradient: 'linear-gradient(135deg, rgba(200, 90, 54, 0.15), rgba(189, 165, 93, 0.1))',
    border: 'var(--bt-rust)',
    tagBg: 'rgba(200, 90, 54, 0.15)',
  },
  redemption: {
    primary: 'var(--redemption-orange)',
    secondary: 'var(--redemption-gold)',
    gradient: 'linear-gradient(135deg, rgba(253, 148, 25, 0.15), rgba(212, 160, 74, 0.1))',
    border: 'var(--redemption-orange)',
    tagBg: 'rgba(253, 148, 25, 0.15)',
  },
  general: {
    primary: 'var(--color-text-muted)',
    secondary: 'var(--color-text-light)',
    gradient: 'linear-gradient(135deg, rgba(107, 107, 107, 0.1), rgba(139, 139, 139, 0.05))',
    border: 'var(--color-text-light)',
    tagBg: 'rgba(107, 107, 107, 0.15)',
  },
};

// Article card component
const ArticleCard = ({
  article,
  index,
  isInView,
  isFeatured = false,
}: {
  article: Article;
  index: number;
  isInView: boolean;
  isFeatured?: boolean;
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const colors = themeColors[article.brand];

  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`group relative ${isFeatured ? 'md:col-span-1' : ''}`}
    >
      {/* Glow effect */}
      <motion.div
        animate={{
          opacity: isHovered ? 0.4 : 0,
          scale: isHovered ? 1 : 0.95,
        }}
        transition={{ duration: 0.4 }}
        className="absolute -inset-1 rounded-2xl blur-xl"
        style={{ background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})` }}
      />

      <motion.div
        animate={{ y: isHovered ? -6 : 0 }}
        transition={{ duration: 0.3 }}
        className="relative glass-card rounded-2xl overflow-hidden h-full"
      >
        {/* Header with icon */}
        <div
          className="relative h-32 flex items-center justify-center overflow-hidden"
          style={{ background: colors.gradient }}
        >
          <motion.span
            animate={{ scale: isHovered ? 1.2 : 1, rotate: isHovered ? 5 : 0 }}
            transition={{ duration: 0.4 }}
            className="text-5xl"
          >
            {article.icon}
          </motion.span>

          {/* Floating particles on hover */}
          {isHovered && (
            <>
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ y: 100, opacity: 0, x: Math.random() * 200 - 100 }}
                  animate={{ y: -50, opacity: [0, 1, 0] }}
                  transition={{ duration: 2, delay: i * 0.2, repeat: Infinity }}
                  className="absolute w-1 h-1 rounded-full"
                  style={{ background: colors.primary }}
                />
              ))}
            </>
          )}

          {/* Featured badge */}
          {article.featured && (
            <div
              className="absolute top-3 right-3 px-2 py-1 rounded-full text-xs font-medium"
              style={{ background: colors.primary, color: '#FFFFFF' }}
            >
              Featured
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Tags */}
          <div className="flex items-center gap-3 mb-3">
            <span
              className="text-xs px-3 py-1 rounded-full font-medium"
              style={{ background: colors.tagBg, color: colors.primary }}
            >
              {article.brand === 'bib'
                ? 'Bib & Tucker'
                : article.brand === 'redemption'
                  ? 'Redemption'
                  : 'Guide'}
            </span>
            <span className="text-xs" style={{ color: '#8B8B8B' }}>
              {article.category}
            </span>
          </div>

          {/* Title */}
          <h3
            className="text-lg font-bold mb-2 line-clamp-2 transition-colors duration-300"
            style={{ color: isHovered ? colors.primary : '#1A1410' }}
          >
            {article.title}
          </h3>

          {/* Excerpt */}
          <p className="text-sm leading-relaxed mb-4 line-clamp-3" style={{ color: '#6B6B6B' }}>
            {article.excerpt}
          </p>

          {/* Footer */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
            <span className="text-xs" style={{ color: '#8B8B8B' }}>
              {article.readTime}
            </span>
            <motion.button
              whileHover={{ x: 5 }}
              className="flex items-center gap-2 text-sm font-medium"
              style={{ color: colors.primary }}
            >
              Read
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </motion.button>
          </div>
        </div>

        {/* Hover accent line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="absolute bottom-0 left-0 right-0 h-1 origin-left"
          style={{ background: `linear-gradient(90deg, ${colors.primary}, ${colors.secondary})` }}
        />
      </motion.div>
    </motion.article>
  );
};

export default function ArticlesSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [filter, setFilter] = useState<'all' | 'bib' | 'redemption'>('all');

  const filteredArticles = articles.filter((article) => {
    if (filter === 'all') return true;
    return article.brand === filter || article.brand === 'general';
  });

  const filters = [
    { id: 'all', label: 'All Stories' },
    { id: 'bib', label: 'Bib & Tucker' },
    { id: 'redemption', label: 'Redemption' },
  ] as const;

  return (
    <section id="articles" ref={ref} className="relative py-24 md:py-32 overflow-hidden" style={{ background: '#FAFAF8' }}>
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full blur-3xl opacity-30"
          style={{ background: 'radial-gradient(circle, rgba(200, 90, 54, 0.15), transparent 70%)' }}
        />
        <div
          className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full blur-3xl opacity-25"
          style={{ background: 'radial-gradient(circle, rgba(253, 148, 25, 0.15), transparent 70%)' }}
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
            className="decorative-line mx-auto mb-6"
          />
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4" style={{ color: '#1A1410' }}>
            Featured <span className="text-gradient">Stories</span>
          </h2>
          <p className="text-lg md:text-xl max-w-2xl mx-auto" style={{ color: '#6B6B6B' }}>
            Dive deeper into the world of premium American whiskey with exclusive content from Whisky Advocate.
          </p>
        </motion.div>

        {/* Filter tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex justify-center gap-3 mb-12"
        >
          {filters.map((f) => (
            <motion.button
              key={f.id}
              onClick={() => setFilter(f.id)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-6 py-2.5 rounded-xl text-sm font-medium transition-all duration-300"
              style={{
                background:
                  filter === f.id
                    ? f.id === 'bib'
                      ? 'linear-gradient(135deg, #C85A36, #BDA55D)'
                      : f.id === 'redemption'
                        ? 'linear-gradient(135deg, #FD9419, #D4A04A)'
                        : 'linear-gradient(135deg, #1A1410, #4A4A4A)'
                    : 'rgba(255, 255, 255, 0.8)',
                color: filter === f.id ? '#FFFFFF' : '#6B6B6B',
                boxShadow: filter === f.id ? '0 4px 20px rgba(0,0,0,0.15)' : 'none',
              }}
            >
              {f.label}
            </motion.button>
          ))}
        </motion.div>

        {/* Articles Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArticles.map((article, index) => (
            <ArticleCard
              key={article.id}
              article={article}
              index={index}
              isInView={isInView}
              isFeatured={article.featured}
            />
          ))}
        </div>

        {/* Newsletter CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 max-w-2xl mx-auto"
        >
          <div
            className="glass-card rounded-2xl p-8 text-center"
            style={{ background: 'linear-gradient(135deg, rgba(200, 90, 54, 0.05), rgba(253, 148, 25, 0.05))' }}
          >
            <span className="text-3xl mb-4 block">📧</span>
            <h4 className="text-xl font-bold mb-2" style={{ color: '#1A1410' }}>
              Stay in the Know
            </h4>
            <p className="text-sm mb-6" style={{ color: '#6B6B6B' }}>
              Get exclusive content, new releases, and cocktail inspiration delivered to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#C85A36] transition-colors"
                style={{ background: 'rgba(255,255,255,0.8)' }}
              />
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-6 py-3 rounded-xl font-medium text-white"
                style={{ background: 'linear-gradient(135deg, #C85A36, #BDA55D)' }}
              >
                Subscribe
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
