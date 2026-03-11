'use client';

import { useRef, useState, useEffect, useCallback } from 'react';

export default function BarKeep() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const peerConnection = useRef<RTCPeerConnection | null>(null);
  const streamIdRef = useRef<string | null>(null);
  const sessionIdRef = useRef<string | null>(null);
  const initAttempted = useRef(false);

  const [sessionId, setSessionId] = useState<string | null>(null);
  const [expanded, setExpanded] = useState(false);
  const [status, setStatus] = useState<'idle' | 'connecting' | 'connected' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);
  const [messages, setMessages] = useState<Array<{ role: 'user' | 'assistant'; text: string }>>([
    {
      role: 'assistant',
      text: "Pull up a stool. I know these bottles inside out — Gold Roast's coffee magic, the Double Char's sugar maple smoke, Redemption's rye revival. What can I pour you?",
    },
  ]);
  const [isAvatarActive, setIsAvatarActive] = useState(false);

  const initSession = useCallback(async () => {
    if (initAttempted.current) return;
    initAttempted.current = true;

    setStatus('connecting');
    setErrorMessage(null);

    try {
      // 1. Create D-ID stream session
      const createRes = await fetch('/api/d-id', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'create' }),
      });

      if (!createRes.ok) {
        const errData = await createRes.json().catch(() => ({}));
        throw new Error((errData as { error?: string }).error || `Create failed: ${createRes.status}`);
      }

      const data = await createRes.json();
      const id = data.streamId ?? data.id;
      const session_id = data.sessionId ?? data.session_id;
      const offer = data.offer;
      const ice_servers = data.iceServers ?? data.ice_servers ?? [];

      const sessionIdToUse = session_id || id;
      streamIdRef.current = id;
      sessionIdRef.current = sessionIdToUse;
      setSessionId(sessionIdToUse);

      // 2. Create RTCPeerConnection with D-ID's ICE servers
      const pc = new RTCPeerConnection({
        iceServers: Array.isArray(ice_servers) && ice_servers.length > 0 ? ice_servers : [{ urls: 'stun:stun.l.google.com:19302' }],
      });
      peerConnection.current = pc;

      // 3. CRITICAL: attach stream to video element when track arrives
      pc.ontrack = (event) => {
        console.log('Got track:', event.track.kind, event.streams);
        if (event.track.kind === 'audio') {
          return;
        }
        if (event.track.kind === 'video' && event.streams?.[0]) {
          const video = videoRef.current;
          if (video) {
            video.srcObject = event.streams[0];
            video.muted = true;
            console.log('srcObject set:', video.srcObject);
            const tryPlay = () => {
              video
                .play()
                .then(() => console.log('Playing!'))
                .catch((e) => {
                  console.log('Play failed, retrying...', e.message);
                  setTimeout(tryPlay, 500);
                });
            };
            setTimeout(tryPlay, 100);
            setIsAvatarActive(true);
          }
        }
      };

      // 4. Handle ICE candidates
      pc.onicecandidate = async (event) => {
        if (event.candidate && streamIdRef.current && sessionIdRef.current) {
          try {
            await fetch('/api/d-id', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                action: 'ice',
                streamId: streamIdRef.current,
                sessionId: sessionIdRef.current,
                candidate: event.candidate,
              }),
            });
          } catch (e) {
            console.error('ICE send error:', e);
          }
        }
      };

      // 5. Set remote description from D-ID offer
      await pc.setRemoteDescription(new RTCSessionDescription(offer));

      // 6. Create and set local answer
      const answer = await pc.createAnswer();
      await pc.setLocalDescription(answer);

      // 7. Send answer back to D-ID
      const sdpRes = await fetch('/api/d-id', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'sdp',
          streamId: streamIdRef.current,
          sessionId: sessionIdToUse,
          offer: answer,
        }),
      });
      if (!sdpRes.ok) {
        const errData = await sdpRes.json().catch(() => ({}));
        throw new Error((errData as { error?: string }).error || 'SDP failed');
      }

      setStatus('connected');
      console.log('D-ID WebRTC session established:', sessionIdToUse);
    } catch (err) {
      console.error('D-ID init failed:', err);
      initAttempted.current = false;
      setStatus('error');
      setErrorMessage(err instanceof Error ? err.message : String(err));
    }
  }, []);

  useEffect(() => {
    const t = setTimeout(() => {
      if (videoRef.current) initSession();
    }, 1500);
    return () => clearTimeout(t);
  }, [initSession]);

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    const onEnd = () => setIsAvatarActive(false);
    el.addEventListener('ended', onEnd);
    el.addEventListener('pause', onEnd);
    return () => {
      el.removeEventListener('ended', onEnd);
      el.removeEventListener('pause', onEnd);
    };
  }, []);

  useEffect(() => {
    return () => {
      peerConnection.current?.close();
      peerConnection.current = null;
      streamIdRef.current = null;
      sessionIdRef.current = null;
    };
  }, []);

  const handleBubbleClick = () => {
    if (status === 'error') {
      initAttempted.current = false;
      setStatus('idle');
      setErrorMessage(null);
      setTimeout(() => initSession(), 200);
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
      // Get Claude reply
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [
            ...messages.map((m) => ({ role: m.role, content: m.text })),
            { role: 'user' as const, content: text },
          ],
        }),
      });
      const chatData = await res.json();
      const reply = (chatData.reply ?? chatData.text ?? '').trim() || 'Sorry, I couldn’t get a reply. Try again.';

      // Add reply to chat
      setMessages((prev) => [...prev, { role: 'assistant', text: reply }]);

      // Send to D-ID ONLY if session is active
      const sid = streamIdRef.current;
      const sessId = sessionIdRef.current;
      const pc = peerConnection.current;
      if (sessId && sid && pc?.connectionState === 'connected') {
        setIsAvatarActive(true);
        try {
          await fetch('/api/d-id', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              action: 'talk',
              streamId: sid,
              sessionId: sessId,
              text: reply,
            }),
          });
        } catch (e) {
          console.error('D-ID talk error:', e);
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
          background: '#FDFAF5',
          border: '2px solid var(--rule)',
          boxShadow: '0 4px 24px rgba(30,20,8,0.12)',
        }}
      >
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          style={{ width: '100%', height: '200px', background: '#000', display: 'block' }}
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
                setStatus('idle');
                setErrorMessage(null);
                setTimeout(() => initSession(), 200);
              }}
              className="px-4 py-2 rounded-lg text-sm font-medium bg-white/10 hover:bg-white/20 text-amber-100"
            >
              Retry
            </button>
          </div>
        )}

        {expanded && status === 'connected' && (
          <>
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
