'use client';

import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function ScrollProgress() {
  const [showBackToTop, setShowBackToTop] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Progress bar at top */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 z-[60] origin-left"
        style={{
          scaleX,
          background: 'linear-gradient(90deg, #C85A36, #BDA55D, #FD9419)',
        }}
      />

      {/* Back to top button */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            whileHover={{ scale: 1.1, y: -4 }}
            whileTap={{ scale: 0.95 }}
            onClick={scrollToTop}
            className="fixed bottom-8 left-8 z-50 w-12 h-12 rounded-full flex items-center justify-center cursor-pointer"
            style={{
              background: 'linear-gradient(135deg, #C85A36, #A04830)',
              boxShadow: '0 4px 20px rgba(200, 90, 54, 0.4), 0 0 0 4px rgba(200, 90, 54, 0.1)',
            }}
          >
            <motion.svg
              animate={{ y: [0, -2, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-5 h-5 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 15l7-7 7 7" />
            </motion.svg>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Circular progress indicator (alternative view) */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed bottom-8 left-8 z-40 w-12 h-12 pointer-events-none"
          >
            <svg className="w-full h-full -rotate-90" viewBox="0 0 48 48">
              <circle
                cx="24"
                cy="24"
                r="20"
                fill="none"
                stroke="rgba(200, 90, 54, 0.2)"
                strokeWidth="3"
              />
              <motion.circle
                cx="24"
                cy="24"
                r="20"
                fill="none"
                stroke="url(#progressGradient)"
                strokeWidth="3"
                strokeLinecap="round"
                style={{
                  pathLength: scrollYProgress,
                  strokeDasharray: 1,
                  strokeDashoffset: 0,
                }}
              />
              <defs>
                <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#C85A36" />
                  <stop offset="50%" stopColor="#BDA55D" />
                  <stop offset="100%" stopColor="#FD9419" />
                </linearGradient>
              </defs>
            </svg>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
