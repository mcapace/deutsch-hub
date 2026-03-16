'use client';

import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';

const styles: Record<string, React.CSSProperties> = {
  heroWrap: {
    position: 'relative',
    width: '100%',
    minHeight: '100vh',
    background: '#0b0806',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: "'Didact Gothic', sans-serif",
  },
  grain: {
    position: 'absolute',
    inset: 0,
    zIndex: 1,
    opacity: 0.04,
    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
    backgroundSize: '128px',
    pointerEvents: 'none',
  },
  vignette: {
    position: 'absolute',
    inset: 0,
    background: 'radial-gradient(ellipse at center, transparent 30%, rgba(5,3,2,0.88) 100%)',
    zIndex: 2,
    pointerEvents: 'none',
  },
  lightSweep: {
    position: 'absolute',
    top: 0,
    left: '-120%',
    width: '60%',
    height: '100%',
    background: 'linear-gradient(105deg, transparent 0%, rgba(200,140,50,0.04) 40%, rgba(220,160,70,0.10) 50%, rgba(200,140,50,0.04) 60%, transparent 100%)',
    zIndex: 3,
    pointerEvents: 'none',
  },
  glowBase: {
    position: 'absolute',
    bottom: '-80px',
    left: '50%',
    transform: 'translateX(-50%)',
    width: '700px',
    height: '300px',
    background: 'radial-gradient(ellipse at center bottom, rgba(180,100,20,0.20) 0%, rgba(140,70,10,0.08) 50%, transparent 75%)',
    zIndex: 1,
    pointerEvents: 'none',
  },
  horizon: {
    position: 'absolute',
    bottom: '130px',
    left: '50%',
    transform: 'translateX(-50%)',
    width: '300px',
    height: '0.5px',
    background: 'linear-gradient(90deg, transparent, rgba(200,155,70,0.6) 20%, rgba(220,175,90,0.9) 50%, rgba(200,155,70,0.6) 80%, transparent)',
    zIndex: 4,
    pointerEvents: 'none',
  },
  heroContent: {
    position: 'relative',
    zIndex: 10,
    textAlign: 'center',
    padding: '2.5rem 1.5rem 280px',
    width: '100%',
  },
  eyebrow: {
    fontFamily: "'Didact Gothic', sans-serif",
    fontSize: '10px',
    letterSpacing: '0.4em',
    textTransform: 'uppercase',
    color: 'rgba(200,155,70,0.7)',
    marginBottom: '1.2rem',
    display: 'block',
  },
  heroTitle: {
    fontFamily: "'Playfair Display', serif",
    fontSize: 'clamp(38px, 6vw, 68px)',
    fontWeight: 400,
    color: '#f0e6d0',
    lineHeight: 1.05,
    marginBottom: '0.4rem',
  },
  heroTitleEm: {
    fontStyle: 'italic',
    color: '#c8924a',
  },
  heroDivider: {
    width: '40px',
    height: '0.5px',
    background: 'rgba(200,155,70,0.5)',
    margin: '1.2rem auto',
  },
  heroSub: {
    fontSize: '12px',
    letterSpacing: '0.1em',
    color: 'rgba(210,190,155,0.5)',
    textTransform: 'uppercase',
    marginBottom: '1.8rem',
  },
  heroCtas: {
    display: 'flex',
    gap: '10px',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  btnGold: {
    background: 'linear-gradient(135deg, #c8924a, #a8722a)',
    color: '#0b0806',
    border: 'none',
    padding: '12px 28px',
    fontFamily: "'Didact Gothic', sans-serif",
    fontSize: '10px',
    letterSpacing: '0.25em',
    textTransform: 'uppercase',
    cursor: 'pointer',
    borderRadius: '1px',
    textDecoration: 'none',
    display: 'inline-block',
    transition: 'opacity 0.2s',
  },
  btnOutline: {
    background: 'transparent',
    color: 'rgba(200,155,70,0.8)',
    border: '0.5px solid rgba(200,155,70,0.35)',
    padding: '12px 28px',
    fontFamily: "'Didact Gothic', sans-serif",
    fontSize: '10px',
    letterSpacing: '0.25em',
    textTransform: 'uppercase',
    cursor: 'pointer',
    borderRadius: '1px',
    textDecoration: 'none',
    display: 'inline-block',
    transition: 'border-color 0.2s, color 0.2s',
  },
  bottles: {
    position: 'absolute',
    bottom: 0,
    left: '50%',
    transform: 'translateX(-50%)',
    width: '100%',
    maxWidth: '640px',
    height: '460px',
    zIndex: 5,
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'center',
    perspective: '1200px',
    perspectiveOrigin: '50% 100%',
  },
  bottleLeft: {
    width: '200px',
    height: '400px',
    objectFit: 'contain',
    objectPosition: 'bottom center',
    filter: 'brightness(0.85) contrast(1.05)',
  },
  bottleRight: {
    width: '200px',
    height: '400px',
    objectFit: 'contain',
    objectPosition: 'bottom center',
    filter: 'brightness(0.80) contrast(1.08)',
  },
  bottleShadow: {
    position: 'absolute',
    bottom: '30px',
    left: '50%',
    transform: 'translateX(-50%)',
    width: '280px',
    height: '30px',
    background: 'radial-gradient(ellipse, rgba(0,0,0,0.55) 0%, transparent 70%)',
    zIndex: 4,
    filter: 'blur(8px)',
    pointerEvents: 'none',
  },
  brandBar: {
    position: 'absolute',
    bottom: '44px',
    left: '50%',
    transform: 'translateX(-50%)',
    zIndex: 10,
    display: 'flex',
    gap: '24px',
    alignItems: 'center',
  },
  brandTag: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '3px',
  },
  brandTagName: {
    fontSize: '9px',
    letterSpacing: '0.3em',
    textTransform: 'uppercase',
    color: 'rgba(200,155,70,0.55)',
  },
  brandTagSub: {
    fontSize: '8px',
    letterSpacing: '0.15em',
    textTransform: 'uppercase',
    color: 'rgba(200,155,70,0.25)',
  },
  brandDot: {
    width: '3px',
    height: '3px',
    borderRadius: '50%',
    background: 'rgba(200,155,70,0.3)',
  },
  scrollCue: {
    position: 'absolute',
    right: '24px',
    bottom: '50px',
    zIndex: 10,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '6px',
  },
  scrollBar: {
    width: '0.5px',
    height: '36px',
    background: 'linear-gradient(to bottom, rgba(200,155,70,0.6), transparent)',
  },
  scrollLabel: {
    fontSize: '8px',
    letterSpacing: '0.3em',
    textTransform: 'uppercase',
    color: 'rgba(200,155,70,0.35)',
    writingMode: 'vertical-rl',
  },
  tickerWrap: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    overflow: 'hidden',
    borderTop: '0.5px solid rgba(200,155,70,0.12)',
    background: 'rgba(11,8,6,0.8)',
    padding: '7px 0',
  },
  tickerTrack: {
    display: 'flex',
    width: 'max-content',
  },
  tickerInner: {
    display: 'flex',
    alignItems: 'center',
  },
  tickerItem: {
    fontSize: '9px',
    letterSpacing: '0.3em',
    textTransform: 'uppercase',
    color: 'rgba(200,155,70,0.4)',
    padding: '0 1.5rem',
    whiteSpace: 'nowrap',
  },
  tickerDot: {
    color: 'rgba(200,155,70,0.2)',
    fontSize: '6px',
  },
};

