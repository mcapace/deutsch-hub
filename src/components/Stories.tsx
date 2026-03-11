'use client';

import { useState } from 'react';

interface Article {
  id: string;
  title: string;
  excerpt: string;
  brand: 'bib' | 'redemption';
  readTime: string;
}

const articles: Article[] = [
  {
    id: 'coffee-bourbon',
    title: 'Coffee, Bourbon, and the Rituals That Connect Us',
    excerpt: 'At the turn of the twentieth century, two rituals bookended the American day. Fresh-roasted coffee warmed early mornings—fuel for the work ahead. Smooth bourbon brought people together at day\'s end.',
    brand: 'bib',
    readTime: '8 min read',
  },
  {
    id: 'rye-revival',
    title: 'America\'s Original Spirit: How Rye Whiskey Lost a Century—and Found Its Way Back',
    excerpt: 'Before there was bourbon, there was rye. The story of rye whiskey begins with America\'s story. Now, for the first time in a century, rye is back at the forefront.',
    brand: 'redemption',
    readTime: '10 min read',
  },
];

export default function Stories() {
  const [selected, setSelected] = useState<Article | null>(null);

  return (
    <section className="bg-white py-20 lg:py-28" id="stories">
      <div className="max-w-6xl mx-auto px-6">
        <header className="text-center mb-14" data-reveal>
          <span className="font-display text-mist text-sm block mb-2">03</span>
          <h2 className="font-display text-4xl lg:text-5xl text-ink mb-4">Featured <span className="italic text-copper">Stories</span></h2>
          <p className="text-fog max-w-2xl mx-auto">
            Discover the heritage, craftsmanship, and stories behind American whiskey.
          </p>
        </header>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto">
          {articles.map((article) => (
            <article
              key={article.id}
              data-reveal
              role="button"
              tabIndex={0}
              onClick={() => setSelected(article)}
              onKeyDown={(e) => e.key === 'Enter' && setSelected(article)}
              className="bg-white border border-rule p-8 lg:p-10 hover:bg-warm transition-colors cursor-pointer group"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="text-[8px] font-semibold uppercase tracking-[0.28em] text-copper">
                  {article.brand === 'bib' ? 'Bib & Tucker' : 'Redemption'}
                </span>
                <span className="text-fog text-xs">{article.readTime}</span>
              </div>
              <h3 className="font-display text-2xl lg:text-3xl text-ink mb-4 group-hover:text-copper transition-colors">
                {article.title}
              </h3>
              <p className="text-fog leading-relaxed mb-6">{article.excerpt}</p>
              <span className="text-copper text-sm font-medium after:content-['→'] after:ml-1">Read Full Story</span>
            </article>
          ))}
        </div>
      </div>

      {selected && (
        <div
          className="fixed inset-0 z-50 overflow-y-auto bg-ink/90 flex items-center justify-center p-4"
          onClick={() => setSelected(null)}
        >
          <div
            className="max-w-2xl w-full bg-white border border-rule p-8 max-h-[85vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-3">
                <span className="text-[9px] uppercase tracking-wider text-copper">{selected.brand === 'bib' ? 'Bib & Tucker' : 'Redemption'}</span>
                <span className="text-fog text-xs">{selected.readTime}</span>
              </div>
              <button type="button" onClick={() => setSelected(null)} className="text-fog hover:text-ink p-2" aria-label="Close">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            <h2 className="font-display text-3xl text-ink mb-4">{selected.title}</h2>
            <p className="text-fog leading-relaxed">{selected.excerpt}</p>
            <p className="text-fog text-sm mt-4">Full story content can be loaded from a CMS or static copy.</p>
          </div>
        </div>
      )}
    </section>
  );
}
