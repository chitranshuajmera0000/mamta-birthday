import { useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { GARDEN_POEM } from '../utils/constants';
import { Sparkles, X, Heart } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function Page6_RoseGarden3D() {
  const [bloomed, setBloomed] = useState(false);
  const [showPoem, setShowPoem] = useState(false);

  const handleBloomClick = () => {
    setBloomed(true);
    setShowPoem(true);
    confetti({
      particleCount: 120,
      spread: 90,
      colors: ['#E60039', '#FF4D79', '#D4AF37'],
    });
  };

  return (
    <div
      style={{
        width: '100vw',
        minHeight: '100dvh',
        background: 'radial-gradient(ellipse at center, #1E050D 0%, #0D0206 60%, #050102 100%)',
        position: 'relative',
        overflowY: 'auto',
        overflowX: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: 'clamp(20px, 3.5vh, 32px) 20px clamp(28px, 4.5vh, 40px)',
        gap: 'clamp(12px, 2.2vh, 22px)',
        scrollbarWidth: 'none',
      }}
    >
      {/* Floating golden fireflies */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        {[...Array(24)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -30, 0],
              x: [0, (i % 2 === 0 ? 15 : -15), 0],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: 4 + (i % 4),
              repeat: Infinity,
              delay: i * 0.3,
            }}
            style={{
              position: 'absolute',
              width: (i % 3) + 3,
              height: (i % 3) + 3,
              borderRadius: '50%',
              background: '#D4AF37',
              boxShadow: '0 0 10px #D4AF37, 0 0 20px rgba(212,175,55,0.6)',
              left: `${(i * 13) % 95}%`,
              top: `${(i * 19) % 90}%`,
            }}
          />
        ))}
      </div>

      {/* Header */}
      <div style={{ textAlign: 'center', zIndex: 10 }}>
        <p
          style={{
            fontFamily: '"Cormorant Garamond", serif',
            fontSize: 12,
            letterSpacing: 6,
            color: 'rgba(212,175,55,0.7)',
            textTransform: 'uppercase',
            margin: '0 0 4px',
          }}
        >
          Chapter Six • Dedicated by Akshat
        </p>
        <h1
          style={{
            fontFamily: '"Great Vibes", cursive',
            fontSize: 'clamp(42px, 6vw, 60px)',
            color: '#D4AF37',
            textShadow: '0 0 35px rgba(212,175,55,0.4)',
            margin: 0,
          }}
        >
          The Enchanted Rose
        </h1>
        <p
          style={{
            fontFamily: '"Playfair Display", serif',
            fontStyle: 'italic',
            fontSize: 14,
            color: 'rgba(232, 146, 154, 0.8)',
            marginTop: 4,
          }}
        >
          "I'd cross every garden in the universe just to bring you one rose."
        </p>
      </div>

      {/* Centerpiece: Glowing Botanical Rose Artwork */}
      <div
        style={{
          position: 'relative',
          width: 320,
          height: 320,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 8,
        }}
      >
        {/* Soft backlight bloom */}
        <motion.div
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.4, 0.7, 0.4],
          }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            position: 'absolute',
            width: 260,
            height: 260,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(196,30,58,0.45) 0%, rgba(212,175,55,0.15) 50%, transparent 70%)',
            filter: 'blur(25px)',
          }}
        />

        {/* Decorative Golden Aura Ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
          style={{
            position: 'absolute',
            width: 260,
            height: 260,
            borderRadius: '50%',
            border: '1px dashed rgba(212,175,55,0.3)',
          }}
        />

        {/* The Central Glowing Rose Emblem */}
        <motion.div
          whileHover={{ scale: 1.08 }}
          onClick={handleBloomClick}
          style={{
            width: 180,
            height: 180,
            borderRadius: '50%',
            background: 'radial-gradient(circle at 35% 35%, #C41E3A 0%, #8B0000 60%, #3D0C02 100%)',
            boxShadow: '0 0 50px rgba(196,30,58,0.7), 0 0 80px rgba(212,175,55,0.3), inset 0 0 30px rgba(255,255,255,0.2)',
            border: '2px solid rgba(212,175,55,0.8)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            position: 'relative',
          }}
        >
          <span style={{ fontSize: 64, filter: 'drop-shadow(0 0 15px rgba(255,215,0,0.6))' }}>
            🌹
          </span>
          <span
            style={{
              fontFamily: '"Cormorant Garamond", serif',
              fontSize: 11,
              letterSpacing: 3,
              color: '#FFF',
              marginTop: 4,
              textTransform: 'uppercase',
              fontWeight: 600,
            }}
          >
            {bloomed ? 'BLOOMED ♥' : 'TOUCH TO BLOOM'}
          </span>
        </motion.div>
      </div>

      {/* Button to read poem */}
      <div style={{ zIndex: 10 }}>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleBloomClick}
          style={{
            background: 'linear-gradient(135deg, rgba(196,30,58,0.9), rgba(139,0,0,0.9))',
            border: '1.5px solid rgba(212,175,55,0.6)',
            boxShadow: '0 0 25px rgba(196,30,58,0.5)',
            borderRadius: 30,
            padding: '12px 32px',
            color: '#FFF',
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            cursor: 'pointer',
            backdropFilter: 'blur(8px)',
          }}
        >
          <Sparkles size={18} color="#D4AF37" />
          <span
            style={{
              fontFamily: '"Cormorant Garamond", serif',
              fontSize: 15,
              letterSpacing: 3,
              textTransform: 'uppercase',
              fontWeight: 600,
            }}
          >
            {bloomed ? 'Read Your Poem Again 🌹' : 'Touch The Glowing Rose 🌹'}
          </span>
          <Heart size={16} color="#D4AF37" fill="#D4AF37" />
        </motion.button>
      </div>

      {/* Luminous Romantic Poem Modal */}
      {typeof document !== 'undefined' &&
        createPortal(
          <AnimatePresence>
            {showPoem && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setShowPoem(false)}
                style={{
                  position: 'fixed',
                  inset: 0,
                  background: 'radial-gradient(ellipse at 50% 50%, rgba(139, 0, 30, 0.55) 0%, rgba(61, 8, 18, 0.85) 45%, rgba(13, 2, 6, 0.96) 100%)',
                  zIndex: 9999,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backdropFilter: 'blur(16px)',
                  padding: 'clamp(16px, 4vh, 36px) clamp(16px, 5vw, 32px)',
                }}
              >
            {/* Glowing Aurora Rings Behind Modal */}
            <div
              style={{
                position: 'absolute',
                width: 'min(90vw, 520px)',
                height: 'min(90vw, 520px)',
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(196, 30, 58, 0.35) 0%, rgba(212, 175, 55, 0.18) 50%, transparent 75%)',
                filter: 'blur(45px)',
                pointerEvents: 'none',
              }}
            />

            {/* Floating Soft Bokeh Orbs in Backdrop */}
            <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
              {[...Array(14)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{
                    y: [0, -35, 0],
                    opacity: [0.3, 0.75, 0.3],
                  }}
                  transition={{
                    duration: 4 + (i % 3),
                    repeat: Infinity,
                    delay: i * 0.35,
                  }}
                  style={{
                    position: 'absolute',
                    width: 30 + (i % 4) * 20,
                    height: 30 + (i % 4) * 20,
                    borderRadius: '50%',
                    background: i % 2 === 0
                      ? 'radial-gradient(circle, rgba(212,175,55,0.25), transparent 70%)'
                      : 'radial-gradient(circle, rgba(196,30,58,0.25), transparent 70%)',
                    left: `${(i * 18) % 92}%`,
                    top: `${(i * 22) % 88}%`,
                    filter: 'blur(12px)',
                  }}
                />
              ))}
            </div>

            {/* The Illuminated Velvet Poem Card - Perfectly Spaced on Mobile & Desktop */}
            <motion.div
              initial={{ scale: 0.88, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.88, opacity: 0 }}
              transition={{ type: 'spring', damping: 24, stiffness: 280 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                background: 'linear-gradient(155deg, #2D0814 0%, #1A030A 60%, #0E0105 100%)',
                border: '1.5px solid rgba(212,175,55,0.65)',
                boxShadow: '0 25px 80px rgba(0,0,0,0.95), 0 0 50px rgba(196,30,58,0.4), inset 0 0 30px rgba(212,175,55,0.08)',
                padding: 'clamp(24px, 4vh, 36px) clamp(18px, 4.5vw, 32px)',
                maxWidth: 460,
                width: 'min(88vw, 450px)',
                maxHeight: '86vh',
                overflowY: 'auto',
                scrollbarWidth: 'none',
                borderRadius: 14,
                position: 'relative',
                textAlign: 'center',
                zIndex: 10,
                margin: '0 auto',
              }}
            >
              {/* Inner Gold Filigree Hairline Border */}
              <div
                style={{
                  position: 'absolute',
                  inset: 8,
                  border: '1px solid rgba(212,175,55,0.25)',
                  borderRadius: 10,
                  pointerEvents: 'none',
                }}
              />

              <button
                onClick={() => setShowPoem(false)}
                aria-label="Close"
                style={{
                  position: 'absolute',
                  top: 12,
                  right: 12,
                  background: 'rgba(26,5,10,0.7)',
                  border: '1px solid rgba(212,175,55,0.4)',
                  borderRadius: '50%',
                  width: 32,
                  height: 32,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#D4AF37',
                  cursor: 'pointer',
                  zIndex: 20,
                }}
              >
                <X size={16} />
              </button>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginBottom: 6 }}>
                <span style={{ fontSize: 12, color: '#D4AF37' }}>✦</span>
                <p
                  style={{
                    fontFamily: '"Cormorant Garamond", serif',
                    fontSize: 11.5,
                    letterSpacing: 3,
                    color: '#D4AF37',
                    textTransform: 'uppercase',
                    margin: 0,
                    fontWeight: 600,
                  }}
                >
                  WRITTEN FOR DR. MAMTA BY DR. AKSHAT
                </p>
                <span style={{ fontSize: 12, color: '#D4AF37' }}>✦</span>
              </div>

              <h2
                style={{
                  fontFamily: '"Great Vibes", cursive',
                  fontSize: 'clamp(34px, 6vw, 44px)',
                  color: '#FFF',
                  margin: '2px 0 10px',
                  textShadow: '0 0 25px rgba(212,175,55,0.5)',
                  lineHeight: 1.15,
                }}
              >
                The Special Bloom
              </h2>

              <div
                style={{
                  height: 1,
                  width: '65%',
                  margin: '0 auto 16px',
                  background: 'linear-gradient(90deg, transparent, #D4AF37, transparent)',
                }}
              />

              <p
                style={{
                  fontFamily: '"Cormorant Garamond", serif',
                  fontSize: 'clamp(15px, 2.4vw, 17.5px)',
                  fontStyle: 'italic',
                  lineHeight: 1.7,
                  color: '#F7E7CE',
                  whiteSpace: 'pre-line',
                  margin: 0,
                  textShadow: '0 2px 10px rgba(0,0,0,0.8)',
                }}
              >
                {GARDEN_POEM}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>,
      document.body
    )}
    </div>
  );
}
