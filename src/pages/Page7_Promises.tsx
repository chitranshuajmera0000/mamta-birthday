import { useState } from 'react';
import { motion } from 'framer-motion';
import { PROMISES } from '../utils/constants';
import confetti from 'canvas-confetti';

export default function Page7_Promises() {
  const [flipped, setFlipped] = useState<Set<number>>(new Set());

  const handleCardClick = (idx: number) => {
    const next = new Set(flipped);
    if (next.has(idx)) {
      next.delete(idx);
    } else {
      next.add(idx);
    }
    setFlipped(next);

    if (next.size === 7) {
      setTimeout(() => {
        confetti({
          particleCount: 140,
          spread: 100,
          colors: ['#C41E3A', '#D4AF37', '#FF69B4', '#FFF'],
        });
      }, 300);
    }
  };

  return (
    <div
      style={{
        width: '100vw',
        minHeight: '100dvh',
        height: '100dvh',
        background: '#1C0A1A',
        position: 'relative',
        overflowY: 'auto',
        overflowX: 'hidden',
        WebkitOverflowScrolling: 'touch',
        touchAction: 'pan-y',
        overscrollBehaviorY: 'contain',
        scrollbarWidth: 'none',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: 'clamp(20px, 3.5vh, 32px) 16px clamp(70px, 12vh, 120px)',
        gap: 'clamp(14px, 2.5vh, 24px)',
      }}
    >
      {/* Background glow */}
      <div
        style={{
          position: 'absolute',
          width: 600,
          height: 600,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(196,30,58,0.12) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      {/* Header */}
      <div style={{ textAlign: 'center', zIndex: 10 }}>
        <p
          style={{
            fontFamily: '"Cormorant Garamond", serif',
            fontSize: 12,
            letterSpacing: 6,
            color: 'rgba(212,175,55,0.6)',
            textTransform: 'uppercase',
            margin: '0 0 4px',
          }}
        >
          Chapter Seven
        </p>
        <h1
          style={{
            fontFamily: '"Great Vibes", cursive',
            fontSize: 50,
            color: '#D4AF37',
            textShadow: '0 0 30px rgba(212,175,55,0.35)',
            margin: 0,
          }}
        >
          Promises to You
        </h1>
        <p
          style={{
            fontFamily: '"Playfair Display", serif',
            fontStyle: 'italic',
            fontSize: 14,
            color: 'rgba(232, 146, 154, 0.75)',
            marginTop: 4,
          }}
        >
          "Not vows I'll forget. Things I mean, right now, forever."
        </p>
        <p
          style={{
            fontFamily: '"Cormorant Garamond", serif',
            fontSize: 12,
            color: '#D4AF37',
            letterSpacing: 2,
            marginTop: 2,
          }}
        >
          {flipped.size} / 7 promises revealed (Click each tag to flip)
        </p>
      </div>

      {/* 7 Hanging Promise Tags */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-start',
          gap: 16,
          flexWrap: 'wrap',
          maxWidth: 1100,
          width: '100%',
          zIndex: 10,
          padding: '10px 0',
          touchAction: 'pan-y',
        }}
      >
        {PROMISES.map((promise, idx) => {
          const isFlipped = flipped.has(idx);
          const swayClass = `sway-${(idx % 7) + 1}`;

          return (
            <div
              key={idx}
              className={swayClass}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                transformOrigin: 'top center',
                touchAction: 'pan-y',
              }}
            >
              {/* Hanging Red String */}
              <div
                style={{
                  width: 2,
                  height: 38 + (idx % 3) * 12,
                  background: flipped.size === 7 ? '#D4AF37' : '#C41E3A',
                  boxShadow: flipped.size === 7 ? '0 0 10px #D4AF37' : 'none',
                  transition: 'background 0.5s',
                }}
              />

              {/* Tag Ring Hole */}
              <div
                style={{
                  width: 14,
                  height: 14,
                  borderRadius: '50%',
                  border: '2px solid #D4AF37',
                  background: '#1A0505',
                  marginBottom: -7,
                  zIndex: 2,
                }}
              />

              {/* Flippable Card Container */}
              <div
                onClick={() => handleCardClick(idx)}
                style={{
                  width: 130,
                  height: 220,
                  perspective: 1000,
                  cursor: 'pointer',
                }}
              >
                <motion.div
                  animate={{ rotateY: isFlipped ? 180 : 0 }}
                  transition={{ duration: 0.6, ease: 'easeInOut' }}
                  style={{
                    width: '100%',
                    height: '100%',
                    position: 'relative',
                    transformStyle: 'preserve-3d',
                  }}
                >
                  {/* FRONT of Tag */}
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      backfaceVisibility: 'hidden',
                      background: 'linear-gradient(145deg, #2A0A1F, #190513)',
                      border: '1.5px solid rgba(212,175,55,0.4)',
                      borderRadius: 6,
                      boxShadow: '0 10px 25px rgba(0,0,0,0.7)',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: 16,
                      textAlign: 'center',
                    }}
                  >
                    <span style={{ fontSize: 24, marginBottom: 8 }}>🌹</span>
                    <span
                      style={{
                        fontFamily: '"Cormorant Garamond", serif',
                        fontSize: 11,
                        letterSpacing: 2,
                        color: 'rgba(212,175,55,0.7)',
                        textTransform: 'uppercase',
                      }}
                    >
                      Promise
                    </span>
                    <span
                      style={{
                        fontFamily: '"Great Vibes", cursive',
                        fontSize: 44,
                        color: '#D4AF37',
                        margin: '4px 0',
                      }}
                    >
                      #{idx + 1}
                    </span>
                    <span
                      style={{
                        fontFamily: '"Lato", sans-serif',
                        fontSize: 10,
                        color: '#B76E79',
                        letterSpacing: 1,
                        marginTop: 12,
                      }}
                    >
                      TAP TO REVEAL
                    </span>
                  </div>

                  {/* BACK of Tag */}
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      backfaceVisibility: 'hidden',
                      transform: 'rotateY(180deg)',
                      background: 'linear-gradient(145deg, #F9F2E7, #EBDCC6)',
                      border: '1.5px solid #D4AF37',
                      borderRadius: 6,
                      boxShadow: '0 10px 30px rgba(0,0,0,0.8), 0 0 15px rgba(212,175,55,0.3)',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: '12px 10px',
                      textAlign: 'center',
                      color: '#2A0505',
                    }}
                  >
                    <span style={{ fontSize: 14, color: '#C41E3A', marginBottom: 2 }}>♥</span>
                    <p
                      style={{
                        fontFamily: '"Cormorant Garamond", serif',
                        fontSize: 13,
                        lineHeight: 1.4,
                        color: '#341009',
                        fontStyle: 'italic',
                        fontWeight: 600,
                        margin: 0,
                      }}
                    >
                      {promise}
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer hint */}
      <div style={{ textAlign: 'center', zIndex: 10 }}>
        <p
          style={{
            fontFamily: '"Cormorant Garamond", serif',
            fontSize: 13,
            color: 'rgba(212,175,55,0.6)',
            letterSpacing: 2,
            margin: 0,
          }}
        >
          {flipped.size === 7 ? 'All promises etched into my heart forever ♥' : 'Turn over every promise made for you'}
        </p>
      </div>
    </div>
  );
}

