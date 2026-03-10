'use client';

import { useRef, useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const presenterId = process.env.NEXT_PUBLIC_DID_PRESENTER_ID;

function useDIDStream() {
  const pcRef = useRef<RTCPeerConnection | null>(null);
  const sessionRef = useRef<{ streamId: string; sessionId: string } | null>(null);

  const call = useCallback(async (action: string, payload: Record<string, unknown>) => {
    const res = await fetch('/api/d-id', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action, ...payload }),
    });
    if (!res.ok) throw new Error(`D-ID ${action} failed: ${await res.text()}`);
    return res.json();
  }, []);

  const connect = useCallback(
    async (videoEl: HTMLVideoElement) => {
      const session = await call('create', {});
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

export default function AvatarWidget() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const { connect, speak, disconnect } = useDIDStream();
  const [expanded, setExpanded] = useState(false);
  const [status, setStatus] = useState<'idle' | 'connecting' | 'connected' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);
  const hasVideo = status === 'connected';

  const initConnection = useCallback(async () => {
    if (status !== 'idle' || !presenterId?.trim()) {
      if (!presenterId?.trim()) setStatus('error');
      return;
    }
    if (!videoRef.current) return;
    setStatus('connecting');
    setErrorMessage(null);
    try {
      await connect(videoRef.current);
      setStatus('connected');
    } catch (err) {
      console.error('D-ID connect failed:', err);
      setStatus('error');
      setErrorMessage(err instanceof Error ? err.message : String(err));
    }
  }, [status, connect]);

  useEffect(() => {
    const t = setTimeout(() => initConnection(), 800);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    return () => {
      disconnect();
    };
  }, [disconnect]);

  const handleBubbleClick = () => {
    if (status === 'error') {
      setStatus('idle');
      setTimeout(() => initConnection(), 100);
    } else {
      setExpanded(!expanded);
    }
  };

  const handleSendMessage = async () => {
    const text = message.trim();
    if (!text || sending) return;
    setSending(true);
    setMessage('');
    try {
      // All API keys stay server-side: chat → /api/chat (Anthropic), then speak → /api/d-id (D-ID).
      const chatRes = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text }),
      });
      const chatData = chatRes.ok ? (await chatRes.json()) as { text?: string } : null;
      const toSpeak = chatData?.text?.trim() || text;
      await speak(toSpeak);
    } catch (e) {
      console.error('Send error:', e);
    } finally {
      setSending(false);
    }
  };

  if (!presenterId?.trim()) {
    return (
      <div
        className="fixed bottom-6 right-6 z-50 w-[72px] h-[72px] rounded-full flex items-center justify-center border-2 border-amber-500/50"
        style={{ background: 'linear-gradient(135deg, #C85A36, #BDA55D)' }}
        title="Set NEXT_PUBLIC_DID_PRESENTER_ID in .env.local"
      >
        <span className="text-2xl">🍸</span>
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium tracking-widest uppercase"
            style={{
              background: 'rgba(26,20,16,0.92)',
              border: '1px solid rgba(189,165,93,0.5)',
              color: '#BDA55D',
              backdropFilter: 'blur(8px)',
            }}
          >
            {status === 'connecting' ? 'Connecting…' : status === 'error' ? 'Tap to retry' : 'The Bar Keep'}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        layout
        animate={{
          width: expanded ? 320 : 72,
          height: expanded ? 380 : 72,
          borderRadius: expanded ? 16 : 36,
        }}
        transition={{ type: 'spring', stiffness: 260, damping: 28 }}
        onClick={handleBubbleClick}
        className="relative overflow-hidden cursor-pointer select-none"
        style={{
          background: '#120A02',
          border: '2px solid rgba(189,165,93,0.4)',
          boxShadow: '0 4px 24px rgba(0,0,0,0.6)',
        }}
      >
        {/* Video — always mounted so WebRTC can attach; visibility toggled */}
        <video
          ref={videoRef}
          autoPlay
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          style={{
            objectPosition: 'center 10%',
            opacity: hasVideo && expanded ? 1 : 0,
            pointerEvents: hasVideo && expanded ? 'auto' : 'none',
            transition: 'opacity 0.4s ease',
          }}
        />

        {/* Collapsed: icon + connecting ring or error */}
        <AnimatePresence>
          {!expanded && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex items-center justify-center"
              style={{ background: 'linear-gradient(160deg, #2C1A0A, #120A02)' }}
            >
              <span className="text-3xl">🥃</span>
              {status === 'connecting' && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div
                    className="absolute w-16 h-16 rounded-full border-2 border-transparent animate-spin"
                    style={{ borderTopColor: '#C85A36', borderRightColor: 'rgba(200,90,54,0.2)' }}
                  />
                </div>
              )}
              {status === 'error' && (
                <div className="absolute bottom-1 left-0 right-0 flex justify-center">
                  <span className="text-xs text-amber-800">tap to retry</span>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Expanded: connecting overlay */}
        <AnimatePresence>
          {expanded && status === 'connecting' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex flex-col items-center justify-center gap-3"
              style={{ background: '#120A02' }}
            >
              <div
                className="w-10 h-10 rounded-full border-2 border-transparent animate-spin"
                style={{ borderTopColor: '#BDA55D', borderRightColor: 'rgba(189,165,93,0.25)' }}
              />
              <span className="text-xs tracking-widest uppercase text-amber-700">Connecting…</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Expanded: error */}
        <AnimatePresence>
          {expanded && status === 'error' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-6"
              style={{ background: '#120A02' }}
            >
              <p className="text-sm text-amber-200/90 text-center">{errorMessage}</p>
              <button
                onClick={(e) => { e.stopPropagation(); setStatus('idle'); setTimeout(() => initConnection(), 100); }}
                className="px-4 py-2 rounded-lg text-sm font-medium bg-white/10 hover:bg-white/20 text-amber-100"
              >
                Retry
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Expanded: chat input when connected */}
        <AnimatePresence>
          {expanded && status === 'connected' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute bottom-0 left-0 right-0 p-4 flex gap-2"
              style={{ background: 'linear-gradient(transparent, rgba(18,10,2,0.96))' }}
              onClick={(e) => e.stopPropagation()}
            >
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Type a message…"
                className="flex-1 px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-amber-500/50 text-sm"
                disabled={sending}
              />
              <button
                onClick={handleSendMessage}
                disabled={!message.trim() || sending}
                className="px-5 py-3 rounded-xl font-medium text-sm disabled:opacity-50"
                style={{ background: 'linear-gradient(135deg, #C85A36, #BDA55D)', color: '#fff' }}
              >
                {sending ? '…' : 'Send'}
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Name plate when expanded + connected */}
        <AnimatePresence>
          {expanded && status === 'connected' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute bottom-14 left-0 right-0 px-4 py-2"
              style={{ background: 'linear-gradient(transparent, rgba(18,10,2,0.7))' }}
            >
              <div className="font-serif text-sm font-bold text-amber-200">The Bar Keep</div>
              <div className="text-[10px] tracking-widest uppercase text-amber-700/90">Bib & Tucker · Redemption</div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
