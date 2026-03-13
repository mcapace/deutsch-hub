'use client';

import { useState } from 'react';

export default function BarKeep() {
  const [expanded, setExpanded] = useState(false);
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);
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
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {expanded && (
        <div className="px-3 py-1.5 rounded-full text-xs font-medium tracking-widest uppercase bg-warm border border-rule text-ink">
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
          width: expanded ? 360 : 72,
          height: expanded ? 420 : 72,
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
              <div className="flex-shrink-0 p-4 border-b border-rule" style={{ background: '#F7F2E8' }}>
                <div className="font-display text-sm" style={{ color: '#1E1408' }}>The Bar Keep</div>
                <div className="text-[10px] tracking-widest uppercase" style={{ color: '#5C534D' }}>Bib & Tucker · Redemption</div>
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
                  className="flex-1 px-4 py-3 rounded-lg text-sm bg-warm border border-rule text-ink placeholder-muted focus:outline-none focus:border-copper"
                  disabled={sending}
                />
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSendMessage();
                  }}
                  disabled={!message.trim() || sending}
                  className="px-5 py-3 rounded-lg font-medium text-sm disabled:opacity-50 bg-copper text-white"
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
