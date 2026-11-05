import { useState, useRef, useCallback } from 'react';
import { Volume2, VolumeX, Music } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface AudioManagerProps {
  currentPage?: number;
}

export default function AudioManager({ currentPage = 0 }: AudioManagerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [showControls, setShowControls] = useState(false);
  const [volume, setVolume] = useState(0.4);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // We'll use a simple ambient tone since we can't load actual audio files
  const togglePlay = useCallback(() => {
    setIsPlaying(p => !p);
  }, []);

  return (
    <div
      style={{
        position: 'fixed',
        top: '16px',
        right: '16px',
        zIndex: 1000,
      }}
    >
      <motion.div
        className="relative"
        onHoverStart={() => setShowControls(true)}
        onHoverEnd={() => setShowControls(false)}
      >
        <motion.button
          onClick={togglePlay}
          className="heartbeat"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          style={{
            width: 40,
            height: 40,
            borderRadius: '50%',
            background: 'rgba(26,5,5,0.85)',
            border: '1px solid rgba(212,175,55,0.4)',
            backdropFilter: 'blur(10px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            boxShadow: '0 0 20px rgba(212,175,55,0.2)',
          }}
        >
          <Music size={18} color={isPlaying ? '#D4AF37' : '#B76E79'} />
        </motion.button>

        <AnimatePresence>
          {showControls && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.9 }}
              className="glass-warm"
              style={{
                position: 'absolute',
                top: '52px',
                right: 0,
                padding: '12px 16px',
                borderRadius: '12px',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
                minWidth: '160px',
              }}
            >
              <div
                style={{
                  fontFamily: '"Cormorant Garamond", serif',
                  fontSize: '12px',
                  color: '#D4AF37',
                  textAlign: 'center',
                  letterSpacing: '1px',
                }}
              >
                {isPlaying ? '♪ Playing' : '♪ Paused'}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <button
                  onClick={() => setIsMuted(m => !m)}
                  style={{ background: 'none', border: 'none', cursor: 'none', color: '#B76E79' }}
                >
                  {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
                </button>
                <input
                  type="range"
                  min={0}
                  max={1}
                  step={0.1}
                  value={volume}
                  onChange={e => setVolume(Number(e.target.value))}
                  style={{
                    flex: 1,
                    accentColor: '#D4AF37',
                    cursor: 'none',
                  }}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
