'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

type ParallaxSectionProps = {
  children: React.ReactNode;
  /** Vertical movement speed as fraction of scroll (e.g. 0.1 = 10% of scroll). Positive = moves up slower. */
  speed?: number;
  /** Optional: separate speed for a background layer (creates depth) */
  backgroundSpeed?: number;
  className?: string;
  id?: string;
};

export default function ParallaxSection({
  children,
  speed = 0.08,
  backgroundSpeed,
  className = '',
  id,
}: ParallaxSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [60 * speed, 0, 0, -60 * speed]);
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.5, 0.8, 1], [0.97, 0.99, 1, 0.99, 0.97]);
  const yBg = backgroundSpeed != null
    ? useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [80 * backgroundSpeed, 0, 0, -80 * backgroundSpeed])
    : null;

  return (
    <motion.div
      ref={ref as React.RefObject<HTMLDivElement>}
      id={id}
      className={className}
      style={{ position: 'relative', overflow: 'hidden' }}
    >
      {yBg != null && (
        <motion.div
          aria-hidden
          style={{
            position: 'absolute',
            inset: 0,
            y: yBg,
            pointerEvents: 'none',
            zIndex: 0,
          }}
        />
      )}
      <motion.div style={{ y, scale, position: 'relative', zIndex: 1, transformOrigin: 'center center' }}>
        {children}
      </motion.div>
    </motion.div>
  );
}
