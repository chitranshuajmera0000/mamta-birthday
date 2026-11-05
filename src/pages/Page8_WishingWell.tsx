import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAudio } from '../hooks/useAudio';
import { Sparkles, Send } from 'lucide-react';
import confetti from 'canvas-confetti';

interface Wish {
  id: number;
  text: string;
  x: number;
  y: number;
}

export default function Page8_WishingWell() {
  const [wishInput, setWishInput] = useState('');
  const [wishes, setWishes] = useState<Wish[]>([
    { id: 1, text: 'Endless laughter and peace for you, Bhalu', x: 20, y: 22 },
    { id: 2, text: 'That all your biggest dreams come true at 21', x: 70, y: 26 },
  ]);
  const [currentFloatingWish, setCurrentFloatingWish] = useState<string | null>(null);
  const [isDroppingCoin, setIsDroppingCoin] = useState(false);
  const { playChime } = useAudio();

  const handleMakeWish = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const trimmed = wishInput.trim();
    if (!trimmed || isDroppingCoin) return;

    setIsDroppingCoin(true);
    playChime();

    setTimeout(() => {
      setCurrentFloatingWish(trimmed);
      const newWish: Wish = {
        id: Date.now(),
        text: trimmed,
        x: 18 + Math.random() * 64,
        y: 16 + Math.random() * 22,
      };
      setWishes((prev) => [...prev, newWish]);
      setWishInput('');

      confetti({
        particleCount: 80,
        spread: 70,
        colors: ['#D4AF37', '#F7E7CE', '#C41E3A'],
        origin: { y: 0.7 },
      });

      setTimeout(() => {
        setIsDroppingCoin(false);
        setTimeout(() => {
          setCurrentFloatingWish(null);
        }, 3200);
      }, 900);
    }, 700);
  };

  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        background: 'radial-gradient(ellipse at top, #180824 0%, #09030e 60%, #040106 100%)',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '30px 20px 24px',
      }}
    >
      {/* Luminous Full Moon */}
      <div
        style={{
          position: 'absolute',
          top: 32,
          right: '10%',
          width: 86,
          height: 86,
          borderRadius: '50%',
          background: 'radial-gradient(circle at 35% 35%, #FFFDF5, #F5ECD7 55%, #D6C298 100%)',
          boxShadow: '0 0 45px rgba(255,250,220,0.55), 0 0 100px rgba(255,250,220,0.2)',
          pointerEvents: 'none',
        }}
      />

      {/* Floating wish stars in sky */}
      {wishes.map((w) => (
        <motion.div
          key={w.id}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 0.9, scale: 1 }}
          transition={{ duration: 1 }}
          style={{
            position: 'absolute',
            left: `${w.x}%`,
            top: `${w.y}%`,
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            zIndex: 4,
          }}
        >
          <div
            style={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              background: '#D4AF37',
              boxShadow: '0 0 12px #D4AF37, 0 0 20px #FFF',
            }}
          />
          <span
            style={{
              fontFamily: '"Cormorant Garamond", serif',
              fontSize: 13,
              color: '#F7E7CE',
              textShadow: '0 0 10px rgba(212,175,55,0.6)',
              maxWidth: 220,
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            ★ {w.text}
          </span>
        </motion.div>
      ))}

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
          Chapter Eight • Akshat & Mamta
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
          The Wishing Pond
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
          "Make a wish, Bhalu. Every wish you make is safe in my heart."
        </p>
      </div>

      {/* Luxury Wishing Pool Visual */}
      <div
        style={{
          position: 'relative',
          width: 340,
          height: 230,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 8,
        }}
      >
        {/* Falling Coin Animation */}
        <AnimatePresence>
          {isDroppingCoin && (
            <motion.div
              initial={{ y: -160, opacity: 1, scale: 1.3, rotateX: 0 }}
              animate={{ y: 20, opacity: 0, scale: 0.3, rotateX: 720 }}
              transition={{ duration: 0.75, ease: 'easeIn' }}
              style={{
                position: 'absolute',
                top: 40,
                width: 34,
                height: 34,
                borderRadius: '50%',
                background: 'radial-gradient(circle at 35% 35%, #FFEE88, #D4AF37, #8B6508)',
                border: '2px solid #FFF',
                boxShadow: '0 0 25px #D4AF37',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#3D0C02',
                fontWeight: 'bold',
                fontSize: 15,
                zIndex: 30,
              }}
            >
              ★
            </motion.div>
          )}
        </AnimatePresence>

        {/* Floating Wish Text Emerging from Well */}
        <AnimatePresence>
          {currentFloatingWish && (
            <motion.div
              initial={{ y: 10, opacity: 0, scale: 0.8 }}
              animate={{ y: -160, opacity: 1, scale: 1.1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 2.8, ease: 'easeOut' }}
              style={{
                position: 'absolute',
                textAlign: 'center',
                color: '#D4AF37',
                fontFamily: '"Great Vibes", cursive',
                fontSize: 34,
                textShadow: '0 0 25px rgba(212,175,55,0.9), 0 0 40px #FFF',
                pointerEvents: 'none',
                zIndex: 30,
                width: 360,
              }}
            >
              ✦ {currentFloatingWish} ✦
            </motion.div>
          )}
        </AnimatePresence>

        {/* Glowing Sacred Pool Ring */}
        <div
          style={{
            position: 'relative',
            width: 300,
            height: 140,
            borderRadius: '50%',
            background: 'linear-gradient(180deg, #2A1535 0%, #150820 100%)',
            border: '4px solid rgba(212,175,55,0.5)',
            boxShadow: '0 20px 60px rgba(0,0,0,0.9), 0 0 35px rgba(212,175,55,0.25)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
          }}
        >
          {/* Water Surface inside */}
          <div
            style={{
              width: '92%',
              height: '88%',
              borderRadius: '50%',
              background: 'radial-gradient(ellipse at center, #1b2845 0%, #0c1322 65%, #050811 100%)',
              boxShadow: 'inset 0 0 30px rgba(0,0,0,0.95)',
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {/* Ambient Water Rings */}
            <motion.div
              animate={{ scale: [1, 1.25, 1], opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              style={{
                width: 140,
                height: 60,
                borderRadius: '50%',
                border: '1px solid rgba(212,175,55,0.4)',
              }}
            />

            {/* Ripple when coin drops */}
            {isDroppingCoin && (
              <motion.div
                initial={{ scale: 0.1, opacity: 1 }}
                animate={{ scale: 3.5, opacity: 0 }}
                transition={{ duration: 1.2, repeat: 2 }}
                style={{
                  position: 'absolute',
                  width: 50,
                  height: 30,
                  borderRadius: '50%',
                  border: '2px solid #D4AF37',
                  boxShadow: '0 0 15px #D4AF37',
                }}
              />
            )}
          </div>
        </div>
      </div>

      {/* Wish Input Form */}
      <form
        onSubmit={handleMakeWish}
        style={{
          display: 'flex',
          gap: 10,
          maxWidth: 500,
          width: '92%',
          zIndex: 10,
          background: 'rgba(26,5,25,0.85)',
          padding: '8px 14px',
          borderRadius: 35,
          border: '1.5px solid rgba(212,175,55,0.5)',
          boxShadow: '0 10px 35px rgba(0,0,0,0.8), 0 0 20px rgba(212,175,55,0.15)',
          backdropFilter: 'blur(10px)',
        }}
      >
        <input
          type="text"
          value={wishInput}
          onChange={(e) => setWishInput(e.target.value)}
          placeholder="Type a wish for yourself, Bhalu..."
          style={{
            flex: 1,
            background: 'transparent',
            border: 'none',
            outline: 'none',
            color: '#F7E7CE',
            fontFamily: '"Cormorant Garamond", serif',
            fontSize: 16.5,
            padding: '8px 12px',
          }}
        />
        <button
          type="submit"
          disabled={!wishInput.trim() || isDroppingCoin}
          style={{
            background: 'linear-gradient(135deg, #C41E3A, #8B0000)',
            border: '1px solid #D4AF37',
            color: '#FFF',
            padding: '8px 22px',
            borderRadius: 22,
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            cursor: wishInput.trim() && !isDroppingCoin ? 'pointer' : 'default',
            opacity: wishInput.trim() && !isDroppingCoin ? 1 : 0.5,
          }}
        >
          <span style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: 13, letterSpacing: 2 }}>
            DROP COIN
          </span>
          <Send size={14} />
        </button>
      </form>
    </div>
  );
}
