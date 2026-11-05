/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        crimson: '#8B0000',
        rose: '#C41E3A',
        blush: '#E8929A',
        petal: '#F4C2C2',
        'rose-gold': '#B76E79',
        gold: '#D4AF37',
        champagne: '#F7E7CE',
        midnight: '#0D0D0D',
        'deep-maroon': '#1A0505',
        wine: '#3D0C02',
        velvet: '#1C0A1A',
      },
      fontFamily: {
        'great-vibes': ['"Great Vibes"', 'cursive'],
        'cormorant': ['"Cormorant Garamond"', 'serif'],
        'playfair': ['"Playfair Display"', 'serif'],
        'lato': ['Lato', 'sans-serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float 10s ease-in-out infinite',
        'flicker': 'flicker 3s ease-in-out infinite',
        'heartbeat': 'heartbeat 1.5s ease-in-out infinite',
        'petal-fall': 'petalFall 8s linear infinite',
        'shimmer': 'shimmer 3s ease-in-out infinite',
        'sway': 'sway 4s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        flicker: {
          '0%, 100%': { opacity: '1', transform: 'scaleX(1)' },
          '33%': { opacity: '0.9', transform: 'scaleX(0.95)' },
          '66%': { opacity: '0.95', transform: 'scaleX(1.02)' },
        },
        heartbeat: {
          '0%, 100%': { transform: 'scale(1)' },
          '14%': { transform: 'scale(1.05)' },
          '28%': { transform: 'scale(1)' },
          '42%': { transform: 'scale(1.05)' },
          '70%': { transform: 'scale(1)' },
        },
        petalFall: {
          '0%': { transform: 'translateY(-10vh) rotate(0deg)', opacity: '1' },
          '100%': { transform: 'translateY(110vh) rotate(720deg)', opacity: '0' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        sway: {
          '0%, 100%': { transform: 'rotate(-5deg)' },
          '50%': { transform: 'rotate(5deg)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(212,175,55,0.3), 0 0 40px rgba(212,175,55,0.1)' },
          '50%': { boxShadow: '0 0 40px rgba(212,175,55,0.6), 0 0 80px rgba(212,175,55,0.3)' },
        },
      },
    },
  },
  plugins: [],
}
