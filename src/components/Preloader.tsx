'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function Preloader() {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsLoading(false), 500);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 100);

    // Fallback: hide after max 2.5 seconds
    const timeout = setTimeout(() => {
      setProgress(100);
      setTimeout(() => setIsLoading(false), 300);
    }, 2500);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[200] flex items-center justify-center"
          style={{ background: '#1A1410' }}
        >
          {/* Animated background */}
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              animate={{
                scale: [1, 1.3, 1],
                rotate: [0, 180, 360],
              }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] opacity-20"
              style={{
                background: 'conic-gradient(from 0deg, #C85A36, #BDA55D, #FD9419, #C85A36)',
                filter: 'blur(100px)',
              }}
            />
          </div>

          <div className="relative text-center">
            {/* Logo animation */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="mb-8"
            >
              {/* Animated rings */}
              <div className="relative w-32 h-32 mx-auto">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    animate={{ rotate: i % 2 === 0 ? 360 : -360 }}
                    transition={{
                      duration: 3 + i,
                      repeat: Infinity,
                      ease: 'linear',
                    }}
                    className="absolute inset-0 rounded-full"
                    style={{
                      border: `2px solid ${i === 0 ? '#C85A36' : i === 1 ? '#BDA55D' : '#FD9419'}`,
                      opacity: 0.3 - i * 0.1,
                      transform: `scale(${1 + i * 0.3})`,
                    }}
                  />
                ))}

                {/* Center logo */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-20 h-20 rounded-2xl flex items-center justify-center"
                    style={{
                      background: 'linear-gradient(135deg, rgba(200, 90, 54, 0.3), rgba(189, 165, 93, 0.2))',
                      border: '1px solid rgba(189, 165, 93, 0.3)',
                    }}
                  >
                    <span className="text-2xl font-bold" style={{ color: '#BDA55D' }}>
                      WA
                    </span>
                  </motion.div>
                </div>
              </div>
            </motion.div>

            {/* Brand name */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="mb-8"
            >
              <h1
                className="text-2xl font-bold tracking-wide mb-2"
                style={{
                  background: 'linear-gradient(135deg, #C85A36, #BDA55D, #FD9419)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                DEUTSCH SPIRITS HUB
              </h1>
              <p className="text-sm tracking-widest uppercase" style={{ color: 'rgba(255, 255, 255, 0.5)' }}>
                Presented by Whisky Advocate
              </p>
            </motion.div>

            {/* Progress bar */}
            <motion.div
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: 200 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="mx-auto"
            >
              <div
                className="h-1 rounded-full overflow-hidden"
                style={{ background: 'rgba(255, 255, 255, 0.1)' }}
              >
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min(progress, 100)}%` }}
                  transition={{ duration: 0.3 }}
                  className="h-full rounded-full"
                  style={{
                    background: 'linear-gradient(90deg, #C85A36, #BDA55D, #FD9419)',
                  }}
                />
              </div>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="mt-3 text-xs"
                style={{ color: 'rgba(255, 255, 255, 0.4)' }}
              >
                {Math.min(Math.round(progress), 100)}%
              </motion.p>
            </motion.div>

            {/* Loading text with dots animation */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="mt-6 flex items-center justify-center gap-1"
            >
              <span className="text-xs" style={{ color: 'rgba(255, 255, 255, 0.4)' }}>
                Loading
              </span>
              {[0, 1, 2].map((i) => (
                <motion.span
                  key={i}
                  animate={{ opacity: [0.4, 1, 0.4] }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    delay: i * 0.2,
                  }}
                  className="text-xs"
                  style={{ color: 'rgba(255, 255, 255, 0.4)' }}
                >
                  .
                </motion.span>
              ))}
            </motion.div>
          </div>

          {/* Exit animation overlay */}
          <motion.div
            initial={{ scaleY: 0 }}
            animate={{ scaleY: progress >= 100 ? 1 : 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 origin-bottom"
            style={{ background: '#FAFAF8' }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
