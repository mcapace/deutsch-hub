'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function AgeGate() {
  const [isVisible, setIsVisible] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);

  useEffect(() => {
    // Check if user has already verified age
    const ageVerified = localStorage.getItem('ageVerified');
    if (!ageVerified) {
      setIsVisible(true);
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';
    }
  }, []);

  const handleVerify = () => {
    setIsVerifying(true);
    setTimeout(() => {
      localStorage.setItem('ageVerified', 'true');
      document.body.style.overflow = '';
      setIsVisible(false);
    }, 800);
  };

  const handleDecline = () => {
    window.location.href = 'https://responsibility.org/';
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          style={{ background: 'rgba(26, 20, 16, 0.95)' }}
        >
          {/* Animated background elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {/* Liquid blobs */}
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                x: [0, 30, 0],
                y: [0, -20, 0],
              }}
              transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute top-1/4 left-1/4 w-[400px] h-[400px] rounded-full blur-[100px] opacity-30"
              style={{ background: 'linear-gradient(135deg, #C85A36, #BDA55D)' }}
            />
            <motion.div
              animate={{
                scale: [1.2, 1, 1.2],
                x: [0, -30, 0],
                y: [0, 20, 0],
              }}
              transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] rounded-full blur-[80px] opacity-25"
              style={{ background: 'linear-gradient(135deg, #FD9419, #D4A04A)' }}
            />

            {/* Floating particles */}
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                initial={{
                  x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
                  y: (typeof window !== 'undefined' ? window.innerHeight : 800) + 50,
                  opacity: 0,
                }}
                animate={{
                  y: -50,
                  opacity: [0, 0.6, 0],
                }}
                transition={{
                  duration: 8 + Math.random() * 6,
                  repeat: Infinity,
                  delay: Math.random() * 5,
                  ease: 'linear',
                }}
                className="absolute w-1 h-1 rounded-full"
                style={{ background: i % 2 === 0 ? '#BDA55D' : '#C85A36' }}
              />
            ))}
          </div>

          {/* Modal content */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: -30 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-lg"
          >
            {/* Glowing border effect */}
            <div
              className="absolute -inset-px rounded-3xl blur-sm"
              style={{ background: 'linear-gradient(135deg, #C85A36, #BDA55D, #FD9419)' }}
            />

            {/* Main card */}
            <div
              className="relative rounded-3xl p-8 md:p-12 text-center overflow-hidden"
              style={{
                background: 'linear-gradient(180deg, rgba(26, 20, 16, 0.98) 0%, rgba(26, 20, 16, 0.95) 100%)',
                border: '1px solid rgba(189, 165, 93, 0.2)',
              }}
            >
              {/* Decorative top line */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-1 rounded-b-full"
                style={{ background: 'linear-gradient(90deg, #C85A36, #BDA55D)' }}
              />

              {/* Logo area */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="mb-8"
              >
                <div className="flex items-center justify-center gap-4 mb-4">
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center"
                    style={{ background: 'linear-gradient(135deg, rgba(200, 90, 54, 0.3), rgba(189, 165, 93, 0.2))' }}
                  >
                    <span className="text-2xl font-bold" style={{ color: '#BDA55D' }}>
                      WA
                    </span>
                  </div>
                </div>
                <h2
                  className="text-2xl md:text-3xl font-bold mb-2"
                  style={{ color: '#FFFFFF' }}
                >
                  Welcome to
                </h2>
                <h1
                  className="text-3xl md:text-4xl font-bold"
                  style={{
                    background: 'linear-gradient(135deg, #C85A36, #BDA55D, #FD9419)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  Deutsch Spirits Hub
                </h1>
              </motion.div>

              {/* Age verification badge */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.4, duration: 0.5, type: 'spring', stiffness: 200 }}
                className="inline-flex items-center justify-center w-24 h-24 rounded-full mb-8"
                style={{
                  background: 'linear-gradient(135deg, rgba(200, 90, 54, 0.2), rgba(189, 165, 93, 0.1))',
                  border: '2px solid rgba(189, 165, 93, 0.3)',
                }}
              >
                <span
                  className="text-4xl font-bold"
                  style={{ color: '#BDA55D' }}
                >
                  21+
                </span>
              </motion.div>

              {/* Question */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="mb-8"
              >
                <p
                  className="text-lg md:text-xl mb-2"
                  style={{ color: '#FFFFFF' }}
                >
                  Are you of legal drinking age?
                </p>
                <p
                  className="text-sm"
                  style={{ color: 'rgba(255, 255, 255, 0.6)' }}
                >
                  You must be 21 or older to enter this site
                </p>
              </motion.div>

              {/* Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                className="flex flex-col sm:flex-row gap-4 justify-center"
              >
                <motion.button
                  onClick={handleVerify}
                  disabled={isVerifying}
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="relative px-10 py-4 rounded-xl font-semibold text-white overflow-hidden transition-all"
                  style={{
                    background: 'linear-gradient(135deg, #C85A36, #A04830)',
                    boxShadow: '0 4px 20px rgba(200, 90, 54, 0.4)',
                  }}
                >
                  {isVerifying ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mx-auto"
                    />
                  ) : (
                    <>
                      <span className="relative z-10">Yes, I'm 21+</span>
                      <motion.div
                        className="absolute inset-0"
                        initial={{ x: '-100%' }}
                        whileHover={{ x: '100%' }}
                        transition={{ duration: 0.5 }}
                        style={{
                          background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
                        }}
                      />
                    </>
                  )}
                </motion.button>

                <motion.button
                  onClick={handleDecline}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-10 py-4 rounded-xl font-semibold transition-all"
                  style={{
                    background: 'transparent',
                    border: '2px solid rgba(255, 255, 255, 0.2)',
                    color: 'rgba(255, 255, 255, 0.7)',
                  }}
                >
                  No, I'm Under 21
                </motion.button>
              </motion.div>

              {/* Legal text */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.6 }}
                className="mt-8 text-xs leading-relaxed"
                style={{ color: 'rgba(255, 255, 255, 0.4)' }}
              >
                By entering this site, you agree to our Terms of Service and Privacy Policy.
                <br />
                Please drink responsibly.
              </motion.p>

              {/* Brand logos */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 0.6 }}
                className="mt-8 flex items-center justify-center gap-8"
              >
                <span className="text-sm font-semibold" style={{ color: '#C85A36' }}>
                  Bib & Tucker
                </span>
                <div
                  className="w-px h-4"
                  style={{ background: 'rgba(189, 165, 93, 0.3)' }}
                />
                <span className="text-sm font-semibold" style={{ color: '#FD9419' }}>
                  Redemption
                </span>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
