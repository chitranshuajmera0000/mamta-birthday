import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PHOTOS } from '../utils/constants';
import {
  Film,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  Stethoscope,
  Heart,
  Clapperboard,
  Maximize2
} from 'lucide-react';

// Enhanced Medical Romance Vitals for each Photo Reel (Exclusive to Theater)
const REEL_METADATA = [
  {
    vitals: 'VITALS: 21 CANDLES • SINUS TACHYCARDIA • 100% IN LOVE',
    seat: 'SEAT: VIP-01',
    prescription: 'Rx: Unrestricted birthday cake & unconditional adoration.',
    reelNo: 'REEL 01 // PREMIERE',
  },
  {
    vitals: 'VITALS: ENDORPHINS: PEAK • DR. BHALU IN NATURAL HABITAT 🐼',
    seat: 'SEAT: VIP-02',
    prescription: 'Rx: Endless shopping sprees and forehead kisses.',
    reelNo: 'REEL 02 // MY HUMAN',
  },
  {
    vitals: 'VITALS: CARDIAC HYPERTROPHY FROM FALLING TOO HARD',
    seat: 'SEAT: VIP-03',
    prescription: 'Rx: Midnight twirls under fairy lights with zero worries.',
    reelNo: 'REEL 03 // THE TWIRL',
  },
  {
    vitals: 'VITALS: BLOOD PRESSURE ELEVATED • SYSTOLIC: RADIANT',
    seat: 'SEAT: VIP-04',
    prescription: 'Rx: Looking like art that museums could never afford.',
    reelNo: 'REEL 04 // COMMANDING',
  },
  {
    vitals: 'VITALS: RESTING HEART RATE: IMPOSSIBLE AROUND YOU',
    seat: 'SEAT: VIP-05',
    prescription: 'Rx: Staring into those eyes until time forgets to move.',
    reelNo: 'REEL 05 // THAT FACE',
  },
  {
    vitals: 'VITALS: DOPAMINE SURGE • CHAI THERAPY AT SUNSET',
    seat: 'SEAT: VIP-06',
    prescription: 'Rx: One golden hour with you, repeated every single day.',
    reelNo: 'REEL 06 // GOLDEN HOUR',
  },
];

