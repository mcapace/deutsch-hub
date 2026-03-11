'use client';

import { useRef, useState, useEffect, useCallback } from 'react';

type CreateSession = {
  streamId: string;
  sessionId: string;
  offer: RTCSessionDescriptionInit;
  iceServers?: RTCIceServer[];
};

function useDIDStream() {
  const pcRef = useRef<RTCPeerConnection | null>(null);
  const sessionRef = useRef<{ streamId: string; sessionId: string } | null>(null);

  const call = useCallback(async (action: string, payload: Record<string, unknown>) => {
    const res = await fetch('/api/d-id', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action, ...payload }),
    });
    const text = await res.text();
    if (!res.ok) {
      let msg = text;
      try {
        const j = JSON.parse(text) as { error?: string; details?: { description?: string } };
        msg = j.error ?? j.details?.description ?? text;
      } catch {
        /* use text as-is */
      }
      const err = new Error(`D-ID ${action} failed: ${msg}`);
      (err as Error & { status?: number }).status = res.status;
      throw err;
    }
    return JSON.parse(text) as Promise<Record<string, unknown>>;
  }, []);

  const connect = useCallback(
    async (videoEl: HTMLVideoElement) => {
      const session = (await call('create', {})) as CreateSession;
      sessionRef.current = { streamId: session.streamId, sessionId: session.sessionId };

      const peer = new RTCPeerConnection({
        iceServers: session.iceServers?.length ? session.iceServers : [{ urls: 'stun:stun.l.google.com:19302' }],
      });
      pcRef.current = peer;

      peer.ontrack = (e) => {
        if (e.streams?.[0]) {
          videoEl.srcObject = e.streams[0];
          videoEl.play().catch(() => {});
        } else {
          const stream = new MediaStream();
          stream.addTrack(e.track);
          videoEl.srcObject = stream;
          videoEl.play().catch(() => {});
        }
      };

      peer.onicecandidate = (event) => {
        if (event.candidate && sessionRef.current) {
          call('ice', {
            streamId: sessionRef.current.streamId,
            sessionId: sessionRef.current.sessionId,
            candidate: event.candidate,
          }).catch(console.error);
        }
      };

      await peer.setRemoteDescription(new RTCSessionDescription(session.offer));
      const answer = await peer.createAnswer();
      await peer.setLocalDescription(answer);

      await call('sdp', {
        streamId: session.streamId,
        sessionId: session.sessionId,
        offer: answer,
      });
    },
    [call]
  );

  const speak = useCallback(
    async (text: string) => {
      if (!sessionRef.current) return;
      await call('talk', {
        streamId: sessionRef.current.streamId,
        sessionId: sessionRef.current.sessionId,
        text,
      });
    },
    [call]
  );

  const disconnect = useCallback(async () => {
    if (sessionRef.current) {
      await call('destroy', sessionRef.current).catch(console.error);
      sessionRef.current = null;
    }
    pcRef.current?.close();
    pcRef.current = null;
  }, [call]);

  return { connect, speak, disconnect };
}

