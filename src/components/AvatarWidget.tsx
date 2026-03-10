'use client';

import { useRef, useState, useEffect, useCallback } from 'react';
import * as did from '@d-id/client-sdk';
import { motion, AnimatePresence } from 'framer-motion';

const agentId = process.env.NEXT_PUBLIC_DID_AGENT_ID;

export default function AvatarWidget() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const agentRef = useRef<Awaited<ReturnType<typeof did.createAgentManager>> | null>(null);
  const [expanded, setExpanded] = useState(false);
  const [status, setStatus] = useState<'idle' | 'loading' | 'ready' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);

  const connect = useCallback(async () => {
    if (!agentId?.trim()) {
      setStatus('error');
      setErrorMessage('Set NEXT_PUBLIC_DID_AGENT_ID in .env.local (create an agent at studio.d-id.com)');
      return;
    }

    setStatus('loading');
    setErrorMessage(null);

    try {
      const res = await fetch('/api/d-id/client-key');
      const data = await res.json();
      if (!res.ok || !data.clientKey) {
        setStatus('error');
        setErrorMessage(data.error || data.details || 'Could not get D-ID client key');
        return;
      }

      const callbacks = {
        onSrcObjectReady(value: MediaStream) {
          if (videoRef.current) {
            videoRef.current.srcObject = value;
            setStatus('ready');
          }
        },
        onConnectionStateChange(state: string) {
          if (state === 'failed' || state === 'disconnected') {
            setStatus('idle');
          }
        },
        onNewMessage() {},
      };

      const manager = await did.createAgentManager(agentId, {
        auth: { type: 'key', clientKey: data.clientKey },
        callbacks,
        streamOptions: { compatibilityMode: 'auto', streamWarmup: true },
      });

      agentRef.current = manager;
      await manager.connect();
    } catch (e) {
      setStatus('error');
      setErrorMessage(e instanceof Error ? e.message : String(e));
    }
  }, []);

  const disconnect = useCallback(async () => {
    if (agentRef.current) {
      try {
        await agentRef.current.disconnect();
      } catch {}
      agentRef.current = null;
    }
    setStatus('idle');
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
  }, []);

  useEffect(() => {
    return () => {
      if (agentRef.current) {
        agentRef.current.disconnect().catch(() => {});
      }
    };
  }, []);

  const handleOpen = () => {
    setExpanded(true);
    if (status === 'idle') {
      connect();
    }
  };

  const handleClose = () => {
    setExpanded(false);
    disconnect();
  };

  const handleSendMessage = async () => {
    const text = message.trim();
    if (!text || !agentRef.current || sending) return;
    setSending(true);
    try {
      await agentRef.current.chat(text);
      setMessage('');
    } catch (e) {
      console.error('Chat error:', e);
    } finally {
      setSending(false);
    }
  };

  if (!agentId?.trim()) {
    return (
      <div
        className="fixed bottom-20 right-6 z-40 w-16 h-16 rounded-full flex items-center justify-center text-white text-xs text-center p-2 border-2 border-amber-500/50"
        style={{ background: 'linear-gradient(135deg, #C85A36, #BDA55D)' }}
        title="Set NEXT_PUBLIC_DID_AGENT_ID in .env.local"
      >
        D-ID
      </div>
    );
  }

  return (
    <>
      {/* Collapsed: bottom-right circle */}
      {!expanded && (
        <motion.button
          onClick={handleOpen}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          className="fixed bottom-20 right-6 z-40 w-16 h-16 rounded-full shadow-xl flex items-center justify-center overflow-hidden border-2 border-[#BDA55D]/40"
          style={{ background: 'linear-gradient(135deg, #C85A36, #BDA55D)' }}
          aria-label="Open bartender avatar"
        >
          <span className="text-2xl" aria-hidden>🍸</span>
        </motion.button>
      )}

      {/* Expanded: bar environment overlay */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#1a1410]/95"
          >
            <button
              onClick={handleClose}
              className="absolute top-6 right-6 z-10 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
              aria-label="Close"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="w-full max-w-2xl mx-6 flex flex-col gap-4">
              <div className="rounded-2xl overflow-hidden border border-[#BDA55D]/30 shadow-2xl bg-[#2D2926] aspect-video flex items-center justify-center">
                {status === 'loading' && (
                  <div className="text-center text-white/80 px-6">
                    <p>Connecting to bartender…</p>
                    <p className="text-sm mt-2 text-white/60">First connection takes 3–5 seconds while WebRTC negotiates.</p>
                  </div>
                )}
                {status === 'error' && (
                  <div className="text-center text-white/90 px-6">
                    <p className="font-medium mb-2">Avatar unavailable</p>
                    <p className="text-sm text-white/70">{errorMessage}</p>
                    <button
                      onClick={connect}
                      className="mt-4 px-4 py-2 rounded-lg bg-white/20 hover:bg-white/30 text-sm"
                    >
                      Retry
                    </button>
                  </div>
                )}
                {status === 'ready' && (
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted={false}
                    className="w-full h-full object-contain"
                  />
                )}
              </div>
              {status === 'ready' && (
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Type a message…"
                    className="flex-1 px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#BDA55D]/50"
                    disabled={sending}
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={!message.trim() || sending}
                    className="px-6 py-3 rounded-xl font-medium transition-opacity disabled:opacity-50"
                    style={{ background: 'linear-gradient(135deg, #C85A36, #BDA55D)', color: '#fff' }}
                  >
                    {sending ? '…' : 'Send'}
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
