import { motion, AnimatePresence } from 'framer-motion';
import RoyalMonogram from './RoyalMonogram';

interface TransitionOverlayProps {
  isVisible: boolean;
  chapterTitle?: string;
}

export default function TransitionOverlay({ isVisible, chapterTitle }: TransitionOverlayProps) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 99999,
            pointerEvents: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {/* Top Velvet Curtain */}
          <motion.div
            initial={{ y: '-100%' }}
            animate={{ y: '0%' }}
            exit={{ y: '-100%' }}
            transition={{ duration: 0.45, ease: [0.77, 0, 0.175, 1] }}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '50%',
              background: 'linear-gradient(180deg, #1C050B 0%, #3D0C14 70%, #8B0000 100%)',
              borderBottom: '2px solid rgba(212,175,55,0.7)',
              boxShadow: '0 10px 40px rgba(0,0,0,0.9)',
            }}
          />

          {/* Bottom Velvet Curtain */}
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: '0%' }}
            exit={{ y: '100%' }}
            transition={{ duration: 0.45, ease: [0.77, 0, 0.175, 1] }}
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: '50%',
              background: 'linear-gradient(0deg, #1C050B 0%, #3D0C14 70%, #8B0000 100%)',
              borderTop: '2px solid rgba(212,175,55,0.7)',
              boxShadow: '0 -10px 40px rgba(0,0,0,0.9)',
            }}
          />

          {/* Center Monogram & Chapter Crest Display */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ delay: 0.15, duration: 0.3 }}
            style={{
              position: 'relative',
              zIndex: 10,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              padding: '20px 40px',
            }}
          >
            <RoyalMonogram size={110} />

            {chapterTitle && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.22, duration: 0.3 }}
                style={{
                  marginTop: 14,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <div
                  style={{
                    height: 1,
                    width: 60,
                    background: 'linear-gradient(90deg, transparent, #D4AF37, transparent)',
                    marginBottom: 8,
                  }}
                />
                <span
                  style={{
                    fontFamily: '"Cormorant Garamond", serif',
                    fontSize: 14,
                    letterSpacing: 4,
                    color: '#FFF',
                    textTransform: 'uppercase',
                    textShadow: '0 0 15px rgba(212,175,55,0.8)',
                    fontWeight: 600,
                  }}
                >
                  {chapterTitle}
                </span>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
