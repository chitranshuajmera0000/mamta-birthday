import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FINAL_MESSAGE, PERSON } from '../utils/constants';
import confetti from 'canvas-confetti';
import { Heart, Sparkles, RefreshCw } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const FUTURE_PROMISES = [
  'Our next unforgettable journey together',
  'Cooking dinners and burning things while laughing',
  'Holding hands through every high and low',
  'Watching you conquer every goal you set',
  'Growing old, but always remaining my Motu & Bhalu',
];

export default function Page10_Forever() {
  const [doorOpened, setDoorOpened] = useState(false);
  const navigate = useNavigate();

  const handleOpenDoor = () => {
    setDoorOpened(true);
    confetti({
      particleCount: 220,
      spread: 120,
      colors: ['#C41E3A', '#D4AF37', '#FF69B4', '#FFF', '#8B0000'],
      origin: { y: 0.6 },
    });
  };

  const handleRestart = () => {
    navigate('/');
  };

  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        background: '#080205',
        position: 'relative',
        overflowY: 'auto',
        overflowX: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px 12px',
        scrollbarWidth: 'none',
      }}
    >
      {/* Background glow and subtle perspective lines */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          background: 'radial-gradient(ellipse at 50% 60%, rgba(139,0,0,0.2) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <AnimatePresence mode="wait">
        {!doorOpened ? (
          <motion.div
            key="corridor"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.08 }}
            transition={{ duration: 0.7 }}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              zIndex: 10,
              maxWidth: 680,
              width: '100%',
              padding: '10px',
            }}
          >
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
              Chapter Nine • The Final Chapter
            </p>
            <h1
              style={{
                fontFamily: '"Great Vibes", cursive',
                fontSize: 'clamp(38px, 6vw, 56px)',
                color: '#D4AF37',
                textShadow: '0 0 30px rgba(212,175,55,0.4)',
                margin: '0 0 8px',
              }}
            >
              The Gateway to Forever
            </h1>
            <p
              style={{
                fontFamily: '"Playfair Display", serif',
                fontStyle: 'italic',
                fontSize: 14,
                color: '#E8929A',
                marginBottom: 20,
              }}
            >
              "The final chapter of this celebration... but only the beginning of our endless journey, Motu."
            </p>

            {/* Future Memories Floating Frames Row */}
            <div
              style={{
                display: 'flex',
                gap: 10,
                flexWrap: 'wrap',
                justifyContent: 'center',
                marginBottom: 26,
              }}
            >
              {FUTURE_PROMISES.map((item, idx) => (
                <motion.div
                  key={idx}
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 3 + idx, repeat: Infinity, delay: idx * 0.4 }}
                  style={{
                    background: 'rgba(26,5,15,0.85)',
                    border: '1px solid rgba(212,175,55,0.3)',
                    borderRadius: 8,
                    padding: '8px 14px',
                    fontFamily: '"Cormorant Garamond", serif',
                    fontSize: 12.5,
                    color: '#F7E7CE',
                    boxShadow: '0 6px 15px rgba(0,0,0,0.6)',
                  }}
                >
                  ✦ {item}
                </motion.div>
              ))}
            </div>

            {/* Glowing Golden Door Portal */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleOpenDoor}
              style={{
                width: 120,
                height: 190,
                borderRadius: '60px 60px 6px 6px',
                background: 'linear-gradient(180deg, #FFE5B4 0%, #D4AF37 50%, #8B0000 100%)',
                boxShadow: '0 0 50px rgba(212,175,55,0.7), 0 0 100px rgba(196,30,58,0.4)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                position: 'relative',
                border: '2.5px solid #FFF',
              }}
            >
              <Heart size={24} color="#3D0C02" fill="#3D0C02" />
              <span
                style={{
                  fontFamily: '"Cormorant Garamond", serif',
                  fontSize: 12,
                  fontWeight: 'bold',
                  letterSpacing: 2,
                  color: '#2A0505',
                  marginTop: 8,
                  textTransform: 'uppercase',
                }}
              >
                OPEN DOOR
              </span>
            </motion.div>
          </motion.div>
        ) : (
          /* Final Love Climax Screen - Compact & Elegantly Proportioned */
          <motion.div
            key="final-card"
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
            style={{
              background: 'radial-gradient(circle at center, #220710 0%, #0d0205 85%)',
              border: '1.5px solid rgba(212,175,55,0.45)',
              boxShadow: '0 25px 80px rgba(0,0,0,0.95), 0 0 45px rgba(196,30,58,0.25)',
              borderRadius: 12,
              padding: 'clamp(18px, 3vh, 24px) clamp(16px, 3.5vw, 28px)',
              maxWidth: 560,
              width: '92%',
              maxHeight: '94vh',
              overflowY: 'auto',
              textAlign: 'center',
              zIndex: 20,
              scrollbarWidth: 'none',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 8, marginBottom: 8 }}>
              <Sparkles size={16} color="#D4AF37" />
              <span
                style={{
                  fontFamily: '"Cormorant Garamond", serif',
                  fontSize: 11.5,
                  letterSpacing: 4,
                  color: '#D4AF37',
                  textTransform: 'uppercase',
                }}
              >
                HAPPY 21ST BIRTHDAY, {PERSON.name.toUpperCase()}
              </span>
              <Sparkles size={16} color="#D4AF37" />
            </div>

            <h1
              style={{
                fontFamily: '"Great Vibes", cursive',
                fontSize: 'clamp(34px, 5vw, 46px)',
                color: '#FFF',
                margin: '0 0 8px',
                lineHeight: 1.15,
                textShadow: '0 0 25px rgba(212,175,55,0.5)',
              }}
            >
              Happy Birthday, Meri Jaan
            </h1>

            <div
              style={{
                height: 1,
                width: '75%',
                margin: '0 auto 14px',
                background: 'linear-gradient(90deg, transparent, #D4AF37, transparent)',
              }}
            />

            <p
              style={{
                fontFamily: '"Cormorant Garamond", serif',
                fontSize: 17,
                fontStyle: 'italic',
                lineHeight: 1.6,
                color: '#F7E7CE',
                margin: '0 0 16px',
                whiteSpace: 'pre-line',
              }}
            >
              {FINAL_MESSAGE}
            </p>

            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 12,
                marginTop: 8,
              }}
            >
              {/* Creator Credit with Funny Hinglish Dating Appeal */}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 8,
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px dashed rgba(225, 48, 108, 0.45)',
                  borderRadius: 14,
                  padding: '10px 18px',
                  maxWidth: 460,
                  width: '100%',
                }}
              >
                <a
                  href={PERSON.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 8,
                    padding: '7px 16px',
                    borderRadius: 20,
                    background: 'linear-gradient(135deg, rgba(131,58,180,0.4) 0%, rgba(225,48,108,0.4) 50%, rgba(253,29,29,0.4) 100%)',
                    border: '1px solid rgba(225,48,108,0.6)',
                    color: '#FFF',
                    textDecoration: 'none',
                    fontFamily: '"Lato", sans-serif',
                    fontSize: 12,
                    fontWeight: 600,
                    letterSpacing: 0.8,
                    boxShadow: '0 4px 15px rgba(225,48,108,0.25)',
                    transition: 'all 0.2s ease',
                  }}
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#FF6B8B" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                  </svg>
                  <span>Crafted with ♥ by Chitranshu (@ajmera_chitranshu_9999)</span>
                </a>

                <p
                  style={{
                    fontFamily: '"Playfair Display", serif',
                    fontStyle: 'italic',
                    fontSize: 12,
                    color: '#FFB6C1',
                    lineHeight: 1.45,
                    margin: 0,
                    textAlign: 'center',
                  }}
                >
                  "Yeh developer ki Insta ID hai... Akshat ki love story toh maine set karwa di, par main abhi bhi single hoon! 🥺 Meri bhi koi achhi dost banwa do please hehehe 😂🙏"
                </p>
              </div>

              {/* Read again button */}
              <button
                onClick={handleRestart}
                style={{
                  background: 'rgba(26,5,5,0.8)',
                  border: '1px solid rgba(212,175,55,0.4)',
                  color: '#D4AF37',
                  padding: '8px 20px',
                  borderRadius: 20,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                  cursor: 'pointer',
                  fontFamily: '"Cormorant Garamond", serif',
                  fontSize: 13,
                  letterSpacing: 2,
                  textTransform: 'uppercase',
                }}
              >
                <RefreshCw size={13} />
                Read From Beginning
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
