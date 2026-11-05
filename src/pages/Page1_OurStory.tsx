import { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RELATIONSHIP_MILESTONES, PERSON } from '../utils/constants';
import { X, ChevronLeft, ChevronRight, Heart, Sparkles, Stethoscope, Eye } from 'lucide-react';

// Real photographic memories paired with milestones as per file names
const MILESTONE_PHOTOS = [
  {
    src: '/assets/the_day_we_met.jpeg',
    vitals: 'PULSE: 125 BPM • ATAPI ADRENALINE & LOVE',
    note: 'Woh rollercoasters aur rides pe tera haath pakad ke hasna... kabhi nahi bhool sakta!',
    label: '19 MARCH • ATAPI',
    position: 'center 25%',
  },
  {
    src: '/assets/first_convo.jpeg',
    vitals: 'DIAGNOSIS: DARE CONVERTED INTO DESTINY',
    note: 'Kisne socha tha ek innocent si dare call se hum dono ki poori duniya badal jayegi.',
    label: '12 FEB • THE DARE',
    position: 'center 15%',
  },
  {
    src: '/assets/when_i_knew.jpeg',
    vitals: 'HEART RATE: 140 BPM • THE VERY FIRST SPARK',
    note: '18 July ka woh pehla pal jab laga ki yeh connection rab ne banaya hai.',
    label: '18 JULY • FIRST MOMENT',
    position: 'center 25%',
  },
  {
    src: '/assets/first_date.jpeg',
    vitals: 'STATUS: INNER CHILD UNLOCKED IN PARK',
    note: 'May ki woh shaam... park mein bacho ki tarah khelna aur bas khul ke jeena!',
    label: 'MAY • PARK DATE',
    position: 'center 8%', // Perfectly shows her face on the bunny ride
  },
  {
    src: '/assets/she_said_yes.jpeg',
    vitals: 'CARDIAC OUTPUT: 100% RESERVED FOR MOTU',
    note: '18 July ki woh ghanton chalti lambi baatein jo dil ke sabse kareeb hain.',
    label: '18 JULY • LONG CONVO',
    position: 'center 25%',
  },
  {
    src: '/assets/black-traditional.jpg',
    vitals: 'CHRONIC CONDITION: DIWALI NOOR OVERLOAD',
    note: '1 Nov ki Diwali party! Diye toh bohot the, par tu sabse zyada roshan thi.',
    label: '1 NOV • DIWALI PARTY',
    position: 'center 12%', // Perfectly shows her radiant face and smile in black dress
  },
];

const ROTATION_ANGLES = [-2.5, 2, -3, 1.8, -2, 2.5];

// Realistic Wooden Clothes Peg Component that visibly clamps the top edge of the polaroid
function WoodenPeg() {
  return (
    <div
      style={{
        position: 'absolute',
        top: -22,
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 25,
        pointerEvents: 'none',
        filter: 'drop-shadow(0 3px 5px rgba(0,0,0,0.65))',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      {/* Fairy Light Warm Bulb Glowing Directly Above Peg */}
      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.85, 1, 0.85],
        }}
        transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          width: 14,
          height: 14,
          borderRadius: '50%',
          background: 'radial-gradient(circle, #FFFDF0 25%, #FFD54F 65%, #FFA000 100%)',
          boxShadow: '0 0 14px 5px rgba(255, 215, 0, 0.8), 0 0 28px 8px rgba(255, 179, 0, 0.4)',
          marginBottom: -4,
          zIndex: 30,
        }}
      />

      {/* Wooden Peg SVG with Clamping Jaws & Metal Spring */}
      <svg width="22" height="38" viewBox="0 0 22 38" fill="none">
        {/* Left Wooden Leg */}
        <path
          d="M 4 2 C 4 0.5, 8.5 0.5, 8.5 2 L 8.5 35 C 8.5 36.5, 4 36.5, 4 35 Z"
          fill="url(#woodLeft)"
          stroke="#4A2E12"
          strokeWidth="0.8"
        />
        {/* Right Wooden Leg */}
        <path
          d="M 13.5 2 C 13.5 0.5, 18 0.5, 18 2 L 18 35 C 18 36.5, 13.5 36.5, 13.5 35 Z"
          fill="url(#woodRight)"
          stroke="#4A2E12"
          strokeWidth="0.8"
        />
        {/* Metallic Spring Coil Clamping the Wood */}
        <rect x="2.5" y="13" width="17" height="6" rx="3" fill="url(#brassSpring)" stroke="#523F1C" strokeWidth="0.8" />
        <circle cx="11" cy="16" r="2" fill="#2A1808" />

        <defs>
          <linearGradient id="woodLeft" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#A86C3E" />
            <stop offset="50%" stopColor="#C9915B" />
            <stop offset="100%" stopColor="#8A5126" />
          </linearGradient>
          <linearGradient id="woodRight" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#C9915B" />
            <stop offset="50%" stopColor="#DEAC7C" />
            <stop offset="100%" stopColor="#9C6233" />
          </linearGradient>
          <linearGradient id="brassSpring" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FFF2A3" />
            <stop offset="50%" stopColor="#D4AF37" />
            <stop offset="100%" stopColor="#6D5319" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

