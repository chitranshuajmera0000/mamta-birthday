import { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { PERSON } from '../utils/constants';
import { Sparkles, X, Heart } from 'lucide-react';
import confetti from 'canvas-confetti';

interface StarPoint {
  x: number;
  y: number;
  r: number;
  alpha: number;
}

export default function Page9_NightSky() {
  const [starFound, setStarFound] = useState(false);
  const [showCertificate, setShowCertificate] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    const stars: StarPoint[] = Array.from({ length: 450 }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 1.8 + 0.5,
      alpha: 0.35 + Math.random() * 0.65,
    }));

    let reqId: number;
    const render = () => {
      ctx.clearRect(0, 0, w, h);

      // Deep galactic nebula wash
      const grad = ctx.createRadialGradient(w / 2, h / 2, 80, w / 2, h / 2, w * 0.7);
      grad.addColorStop(0, 'rgba(40, 10, 45, 0.45)');
      grad.addColorStop(0.5, 'rgba(25, 5, 30, 0.3)');
      grad.addColorStop(1, 'rgba(5, 1, 10, 0.6)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);

      // Stars
      for (const s of stars) {
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${s.alpha * (0.6 + Math.sin(Date.now() * 0.002 + s.x) * 0.4)})`;
        ctx.fill();
      }

      reqId = requestAnimationFrame(render);
    };
    render();

    const onResize = () => {
      if (!canvas) return;
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('resize', onResize);
      cancelAnimationFrame(reqId);
    };
  }, []);

  const handleStarClick = () => {
    setStarFound(true);
    setShowCertificate(true);
    confetti({
      particleCount: 110,
      spread: 90,
      colors: ['#D4AF37', '#FFF', '#E8929A', '#C41E3A'],
    });
  };

  return (
    <div
      style={{
        width: '100vw',
        minHeight: '100dvh',
        background: '#040108',
        position: 'relative',
        overflowY: 'auto',
        overflowX: 'hidden',
        scrollbarWidth: 'none',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: 'clamp(20px, 3.5vh, 32px) 20px clamp(28px, 4.5vh, 40px)',
        gap: 'clamp(14px, 2.5vh, 24px)',
      }}
    >
      {/* Background Star Canvas */}
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 1,
        }}
      />

      {/* Header */}
      <div style={{ textAlign: 'center', zIndex: 10, pointerEvents: 'none' }}>
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
          Chapter Eight • Dedication by Akshat
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
          Your Star in the Sky
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
          "I named a star after you. It has been yours since the moment I saw you."
        </p>
      </div>

      {/* Constellation & Her Special Star in Sky */}
      <div
        style={{
          position: 'relative',
          width: 340,
          height: 340,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 8,
        }}
      >
        {/* Constellation Heart Lines SVG */}
        <svg
          viewBox="0 0 340 340"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            pointerEvents: 'none',
          }}
        >
          <motion.path
            d="M 170 120 C 130 50, 40 80, 40 150 C 40 220, 170 290, 170 290 C 170 290, 300 220, 300 150 C 300 80, 210 50, 170 120 Z"
            fill="rgba(196,30,58,0.06)"
            stroke={starFound ? '#D4AF37' : 'rgba(212,175,55,0.3)'}
            strokeWidth="2"
            strokeDasharray={starFound ? 'none' : '6 6'}
            animate={{ opacity: starFound ? [0.7, 1, 0.7] : [0.3, 0.7, 0.3] }}
            transition={{ duration: 2.5, repeat: Infinity }}
          />

          {/* Small constellation star nodes */}
          <circle cx="170" cy="120" r="3" fill="#D4AF37" />
          <circle cx="100" cy="75" r="3" fill="#D4AF37" />
          <circle cx="40" cy="150" r="3" fill="#D4AF37" />
          <circle cx="240" cy="75" r="3" fill="#D4AF37" />
          <circle cx="300" cy="150" r="3" fill="#D4AF37" />
        </svg>

        {/* Her Named Pulsing Star */}
        <motion.div
          whileHover={{ scale: 1.3 }}
          onClick={handleStarClick}
          style={{
            position: 'relative',
            width: 44,
            height: 44,
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            zIndex: 12,
          }}
        >
          {/* Pulsing ring aura */}
          <motion.div
            animate={{ scale: [1, 2.4, 1], opacity: [0.8, 0, 0.8] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(212,175,55,0.9), transparent 70%)',
            }}
          />

          {/* Core Star Body */}
          <div
            style={{
              width: 18,
              height: 18,
              borderRadius: '50%',
              background: '#FFF9ED',
              boxShadow: '0 0 25px #D4AF37, 0 0 50px #FFAA33, 0 0 80px #FFF',
            }}
          />
        </motion.div>

        {/* Star Name Callout Label */}
        <motion.div
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
          style={{
            position: 'absolute',
            top: '64%',
            textAlign: 'center',
            pointerEvents: 'none',
          }}
        >
          <span
            style={{
              fontFamily: '"Great Vibes", cursive',
              fontSize: 30,
              color: '#D4AF37',
              textShadow: '0 0 20px rgba(212,175,55,0.9)',
            }}
          >
            ★ Star {PERSON.name} (Motu)
          </span>
        </motion.div>
      </div>

      {/* Touch Star Hint Button */}
      <div style={{ zIndex: 10 }}>
        <button
          onClick={handleStarClick}
          style={{
            background: 'rgba(26,5,20,0.85)',
            border: '1.5px solid rgba(212,175,55,0.6)',
            color: '#F7E7CE',
            padding: '12px 28px',
            borderRadius: 26,
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            cursor: 'pointer',
            boxShadow: '0 0 25px rgba(212,175,55,0.3)',
          }}
        >
          <Sparkles size={16} color="#D4AF37" />
          <span
            style={{
              fontFamily: '"Cormorant Garamond", serif',
              fontSize: 14,
              letterSpacing: 2,
              textTransform: 'uppercase',
              fontWeight: 600,
            }}
          >
            {starFound ? 'View Star Certificate' : 'Touch Your Star In The Sky'}
          </span>
        </button>
      </div>

      {/* Official Star Certificate Modal */}
      {typeof document !== 'undefined' &&
        createPortal(
          <AnimatePresence>
            {showCertificate && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setShowCertificate(false)}
                style={{
                  position: 'fixed',
                  inset: 0,
                  background: 'rgba(0,0,0,0.88)',
                  zIndex: 9999,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backdropFilter: 'blur(10px)',
                  padding: 20,
                }}
              >
            <motion.div
              initial={{ scale: 0.8, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                background: 'linear-gradient(145deg, #1A0A24, #0D0314)',
                border: '2px solid rgba(212,175,55,0.65)',
                boxShadow: '0 30px 90px rgba(0,0,0,0.95), 0 0 50px rgba(212,175,55,0.3)',
                padding: '40px 36px',
                maxWidth: 500,
                width: '100%',
                borderRadius: 10,
                position: 'relative',
                textAlign: 'center',
              }}
            >
              <button
                onClick={() => setShowCertificate(false)}
                style={{
                  position: 'absolute',
                  top: 14,
                  right: 14,
                  background: 'none',
                  border: 'none',
                  color: '#D4AF37',
                  cursor: 'pointer',
                }}
              >
                <X size={20} />
              </button>

              <span
                style={{
                  fontFamily: '"Cormorant Garamond", serif',
                  fontSize: 12,
                  letterSpacing: 4,
                  color: '#D4AF37',
                  textTransform: 'uppercase',
                }}
              >
                OFFICIAL CELESTIAL REGISTRATION
              </span>

              <h2
                style={{
                  fontFamily: '"Great Vibes", cursive',
                  fontSize: 48,
                  color: '#FFF',
                  margin: '8px 0 4px',
                }}
              >
                ✦ MAMTA ✦
              </h2>

              <p
                style={{
                  fontFamily: '"Cormorant Garamond", serif',
                  fontSize: 14,
                  color: '#E8929A',
                  letterSpacing: 2,
                  margin: '0 0 16px',
                }}
              >
                STAR #210124 • 21ST BIRTHDAY DEDICATION
              </p>

              <div
                style={{
                  height: 1,
                  background: 'linear-gradient(90deg, transparent, #D4AF37, transparent)',
                  marginBottom: 16,
                }}
              />

              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-around',
                  margin: '18px 0',
                  fontFamily: '"Lato", sans-serif',
                  fontSize: 12,
                  color: 'rgba(255,255,255,0.8)',
                }}
              >
                <div>
                  <div style={{ color: '#D4AF37', fontSize: 10, letterSpacing: 1.5 }}>RIGHT ASCENSION</div>
                  <div style={{ fontWeight: 600, marginTop: 2 }}>21h 01m 24s</div>
                </div>
                <div>
                  <div style={{ color: '#D4AF37', fontSize: 10, letterSpacing: 1.5 }}>DECLINATION</div>
                  <div style={{ fontWeight: 600, marginTop: 2 }}>+21° 00' 00"</div>
                </div>
                <div>
                  <div style={{ color: '#D4AF37', fontSize: 10, letterSpacing: 1.5 }}>REGISTERED BY</div>
                  <div style={{ fontWeight: 600, marginTop: 2, color: '#D4AF37' }}>Akshat ♥</div>
                </div>
              </div>

              <p
                style={{
                  fontFamily: '"Playfair Display", serif',
                  fontStyle: 'italic',
                  fontSize: 18,
                  lineHeight: 1.7,
                  color: '#F7E7CE',
                  margin: '20px 0 0',
                }}
              >
                "Even when the sky is cloudy, this star is shining for you, my Motu."
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