export default function Page3_Memories() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isBurning, setIsBurning] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const autoplayTimerRef = useRef<NodeJS.Timeout | null>(null);

  const currentPhoto = PHOTOS[currentIndex];
  const meta = REEL_METADATA[currentIndex % REEL_METADATA.length];

  const handleSelectPhoto = (idx: number) => {
    if (idx === currentIndex) return;
    setIsBurning(true);
    setTimeout(() => {
      setCurrentIndex(idx);
      setTimeout(() => {
        setIsBurning(false);
      }, 350);
    }, 180);
  };

  const handlePrev = () => {
    const nextIdx = currentIndex > 0 ? currentIndex - 1 : PHOTOS.length - 1;
    handleSelectPhoto(nextIdx);
  };

  const handleNext = () => {
    const nextIdx = currentIndex < PHOTOS.length - 1 ? currentIndex + 1 : 0;
    handleSelectPhoto(nextIdx);
  };

  // Autoplay Slideshow Effect
  useEffect(() => {
    if (isPlaying) {
      autoplayTimerRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev < PHOTOS.length - 1 ? prev + 1 : 0));
        setIsBurning(true);
        setTimeout(() => setIsBurning(false), 350);
      }, 4500);
    } else if (autoplayTimerRef.current) {
      clearInterval(autoplayTimerRef.current);
    }
    return () => {
      if (autoplayTimerRef.current) clearInterval(autoplayTimerRef.current);
    };
  }, [isPlaying]);

  return (
    <div
      style={{
        width: '100vw',
        minHeight: '100dvh',
        height: '100dvh',
        background: 'radial-gradient(ellipse at 50% 30%, #1c0509 0%, #0d0205 60%, #050103 100%)',
        position: 'relative',
        overflowY: 'auto',
        overflowX: 'hidden',
        scrollbarWidth: 'none',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        gap: 'clamp(10px, 1.8vh, 18px)',
        padding: 'clamp(14px, 2.5vh, 22px) clamp(14px, 3vw, 28px)',
      }}
    >
      {/* Volumetric Projector Beam from Top Right */}
      <div
        style={{
          position: 'fixed',
          top: -80,
          right: '8%',
          width: '65vw',
          height: '85vh',
          background: 'conic-gradient(from 130deg at 70% 0%, rgba(255, 235, 175, 0.12) 0deg, rgba(255, 200, 100, 0.04) 28deg, transparent 45deg)',
          pointerEvents: 'none',
          zIndex: 2,
          filter: 'blur(20px)',
        }}
      />

      {/* Velvet Curtains on Left & Right with Rich Folds */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          bottom: 0,
          left: 0,
          width: 'clamp(30px, 5vw, 75px)',
          background: 'linear-gradient(90deg, #1f0206 0%, #4a0812 50%, #29040a 80%, rgba(13,2,5,0) 100%)',
          boxShadow: 'inset -15px 0 25px rgba(0,0,0,0.85)',
          zIndex: 8,
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'fixed',
          top: 0,
          bottom: 0,
          right: 0,
          width: 'clamp(30px, 5vw, 75px)',
          background: 'linear-gradient(-90deg, #1f0206 0%, #4a0812 50%, #29040a 80%, rgba(13,2,5,0) 100%)',
          boxShadow: 'inset 15px 0 25px rgba(0,0,0,0.85)',
          zIndex: 8,
          pointerEvents: 'none',
        }}
      />

      {/* Floating Cinema Dust Embers */}
      {[...Array(14)].map((_, i) => (
        <motion.div
          key={i}
          animate={{
            y: [0, -35, 0],
            x: [0, (i % 2 === 0 ? 10 : -10), 0],
            opacity: [0.15, 0.5, 0.15],
          }}
          transition={{ duration: 5 + (i % 4), repeat: Infinity, delay: i * 0.4 }}
          style={{
            position: 'absolute',
            width: 2.5 + (i % 3),
            height: 2.5 + (i % 3),
            borderRadius: '50%',
            background: '#FFE082',
            boxShadow: '0 0 8px #FFD54F',
            left: `${15 + (i * 6)}%`,
            top: `${20 + ((i * 13) % 65)}%`,
            pointerEvents: 'none',
            zIndex: 3,
          }}
        />
      ))}

      {/* Marquee Header Bar */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        style={{ textAlign: 'center', zIndex: 10, width: '100%', maxWidth: 900 }}
      >
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 2 }}>
          <Sparkles size={13} color="#D4AF37" />
          <p
            style={{
              fontFamily: '"Cormorant Garamond", serif',
              fontSize: 12,
              letterSpacing: 5,
              color: 'rgba(212,175,55,0.8)',
              textTransform: 'uppercase',
              margin: 0,
            }}
          >
            Chapter Three • The Private Screening
          </p>
          <Sparkles size={13} color="#D4AF37" />
        </div>

        <h1
          style={{
            fontFamily: '"Great Vibes", cursive',
            fontSize: 'clamp(38px, 5.5vw, 54px)',
            color: '#D4AF37',
            textShadow: '0 0 30px rgba(212,175,55,0.45)',
            margin: '2px 0 4px',
            lineHeight: 1.1,
          }}
        >
          Memory Theater
        </h1>

        {/* Marquee Bar with Autoplay Controls */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 12,
            marginTop: 4,
            padding: '5px 16px',
            borderRadius: 20,
            border: '1px solid rgba(212,175,55,0.4)',
            background: 'rgba(38,8,14,0.75)',
            backdropFilter: 'blur(8px)',
            boxShadow: '0 4px 20px rgba(0,0,0,0.6)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <Clapperboard size={14} color="#D4AF37" />
            <span
              style={{
                fontFamily: '"Cormorant Garamond", serif',
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: 2.5,
                color: '#FFF2C6',
                textTransform: 'uppercase',
              }}
            >
              NOW PLAYING: REEL #{currentIndex + 1} OF {PHOTOS.length}
            </span>
          </div>

          <div style={{ width: 1, height: 14, background: 'rgba(212,175,55,0.3)' }} />

          {/* Autoplay Slideshow Button */}
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            style={{
              background: isPlaying ? 'rgba(196,30,58,0.35)' : 'rgba(212,175,55,0.2)',
              border: '1px solid rgba(212,175,55,0.5)',
              borderRadius: 12,
              padding: '2px 10px',
              display: 'flex',
              alignItems: 'center',
              gap: 5,
              color: '#FFF',
              fontFamily: '"Cormorant Garamond", serif',
              fontSize: 11,
              letterSpacing: 1.5,
              cursor: 'pointer',
              textTransform: 'uppercase',
              transition: 'all 0.2s',
            }}
          >
            {isPlaying ? (
              <>
                <Pause size={11} color="#FF8A80" fill="#FF8A80" />
                <span style={{ color: '#FF8A80' }}>PAUSE</span>
              </>
            ) : (
              <>
                <Play size={11} color="#D4AF37" fill="#D4AF37" />
                <span style={{ color: '#D4AF37' }}>AUTO PLAY</span>
              </>
            )}
          </button>
        </div>
      </motion.div>

      {/* Main Cinema Stage: Screen + Vintage Luxury Ticket Stub */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 'clamp(20px, 3.5vw, 44px)',
          flexWrap: 'wrap',
          zIndex: 6,
          maxWidth: 1040,
          width: '100%',
          flex: 1,
          margin: '10px 0',
        }}
      >
        {/* Cinema Projector Screen with Ornate Gilded Gold Frame */}
        <div
          style={{
            position: 'relative',
            width: 'clamp(300px, 34vw, 440px)',
            height: 'clamp(340px, 46vh, 460px)',
            borderRadius: 8,
            overflow: 'hidden',
            border: '3px solid #D4AF37',
            boxShadow: '0 25px 70px rgba(0,0,0,0.95), 0 0 50px rgba(196,30,58,0.35), inset 0 0 20px rgba(0,0,0,0.8)',
            background: '#050103',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {/* Inner Filigree Gold Border Corner Accents */}
          <div
            style={{
              position: 'absolute',
              top: 8,
              left: 8,
              right: 8,
              bottom: 8,
              border: '1px solid rgba(212,175,55,0.35)',
              borderRadius: 4,
              pointerEvents: 'none',
              zIndex: 5,
            }}
          />

          <AnimatePresence mode="wait">
            <motion.img
              key={currentPhoto.src}
              src={currentPhoto.src}
              alt={currentPhoto.caption}
              initial={{ opacity: 0, scale: 1.08 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.45, ease: 'easeOut' }}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block',
              }}
            />
          </AnimatePresence>

          {/* Film Burn Transition Flash */}
          {isBurning && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.95, 0] }}
              transition={{ duration: 0.45 }}
              style={{
                position: 'absolute',
                inset: 0,
                background: 'radial-gradient(circle, #FFF5E1 0%, #FF9800 45%, #B71C1C 80%, #1A0000 100%)',
                mixBlendMode: 'screen',
                pointerEvents: 'none',
                zIndex: 6,
              }}
            />
          )}

          {/* Cinema Screen Ambient Vignette */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'radial-gradient(ellipse at center, transparent 45%, rgba(10,2,4,0.7) 100%)',
              pointerEvents: 'none',
              zIndex: 4,
            }}
          />

          {/* Quick Prev / Next Overlays */}
          <button
            onClick={handlePrev}
            aria-label="Previous Reel"
            style={{
              position: 'absolute',
              left: 10,
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'rgba(15,2,5,0.65)',
              border: '1px solid rgba(212,175,55,0.4)',
              color: '#D4AF37',
              borderRadius: '50%',
              width: 36,
              height: 36,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              zIndex: 7,
              backdropFilter: 'blur(4px)',
            }}
          >
            <ChevronLeft size={20} />
          </button>

          <button
            onClick={handleNext}
            aria-label="Next Reel"
            style={{
              position: 'absolute',
              right: 10,
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'rgba(15,2,5,0.65)',
              border: '1px solid rgba(212,175,55,0.4)',
              color: '#D4AF37',
              borderRadius: '50%',
              width: 36,
              height: 36,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              zIndex: 7,
              backdropFilter: 'blur(4px)',
            }}
          >
            <ChevronRight size={20} />
          </button>

          {/* Film Timestamp / Reel Tag at Bottom Corner */}
          <div
            style={{
              position: 'absolute',
              bottom: 12,
              right: 14,
              background: 'rgba(0,0,0,0.75)',
              border: '1px solid rgba(212,175,55,0.4)',
              borderRadius: 3,
              padding: '2px 8px',
              fontFamily: '"Cormorant Garamond", serif',
              fontSize: 10.5,
              letterSpacing: 2,
              color: '#D4AF37',
              zIndex: 7,
              textTransform: 'uppercase',
            }}
          >
            {meta.reelNo}
          </div>
        </div>

        {/* Vintage Die-Cut Gold-Foil VIP Cinema Ticket Stub */}
        <motion.div
          key={`stub-${currentIndex}`}
          initial={{ opacity: 0, x: 25 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.45 }}
          style={{
            position: 'relative',
            width: 'clamp(290px, 32vw, 360px)',
            background: 'linear-gradient(135deg, #FBF4E4 0%, #F5E8CB 50%, #EBD5A7 100%)',
            color: '#2A0E05',
            borderRadius: 8,
            boxShadow: '0 20px 60px rgba(0,0,0,0.85), 0 0 35px rgba(212,175,55,0.25)',
            border: '2px solid #D4AF37',
            overflow: 'hidden',
          }}
        >
          {/* Top Die-Cut Notch */}
          <div
            style={{
              position: 'absolute',
              top: -12,
              left: 82,
              width: 24,
              height: 24,
              borderRadius: '50%',
              background: '#0d0205',
              boxShadow: 'inset 0 -2px 4px rgba(0,0,0,0.8)',
              zIndex: 10,
            }}
          />

          {/* Bottom Die-Cut Notch */}
          <div
            style={{
              position: 'absolute',
              bottom: -12,
              left: 82,
              width: 24,
              height: 24,
              borderRadius: '50%',
              background: '#0d0205',
              boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.8)',
              zIndex: 10,
            }}
          />

          <div style={{ display: 'flex' }}>
            {/* Left Tear-Off Stub (Admit One Section) */}
            <div
              style={{
                width: 94,
                padding: '18px 8px',
                borderRight: '2px dashed rgba(139,58,26,0.35)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'flex-start',
        gap: 'clamp(10px, 1.8vh, 18px)',
                background: 'rgba(212,175,55,0.08)',
              }}
            >
              <span
                style={{
                  fontFamily: '"Cormorant Garamond", serif',
                  fontSize: 10,
                  letterSpacing: 2,
                  color: '#6B1622',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  writingMode: 'vertical-rl',
                  transform: 'rotate(180deg)',
                }}
              >
                ADMIT ONE • DR. MAMTA
              </span>

              {/* Big Milestone Number 21 */}
              <div
                style={{
                  fontFamily: '"Great Vibes", cursive',
                  fontSize: 32,
                  color: '#C41E3A',
                  lineHeight: 1,
                  margin: '8px 0',
                }}
              >
                21
              </div>

              {/* Vintage Barcode SVG */}
              <div style={{ display: 'flex', gap: 2, alignItems: 'flex-end', height: 38 }}>
                {[3, 1, 4, 2, 1, 3, 2, 4, 1, 2, 3, 1, 4, 2].map((w, i) => (
                  <div
                    key={i}
                    style={{
                      width: w,
                      height: 28 + (i % 3) * 4,
                      background: '#3D0C02',
                    }}
                  />
                ))}
              </div>

              <span
                style={{
                  fontFamily: '"Cormorant Garamond", serif',
                  fontSize: 9,
                  letterSpacing: 1,
                  color: '#8B4513',
                  marginTop: 6,
                }}
              >
                {meta.seat}
              </span>
            </div>

            {/* Right Main Ticket Body */}
            <div
              style={{
                flex: 1,
                padding: '18px 20px 16px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start',
        gap: 'clamp(10px, 1.8vh, 18px)',
              }}
            >
              {/* Header: Dr. Akshat's Private Screening */}
              <div>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'flex-start',
        gap: 'clamp(10px, 1.8vh, 18px)',
                    alignItems: 'center',
                    borderBottom: '1px solid rgba(139,58,26,0.25)',
                    paddingBottom: 6,
                    marginBottom: 10,
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                    <Sparkles size={11} color="#C41E3A" />
                    <span
                      style={{
                        fontFamily: '"Cormorant Garamond", serif',
                        fontSize: 10.5,
                        letterSpacing: 1.5,
                        color: '#6B1622',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                      }}
                    >
                      VIP PASS: DR. MAMTA (MOTU)
                    </span>
                  </div>
                  <span
                    style={{
                      fontFamily: '"Cormorant Garamond", serif',
                      fontSize: 11,
                      fontWeight: 600,
                      color: '#5C2417',
                    }}
                  >
                    {currentPhoto.date}
                  </span>
                </div>

                {/* Reel Caption Title */}
                <h3
                  style={{
                    fontFamily: '"Great Vibes", cursive',
                    fontSize: 'clamp(26px, 3vw, 32px)',
                    color: '#3D0C02',
                    margin: '0 0 6px',
                    lineHeight: 1.15,
                  }}
                >
                  {currentPhoto.caption}
                </h3>

                {/* Romantic Narrative Quote */}
                <p
                  style={{
                    fontFamily: '"Cormorant Garamond", serif',
                    fontSize: 15.5,
                    fontStyle: 'italic',
                    color: '#4A2511',
                    lineHeight: 1.45,
                    margin: '0 0 12px',
                  }}
                >
                  "{currentPhoto.description}"
                </p>

                {/* Doctor Prescription Box */}
                <div
                  style={{
                    background: 'rgba(196,30,58,0.06)',
                    borderLeft: '2.5px solid #C41E3A',
                    padding: '6px 10px',
                    borderRadius: '0 4px 4px 0',
                    marginBottom: 12,
                  }}
                >
                  <p
                    style={{
                      fontFamily: '"Cormorant Garamond", serif',
                      fontSize: 12,
                      fontStyle: 'italic',
                      color: '#6B1622',
                      margin: 0,
                      fontWeight: 600,
                    }}
                  >
                    {meta.prescription}
                  </p>
                </div>
              </div>

              {/* Bottom Vitals Bar & Seal */}
              <div
                style={{
                  borderTop: '1px dashed rgba(139,58,26,0.35)',
                  paddingTop: 8,
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 6,
                    marginBottom: 4,
                  }}
                >
                  <Stethoscope size={12} color="#C41E3A" />
                  <span
                    style={{
                      fontFamily: '"Cormorant Garamond", serif',
                      fontSize: 10,
                      fontWeight: 700,
                      letterSpacing: 2,
                      color: '#6B1622',
                      textTransform: 'uppercase',
                    }}
                  >
                    {meta.vitals}
                  </span>
                </div>

                <div
                  style={{
                    textAlign: 'center',
                    fontFamily: '"Cormorant Garamond", serif',
                    fontSize: 10,
                    letterSpacing: 1.5,
                    color: '#8B4513',
                    textTransform: 'uppercase',
                  }}
                >
                  PRODUCED WITH LOVE BY AKSHAT ♥
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* 35mm Celluloid Film Reel Strip at Bottom */}
      <div
        style={{
          width: '100%',
          maxWidth: 960,
          background: 'linear-gradient(180deg, #180508 0%, #0d0205 100%)',
          border: '1.5px solid rgba(212,175,55,0.4)',
          borderRadius: 8,
          padding: '8px 14px',
          zIndex: 10,
          boxShadow: '0 10px 30px rgba(0,0,0,0.85), inset 0 0 15px rgba(0,0,0,0.9)',
        }}
      >
        {/* Top 35mm Film Sprocket Perforations */}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6, padding: '0 4px' }}>
          {[...Array(24)].map((_, i) => (
            <div
              key={i}
              style={{
                width: 9,
                height: 5.5,
                background: '#050103',
                borderRadius: 1.5,
                border: '0.8px solid rgba(212,175,55,0.25)',
              }}
            />
          ))}
        </div>

        {/* Film Frames Row */}
        <div
          style={{
            display: 'flex',
            gap: 12,
            overflowX: 'auto',
            paddingBottom: 4,
            msOverflowStyle: 'none',
            scrollbarWidth: 'none',
            alignItems: 'center',
          }}
        >
          {PHOTOS.map((photo, idx) => {
            const isSelected = idx === currentIndex;
            return (
              <motion.div
                key={photo.src}
                whileHover={{ scale: 1.06, y: -3 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => handleSelectPhoto(idx)}
                style={{
                  flexShrink: 0,
                  width: 80,
                  height: 62,
                  borderRadius: 4,
                  overflow: 'hidden',
                  cursor: 'pointer',
                  position: 'relative',
                  border: isSelected ? '2.5px solid #D4AF37' : '1px solid rgba(212,175,55,0.25)',
                  boxShadow: isSelected
                    ? '0 0 16px rgba(212,175,55,0.7), 0 0 30px rgba(196,30,58,0.5)'
                    : 'none',
                  opacity: isSelected ? 1 : 0.65,
                  transition: 'opacity 0.25s, border-color 0.25s, box-shadow 0.25s',
                }}
              >
                <img
                  src={photo.src}
                  alt={photo.caption}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />

                {/* Selected Indicator Badge */}
                {isSelected && (
                  <div
                    style={{
                      position: 'absolute',
                      top: 2,
                      right: 2,
                      background: '#C41E3A',
                      color: '#FFF',
                      fontSize: 8,
                      fontFamily: '"Cormorant Garamond", serif',
                      fontWeight: 'bold',
                      padding: '1px 4px',
                      borderRadius: 2,
                      letterSpacing: 1,
                      textTransform: 'uppercase',
                    }}
                  >
                    ON AIR
                  </div>
                )}

                {/* Frame Number Tag */}
                <div
                  style={{
                    position: 'absolute',
                    bottom: 2,
                    left: 3,
                    background: 'rgba(0,0,0,0.75)',
                    color: '#D4AF37',
                    fontSize: 8,
                    fontFamily: '"Cormorant Garamond", serif',
                    padding: '0 3px',
                    borderRadius: 1.5,
                  }}
                >
                  #{idx + 1}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom 35mm Film Sprocket Perforations */}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6, padding: '0 4px' }}>
          {[...Array(24)].map((_, i) => (
            <div
              key={i}
              style={{
                width: 9,
                height: 5.5,
                background: '#050103',
                borderRadius: 1.5,
                border: '0.8px solid rgba(212,175,55,0.25)',
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
