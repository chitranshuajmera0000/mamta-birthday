import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { YEAR_MESSAGES } from '../utils/constants';
import { Sparkles, ChevronLeft, ChevronRight, Heart, Award } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function Page4_Countdown21() {
  const [currentYear, setCurrentYear] = useState<number>(1);
  const [viewedYears, setViewedYears] = useState<Set<number>>(new Set([1]));
  const ribbonRef = useRef<HTMLDivElement>(null);

  const fireMilestoneConfetti = () => {
    confetti({
      particleCount: 120,
      spread: 90,
      origin: { y: 0.6 },
      colors: ['#D4AF37', '#C41E3A', '#B76E79', '#FFD700', '#FFFFFF'],
    });
  };

  const selectYear = (yr: number) => {
    setCurrentYear(yr);
    setViewedYears((prev) => {
      const updated = new Set(prev);
      updated.add(yr);
      return updated;
    });

    if (yr === 21) {
      fireMilestoneConfetti();
    }
  };

  const nextYear = () => {
    if (currentYear < 21) {
      selectYear(currentYear + 1);
    } else {
      selectYear(1);
    }
  };

  const prevYear = () => {
    if (currentYear > 1) {
      selectYear(currentYear - 1);
    } else {
      selectYear(21);
    }
  };

  // Scroll active year button into view within the horizontal ribbon
  useEffect(() => {
    if (!ribbonRef.current) return;
    const activeBtn = ribbonRef.current.querySelector<HTMLButtonElement>(`[data-year="${currentYear}"]`);
    if (activeBtn) {
      activeBtn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
  }, [currentYear]);

  return (
    <div
      style={{
        width: '100vw',
        minHeight: '100dvh',
        height: '100dvh',
        background: 'radial-gradient(ellipse at center, #1C0A1A 0%, #0D0509 70%, #050204 100%)',
        position: 'relative',
        overflowY: 'auto',
        overflowX: 'hidden',
        WebkitOverflowScrolling: 'touch',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: 'clamp(18px, 3.2vh, 32px) 14px clamp(60px, 9vh, 90px)',
        gap: 'clamp(12px, 2vh, 20px)',
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
          Chapter Four • 21 Years In The Making
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
          The 21-Year Journey
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
          "From Year 1 to 21 • Every chapter that brought my sweet Motu into the world."
        </p>
      </div>

      {/* Central Interactive Rings Visualizer */}
      <div
        style={{
          position: 'relative',
          width: 210,
          height: 210,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 8,
          margin: '4px 0',
        }}
      >
        {/* Concentric orbital glowing rings */}
        {[1, 2, 3, 4].map((ring) => (
          <motion.div
            key={ring}
            animate={{
              rotate: ring % 2 === 0 ? 360 : -360,
              scale: currentYear === 21 ? [1, 1.05, 1] : 1,
            }}
            transition={{
              rotate: { duration: 20 + ring * 8, repeat: Infinity, ease: 'linear' },
              scale: { duration: 2.5, repeat: Infinity },
            }}
            style={{
              position: 'absolute',
              width: ring * 45 + 30,
              height: ring * 45 + 30,
              borderRadius: '50%',
              border: `1px ${ring === 4 ? 'solid' : 'dashed'} rgba(212, 175, 55, ${0.15 + ring * 0.05})`,
              boxShadow: currentYear === 21 ? '0 0 24px rgba(212,175,55,0.25)' : 'none',
              pointerEvents: 'none',
            }}
          />
        ))}

        {/* Central Year Focus Orb */}
        <motion.div
          key={currentYear}
          initial={{ scale: 0.82, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', damping: 16 }}
          style={{
            width: 124,
            height: 124,
            borderRadius: '50%',
            background:
              currentYear === 21
                ? 'radial-gradient(circle at 35% 35%, #C41E3A 0%, #8B0000 60%, #3D0C02 100%)'
                : 'radial-gradient(circle at 35% 35%, #8B0000 0%, #3D0C02 60%, #1A0505 100%)',
            boxShadow:
              currentYear === 21
                ? '0 0 45px rgba(212,175,55,0.65), inset 0 0 20px rgba(255,215,0,0.4)'
                : '0 0 35px rgba(196,30,58,0.45), inset 0 0 16px rgba(212,175,55,0.25)',
            border: currentYear === 21 ? '2.5px solid #FFD700' : '2px solid rgba(212,175,55,0.7)',
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
              fontSize: 10,
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
              fontSize: 48,
              color: '#FFF',
              lineHeight: 1,
              margin: '1px 0',
              textShadow: '0 0 18px rgba(212,175,55,0.6)',
            }}
          >
            {currentYear}
          </span>
          <span
            style={{
              fontFamily: '"Lato", sans-serif',
              fontSize: 8.5,
              color: currentYear === 21 ? '#FFD700' : '#F4C2C2',
              letterSpacing: 1.5,
              textTransform: 'uppercase',
              fontWeight: currentYear === 21 ? 700 : 400,
            }}
          >
            {currentYear === 21 ? '★ THE GRAND 21 ★' : 'OF HER LIFE'}
          </span>
        </motion.div>
      </div>

      {/* Year Message Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`msg-${currentYear}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          style={{
            background: 'rgba(26,5,5,0.85)',
            border: currentYear === 21 ? '1.5px solid rgba(212,175,55,0.7)' : '1px solid rgba(212,175,55,0.35)',
            boxShadow:
              currentYear === 21
                ? '0 12px 35px rgba(0,0,0,0.85), 0 0 25px rgba(212,175,55,0.35)'
                : '0 10px 30px rgba(0,0,0,0.8), 0 0 20px rgba(139,0,0,0.25)',
            borderRadius: 12,
            padding: '14px 22px',
            maxWidth: 480,
            width: '90%',
            textAlign: 'center',
            zIndex: 10,
            backdropFilter: 'blur(10px)',
            margin: '2px 0',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, marginBottom: 6 }}>
            {currentYear === 21 ? (
              <Award size={15} color="#FFD700" />
            ) : (
              <Sparkles size={14} color="#D4AF37" />
            )}
            <span
              style={{
                fontFamily: '"Cormorant Garamond", serif',
                fontSize: 11.5,
                letterSpacing: 3,
                color: currentYear === 21 ? '#FFD700' : '#D4AF37',
                textTransform: 'uppercase',
                fontWeight: 700,
              }}
            >
              {currentYear === 21 ? 'THE CROWNING MILESTONE • YEAR 21' : `Reflection on Year ${currentYear}`}
            </span>
            {currentYear === 21 ? (
              <Award size={15} color="#FFD700" />
            ) : (
              <Sparkles size={14} color="#D4AF37" />
            )}
          </div>

          <p
            style={{
              fontFamily: '"Playfair Display", serif',
              fontStyle: 'italic',
              fontSize: 16.5,
              color: currentYear === 21 ? '#FFFDF0' : '#F7E7CE',
              margin: '6px 0 10px',
              lineHeight: 1.5,
            }}
          >
            "{YEAR_MESSAGES[currentYear] || 'Every year with you has been a treasure.'}"
          </p>

          {/* Forward Action Button so she flows naturally from Year 1 to 21 */}
          <div style={{ marginTop: 10 }}>
            {currentYear < 21 ? (
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={nextYear}
                style={{
                  background: 'linear-gradient(135deg, rgba(196,30,58,0.7) 0%, rgba(139,0,0,0.85) 100%)',
                  border: '1px solid rgba(212,175,55,0.5)',
                  borderRadius: 20,
                  padding: '7px 18px',
                  color: '#FFF',
                  fontFamily: '"Cormorant Garamond", serif',
                  fontSize: 13,
                  letterSpacing: 2,
                  textTransform: 'uppercase',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                  boxShadow: '0 4px 15px rgba(196,30,58,0.3)',
                }}
              >
                <span>Read Year {currentYear + 1}</span>
                <ChevronRight size={14} color="#D4AF37" />
              </motion.button>
            ) : (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={fireMilestoneConfetti}
                style={{
                  background: 'linear-gradient(135deg, #D4AF37 0%, #AA771C 100%)',
                  border: '1px solid #FFF',
                  borderRadius: 20,
                  padding: '8px 22px',
                  color: '#1A0505',
                  fontFamily: '"Cormorant Garamond", serif',
                  fontSize: 13.5,
                  letterSpacing: 2,
                  textTransform: 'uppercase',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                  boxShadow: '0 4px 20px rgba(212,175,55,0.6)',
                }}
              >
                <Sparkles size={15} color="#1A0505" />
                <span>Happy 21st Birthday, Motu! 🌹</span>
              </motion.button>
            )}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Progress Counter */}
      <div
        style={{
          fontFamily: '"Cormorant Garamond", serif',
          fontSize: 11,
          letterSpacing: 2.5,
          color: 'rgba(212,175,55,0.65)',
          textTransform: 'uppercase',
          margin: '-2px 0 0',
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          zIndex: 10,
        }}
      >
        <span>{viewedYears.size} of 21 Years Discovered</span>
        {viewedYears.size === 21 && (
          <span style={{ color: '#FFD700', fontWeight: 'bold' }}>• ALL COMPLETE ♥</span>
        )}
      </div>

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
          aria-label="Previous year"
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
            flexShrink: 0,
          }}
        >
          <ChevronLeft size={15} />
        </button>

        <div
          ref={ribbonRef}
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
              data-year={yr}
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
                    ? 'rgba(139,0,0,0.5)'
                    : 'rgba(26,5,5,0.4)',
                color: yr === currentYear ? '#FFF' : viewedYears.has(yr) ? '#F7E7CE' : '#B76E79',
                fontFamily: '"Cormorant Garamond", serif',
                fontSize: 12,
                fontWeight: yr === currentYear ? 'bold' : 'normal',
                cursor: 'pointer',
                boxShadow: yr === currentYear ? '0 0 10px rgba(212,175,55,0.5)' : 'none',
                transition: 'all 0.2s ease',
              }}
            >
              {yr}
            </button>
          ))}
        </div>

        <button
          onClick={nextYear}
          aria-label="Next year"
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
            flexShrink: 0,
          }}
        >
          <ChevronRight size={15} />
        </button>
      </div>
    </div>
  );
}
