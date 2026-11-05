import { useState } from 'react';
import { motion } from 'framer-motion';
import { REASONS_I_LOVE_YOU } from '../utils/constants';
import confetti from 'canvas-confetti';
import { Sparkles, Heart } from 'lucide-react';

const REASON_TITLES = [
  'Her Smile',
  'Her Gussa',
  'Her Muh Banana',
  'Her Showing Care',
  'Her Giving Me Gifts',
  'Her Eyes',
  'Her Hair',
  'Her Hand',
  'Her Way of Talking',
  'Her Inner Child',
  'Her Dimples',
  'Her Feeding Me',
  'Her Curiosity',
  'Her Beauty',
  'Her Chubby Cheeks',
  'Her Carefree Nature',
  'Her Shararat',
  'Her Mujhe Thappad Marna',
  'Her Dressing Style',
  'Her Cooking',
  'Her Everything',
];

export default function Page2_ReasonsILoveYou() {
  const [flipped, setFlipped] = useState<Set<number>>(new Set());

  const handleCardClick = (idx: number) => {
    const next = new Set(flipped);
    if (next.has(idx)) {
      next.delete(idx);
    } else {
      next.add(idx);
    }
    setFlipped(next);

    if (next.size === 21) {
      setTimeout(() => {
        confetti({
          particleCount: 160,
          spread: 120,
          colors: ['#D4AF37', '#C41E3A', '#E8929A', '#FFF'],
        });
      }, 300);
    }
  };

  return (
    <div
      style={{
        width: '100vw',
        minHeight: '100dvh',
        background: 'radial-gradient(ellipse at top, #1A0505 0%, #0D0204 60%, #050102 100%)',
        position: 'relative',
        overflowY: 'auto',
        overflowX: 'hidden',
        padding: 'clamp(20px, 3.5vh, 32px) clamp(14px, 3vw, 24px) 80px',
        scrollbarWidth: 'thin',
        scrollbarColor: '#D4AF37 transparent',
      }}
    >
      {/* Background ambient glow */}
      <div
        style={{
          position: 'fixed',
          top: '20%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: 600,
          height: 600,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(196,30,58,0.1) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: 32, position: 'relative', zIndex: 10 }}>
        <p
          style={{
            fontFamily: '"Cormorant Garamond", serif',
            fontSize: 13,
            letterSpacing: 6,
            color: 'rgba(212,175,55,0.7)',
            textTransform: 'uppercase',
            margin: '0 0 6px',
          }}
        >
          Chapter Two • From Akshat
        </p>
        <h1
          style={{
            fontFamily: '"Great Vibes", cursive',
            fontSize: 'clamp(40px, 6vw, 62px)',
            color: '#D4AF37',
            textShadow: '0 0 35px rgba(212,175,55,0.4)',
            margin: '0 0 8px',
          }}
        >
          21 Reasons I Love You
        </h1>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
          <Sparkles size={14} color="#D4AF37" />
          <p
            style={{
              fontFamily: '"Cormorant Garamond", serif',
              fontSize: 15,
              color: '#F4C2C2',
              letterSpacing: 1.5,
              margin: 0,
            }}
          >
            {flipped.size} / 21 reasons uncovered • Tap any card to reveal
          </p>
          <Sparkles size={14} color="#D4AF37" />
        </div>
      </div>

      {/* 21 Luxury Reason Cards Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: 20,
          maxWidth: 1100,
          margin: '0 auto',
          position: 'relative',
          zIndex: 10,
        }}
      >
        {REASONS_I_LOVE_YOU.map((reason, idx) => {
          const isFlipped = flipped.has(idx);

          return (
            <motion.div
              key={idx}
              whileHover={{ y: -6, scale: 1.02 }}
              onClick={() => handleCardClick(idx)}
              style={{
                height: 195,
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
                {/* FRONT: Velvet Dark Luxury Card */}
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    backfaceVisibility: 'hidden',
                    background: 'linear-gradient(145deg, #240810 0%, #150308 100%)',
                    border: '1.5px solid rgba(212,175,55,0.4)',
                    boxShadow: '0 10px 25px rgba(0,0,0,0.6), inset 0 0 15px rgba(212,175,55,0.05)',
                    borderRadius: 12,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: 20,
                    textAlign: 'center',
                  }}
                >
                  <div
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: '50%',
                      background: 'rgba(212,175,55,0.1)',
                      border: '1px solid rgba(212,175,55,0.3)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: 8,
                    }}
                  >
                    <Heart size={18} color="#C41E3A" fill="#C41E3A" />
                  </div>

                  <span
                    style={{
                      fontFamily: '"Cormorant Garamond", serif',
                      fontSize: 11.5,
                      letterSpacing: 3,
                      color: 'rgba(212,175,55,0.85)',
                      textTransform: 'uppercase',
                    }}
                  >
                    Reason #{idx + 1}
                  </span>

                  <span
                    style={{
                      fontFamily: '"Great Vibes", cursive',
                      fontSize: 'clamp(22px, 2.2vw, 26px)',
                      color: '#FFF',
                      marginTop: 2,
                      textShadow: '0 0 15px rgba(212,175,55,0.5)',
                      lineHeight: 1.15,
                    }}
                  >
                    {REASON_TITLES[idx]}
                  </span>

                  <span
                    style={{
                      fontFamily: '"Cormorant Garamond", serif',
                      fontSize: 11,
                      letterSpacing: 2,
                      color: '#E8929A',
                      textTransform: 'uppercase',
                      marginTop: 2,
                    }}
                  >
                    {idx % 2 === 0 ? 'For Bhalu' : 'For Motu'}
                  </span>

                  <span
                    style={{
                      fontFamily: '"Lato", sans-serif',
                      fontSize: 9.5,
                      color: 'rgba(232, 146, 154, 0.6)',
                      letterSpacing: 1,
                      marginTop: 8,
                    }}
                  >
                    TAP TO UNVEIL
                  </span>
                </div>

                {/* BACK: Parchment Cream Card */}
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    backfaceVisibility: 'hidden',
                    transform: 'rotateY(180deg)',
                    background: 'linear-gradient(145deg, #FAF1DF, #F3E4C6)',
                    border: '1.5px solid #D4AF37',
                    boxShadow: '0 15px 35px rgba(0,0,0,0.8), 0 0 20px rgba(212,175,55,0.3)',
                    borderRadius: 12,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '12px 14px',
                    textAlign: 'center',
                    color: '#2A0505',
                  }}
                >
                  <span
                    style={{
                      fontFamily: '"Cormorant Garamond", serif',
                      fontSize: 10.5,
                      letterSpacing: 2,
                      color: '#8B0000',
                      textTransform: 'uppercase',
                      marginBottom: 4,
                      fontWeight: 700,
                    }}
                  >
                    #{idx + 1} • {REASON_TITLES[idx].toUpperCase()}
                  </span>

                  <p
                    style={{
                      fontFamily: '"Playfair Display", "Cormorant Garamond", serif',
                      fontSize: 'clamp(12.5px, 1.05vw, 14.5px)',
                      fontStyle: 'italic',
                      lineHeight: 1.4,
                      color: '#341009',
                      fontWeight: 500,
                      margin: 0,
                    }}
                  >
                    "{reason}"
                  </p>
                </div>
              </motion.div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