export default function Page1_OurStory() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [selected, setSelected] = useState<number | null>(null);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const scroll = (dir: number) => {
    scrollRef.current?.scrollBy({ left: dir * 320, behavior: 'smooth' });
  };

  // Keyboard navigation for modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selected === null) return;
      if (e.key === 'Escape') setSelected(null);
      if (e.key === 'ArrowRight') {
        setSelected((prev) => (prev !== null && prev < RELATIONSHIP_MILESTONES.length - 1 ? prev + 1 : 0));
      }
      if (e.key === 'ArrowLeft') {
        setSelected((prev) => (prev !== null && prev > 0 ? prev - 1 : RELATIONSHIP_MILESTONES.length - 1));
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selected]);

  return (
    <div
      style={{
        width: '100vw',
        minHeight: '100dvh',
        height: '100dvh',
        background: 'radial-gradient(ellipse at 50% 25%, #1f070b 0%, #0d0205 75%, #050103 100%)',
        position: 'relative',
        overflowY: 'auto',
        overflowX: 'hidden',
        scrollbarWidth: 'none',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingTop: 'clamp(20px, 3.8vh, 38px)',
        paddingBottom: 24,
      }}
    >
      {/* Ambient Bokeh Orbs in Deep Velvet Background */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          animate={{
            y: [0, -25, 0],
            opacity: [0.15, 0.4, 0.15],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 6 + (i % 5), repeat: Infinity, delay: i * 0.4 }}
          style={{
            position: 'absolute',
            width: 50 + (i % 4) * 30,
            height: 50 + (i % 4) * 30,
            borderRadius: '50%',
            background: i % 2 === 0
              ? 'radial-gradient(circle, rgba(212,175,55,0.22), transparent 70%)'
              : 'radial-gradient(circle, rgba(196,30,58,0.2), transparent 70%)',
            left: `${4 + (i * 8.2)}%`,
            top: `${8 + ((i * 17) % 75)}%`,
            filter: 'blur(16px)',
            pointerEvents: 'none',
          }}
        />
      ))}

      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        style={{ textAlign: 'center', marginBottom: 20, zIndex: 10, padding: '0 16px' }}
      >
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
          <Sparkles size={14} color="#D4AF37" />
          <p
            style={{
              fontFamily: '"Cormorant Garamond", serif',
              fontSize: 12,
              letterSpacing: 6,
              color: 'rgba(212,175,55,0.75)',
              textTransform: 'uppercase',
              margin: 0,
            }}
          >
            Chapter One • Pinned Across Time
          </p>
          <Sparkles size={14} color="#D4AF37" />
        </div>

        <h1
          style={{
            fontFamily: '"Great Vibes", cursive',
            fontSize: 'clamp(42px, 6vw, 56px)',
            color: '#D4AF37',
            textShadow: '0 0 35px rgba(212,175,55,0.45)',
            margin: '2px 0 4px',
            lineHeight: 1.1,
          }}
        >
          Our Story
        </h1>

        <p
          style={{
            fontFamily: '"Playfair Display", serif',
            fontStyle: 'italic',
            fontSize: 'clamp(13px, 1.8vw, 15px)',
            color: '#E8929A',
            margin: 0,
          }}
        >
          "Memories hung along glowing fairy lights — the moments that brought Akshat to his Motu."
        </p>
      </motion.div>

      {/* Horizontal Clothesline Scroll Stage */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: 1400,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* Continuous Twine Wire Line Stretching Horizontally */}
        <div
          style={{
            position: 'absolute',
            top: 28,
            left: 0,
            right: 0,
            height: 2,
            background: 'linear-gradient(90deg, transparent, rgba(212,175,55,0.3) 10%, rgba(212,175,55,0.75) 50%, rgba(212,175,55,0.3) 90%, transparent)',
            boxShadow: '0 0 8px rgba(212,175,55,0.5)',
            zIndex: 5,
            pointerEvents: 'none',
          }}
        />

        {/* Scrollable Container for Polaroid Cards */}
        <div
          ref={scrollRef}
          style={{
            display: 'flex',
            gap: 'clamp(20px, 3vw, 32px)',
            overflowX: 'auto',
            overflowY: 'visible',
            paddingLeft: 'clamp(28px, 8vw, 100px)',
            paddingRight: 'clamp(28px, 8vw, 100px)',
            paddingTop: 30, // Space for wooden pegs clipped to the line
            paddingBottom: 28,
            scrollBehavior: 'smooth',
            zIndex: 10,
            msOverflowStyle: 'none',
            scrollbarWidth: 'none',
            alignItems: 'flex-start',
            maxWidth: '100%',
          }}
        >
          {RELATIONSHIP_MILESTONES.map((m, i) => {
            const photo = MILESTONE_PHOTOS[i % MILESTONE_PHOTOS.length];
            const baseAngle = ROTATION_ANGLES[i % ROTATION_ANGLES.length];
            const isHovered = hoveredCard === i;

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.12, duration: 0.6 }}
                onClick={() => setSelected(i)}
                onHoverStart={() => setHoveredCard(i)}
                onHoverEnd={() => setHoveredCard(null)}
                style={{
                  flexShrink: 0,
                  width: 'clamp(205px, 22vw, 235px)',
                  cursor: 'pointer',
                  position: 'relative',
                  transformOrigin: 'top center', // Swings naturally from the clothes peg!
                }}
              >
                {/* Gentle Pendulum Wind Sway on Clothesline */}
                <motion.div
                  animate={{
                    rotate: isHovered ? 0 : [baseAngle - 1.2, baseAngle + 1.2, baseAngle - 1.2],
                    y: isHovered ? -8 : 0,
                    scale: isHovered ? 1.05 : 1,
                  }}
                  transition={{
                    rotate: {
                      duration: 4.8 + (i % 3) * 0.8,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    },
                    y: { duration: 0.25 },
                    scale: { duration: 0.25 },
                  }}
                  style={{
                    position: 'relative',
                    transformOrigin: 'top center',
                  }}
                >
                  {/* The Physical Wooden Peg Clamping The Card to The Wire */}
                  <WoodenPeg />

                  {/* Authentic Polaroid Card */}
                  <div
                    style={{
                      background: '#FDFBF7',
                      padding: '12px 12px 18px',
                      borderRadius: '3px',
                      boxShadow: isHovered
                        ? '0 25px 50px rgba(0,0,0,0.85), 0 0 35px rgba(212,175,55,0.35)'
                        : '0 12px 28px rgba(0,0,0,0.65)',
                      border: '1px solid rgba(212,175,55,0.15)',
                      position: 'relative',
                      transition: 'box-shadow 0.3s ease',
                    }}
                  >
                    {/* Genuine Photo Container with Film Grain & Gloss Sheen */}
                    <div
                      style={{
                        width: '100%',
                        height: 180,
                        position: 'relative',
                        overflow: 'hidden',
                        borderRadius: '2px',
                        background: '#1A0505',
                        boxShadow: 'inset 0 0 10px rgba(0,0,0,0.35)',
                      }}
                    >
                      <img
                        src={photo.src}
                        alt={m.title}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          objectPosition: (photo as any).position || 'center 20%',
                          filter: isHovered ? 'contrast(1.05) brightness(1.02)' : 'sepia(0.08) contrast(1.02)',
                          transition: 'transform 0.4s ease, filter 0.4s ease',
                          transform: isHovered ? 'scale(1.06)' : 'scale(1)',
                        }}
                      />

                      {/* Corner Chapter Label on Photo */}
                      <div
                        style={{
                          position: 'absolute',
                          bottom: 6,
                          left: 6,
                          background: 'rgba(13,2,5,0.75)',
                          backdropFilter: 'blur(4px)',
                          padding: '2px 8px',
                          borderRadius: 2,
                          fontFamily: '"Cormorant Garamond", serif',
                          fontSize: 9.5,
                          letterSpacing: 2,
                          color: '#D4AF37',
                          textTransform: 'uppercase',
                        }}
                      >
                        {photo.label}
                      </div>

                      {/* Eye / Expand Hover Cue */}
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: isHovered ? 1 : 0 }}
                        style={{
                          position: 'absolute',
                          inset: 0,
                          background: 'rgba(26,5,10,0.4)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: 6,
                          color: '#FFF',
                          fontFamily: '"Cormorant Garamond", serif',
                          fontSize: 12,
                          letterSpacing: 1.5,
                        }}
                      >
                        <Eye size={16} color="#D4AF37" />
                        <span>VIEW MEMORY</span>
                      </motion.div>
                    </div>

                    {/* Polaroid Handwritten Caption Section */}
                    <div style={{ marginTop: 12, textAlign: 'center' }}>
                      <p
                        style={{
                          fontFamily: '"Great Vibes", cursive',
                          fontSize: 22,
                          color: '#3D0C02',
                          margin: '0 0 2px',
                          lineHeight: 1.2,
                        }}
                      >
                        {m.title}
                      </p>

                      <p
                        style={{
                          fontFamily: '"Cormorant Garamond", serif',
                          fontStyle: 'italic',
                          fontSize: 12.5,
                          color: '#6B3E2E',
                          lineHeight: 1.35,
                          margin: '0 0 8px',
                          minHeight: 34,
                        }}
                      >
                        {m.description}
                      </p>

                      {/* Mini ECG Heartbeat Line for Medical Romance */}
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: 6,
                          borderTop: '1px dashed rgba(139,69,19,0.25)',
                          paddingTop: 6,
                        }}
                      >
                        <Heart size={10} color="#C41E3A" fill="#C41E3A" />
                        <span
                          style={{
                            fontFamily: '"Cormorant Garamond", serif',
                            fontSize: 10,
                            letterSpacing: 1.5,
                            color: '#8B4513',
                            textTransform: 'uppercase',
                            fontWeight: 600,
                          }}
                        >
                          DR. AKSHAT & DR. MAMTA
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        {/* Navigation Arrows for Scrolling Through the Garland */}
        <button
          onClick={() => scroll(-1)}
          aria-label="Previous Memory"
          style={{
            position: 'absolute',
            left: 12,
            top: '55%',
            transform: 'translateY(-50%)',
            background: 'rgba(26,5,10,0.85)',
            border: '1.5px solid rgba(212,175,55,0.5)',
            color: '#D4AF37',
            width: 42,
            height: 42,
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 30,
            backdropFilter: 'blur(8px)',
            cursor: 'pointer',
            boxShadow: '0 4px 15px rgba(0,0,0,0.7)',
            transition: 'all 0.2s ease',
          }}
        >
          <ChevronLeft size={22} />
        </button>

        <button
          onClick={() => scroll(1)}
          aria-label="Next Memory"
          style={{
            position: 'absolute',
            right: 12,
            top: '55%',
            transform: 'translateY(-50%)',
            background: 'rgba(26,5,10,0.85)',
            border: '1.5px solid rgba(212,175,55,0.5)',
            color: '#D4AF37',
            width: 42,
            height: 42,
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 30,
            backdropFilter: 'blur(8px)',
            cursor: 'pointer',
            boxShadow: '0 4px 15px rgba(0,0,0,0.7)',
            transition: 'all 0.2s ease',
          }}
        >
          <ChevronRight size={22} />
        </button>
      </div>

      {/* Floating Instruction Cue */}
      <motion.p
        animate={{ opacity: [0.5, 0.9, 0.5] }}
        transition={{ duration: 2.5, repeat: Infinity }}
        style={{
          fontFamily: '"Cormorant Garamond", serif',
          fontSize: 12.5,
          letterSpacing: 2,
          color: 'rgba(212,175,55,0.7)',
          textTransform: 'uppercase',
          marginTop: 14,
          zIndex: 10,
        }}
      >
        ✦ Click any pinned memory to read our story ✦
      </motion.p>

      {/* Detailed Memory Lightbox Modal */}
      <AnimatePresence>
        {selected !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(5,1,3,0.92)',
              zIndex: 2000,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backdropFilter: 'blur(10px)',
              padding: 'clamp(16px, 4vh, 32px) clamp(16px, 5vw, 32px)',
            }}
          >
            <motion.div
              initial={{ scale: 0.9, y: 25, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                background: '#FAF7F2',
                maxWidth: 460,
                width: 'min(90vw, 450px)',
                maxHeight: '88vh',
                overflowY: 'auto',
                borderRadius: 12,
                position: 'relative',
                boxShadow: '0 30px 90px rgba(0,0,0,0.95), 0 0 50px rgba(212,175,55,0.35)',
                border: '2px solid rgba(212,175,55,0.4)',
                padding: 'clamp(20px, 3.5vh, 28px) clamp(16px, 4vw, 24px)',
                scrollbarWidth: 'none',
                margin: '0 auto',
              }}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelected(null)}
                aria-label="Close"
                style={{
                  position: 'absolute',
                  top: 14,
                  right: 14,
                  background: 'rgba(61,12,2,0.08)',
                  border: 'none',
                  borderRadius: '50%',
                  width: 32,
                  height: 32,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  zIndex: 10,
                }}
              >
                <X size={18} color="#3D0C02" />
              </button>

              {/* Photo Display in Modal */}
              <div
                style={{
                  width: '100%',
                  height: 'clamp(260px, 36vh, 320px)',
                  borderRadius: 6,
                  overflow: 'hidden',
                  marginBottom: 16,
                  boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
                  border: '1px solid rgba(61,12,2,0.15)',
                  backgroundColor: '#0D0205',
                }}
              >
                <img
                  src={MILESTONE_PHOTOS[selected % MILESTONE_PHOTOS.length].src}
                  alt={RELATIONSHIP_MILESTONES[selected].title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: (MILESTONE_PHOTOS[selected % MILESTONE_PHOTOS.length] as any).position || 'center 20%',
                  }}
                />
              </div>

              {/* Clinical Romance Vitals Bar */}
              <div
                style={{
                  background: 'rgba(196,30,58,0.08)',
                  border: '1px solid rgba(196,30,58,0.2)',
                  borderRadius: 6,
                  padding: '6px 12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 8,
                  marginBottom: 14,
                }}
              >
                <Stethoscope size={14} color="#C41E3A" />
                <span
                  style={{
                    fontFamily: '"Cormorant Garamond", serif',
                    fontSize: 11,
                    letterSpacing: 2,
                    color: '#8B0000',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                  }}
                >
                  {MILESTONE_PHOTOS[selected % MILESTONE_PHOTOS.length].vitals}
                </span>
              </div>

              {/* Memory Title */}
              <h2
                style={{
                  fontFamily: '"Great Vibes", cursive',
                  fontSize: 38,
                  color: '#3D0C02',
                  margin: '0 0 6px',
                  textAlign: 'center',
                  lineHeight: 1.15,
                }}
              >
                {RELATIONSHIP_MILESTONES[selected].title}
              </h2>

              <div
                style={{
                  height: 1,
                  background: 'linear-gradient(90deg, transparent, #D4AF37, transparent)',
                  margin: '10px auto 14px',
                  width: '80%',
                }}
              />

              {/* Story Narrative */}
              <p
                style={{
                  fontFamily: '"Cormorant Garamond", serif',
                  fontSize: 17,
                  fontStyle: 'italic',
                  color: '#4A2818',
                  lineHeight: 1.7,
                  margin: '0 0 16px',
                  textAlign: 'center',
                }}
              >
                "{RELATIONSHIP_MILESTONES[selected].longDescription}"
              </p>

              {/* Akshat's Personal Prescribed Note */}
              <div
                style={{
                  background: 'rgba(212,175,55,0.08)',
                  borderLeft: '3px solid #D4AF37',
                  padding: '10px 14px',
                  borderRadius: '0 6px 6px 0',
                  textAlign: 'left',
                }}
              >
                <p
                  style={{
                    fontFamily: '"Cormorant Garamond", serif',
                    fontSize: 11,
                    letterSpacing: 2,
                    color: '#8B4513',
                    textTransform: 'uppercase',
                    margin: '0 0 4px',
                    fontWeight: 700,
                  }}
                >
                  Dr. Akshat's Note to Motu:
                </p>
                <p
                  style={{
                    fontFamily: '"Playfair Display", serif',
                    fontSize: 13,
                    fontStyle: 'italic',
                    color: '#3D0C02',
                    margin: 0,
                  }}
                >
                  {MILESTONE_PHOTOS[selected % MILESTONE_PHOTOS.length].note}
                </p>
              </div>

              {/* Prev / Next Memory Modal Buttons */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginTop: 18,
                  paddingTop: 12,
                  borderTop: '1px solid rgba(61,12,2,0.1)',
                }}
              >
                <button
                  onClick={() =>
                    setSelected((prev) =>
                      prev !== null && prev > 0 ? prev - 1 : RELATIONSHIP_MILESTONES.length - 1
                    )
                  }
                  style={{
                    background: 'none',
                    border: '1px solid rgba(61,12,2,0.25)',
                    borderRadius: 4,
                    padding: '6px 14px',
                    fontFamily: '"Cormorant Garamond", serif',
                    fontSize: 12,
                    color: '#3D0C02',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 4,
                  }}
                >
                  <ChevronLeft size={14} /> Previous
                </button>

                <span
                  style={{
                    fontFamily: '"Cormorant Garamond", serif',
                    fontSize: 12,
                    color: '#8B4513',
                    letterSpacing: 2,
                  }}
                >
                  {selected + 1} OF {RELATIONSHIP_MILESTONES.length}
                </span>

                <button
                  onClick={() =>
                    setSelected((prev) =>
                      prev !== null && prev < RELATIONSHIP_MILESTONES.length - 1 ? prev + 1 : 0
                    )
                  }
                  style={{
                    background: 'none',
                    border: '1px solid rgba(61,12,2,0.25)',
                    borderRadius: 4,
                    padding: '6px 14px',
                    fontFamily: '"Cormorant Garamond", serif',
                    fontSize: 12,
                    color: '#3D0C02',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 4,
                  }}
                >
                  Next <ChevronRight size={14} />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
