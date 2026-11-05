import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Sparkles, Heart } from 'lucide-react';
import RoyalMonogram from '../components/RoyalMonogram';

export default function Page0_Invitation() {
  const navigate = useNavigate();
  const [isOpening, setIsOpening] = useState(false);

  const handleEnter = () => {
    setIsOpening(true);
    setTimeout(() => {
      navigate('/story');
    }, 700);
  };

  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        background: 'radial-gradient(ellipse at 50% 40%, #1f050b 0%, #0d0205 60%, #050102 100%)',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px 20px',
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
        {/* The Bespoke Royal Monogram Crest */}
        <div style={{ marginBottom: 20 }}>
          <RoyalMonogram size={140} />
        </div>

        {/* Small Elegant Pre-header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
          <div style={{ width: 30, height: 1, background: 'linear-gradient(90deg, transparent, rgba(212,175,55,0.7))' }} />
          <p
            style={{
              fontFamily: '"Cormorant Garamond", serif',
              fontSize: 12.5,
              letterSpacing: 6,
              color: 'rgba(212,175,55,0.85)',
              textTransform: 'uppercase',
              margin: 0,
              fontWeight: 500,
            }}
          >
            AKSHAT PRESENTS • FOR MY FAVOURITE DOCTOR (MOTU)
          </p>
          <div style={{ width: 30, height: 1, background: 'linear-gradient(90deg, rgba(212,175,55,0.7), transparent)' }} />
        </div>

        {/* Grand Headline */}
        <h1
          style={{
            fontFamily: '"Great Vibes", cursive',
            fontSize: 'clamp(46px, 7vw, 78px)',
            color: '#FFF',
            textShadow: '0 0 35px rgba(196,30,58,0.7), 0 0 70px rgba(212,175,55,0.3)',
            margin: '0 0 12px',
            lineHeight: 1.15,
          }}
        >
          Happy 21st Birthday
        </h1>

        {/* Golden Hairline Divider */}
        <div
          style={{
            height: 1,
            width: '55%',
            background: 'linear-gradient(90deg, transparent, #D4AF37, transparent)',
            marginBottom: 20,
          }}
        />

        {/* Intimate Quote */}
        <p
          style={{
            fontFamily: '"Playfair Display", serif',
            fontStyle: 'italic',
            fontSize: 'clamp(15px, 2.5vw, 20px)',
            color: '#F7E7CE',
            lineHeight: 1.65,
            maxWidth: 520,
            margin: '0 0 34px',
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
            padding: '15px 40px',
            color: '#FFF',
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            cursor: 'pointer',
          }}
        >
          <Sparkles size={17} color="#D4AF37" />
          <span
            style={{
              fontFamily: '"Cormorant Garamond", serif',
              fontSize: 15.5,
              letterSpacing: 3,
              textTransform: 'uppercase',
              fontWeight: 600,
            }}
          >
            Begin Our Story, Bhalu & Motu
          </span>
          <Heart size={16} color="#D4AF37" fill="#D4AF37" />
        </motion.button>
      </motion.div>
    </div>
  );
}
