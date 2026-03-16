'use client';

import { useState, useEffect } from 'react';

export default function BarKeep() {
  const [expanded, setExpanded] = useState(false);
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);
  const [isOverFooter, setIsOverFooter] = useState(false);
  const [isOverHero, setIsOverHero] = useState(true);
  const [messages, setMessages] = useState<Array<{ role: 'user' | 'assistant'; text: string }>>([
    {
      role: 'assistant',
      text: "Pull up a stool. I know these bottles inside out — Gold Roast's coffee magic, the Double Char's sugar maple smoke, Redemption's rye revival. What can I pour you?",
    },
  ]);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [isAvatarLoading, setIsAvatarLoading] = useState(false);

  async function speakWithAvatar(text: string) {
    setIsAvatarLoading(true);
    try {
      const createRes = await fetch('/api/d-id', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'talk', text }),
      });
      const createData = await createRes.json();
      const { id, status, result_url } = createData;
      console.log('Talk response:', { id, status, result_url });
      if (!createRes.ok || !id) {
        setIsAvatarLoading(false);
        return;
      }

      if (result_url) {
        setVideoUrl(result_url);
        setIsAvatarLoading(false);
        return;
      }

      for (let i = 0; i < 30; i++) {
        await new Promise((r) => setTimeout(r, 1000));
        const pollRes = await fetch('/api/d-id', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ action: 'get', talk_id: id }),
        });
        const pollData = await pollRes.json();
        console.log('Poll:', pollData.status, pollData.result_url);
        if (pollData.status === 'done' && pollData.result_url) {
          setVideoUrl(pollData.result_url);
          setIsAvatarLoading(false);
          return;
        }
        if (pollData.status === 'error') {
          console.error('D-ID error:', pollData);
          setIsAvatarLoading(false);
          return;
        }
      }
    } catch (err) {
      console.error('Avatar error:', err);
    }
    setIsAvatarLoading(false);
  }

  const handleBubbleClick = () => {
    setExpanded(!expanded);
  };

  useEffect(() => {
    const footer = document.getElementById('site-footer');
    if (!footer) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsOverFooter(entry.isIntersecting);
        });
      },
      { threshold: 0, rootMargin: '0px 0px 0px 0px' }
    );
    observer.observe(footer);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const hero = document.getElementById('hero');
    if (!hero) return;
    const checkOverHero = () => {
      const rect = hero.getBoundingClientRect();
      const x = typeof window !== 'undefined' ? window.innerWidth - 140 : 0;
      const y = typeof window !== 'undefined' ? window.innerHeight - 100 : 0;
      const over = rect.left <= x && rect.right >= x && rect.top <= y && rect.bottom >= y;
      setIsOverHero(over);
    };
    checkOverHero();
    window.addEventListener('scroll', checkOverHero, { passive: true });
    window.addEventListener('resize', checkOverHero);
    return () => {
      window.removeEventListener('scroll', checkOverHero);
      window.removeEventListener('resize', checkOverHero);
    };
  }, []);

  const handleSendMessage = async () => {
    const userText = message.trim();
    if (!userText || sending) return;

    const newMessages = [
      ...messages.map((m) => ({ role: m.role, content: m.text })),
      { role: 'user' as const, content: userText },
    ];
    setMessages((prev) => [...prev, { role: 'user', text: userText }]);
    setMessage('');
    setSending(true);

    try {
      const chatRes = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages }),
      });
      const chatData = await chatRes.json();
      const reply = (chatData.reply ?? chatData.text ?? '').trim() || 'Sorry, I couldn’t get a reply. Try again.';

      setMessages((prev) => [...prev, { role: 'assistant', text: reply }]);

      speakWithAvatar(reply);
    } catch (err) {
      console.error('Send error:', err);
      setMessages((prev) => [...prev, { role: 'assistant', text: 'Sorry, something went wrong.' }]);
    } finally {
      setSending(false);
    }
  };

  return (
    <div
      className="fixed z-50 flex flex-col items-end gap-2 right-4 bottom-4 sm:right-6 sm:bottom-6"
      style={{ paddingRight: 'max(1rem, env(safe-area-inset-right))', paddingBottom: 'max(1rem, env(safe-area-inset-bottom))' }}
    >
      {!expanded && (
        <div
          className={`px-3 py-2 rounded-full text-[10px] font-medium tracking-widest uppercase shadow-sm max-w-[calc(100vw-5rem)] sm:max-w-none transition-colors duration-300 ${
            isOverHero || isOverFooter
              ? 'text-white bg-white/10 border border-white/20'
              : 'text-ink/90 bg-warm/95 border border-rule'
          }`}
        >
          <span className="sm:hidden">Chat with the Bar Keep</span>
          <span className="hidden sm:inline">Tap to chat with the Bar Keep</span>
        </div>
      )}
      {expanded && (
        <div
          className={`px-3 py-1.5 rounded-full text-xs font-medium tracking-widest uppercase border transition-colors duration-300 ${
            isOverHero || isOverFooter
              ? 'text-white bg-white/10 border-white/20'
              : 'bg-warm border-rule text-ink'
          }`}
        >
          The Bar Keep
        </div>
      )}

      <div
        role="button"
        tabIndex={0}
        onClick={handleBubbleClick}
        onKeyDown={(e) => e.key === 'Enter' && handleBubbleClick()}
        className={`relative overflow-hidden cursor-pointer select-none transition-all duration-300 ease-out ${expanded ? 'flex flex-col' : ''}`}
        style={{
          width: expanded ? 'min(360px, calc(100vw - 2rem))' : 72,
          height: expanded ? 'min(420px, 85vh)' : 72,
          borderRadius: expanded ? 16 : 36,
          background: '#FDFAF5',
          border: '2px solid var(--rule)',
          boxShadow: '0 4px 24px rgba(30,20,8,0.12)',
        }}
      >
        {!expanded && (
          <div className="absolute inset-0 flex items-center justify-center bg-copper rounded-[36px]">
            <span className="text-3xl" aria-hidden>🥃</span>
          </div>
        )}

        {expanded && (
          <>
            <div style={{ background: '#0d0500', borderRadius: '8px 8px 0 0', overflow: 'hidden' }}>
              {videoUrl ? (
                <video
                  key={videoUrl}
                  src={videoUrl}
                  autoPlay
                  playsInline
                  controls={false}
                  style={{ width: '100%', display: 'block' }}
                  onEnded={() => setVideoUrl(null)}
                />
              ) : isAvatarLoading ? (
                <div
                  style={{
                    height: '180px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'rgba(196,135,62,0.7)',
                    fontSize: 13,
                  }}
                >
                  The Bar Keep is thinking...
                </div>
              ) : null}
            </div>

            <div
              className="flex flex-col flex-1 min-h-0 border-b border-rule rounded-t-2xl"
              onClick={(e) => e.stopPropagation()}
              onKeyDown={(e) => e.stopPropagation()}
            >
              <div className="flex-shrink-0 p-4 pr-12 border-b border-rule relative" style={{ background: '#F7F2E8' }}>
                <div className="font-display text-sm" style={{ color: '#1E1408' }}>The Bar Keep</div>
                <div className="text-[10px] tracking-widest uppercase" style={{ color: '#5C534D' }}>Bib & Tucker · Redemption</div>
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); setExpanded(false); }}
                  className="absolute top-2 right-2 min-w-[44px] min-h-[44px] w-11 h-11 flex items-center justify-center rounded-full text-ink/70 hover:bg-rule/30 hover:text-ink active:bg-rule/40 transition-colors touch-manipulation"
                  aria-label="Close"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M18 6L6 18M6 6l12 12" /></svg>
                </button>
              </div>
              <div className="flex-1 min-h-0 overflow-y-auto p-4 space-y-3" style={{ background: '#FDFAF5' }}>
                {messages.length === 0 && (
                  <div className="rounded text-sm" style={{ background: '#F7F2E8', color: '#1E1408', borderLeft: '3px solid #A0622A', padding: '12px 16px' }}>
                    What can I pour you? Ask about Bib & Tucker, Redemption, or a cocktail.
                  </div>
                )}
                {messages.map((m, i) => (
                  <div
                    key={i}
                    className="rounded text-sm"
                    style={
                      m.role === 'user'
                        ? { background: '#A0622A', color: 'white', padding: '12px 16px', marginLeft: '2rem' }
                        : { background: '#F7F2E8', color: '#1E1408', borderLeft: '3px solid #A0622A', padding: '12px 16px' }
                    }
                  >
                    {m.text}
                  </div>
                ))}
              </div>
              <div
                className="flex-shrink-0 p-4 flex gap-2 border-t border-rule"
                style={{ background: '#FDFAF5' }}
                onClick={(e) => e.stopPropagation()}
              >
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      e.stopPropagation();
                      handleSendMessage();
                    }
                  }}
                  placeholder="Type a message…"
                  className="flex-1 min-h-[44px] px-4 py-3 rounded-lg text-base sm:text-sm bg-warm border border-rule text-ink placeholder-muted focus:outline-none focus:border-copper"
                  disabled={sending}
                />
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSendMessage();
                  }}
                  disabled={!message.trim() || sending}
                  className="min-h-[44px] min-w-[44px] px-5 py-3 rounded-lg font-medium text-sm disabled:opacity-50 bg-copper text-white touch-manipulation"
                >
                  {sending ? '…' : 'Send'}
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
