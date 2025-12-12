'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

interface Article {
  id: string;
  brand: 'bib' | 'redemption';
  title: string;
  excerpt: string;
  readTime: string;
  category: string;
}

const articles: Article[] = [
  {
    id: '1',
    brand: 'bib',
    title: 'The Bold Legacy of Bib & Tucker: Where Heritage Meets Innovation',
    excerpt:
      'Discover how Bib & Tucker crafts its award-winning bourbons, blending traditional methods with innovative techniques to create whiskeys that honor the past while embracing the future.',
    readTime: '8 min read',
    category: 'Sponsored Content',
  },
  {
    id: '2',
    brand: 'redemption',
    title: 'Redemption Whiskey: A Story of Revival and Craft Excellence',
    excerpt:
      'Explore the journey of Redemption Whiskey, from its roots in pre-Prohibition recipes to its modern-day renaissance as a leader in high-rye American whiskey.',
    readTime: '7 min read',
    category: 'Sponsored Content',
  },
];

const themeColors = {
  bib: {
    primary: '#B87333',
    secondary: '#F5E6D3',
    gradient: 'from-[#B87333]/20 to-transparent',
    border: 'border-[#B87333]/30',
    hover: 'hover:border-[#B87333]/60',
    tag: 'bg-[#B87333]/20 text-[#F5E6D3]',
  },
  redemption: {
    primary: '#FD9419',
    secondary: '#FFB347',
    gradient: 'from-[#FD9419]/20 to-transparent',
    border: 'border-[#FD9419]/30',
    hover: 'hover:border-[#FD9419]/60',
    tag: 'bg-[#FD9419]/20 text-[#FFB347]',
  },
};

export default function ArticlesSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section
      id="articles"
      ref={ref}
      className="relative py-24 md:py-32 bg-[#FAFAF8] noise-overlay"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-[#E8D4B8]/20 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full bg-[#FCD9A0]/20 blur-3xl" />
      </div>

      <div className="container-custom relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="decorative-line mx-auto mb-6" />
          <h2 className="text-4xl md:text-5xl font-bold text-gradient mb-4">
            Featured Stories
          </h2>
          <p className="text-lg text-[#4A4A4A] max-w-2xl mx-auto">
            Dive deeper into the world of premium American whiskey with exclusive content
            from Whisky Advocate.
          </p>
        </motion.div>

        {/* Articles Grid */}
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {articles.map((article, index) => {
            const colors = themeColors[article.brand];
            return (
              <motion.article
                key={article.id}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className={`group relative rounded-2xl overflow-hidden border ${colors.border} ${colors.hover} transition-all duration-500 bg-white shadow-sm hover:shadow-md`}
              >
                {/* Image placeholder */}
                <div className={`relative aspect-[16/9] bg-gradient-to-br ${colors.gradient} overflow-hidden`}>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <svg
                        className="w-16 h-16 mx-auto mb-3 opacity-20"
                        style={{ color: colors.primary }}
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" />
                      </svg>
                      <p className="text-[#8B8B8B] text-sm">Article Image Placeholder</p>
                    </div>
                  </div>
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-500" />
                </div>

                {/* Content */}
                <div className="p-6 md:p-8">
                  {/* Tags */}
                  <div className="flex items-center gap-3 mb-4">
                    <span className={`text-xs px-3 py-1 rounded-full ${colors.tag}`}>
                      {article.brand === 'bib' ? 'Bib & Tucker' : 'Redemption'}
                    </span>
                    <span className="text-xs text-[#8B8B8B]">{article.category}</span>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl md:text-2xl font-semibold text-[#1A1A1A] mb-3 group-hover:text-[#C4956A] transition-colors duration-300 font-serif">
                    {article.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-[#4A4A4A] leading-relaxed mb-6">{article.excerpt}</p>

                  {/* Footer */}
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-[#8B8B8B]">{article.readTime}</span>
                    <motion.button
                      whileHover={{ x: 5 }}
                      className="flex items-center gap-2 text-sm font-medium"
                      style={{ color: colors.primary }}
                    >
                      Read Article
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                      </svg>
                    </motion.button>
                  </div>
                </div>

                {/* Decorative corner accent */}
                <div
                  className="absolute top-0 right-0 w-24 h-24 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: `radial-gradient(circle at top right, ${colors.primary}30 0%, transparent 70%)`,
                  }}
                />
              </motion.article>
            );
          })}
        </div>

        {/* Additional content teaser */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <div className="glass-card inline-block px-8 py-6 rounded-2xl">
            <p className="text-[#4A4A4A] mb-4">
              More stories and exclusive content coming soon.
            </p>
            <button className="btn-outline text-sm">
              Subscribe to Updates
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
