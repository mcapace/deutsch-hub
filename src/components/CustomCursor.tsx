'use client';

import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function CustomCursor() {
  const [isPointer, setIsPointer] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [isMobile, setIsMobile] = useState(true);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 400 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Check if mobile/touch device
    const checkMobile = () => {
      setIsMobile(window.matchMedia('(pointer: coarse)').matches || window.innerWidth < 1024);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isClickable = Boolean(
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.closest('button') ||
        target.closest('a') ||
        target.closest('[role="button"]') ||
        window.getComputedStyle(target).cursor === 'pointer'
      );

      setIsPointer(isClickable);
    };

    const handleMouseLeave = () => setIsHidden(true);
    const handleMouseEnter = () => setIsHidden(false);

    if (!isMobile) {
      window.addEventListener('mousemove', moveCursor);
      window.addEventListener('mouseover', handleMouseOver);
      document.body.addEventListener('mouseleave', handleMouseLeave);
      document.body.addEventListener('mouseenter', handleMouseEnter);
    }

    return () => {
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
      document.body.removeEventListener('mouseleave', handleMouseLeave);
      document.body.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [cursorX, cursorY, isMobile]);

  if (isMobile) return null;

  return (
    <>
      {/* Main cursor dot */}
      <motion.div
        className="fixed top-0 left-0 z-[9999] pointer-events-none mix-blend-difference"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        <motion.div
          animate={{
            scale: isPointer ? 2.5 : 1,
            opacity: isHidden ? 0 : 1,
          }}
          transition={{ duration: 0.2 }}
          className="w-3 h-3 rounded-full"
          style={{ background: '#FFFFFF' }}
        />
      </motion.div>

      {/* Cursor ring */}
      <motion.div
        className="fixed top-0 left-0 z-[9998] pointer-events-none"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        <motion.div
          animate={{
            scale: isPointer ? 1.5 : 1,
            opacity: isHidden ? 0 : 0.5,
            borderColor: isPointer ? '#BDA55D' : '#C85A36',
          }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="w-10 h-10 rounded-full border-2"
          style={{
            borderColor: '#C85A36',
            background: isPointer ? 'rgba(189, 165, 93, 0.1)' : 'transparent',
          }}
        />
      </motion.div>

      {/* Trailing particles on hover */}
      {isPointer && (
        <>
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="fixed top-0 left-0 z-[9997] pointer-events-none"
              style={{
                x: cursorXSpring,
                y: cursorYSpring,
                translateX: '-50%',
                translateY: '-50%',
              }}
            >
              <motion.div
                initial={{ scale: 0, opacity: 0.5 }}
                animate={{
                  scale: [0, 1.5, 0],
                  opacity: [0.5, 0.2, 0],
                }}
                transition={{
                  duration: 0.8,
                  delay: i * 0.1,
                  repeat: Infinity,
                  repeatDelay: 0.3,
                }}
                className="w-2 h-2 rounded-full"
                style={{ background: i % 2 === 0 ? '#C85A36' : '#BDA55D' }}
              />
            </motion.div>
          ))}
        </>
      )}

      {/* Hide default cursor globally */}
      <style jsx global>{`
        @media (pointer: fine) and (min-width: 1024px) {
          * {
            cursor: none !important;
          }
        }
      `}</style>
    </>
  );
}
