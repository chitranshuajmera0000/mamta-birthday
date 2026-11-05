import { motion } from 'framer-motion';

interface RoyalMonogramProps {
  size?: number;
}

export default function RoyalMonogram({ size = 130 }: RoyalMonogramProps) {
  return (
    <motion.div
      animate={{
        scale: [1, 1.03, 1],
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
      style={{
        position: 'relative',
        width: size,
        height: size,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Ambient Candlelight Radial Halo */}
      <div
        style={{
          position: 'absolute',
          inset: -15,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(212,175,55,0.25) 0%, rgba(196,30,58,0.15) 50%, transparent 75%)',
          filter: 'blur(16px)',
          pointerEvents: 'none',
        }}
      />

      {/* SVG Royal Crest */}
      <svg
        width={size}
        height={size}
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ filter: 'drop-shadow(0 4px 18px rgba(0,0,0,0.7))' }}
      >
        <defs>
          {/* Gold Gradient */}
          <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFF3D1" />
            <stop offset="35%" stopColor="#E5C158" />
            <stop offset="70%" stopColor="#D4AF37" />
            <stop offset="100%" stopColor="#997A23" />
          </linearGradient>

          {/* Crimson Velvet Inner Glow */}
          <radialGradient id="velvetBase" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#300710" />
            <stop offset="75%" stopColor="#1C0308" />
            <stop offset="100%" stopColor="#0D0104" />
          </radialGradient>

          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Inner Dark Velvet Disc */}
        <circle cx="100" cy="100" r="88" fill="url(#velvetBase)" stroke="rgba(212,175,55,0.2)" strokeWidth="1" />

        {/* Outer Fine Filigree Ring */}
        <circle cx="100" cy="100" r="92" stroke="url(#goldGradient)" strokeWidth="1.2" opacity="0.6" strokeDasharray="3 3" />

        {/* Solid Elegant Gold Ring */}
        <circle cx="100" cy="100" r="84" stroke="url(#goldGradient)" strokeWidth="2" />

        {/* Inner Accent Ring */}
        <circle cx="100" cy="100" r="78" stroke="url(#goldGradient)" strokeWidth="0.8" opacity="0.4" />

        {/* 4 Cardinal Diamond Stars */}
        <path d="M 100 9 L 102 14 L 100 19 L 98 14 Z" fill="url(#goldGradient)" />
        <path d="M 100 181 L 102 186 L 100 191 L 98 186 Z" fill="url(#goldGradient)" />
        <path d="M 9 100 L 14 98 L 19 100 L 14 102 Z" fill="url(#goldGradient)" />
        <path d="M 181 100 L 186 98 L 191 100 L 186 102 Z" fill="url(#goldGradient)" />

        {/* Botanical Laurel Branches (Left & Right) */}
        {/* Left branch */}
        <path
          d="M 52 140 C 42 115 42 85 55 60 C 58 66 56 74 52 80 C 48 90 48 105 52 120 C 54 128 55 135 52 140 Z"
          fill="url(#goldGradient)"
          opacity="0.35"
        />
        {/* Right branch */}
        <path
          d="M 148 140 C 158 115 158 85 145 60 C 142 66 144 74 148 80 C 152 90 152 105 148 120 C 146 128 145 135 148 140 Z"
          fill="url(#goldGradient)"
          opacity="0.35"
        />

        {/* Interlocking Monogram: A & M */}
        {/* Letter 'A' (Akshat) */}
        <text
          x="72"
          y="118"
          fill="url(#goldGradient)"
          fontFamily="'Cormorant Garamond', 'Playfair Display', serif"
          fontSize="56"
          fontWeight="400"
          fontStyle="italic"
          textAnchor="middle"
          letterSpacing="0"
          filter="url(#glow)"
        >
          A
        </text>

        {/* Central Delicate Rose / Heart Knot */}
        <path
          d="M 100 95 C 97 90 91 90 89 94 C 87 98 90 102 100 110 C 110 102 113 98 111 94 C 109 90 103 90 100 95 Z"
          fill="#C41E3A"
          stroke="url(#goldGradient)"
          strokeWidth="0.8"
        />

        {/* Letter 'M' (Mamta) */}
        <text
          x="128"
          y="118"
          fill="url(#goldGradient)"
          fontFamily="'Cormorant Garamond', 'Playfair Display', serif"
          fontSize="56"
          fontWeight="400"
          fontStyle="italic"
          textAnchor="middle"
          letterSpacing="0"
          filter="url(#glow)"
        >
          M
        </text>
      </svg>
    </motion.div>
  );
}

