import { motion } from 'framer-motion';
import { LOVE_LETTER_PARAGRAPHS, PERSON } from '../utils/constants';

export default function Page5_LoveLetter() {
  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        background: 'radial-gradient(ellipse at 50% 40%, #1a0508 0%, #0c0204 65%, #050102 100%)',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px 16px',
      }}
    >
      {/* Warm Ambient Candlelight Glow */}
      <div
        style={{
          position: 'absolute',
          width: 580,
          height: 580,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255, 185, 80, 0.16) 0%, rgba(196, 30, 58, 0.1) 50%, transparent 70%)',
          filter: 'blur(35px)',
          pointerEvents: 'none',
        }}
      />

      {/* Floating Rose Petals Drift */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, 40, 0],
              x: [0, (i % 2 === 0 ? 15 : -15), 0],
              rotate: [0, 20, 0],
              opacity: [0.25, 0.6, 0.25],
            }}
            transition={{
              duration: 6 + (i % 4),
              repeat: Infinity,
              delay: i * 0.4,
            }}
            style={{
              position: 'absolute',
              width: 14 + (i % 3) * 4,
              height: 20 + (i % 3) * 4,
              borderRadius: '50% 0 50% 50%',
              background: 'linear-gradient(135deg, #C41E3A, #8B0000)',
              left: `${(i * 17) % 94}%`,
              top: `${(i * 23) % 92}%`,
              filter: 'blur(0.5px)',
            }}
          />
        ))}
      </div>

      {/* Antique Parchment Love Letter */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        style={{
          width: '100%',
          maxWidth: 680,
          maxHeight: '92vh',
          background: 'linear-gradient(145deg, #FFFDF7 0%, #FAF0DA 50%, #F5E5C4 100%)',
          borderRadius: 8,
          boxShadow: '0 25px 80px rgba(0,0,0,0.9), 0 0 50px rgba(212,175,55,0.18), inset 0 0 40px rgba(183,110,121,0.12)',
          border: '1px solid rgba(180, 130, 70, 0.45)',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Ornate Gold Filigree Inner Border */}
        <div
          style={{
            position: 'absolute',
            inset: 10,
            border: '1px solid rgba(180, 130, 70, 0.35)',
            borderRadius: 6,
            pointerEvents: 'none',
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 14,
            border: '1px dashed rgba(180, 130, 70, 0.25)',
            borderRadius: 4,
            pointerEvents: 'none',
          }}
        />

        {/* 4 Corner Antique Rose Ornaments */}
        <div style={{ position: 'absolute', top: 16, left: 16, color: '#A34828', fontSize: 18, pointerEvents: 'none' }}>❦</div>
        <div style={{ position: 'absolute', top: 16, right: 16, color: '#A34828', fontSize: 18, pointerEvents: 'none' }}>❦</div>
        <div style={{ position: 'absolute', bottom: 16, left: 16, color: '#A34828', fontSize: 18, pointerEvents: 'none' }}>❦</div>
        <div style={{ position: 'absolute', bottom: 16, right: 16, color: '#A34828', fontSize: 18, pointerEvents: 'none' }}>❦</div>

        {/* Flickering Romantic Candle at Top Right */}
        <div
          style={{
            position: 'absolute',
            top: 22,
            right: 36,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            zIndex: 10,
          }}
        >
          {/* Flame Halo */}
          <div
            style={{
              position: 'absolute',
              top: -6,
              width: 32,
              height: 32,
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(255, 200, 80, 0.6) 0%, transparent 70%)',
              filter: 'blur(4px)',
            }}
          />
          {/* Flame */}
          <div
            className="candle-flame"
            style={{
              width: 10,
              height: 20,
              borderRadius: '50% 50% 35% 35%',
              background: 'radial-gradient(ellipse at 50% 80%, #FFFDE6 0%, #FFB703 45%, #E63946 90%)',
              boxShadow: '0 0 12px rgba(255, 183, 3, 0.9), 0 0 25px rgba(230, 57, 70, 0.5)',
              transformOrigin: 'bottom center',
            }}
          />
          {/* Wick */}
          <div style={{ width: 1.5, height: 5, background: '#222' }} />
          {/* Candle Body */}
          <div
            style={{
              width: 16,
              height: 32,
              background: 'linear-gradient(to right, #FFF8E7, #F4D35E, #D4AF37)',
              borderRadius: '2px 2px 3px 3px',
              border: '1px solid rgba(0,0,0,0.1)',
            }}
          />
        </div>

        {/* Scrollable Letter Content */}
        <div
          style={{
            padding: '36px 36px 28px',
            overflowY: 'auto',
            color: '#2A0508',
            scrollbarWidth: 'thin',
            scrollbarColor: '#B76E79 transparent',
            position: 'relative',
            zIndex: 5,
          }}
        >
          {/* Letter Heading */}
          <div style={{ textAlign: 'center', marginBottom: 20 }}>
            <span
              style={{
                fontFamily: '"Cormorant Garamond", serif',
                fontSize: 12,
                letterSpacing: 5,
                color: '#8B0000',
                textTransform: 'uppercase',
                fontWeight: 600,
              }}
            >
              A Love Letter for your 21st Birthday
            </span>
            <h2
              style={{
                fontFamily: '"Great Vibes", cursive',
                fontSize: 'clamp(38px, 6vw, 50px)',
                color: '#2A0408',
                margin: '4px 0 0',
                lineHeight: 1.2,
              }}
            >
              My Dearest {PERSON.name}
            </h2>
            <p
              style={{
                fontFamily: '"Cormorant Garamond", serif',
                fontStyle: 'italic',
                fontSize: 16,
                color: '#8B3A3A',
                margin: '2px 0 0',
              }}
            >
              (Meri Motu, Mera Bhalu)
            </p>
          </div>

          {/* Golden Divider */}
          <div
            style={{
              height: 1,
              width: '80%',
              margin: '0 auto 22px',
              background: 'linear-gradient(90deg, transparent, rgba(180, 130, 70, 0.6), transparent)',
            }}
          />

          {/* Body Paragraphs */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {LOVE_LETTER_PARAGRAPHS.map((p, idx) => (
              <p
                key={idx}
                style={{
                  fontFamily: '"Cormorant Garamond", serif',
                  fontSize: 17.5,
                  lineHeight: 1.75,
                  color: '#2A080C',
                  textAlign: 'justify',
                  margin: 0,
                  whiteSpace: 'pre-line',
                }}
              >
                {p}
              </p>
            ))}
          </div>

          {/* Masterpiece 3D Molten Wax Stamp Seal with Downward Silk Ribbons */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              marginTop: 36,
              marginBottom: 16,
              position: 'relative',
            }}
          >
            {/* Satin Silk Ribbon Tails Flowing Gracefully DOWNWARD from Beneath the Wax */}
            <div
              style={{
                position: 'absolute',
                top: 48,
                width: 140,
                height: 75,
                zIndex: 1,
                pointerEvents: 'none',
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              {/* Left Crimson Silk Ribbon */}
              <div
                style={{
                  position: 'absolute',
                  left: 42,
                  top: 0,
                  width: 22,
                  height: 64,
                  background: 'linear-gradient(135deg, #7A0A17 0%, #A31224 45%, #52040C 100%)',
                  transform: 'rotate(-16deg)',
                  transformOrigin: 'top center',
                  clipPath: 'polygon(0 0, 100% 0, 100% 100%, 50% 86%, 0 100%)',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.35)',
                }}
              />
              {/* Right Crimson Silk Ribbon */}
              <div
                style={{
                  position: 'absolute',
                  right: 42,
                  top: 0,
                  width: 22,
                  height: 68,
                  background: 'linear-gradient(-135deg, #7A0A17 0%, #A31224 45%, #52040C 100%)',
                  transform: 'rotate(18deg)',
                  transformOrigin: 'top center',
                  clipPath: 'polygon(0 0, 100% 0, 100% 100%, 50% 86%, 0 100%)',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.35)',
                }}
              />
            </div>

            {/* The Authentic 3D Handcrafted Molten Wax Seal */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 350, damping: 22 }}
              style={{ position: 'relative', zIndex: 3, cursor: 'pointer' }}
            >
              <svg
                width="106"
                height="106"
                viewBox="0 0 120 120"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  {/* Realistic Wax Drop Shadow */}
                  <filter id="realWaxShadow" x="-30%" y="-25%" width="160%" height="160%">
                    <feDropShadow dx="0" dy="6" stdDeviation="5.5" floodColor="#260206" floodOpacity="0.58" />
                    <feDropShadow dx="0" dy="1.5" stdDeviation="2" floodColor="#000" floodOpacity="0.35" />
                  </filter>

                  {/* Deep Red Molten Wax Shading with Specular Light */}
                  <radialGradient id="moltenWaxBody" cx="35%" cy="32%" r="65%">
                    <stop offset="0%" stopColor="#E63956" />
                    <stop offset="25%" stopColor="#C41933" />
                    <stop offset="65%" stopColor="#8A0819" />
                    <stop offset="90%" stopColor="#5A020E" />
                    <stop offset="100%" stopColor="#380007" />
                  </radialGradient>

                  {/* Sunken Stamped Die Bed Shadow */}
                  <radialGradient id="sunkenBed" cx="44%" cy="40%" r="55%">
                    <stop offset="0%" stopColor="#B3122A" />
                    <stop offset="70%" stopColor="#7E0615" />
                    <stop offset="100%" stopColor="#48020A" />
                  </radialGradient>

                  {/* Antique Gold Leaf Foil Gradient */}
                  <linearGradient id="goldInlay" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FFF9E6" />
                    <stop offset="25%" stopColor="#F5DF9E" />
                    <stop offset="55%" stopColor="#D4AF37" />
                    <stop offset="85%" stopColor="#A88120" />
                    <stop offset="100%" stopColor="#6E510C" />
                  </linearGradient>

                  {/* Bevel Raised Outer Wax Rim Highlight */}
                  <linearGradient id="rimHighlight" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="rgba(255,210,220,0.65)" />
                    <stop offset="45%" stopColor="rgba(255,255,255,0.15)" />
                    <stop offset="100%" stopColor="rgba(0,0,0,0.65)" />
                  </linearGradient>
                </defs>

                {/* Outer Organic Molten Wax Puddle with Fluid Lobes */}
                <path
                  d="M 60 7
                     C 74 6, 86 10, 97 19
                     C 108 28, 115 41, 114 55
                     C 114 66, 110 78, 101 88
                     C 91 99, 78 112, 62 113
                     C 47 115, 33 110, 22 100
                     C 11 90, 5 77, 6 62
                     C 6 48, 11 35, 22 24
                     C 33 13, 46 7, 60 7 Z"
                  fill="url(#moltenWaxBody)"
                  filter="url(#realWaxShadow)"
                />

                {/* Natural Molten Wax Spills */}
                <circle cx="101" cy="85" r="7.5" fill="url(#moltenWaxBody)" opacity="0.9" />
                <circle cx="20" cy="78" r="5.5" fill="url(#moltenWaxBody)" opacity="0.85" />

                {/* Outer Raised Molten Rim Ring */}
                <circle cx="60" cy="60" r="46" fill="none" stroke="url(#rimHighlight)" strokeWidth="3" />

                {/* Pressed Deep Stamped Die Well */}
                <circle cx="60" cy="60" r="43" fill="url(#sunkenBed)" />
                {/* Deep Inner Shadow at Top-Left */}
                <circle cx="60" cy="60" r="43" fill="none" stroke="#2B0005" strokeWidth="2.5" opacity="0.75" />

                {/* Delicate Beaded Gold Rings */}
                <circle cx="60" cy="60" r="39" fill="none" stroke="url(#goldInlay)" strokeWidth="1" strokeDasharray="2.5 3" opacity="0.85" />
                <circle cx="60" cy="60" r="36" fill="none" stroke="url(#goldInlay)" strokeWidth="0.8" opacity="0.6" />

                {/* Circular Upper Arc Inscription: SEALED WITH FOREVER LOVE */}
                <path id="waxArcTop" d="M 27 60 A 33 33 0 0 1 93 60" fill="none" />
                <text fill="url(#goldInlay)" fontSize="7" fontFamily="'Cormorant Garamond', serif" fontWeight="700" letterSpacing="2.8">
                  <textPath href="#waxArcTop" startOffset="50%" textAnchor="middle">
                    SEALED WITH LOVE
                  </textPath>
                </text>

                {/* Circular Lower Arc Inscription: FOREVER & ALWAYS */}
                <path id="waxArcBottom" d="M 93 63 A 33 33 0 0 1 27 63" fill="none" />
                <text fill="url(#goldInlay)" fontSize="6.5" fontFamily="'Cormorant Garamond', serif" fontWeight="700" letterSpacing="3.2">
                  <textPath href="#waxArcBottom" startOffset="50%" textAnchor="middle">
                    ✦ FOREVER & ALWAYS ✦
                  </textPath>
                </text>

                {/* Intertwined Royal Monogram Calligraphy: A & M */}
                {/* Letter A (Akshat) */}
                <text
                  x="45"
                  y="67"
                  fill="url(#goldInlay)"
                  fontFamily="'Playfair Display', 'Cormorant Garamond', serif"
                  fontSize="28"
                  fontWeight="700"
                  fontStyle="italic"
                  textAnchor="middle"
                  style={{ filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.5))' }}
                >
                  A
                </text>

                {/* Crimson Central Heart Jewel */}
                <path
                  d="M 60 52 C 58 48 53 48 51 51 C 49 55 52 59 60 65 C 68 59 71 55 69 51 C 67 48 62 48 60 52 Z"
                  fill="#C41933"
                  stroke="url(#goldInlay)"
                  strokeWidth="1.2"
                  style={{ filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.5))' }}
                />

                {/* Letter M (Mamta) */}
                <text
                  x="75"
                  y="67"
                  fill="url(#goldInlay)"
                  fontFamily="'Playfair Display', 'Cormorant Garamond', serif"
                  fontSize="28"
                  fontWeight="700"
                  fontStyle="italic"
                  textAnchor="middle"
                  style={{ filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.5))' }}
                >
                  M
                </text>

                {/* Specular Glint Reflection from Candlelight */}
                <ellipse cx="44" cy="22" rx="12" ry="4.5" fill="rgba(255,255,255,0.25)" transform="rotate(-25 44 22)" pointerEvents="none" />
              </svg>
            </motion.div>

            {/* Seal Caption with Medical Stethoscope Touch */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                marginTop: 14,
                zIndex: 4,
              }}
            >
              <span
                style={{
                  fontFamily: '"Cormorant Garamond", serif',
                  fontSize: 11.5,
                  letterSpacing: 3,
                  color: '#7A2E2E',
                  textTransform: 'uppercase',
                  fontWeight: 700,
                }}
              >
                Sealed with Forever Love • Akshat & Mamta
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
