import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Sparkles, Heart } from 'lucide-react';
import RoyalMonogram from '../components/RoyalMonogram';

export default function Page0_Invitation() {
  const navigate = useNavigate();
  const [isOpening, setIsOpening] = useState(false);

  const handleEnter = () => {
    try {
      window.dispatchEvent(new CustomEvent('start-romantic-music'));
    } catch {
      // ignore
    }
    setIsOpening(true);
    setTimeout(() => {
      navigate('/story');
    }, 700);
  };

  return (
    <div
      style={{
        width: '100vw',
        minHeight: '100dvh',
        height: '100dvh',
        background: 'radial-gradient(ellipse at 50% 35%, #1f050b 0%, #0d0205 60%, #050102 100%)',
        position: 'relative',
        overflowY: 'auto',
        overflowX: 'hidden',
        scrollbarWidth: 'none',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: 'clamp(28px, 6vh, 48px) clamp(16px, 4vw, 24px) clamp(24px, 4vh, 36px)',
      }}
    >
      {/* Cinematic Vignette */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(circle at center, transparent 40%, rgba(0,0,0,0.75) 100%)',
          pointerEvents: 'none',
        }}
      />

      {/* Floating Golden Dust Particles */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -35, 0],
              opacity: [0.15, 0.6, 0.15],
            }}
            transition={{
              duration: 5 + (i % 5),
              repeat: Infinity,
              delay: i * 0.35,
            }}
            style={{
              position: 'absolute',
              width: (i % 3) + 2,
              height: (i % 3) + 2,
              borderRadius: '50%',
              background: '#D4AF37',
              boxShadow: '0 0 10px #D4AF37',
              left: `${(i * 19) % 95}%`,
              top: `${(i * 23) % 90}%`,
            }}
          />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: isOpening ? 0 : 1, y: isOpening ? -30 : 0 }}
        transition={{ duration: 0.8 }}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          maxWidth: 680,
          width: '100%',
          zIndex: 10,
        }}
      >
        {/* The Bespoke Royal Monogram Crest - Compact & Balanced */}
        <div style={{ marginBottom: 'clamp(10px, 2vh, 18px)' }}>
          <RoyalMonogram size={typeof window !== 'undefined' && window.innerWidth < 480 ? 105 : 125} />
        </div>

        {/* Small Elegant Pre-header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 'clamp(4px, 1vh, 8px)' }}>
          <div style={{ width: 24, height: 1, background: 'linear-gradient(90deg, transparent, rgba(212,175,55,0.7))' }} />
          <p
            style={{
              fontFamily: '"Cormorant Garamond", serif',
              fontSize: 'clamp(10.5px, 2vw, 12px)',
              letterSpacing: 'clamp(3px, 1vw, 5px)',
              color: 'rgba(212,175,55,0.85)',
              textTransform: 'uppercase',
              margin: 0,
              fontWeight: 500,
            }}
          >
            FROM AKSHAT • DEDICATED TO DR. MAMTA (MERI BHALU & MOTU)
          </p>
          <div style={{ width: 24, height: 1, background: 'linear-gradient(90deg, rgba(212,175,55,0.7), transparent)' }} />
        </div>

        {/* Grand Headline */}
        <h1
          style={{
            fontFamily: '"Great Vibes", cursive',
            fontSize: 'clamp(38px, 6.5vw, 68px)',
            color: '#FFF',
            textShadow: '0 0 35px rgba(196,30,58,0.7), 0 0 70px rgba(212,175,55,0.3)',
            margin: '0 0 clamp(4px, 1vh, 8px)',
            lineHeight: 1.15,
          }}
        >
          Happy 21st Birthday
        </h1>

        {/* Golden Hairline Divider */}
        <div
          style={{
            height: 1,
            width: '45%',
            background: 'linear-gradient(90deg, transparent, #D4AF37, transparent)',
            margin: '0 auto clamp(8px, 1.4vh, 16px)',
          }}
        />

        {/* Intimate Quote */}
        <p
          style={{
            fontFamily: '"Playfair Display", serif',
            fontStyle: 'italic',
            fontSize: 'clamp(13px, 2.2vw, 16.5px)',
            color: '#F7E7CE',
            lineHeight: 1.5,
            maxWidth: 480,
            margin: '0 auto clamp(14px, 2.5vh, 26px)',
            textShadow: '0 2px 10px rgba(0,0,0,0.8)',
          }}
        >
          "Before the world, there was you. Twenty-one years of grace, and every moment since you walked into my life has been my favourite."
        </p>

        {/* Enter Experience Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleEnter}
          style={{
            background: 'linear-gradient(135deg, #C41E3A 0%, #8B0000 60%, #3D0C02 100%)',
            border: '1.5px solid rgba(212,175,55,0.8)',
            boxShadow: '0 12px 35px rgba(196,30,58,0.55), 0 0 25px rgba(212,175,55,0.3)',
            borderRadius: 35,
            padding: 'clamp(11px, 1.8vh, 14px) clamp(22px, 5vw, 36px)',
            color: '#FFF',
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            cursor: 'pointer',
          }}
        >
          <Sparkles size={16} color="#D4AF37" />
          <span
            style={{
              fontFamily: '"Cormorant Garamond", serif',
              fontSize: 'clamp(13.5px, 2.2vw, 15px)',
              letterSpacing: 2.5,
              textTransform: 'uppercase',
              fontWeight: 600,
            }}
          >
            Begin Our Story, Meri Bhalu (Motu) ♥
          </span>
          <Heart size={15} color="#D4AF37" fill="#D4AF37" />
        </motion.button>
      </motion.div>
    </div>
  );
}
