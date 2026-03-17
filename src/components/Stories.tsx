'use client';

import { useState } from 'react';
import { storiesArticles } from '@/data/articles';

export default function Stories() {
  const [selected, setSelected] = useState<typeof storiesArticles[0] | null>(null);

  return (
    <section className="bg-white py-20 lg:py-28" id="stories">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <header className="text-center mb-14" data-reveal>
          <span className="font-display text-mist text-sm block mb-2">03</span>
          <h2 className="font-display text-4xl lg:text-5xl text-ink mb-4">Featured <span className="italic text-copper">Stories</span></h2>
          <p className="text-muted max-w-2xl mx-auto">
            Discover the heritage, craftsmanship, and stories behind American whiskey.
          </p>
        </header>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto">
          {storiesArticles.map((article) => (
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
                <span className="text-muted text-xs">{article.readTime}</span>
              </div>
              <h3 className="font-display text-2xl lg:text-3xl text-ink mb-4 group-hover:text-copper transition-colors">
                {article.title}
              </h3>
              <p className="text-muted leading-relaxed mb-6">{article.excerpt}</p>
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
                <span className="text-muted text-xs">{selected.readTime}</span>
              </div>
              <button type="button" onClick={() => setSelected(null)} className="text-muted hover:text-ink p-2" aria-label="Close">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            <h2 className="font-display text-3xl text-ink mb-6">{selected.title}</h2>
            <div className="prose prose-lg max-w-none text-muted">
              {selected.content.split('\n\n').filter((p) => p.trim()).map((paragraph, index) => {
                const isHeading = paragraph.startsWith('**') && paragraph.endsWith('**');
                if (isHeading) {
                  return (
                    <h3 key={index} className="font-display text-xl text-ink mt-8 mb-3 first:mt-0">
                      {paragraph.replace(/\*\*/g, '')}
                    </h3>
                  );
                }
                return (
                  <p key={index} className="leading-relaxed mb-4">
                    {paragraph}
                  </p>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
