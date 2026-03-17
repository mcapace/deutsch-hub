'use client';

import { useState, useEffect, useLayoutEffect } from 'react';
import { storiesArticles } from '@/data/articles';

const HASH_PREFIX = 'story-';

function getArticleIdFromHash(): string | null {
  if (typeof window === 'undefined') return null;
  const hash = window.location.hash.slice(1);
  return hash.startsWith(HASH_PREFIX) ? hash.slice(HASH_PREFIX.length) : null;
}

function getArticleIdFromSearch(): string | null {
  if (typeof window === 'undefined') return null;
  const params = new URLSearchParams(window.location.search);
  return params.get('story');
}

function getArticleIdFromUrl(): string | null {
  return getArticleIdFromHash() || getArticleIdFromSearch();
}

function getArticleFromUrl(): (typeof storiesArticles)[0] | null {
  const id = getArticleIdFromUrl();
  return id ? (storiesArticles.find((a) => a.id === id) ?? null) : null;
}

const STORAGE_KEY = 'deutsch-open-story';

export default function Stories() {
  const [selected, setSelected] = useState<typeof storiesArticles[0] | null>(null);

  // Sync modal to URL (hash #story-{id} or query ?story={id})
  const syncFromUrl = () => {
    const article = getArticleFromUrl();
    setSelected(article ?? null);
    if (article) {
      document.getElementById('stories')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  useLayoutEffect(() => {
    let openedFromStorage = false;
    try {
      const storedId = typeof window !== 'undefined' ? sessionStorage.getItem(STORAGE_KEY) : null;
      if (storedId) {
        sessionStorage.removeItem(STORAGE_KEY);
        const article = storiesArticles.find((a) => a.id === storedId) ?? null;
        if (article) {
          setSelected(article);
          openedFromStorage = true;
          document.getElementById('stories')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
          window.history.replaceState(null, '', window.location.pathname + window.location.search + '#' + HASH_PREFIX + article.id);
        }
      }
    } catch (_) {}
    if (!openedFromStorage) syncFromUrl();
    window.addEventListener('hashchange', syncFromUrl);
    window.addEventListener('popstate', syncFromUrl);
    window.addEventListener('load', syncFromUrl);
    return () => {
      window.removeEventListener('hashchange', syncFromUrl);
      window.removeEventListener('popstate', syncFromUrl);
      window.removeEventListener('load', syncFromUrl);
    };
  }, []);

  // Multiple fallbacks: URL can be set late (redirects, SPA) or hash stripped then restored
  useEffect(() => {
    const timers = [100, 350, 700, 1200].map((ms) => window.setTimeout(syncFromUrl, ms));
    return () => timers.forEach((t) => window.clearTimeout(t));
  }, []);

  const openStory = (article: typeof storiesArticles[0]) => {
    setSelected(article);
    const base = window.location.pathname + window.location.search;
    const hash = `#${HASH_PREFIX}${article.id}`;
    window.history.replaceState(null, '', base + hash);
  };

  const closeStory = () => {
    setSelected(null);
    const hasStoryHash = window.location.hash.startsWith('#' + HASH_PREFIX);
    const hasStoryQuery = new URLSearchParams(window.location.search).has('story');
    if (hasStoryHash || hasStoryQuery) {
      const params = new URLSearchParams(window.location.search);
      params.delete('story');
      const q = params.toString();
      window.history.replaceState(null, '', window.location.pathname + (q ? '?' + q : '') + '#stories');
    }
  };

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
              onClick={() => openStory(article)}
              onKeyDown={(e) => e.key === 'Enter' && openStory(article)}
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
          onClick={closeStory}
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
              <button type="button" onClick={closeStory} className="text-muted hover:text-ink p-2" aria-label="Close">
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