export default function HeroSection() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [6, -6]), { stiffness: 50, damping: 20 });
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [4, -4]), { stiffness: 50, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };
  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <section
      id="hero"
      style={styles.heroWrap}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div style={styles.grain} />
      <div style={styles.vignette} />
      <div style={styles.lightSweep} className="hero-sweep-el" />
      <div style={styles.glowBase} />
      <div style={styles.horizon} />

      <div style={{ ...styles.heroContent, perspective: '1000px' }}>
        <p style={styles.eyebrow} className="hero-eyebrow">
          Whisky Advocate &nbsp;×&nbsp; Deutsch Family Wine &amp; Spirits
        </p>
        <h1 style={styles.heroTitle}>
          <motion.span
            style={{ display: 'block' }}
            initial={{ opacity: 0, x: -80, filter: 'blur(8px)' }}
            animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.7, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            The Art of
          </motion.span>
          <motion.em
            style={styles.heroTitleEm}
            initial={{ opacity: 0, scale: 0.5, y: 60, rotateX: -25 }}
            animate={{ opacity: 1, scale: 1, y: 0, rotateX: 0 }}
            transition={{
              duration: 1,
              delay: 0.75,
              type: 'spring',
              stiffness: 120,
              damping: 14,
              mass: 0.8,
            }}
          >
            American Whiskey
          </motion.em>
        </h1>
        <div style={styles.heroDivider} className="hero-divider-el" />
        <p style={styles.heroSub} className="hero-sub-el">
          Bib &amp; Tucker &nbsp;·&nbsp; Gold Roast &nbsp;·&nbsp; Redemption
        </p>
        <div style={{ ...styles.heroCtas, perspective: '800px' }} className="hero-ctas-el">
          <motion.a
            href="#collection"
            style={styles.btnGold}
            className="btn-gold-el"
            whileHover={{ scale: 1.03, rotateX: 2, rotateY: 2, boxShadow: '0 12px 28px rgba(200,140,50,0.25)' }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 400, damping: 17 }}
          >
            Explore Collection
          </motion.a>
          <motion.a
            href="#cocktails"
            style={styles.btnOutline}
            className="btn-outline-el"
            whileHover={{ scale: 1.02, rotateX: 1, rotateY: 1, borderColor: 'rgba(200,155,70,0.7)', color: 'rgba(200,155,70,1)' }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 400, damping: 17 }}
          >
            Cocktail Recipes
          </motion.a>
        </div>
      </div>

      <div style={styles.bottles}>
        <motion.div
          style={{
            perspective: '1200px',
            transformStyle: 'preserve-3d',
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'center',
            gap: '2rem',
          }}
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <motion.div
            style={{ transformStyle: 'preserve-3d', transformOrigin: 'bottom center', rotateY, rotateX }}
          >
            <img
              src="/Bib & Tucker Bottle Images/BT_FY24_Classic 6_New Bottles_BS_Render.png"
              alt="Bib & Tucker Classic Six"
              className="hero-bottle-left-el"
              style={styles.bottleLeft}
            />
          </motion.div>
          <motion.div
            style={{ transformStyle: 'preserve-3d', transformOrigin: 'bottom center', rotateY, rotateX }}
          >
            <img
              src="/Redemption Bottle Images/Redpt_FY27_FLOW_Pho_BS_AmW_HR Bour_Ind_750ML.png"
              alt="Redemption Bourbon"
              className="hero-bottle-right-el"
              style={styles.bottleRight}
            />
          </motion.div>
        </motion.div>
      </div>

      <div style={styles.bottleShadow} />

      <div style={styles.brandBar} className="hero-brand-bar-el">
        <div style={styles.brandTag}>
          <span style={styles.brandTagName}>Bib &amp; Tucker</span>
          <span style={styles.brandTagSub}>Tennessee Bourbon</span>
        </div>
        <div style={styles.brandDot} />
        <div style={styles.brandTag}>
          <span style={styles.brandTagName}>Redemption</span>
          <span style={styles.brandTagSub}>American Rye</span>
        </div>
      </div>

      <motion.div
        style={styles.scrollCue}
        className="hero-scroll-cue-el"
        animate={{ y: [0, 6, 0], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div style={styles.scrollBar} className="hero-scroll-bar-el" />
        <span style={styles.scrollLabel}>Scroll</span>
      </motion.div>

      <div style={styles.tickerWrap}>
        <div style={styles.tickerTrack} className="hero-ticker-track-el">
          {[...Array(2)].map((_, i) => (
            <span key={i} style={styles.tickerInner}>
              {[
                'Bib & Tucker',
                'Tennessee Bourbon',
                'Gold Roast',
                'Double Char',
                'Tennessee Ten',
                'Redemption Whiskey',
                'American Rye',
                'High Rye Bourbon',
                'Whisky Advocate',
              ].map((item, j) => (
                <span key={j}>
                  <span style={styles.tickerItem}>{item}</span>
                  <span style={styles.tickerDot}>·</span>
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes heroSweepAnim {
          0% { left: -120%; opacity: 0; }
          10% { opacity: 1; }
          50% { left: 160%; opacity: 1; }
          60% { opacity: 0; }
          100% { left: 160%; opacity: 0; }
        }
        @keyframes heroFadeUp {
          0% { opacity: 0; transform: translateY(16px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes heroFadeIn {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }
        @keyframes heroBottleRevealLeft {
          0% { opacity: 0; transform: translateX(30px) rotate(-4deg) translateY(40px); }
          100% { opacity: 1; transform: translateX(30px) rotate(-4deg) translateY(0); }
        }
        @keyframes heroBottleRevealRight {
          0% { opacity: 0; transform: translateX(-30px) rotate(4deg) translateY(50px); }
          100% { opacity: 1; transform: translateX(-30px) rotate(4deg) translateY(0); }
        }
        @keyframes heroTicker {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes heroScrollBarPulse {
          0%, 100% { transform: scaleY(1); opacity: 0.4; }
          50% { transform: scaleY(1.15); opacity: 0.9; }
        }
        .hero-eyebrow { animation: heroFadeUp 0.8s ease 0.3s both; }
        .hero-title-el { animation: heroFadeUp 0.9s ease 0.5s both; }
        .hero-divider-el { animation: heroFadeIn 0.6s ease 0.9s both; }
        .hero-sub-el { animation: heroFadeUp 0.8s ease 1s both; }
        .hero-ctas-el { animation: heroFadeUp 0.8s ease 1.2s both; }
        .hero-bottle-left-el { animation: heroBottleRevealLeft 1.4s cubic-bezier(0.22,1,0.36,1) 0.4s both; }
        .hero-bottle-right-el { animation: heroBottleRevealRight 1.6s cubic-bezier(0.22,1,0.36,1) 0.4s both; }
        .hero-brand-bar-el { animation: heroFadeIn 1s ease 1.8s both; }
        .hero-scroll-cue-el { animation: heroFadeIn 1s ease 2.2s both; }
        .hero-sweep-el { animation: heroSweepAnim 5s ease-in-out 1s infinite; }
        .hero-scroll-bar-el { animation: heroScrollBarPulse 2s ease-in-out infinite; }
        .hero-ticker-track-el { animation: heroTicker 28s linear infinite; }
        .btn-gold-el:hover { opacity: 0.85 !important; }
        .btn-outline-el:hover { border-color: rgba(200,155,70,0.7) !important; color: rgba(200,155,70,1) !important; }
        `,
      }} />
    </section>
  );
}
