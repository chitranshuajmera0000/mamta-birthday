import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { YEAR_MESSAGES } from '../utils/constants';
import { Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function Page4_Countdown21() {
  const [currentYear, setCurrentYear] = useState<number>(21);
  const [viewedYears, setViewedYears] = useState<Set<number>>(new Set([21]));

  const selectYear = (yr: number) => {
    setCurrentYear(yr);
    const updated = new Set(viewedYears);
    updated.add(yr);
    setViewedYears(updated);

    if (yr === 21 && updated.size >= 15) {
      confetti({
        particleCount: 100,
        spread: 80,
        colors: ['#D4AF37', '#C41E3A', '#B76E79'],
      });
    }
  };

  const nextYear = () => {
    const next = currentYear < 21 ? currentYear + 1 : 1;
    selectYear(next);
  };

  const prevYear = () => {
    const prev = currentYear > 1 ? currentYear - 1 : 21;
    selectYear(prev);
  };

  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        background: 'radial-gradient(ellipse at center, #1C0A1A 0%, #0D0509 70%, #050204 100%)',
        position: 'relative',
        overflowY: 'auto',
        overflowX: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '16px 14px 18px',
        scrollbarWidth: 'none',
      }}
    >
      {/* Background Star field */}
      <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none' }}>
        {[...Array(35)].map((_, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              width: (i % 3) + 1,
              height: (i % 3) + 1,
              background: '#D4AF37',
              borderRadius: '50%',
              left: `${(i * 17) % 98}%`,
              top: `${(i * 23) % 98}%`,
              opacity: 0.2 + (i % 5) * 0.15,
            }}
          />
        ))}
      </div>

      {/* Header */}
      <div style={{ textAlign: 'center', zIndex: 10 }}>
        <p
          style={{
            fontFamily: '"Cormorant Garamond", serif',
            fontSize: 11.5,
            letterSpacing: 5,
            color: 'rgba(212,175,55,0.7)',
            textTransform: 'uppercase',
            margin: '0 0 2px',
          }}
        >
          Chapter Four • 21 Glorious Years
        </p>
        <h1
          style={{
            fontFamily: '"Great Vibes", cursive',
            fontSize: 'clamp(36px, 5vw, 48px)',
            color: '#D4AF37',
            textShadow: '0 0 25px rgba(212,175,55,0.35)',
            margin: '0 0 2px',
          }}
        >
          The 21 Countdown
        </h1>
        <p
          style={{
            fontFamily: '"Playfair Display", serif',
            fontStyle: 'italic',
            fontSize: 13,
            color: 'rgba(232, 146, 154, 0.75)',
            margin: 0,
          }}
        >
          "Twenty-one trips around the sun. Every one more beautiful than the last."
        </p>
      </div>

      {/* Central Interactive Rings Visualizer - Proportionate */}
      <div
        style={{
          position: 'relative',
          width: 230,
          height: 230,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 8,
          margin: '8px 0',
        }}
      >
        {/* Concentric / orbital glowing rings */}
        {[1, 2, 3, 4].map((ring) => (
          <motion.div
            key={ring}
            animate={{
              rotate: ring % 2 === 0 ? 360 : -360,
              scale: currentYear === 21 ? [1, 1.04, 1] : 1,
            }}
            transition={{
              rotate: { duration: 20 + ring * 8, repeat: Infinity, ease: 'linear' },
              scale: { duration: 3, repeat: Infinity },
            }}
            style={{
              position: 'absolute',
              width: ring * 50 + 30,
              height: ring * 50 + 30,
              borderRadius: '50%',
              border: `1px ${ring === 4 ? 'solid' : 'dashed'} rgba(212, 175, 55, ${0.15 + ring * 0.05})`,
              boxShadow: currentYear === 21 ? '0 0 20px rgba(212,175,55,0.15)' : 'none',
              pointerEvents: 'none',
            }}
          />
        ))}

        {/* Central Year Focus Orb */}
        <motion.div
          key={currentYear}
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', damping: 15 }}
          style={{
            width: 130,
            height: 130,
            borderRadius: '50%',
            background: 'radial-gradient(circle at 35% 35%, #8B0000 0%, #3D0C02 60%, #1A0505 100%)',
            boxShadow: '0 0 40px rgba(196,30,58,0.5), inset 0 0 20px rgba(212,175,55,0.3)',
            border: '2px solid rgba(212,175,55,0.7)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            padding: 8,
            zIndex: 10,
          }}
        >
          <span
            style={{
              fontFamily: '"Cormorant Garamond", serif',
              fontSize: 10.5,
              letterSpacing: 3,
              color: '#D4AF37',
              textTransform: 'uppercase',
            }}
          >
            Year
          </span>
          <span
            style={{
              fontFamily: '"Great Vibes", cursive',
              fontSize: 50,
              color: '#FFF',
              lineHeight: 1,
              margin: '2px 0',
              textShadow: '0 0 18px rgba(212,175,55,0.6)',
            }}
          >
            {currentYear}
          </span>
          <span
            style={{
              fontFamily: '"Lato", sans-serif',
              fontSize: 9,
              color: '#F4C2C2',
              letterSpacing: 1.5,
              textTransform: 'uppercase',
            }}
          >
            {currentYear === 21 ? 'THE MILESTONE' : 'OF HER LIFE'}
          </span>
        </motion.div>
      </div>

      {/* Year Message Card - Proportionate */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`msg-${currentYear}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          style={{
            background: 'rgba(26,5,5,0.85)',
            border: '1px solid rgba(212,175,55,0.35)',
            boxShadow: '0 10px 30px rgba(0,0,0,0.8), 0 0 20px rgba(139,0,0,0.25)',
            borderRadius: 10,
            padding: '12px 22px',
            maxWidth: 480,
            width: '90%',
            textAlign: 'center',
            zIndex: 10,
            backdropFilter: 'blur(10px)',
            margin: '4px 0',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, marginBottom: 4 }}>
            <Sparkles size={14} color="#D4AF37" />
            <span
              style={{
                fontFamily: '"Cormorant Garamond", serif',
                fontSize: 11,
                letterSpacing: 3,
                color: '#D4AF37',
                textTransform: 'uppercase',
              }}
            >
              Reflection on Year {currentYear}
            </span>
            <Sparkles size={14} color="#D4AF37" />
          </div>

          <p
            style={{
              fontFamily: '"Playfair Display", serif',
              fontStyle: 'italic',
              fontSize: 16,
              color: '#F7E7CE',
              margin: '4px 0 0',
              lineHeight: 1.45,
            }}
          >
            "{YEAR_MESSAGES[currentYear] || 'Every year with you has been a treasure.'}"
          </p>
        </motion.div>
      </AnimatePresence>

      {/* Year selector ribbon at bottom */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          zIndex: 10,
          maxWidth: '100%',
        }}
      >
        <button
          onClick={prevYear}
          style={{
            background: 'rgba(26,5,5,0.8)',
            border: '1px solid rgba(212,175,55,0.3)',
            color: '#D4AF37',
            width: 32,
            height: 32,
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
          }}
        >
          <ChevronLeft size={15} />
        </button>

        <div
          style={{
            display: 'flex',
            gap: 5,
            overflowX: 'auto',
            maxWidth: '75vw',
            padding: '4px 2px',
            scrollbarWidth: 'none',
          }}
        >
          {Array.from({ length: 21 }, (_, i) => i + 1).map((yr) => (
            <button
              key={yr}
              onClick={() => selectYear(yr)}
              style={{
                width: 28,
                height: 28,
                borderRadius: '50%',
                flexShrink: 0,
                border: yr === currentYear ? '1.5px solid #D4AF37' : '1px solid rgba(212,175,55,0.2)',
                background:
                  yr === currentYear
                    ? 'radial-gradient(circle, #C41E3A, #8B0000)'
                    : viewedYears.has(yr)
                    ? 'rgba(61,12,2,0.6)'
                    : 'rgba(26,5,5,0.4)',
                color: yr === currentYear ? '#FFF' : '#B76E79',
                fontFamily: '"Cormorant Garamond", serif',
                fontSize: 12,
                fontWeight: yr === currentYear ? 'bold' : 'normal',
                cursor: 'pointer',
                boxShadow: yr === currentYear ? '0 0 10px rgba(212,175,55,0.5)' : 'none',
              }}
            >
              {yr}
            </button>
          ))}
        </div>

        <button
          onClick={nextYear}
          style={{
            background: 'rgba(26,5,5,0.8)',
            border: '1px solid rgba(212,175,55,0.3)',
            color: '#D4AF37',
            width: 32,
            height: 32,
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
          }}
        >
          <ChevronRight size={15} />
        </button>
      </div>
    </div>
  );
}