export default function BarKeep() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const initStartedRef = useRef(false);
  const initAttempted = useRef(false);
  const { connect, speak, disconnect } = useDIDStream();
  const [expanded, setExpanded] = useState(false);
  const [status, setStatus] = useState<'idle' | 'connecting' | 'connected' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);
  const [messages, setMessages] = useState<Array<{ role: 'user' | 'assistant'; text: string }>>([]);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const hasVideo = status === 'connected';

  // When video ends or pauses, hide the video panel
  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    const onEnd = () => setIsSpeaking(false);
    el.addEventListener('ended', onEnd);
    el.addEventListener('pause', onEnd);
    return () => {
      el.removeEventListener('ended', onEnd);
      el.removeEventListener('pause', onEnd);
    };
  }, []);

  const initConnection = useCallback(async () => {
    if (initAttempted.current) return;
    initAttempted.current = true;
    if (initStartedRef.current) return;
    const el = videoRef.current;
    if (!el) return;
    initStartedRef.current = true;
    setStatus('connecting');
    setErrorMessage(null);
    try {
      await connect(el);
      setStatus('connected');
    } catch (err) {
      initStartedRef.current = false;
      console.error('D-ID connect failed:', err);
      setStatus('error');
      const msg = err instanceof Error ? err.message : String(err);
      setErrorMessage(msg);
    }
  }, [connect]);

  useEffect(() => {
    // Ensure video element is in DOM before connecting (next tick + short delay)
    const t = setTimeout(() => {
      if (videoRef.current) initConnection();
    }, 1500);
    return () => clearTimeout(t);
  }, [initConnection]);

  useEffect(() => {
    return () => {
      disconnect();
    };
  }, [disconnect]);

  const handleBubbleClick = () => {
    if (status === 'error') {
      initAttempted.current = false;
      initStartedRef.current = false;
      setStatus('idle');
      setErrorMessage(null);
      setTimeout(() => initConnection(), 200);
    } else {
      setExpanded(!expanded);
    }
  };

  const handleSendMessage = async () => {
    const text = message.trim();
    if (!text || sending) return;
    setSending(true);
    setMessage('');
    setMessages((prev) => [...prev, { role: 'user', text }]);
    try {
      const chatRes = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [
            ...messages.map((m) => ({ role: m.role, content: m.text })),
            { role: 'user' as const, content: text },
          ],
        }),
      });
      const chatData = chatRes.ok ? ((await chatRes.json()) as { reply?: string }) : null;
      const replyText = chatData?.reply?.trim() || 'Sorry, I couldn’t get a reply. Try again.';
      if (!chatRes.ok) {
        setMessages((prev) => [...prev, { role: 'assistant', text: replyText }]);
      } else {
        setMessages((prev) => [...prev, { role: 'assistant', text: replyText }]);
        if (status === 'connected') {
          setIsSpeaking(true);
          try {
            await speak(replyText);
          } catch (e) {
            console.error('D-ID speak error:', e);
            setIsSpeaking(false);
          }
        }
      }
    } catch (e) {
      console.error('Send error:', e);
      setMessages((prev) => [...prev, { role: 'assistant', text: 'Sorry, something went wrong.' }]);
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {expanded && (
        <div className="px-3 py-1.5 rounded-full text-xs font-medium tracking-widest uppercase bg-warm border border-rule text-ink">
          {status === 'connecting' ? 'Connecting…' : status === 'error' ? 'Tap to retry' : 'The Bar Keep'}
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
          background: 'var(--white)',
          border: '2px solid var(--rule)',
          boxShadow: '0 4px 24px rgba(30,20,8,0.12)',
        }}
      >
        <video
          ref={videoRef}
          autoPlay
          playsInline
          className={isSpeaking && expanded ? 'block w-full aspect-video object-cover bg-ink flex-shrink-0' : 'hidden'}
          style={{ objectPosition: 'center 10%' }}
        />

        {!expanded && (
          <div className="absolute inset-0 flex items-center justify-center bg-copper rounded-[36px]">
            <span className="text-3xl" aria-hidden>🥃</span>
            {status === 'connecting' && (
              <div className="absolute inset-0 flex items-center justify-center rounded-[36px] bg-copper/90">
                <div className="w-10 h-10 rounded-full border-2 border-white/30 border-t-amber animate-spin" />
              </div>
            )}
            {status === 'error' && (
              <span className="absolute bottom-1 left-0 right-0 text-center text-xs text-amber-200">tap to retry</span>
            )}
          </div>
        )}

        {expanded && status === 'connecting' && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-ink rounded-2xl">
            <div className="w-10 h-10 rounded-full border-2 border-amber/30 border-t-amber animate-spin" />
            <span className="text-xs tracking-widest uppercase text-amber-200">Connecting…</span>
          </div>
        )}

        {expanded && status === 'error' && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-6 bg-ink rounded-2xl">
            <p className="text-sm text-amber-200/90 text-center">{errorMessage}</p>
            <p className="text-xs text-amber-200/50 text-center max-w-[260px]">
              {errorMessage?.includes('401') && 'Check D_ID_API_KEY at studio.d-id.com. '}
              {(errorMessage?.includes('402') || errorMessage?.includes('403')) && 'Trial may be expired; upgrade at studio.d-id.com.'}
            </p>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                initAttempted.current = false;
                initStartedRef.current = false;
                setStatus('idle');
                setErrorMessage(null);
                setTimeout(() => initConnection(), 200);
              }}
              className="px-4 py-2 rounded-lg text-sm font-medium bg-white/10 hover:bg-white/20 text-amber-100"
            >
              Retry
            </button>
          </div>
        )}

        {expanded && status === 'connected' && (
          <>
            <div className="flex flex-col flex-1 min-h-0 border-b border-rule rounded-t-2xl">
              <div className="flex-shrink-0 p-4 bg-warm border-b border-rule">
                <div className="font-display text-sm text-ink">The Bar Keep</div>
                <div className="text-[10px] tracking-widest uppercase text-muted">Bib & Tucker · Redemption</div>
              </div>
              <div className="flex-1 min-h-0 overflow-y-auto p-4 space-y-3 bg-white">
                {messages.length === 0 && (
                  <div className="bg-warm border-l-2 border-copper p-3 rounded text-sm text-ink">
                    What can I pour you? Ask about Bib & Tucker, Redemption, or a cocktail.
                  </div>
                )}
                {messages.map((m, i) => (
                  <div
                    key={i}
                    className={`p-3 rounded text-sm ${m.role === 'user' ? 'bg-copper text-white ml-8' : 'bg-warm border-l-2 border-copper text-ink'}`}
                  >
                    {m.text}
                  </div>
                ))}
              </div>
              <div
                className="flex-shrink-0 p-4 flex gap-2 bg-white border-t border-rule rounded-b-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Type a message…"
                  className="flex-1 px-4 py-3 rounded-lg text-sm bg-warm border border-rule text-ink placeholder-muted focus:outline-none focus:border-copper"
                  disabled={sending}
                />
                <button
                  type="button"
                  onClick={handleSendMessage}
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
