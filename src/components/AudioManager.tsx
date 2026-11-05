import { useState, useRef, useEffect, useCallback } from 'react';
import { Volume2, VolumeX, Music, Disc3, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export interface TrackInfo {
  id: string;
  title: string;
  artist: string;
  src: string;
  fallbackSrc?: string;
  pages: number[];
}

export const TRACKS: TrackInfo[] = [
  {
    id: 'perfect',
    title: 'Perfect',
    artist: 'Ed Sheeran',
    src: '/assets/perfect.mp3',
    pages: [0, 1], // The Invitation, Our Story (First 2 pages)
  },
  {
    id: 'khat',
    title: 'Khat',
    artist: 'Navv Inder',
    src: '/assets/khat.mp3',
    pages: [2, 3], // 21 Reasons I Love You, Memory Theater (Next 2 pages)
  },
  {
    id: 'afreen',
    title: 'Afreen Afreen',
    artist: 'Rahat Fateh Ali Khan & Momina',
    src: '/assets/afreen.mp3',
    pages: [4, 5, 6, 7], // The 21 Countdown, The Rose, Promises, Night Sky
  },
  {
    id: 'alfaaz',
    title: 'Alfaaz',
    artist: 'Romantic Finale',
    src: '/assets/alfaaz.mp3',
    fallbackSrc: '/assets/afreen.mp3',
    pages: [8], // Forever With You (At last)
  },
];

interface AudioManagerProps {
  currentPage?: number;
}

export default function AudioManager({ currentPage = 0 }: AudioManagerProps) {
  // Determine initial target track based on current page
  const initialTrack = TRACKS.find((t) => t.pages.includes(currentPage)) || TRACKS[0];

  const [currentTrack, setCurrentTrack] = useState<TrackInfo>(initialTrack);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [showControls, setShowControls] = useState(false);
  const [volume, setVolume] = useState(0.7);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const isPlayingRef = useRef(false);
  const manualTrackOverrideRef = useRef(false);
  const toastTimeoutRef = useRef<number | null>(null);

  const showTrackToast = (text: string) => {
    if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
    setToastMessage(text);
    toastTimeoutRef.current = window.setTimeout(() => {
      setToastMessage(null);
    }, 3600);
  };

  // Safe Play helper
  const safePlay = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio
      .play()
      .then(() => {
        setIsPlaying(true);
        isPlayingRef.current = true;
      })
      .catch((err) => {
        console.warn('Playback request prevented or waiting for interaction:', err);
      });
  }, []);

  // Safe Pause helper
  const safePause = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.pause();
    setIsPlaying(false);
    isPlayingRef.current = false;
  }, []);

  // Switch Track manually or by page
  const selectTrack = useCallback(
    (track: TrackInfo, forcePlay = false) => {
      const audio = audioRef.current;
      if (!audio) return;

      const isSameTrack = currentTrack.src === track.src;

      if (!isSameTrack) {
        setCurrentTrack(track);
        showTrackToast(`♪ ${track.title} • ${track.artist}`);
      }

      if (forcePlay || isPlayingRef.current) {
        // Allow state to settle, then play
        setTimeout(() => {
          safePlay();
        }, 50);
      }
    },
    [currentTrack.src, safePlay]
  );

  // Toggle play/pause button
  const togglePlay = () => {
    if (isPlaying) {
      safePause();
      showTrackToast('♪ Music Paused');
    } else {
      safePlay();
      showTrackToast(`♪ Playing: ${currentTrack.title}`);
    }
  };

  // Page change sync: switch track to page's default unless user manually overrode recently
  useEffect(() => {
    const pageTrack = TRACKS.find((t) => t.pages.includes(currentPage));
    if (pageTrack && pageTrack.src !== currentTrack.src) {
      manualTrackOverrideRef.current = false;
      selectTrack(pageTrack, isPlayingRef.current);
    }
  }, [currentPage, currentTrack.src, selectTrack]);

  // Volume & Mute sync
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  // Listen to the custom event from "Begin Our Story" button on Page 0
  useEffect(() => {
    const handleStartAudio = () => {
      // Begin story starts with Perfect
      selectTrack(TRACKS[0], true);
    };

    window.addEventListener('start-romantic-music', handleStartAudio);
    return () => {
      window.removeEventListener('start-romantic-music', handleStartAudio);
    };
  }, [selectTrack]);

  // Audio error fallback (e.g. for alfaaz.mp3 before it is uploaded)
  const handleAudioError = () => {
    console.warn(`Audio error while loading ${currentTrack.src}`);
    if (currentTrack.fallbackSrc) {
      const fallback = TRACKS.find((t) => t.src === currentTrack.fallbackSrc) || TRACKS[2];
      console.log(`Falling back to ${fallback.title}`);
      setCurrentTrack(fallback);
      if (isPlayingRef.current) {
        setTimeout(safePlay, 100);
      }
    }
  };

  return (
    <>
      {/* HTML5 Audio Element */}
      <audio
        ref={audioRef}
        key={currentTrack.src}
        src={currentTrack.src}
        preload="auto"
        loop
        onPlay={() => {
          setIsPlaying(true);
          isPlayingRef.current = true;
        }}
        onPause={() => {
          setIsPlaying(false);
          isPlayingRef.current = false;
        }}
        onError={handleAudioError}
      />

      <div
        style={{
          position: 'fixed',
          top: 'clamp(12px, 2vh, 18px)',
          right: 'clamp(12px, 2.5vw, 20px)',
          zIndex: 60,
          display: 'flex',
          alignItems: 'center',
          gap: 10,
        }}
      >
        {/* Floating Song Toast Notification */}
        <AnimatePresence>
          {toastMessage && (
            <motion.div
              initial={{ opacity: 0, x: 20, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 20, scale: 0.9 }}
              style={{
                background: 'rgba(26, 5, 12, 0.94)',
                border: '1px solid rgba(212, 175, 55, 0.55)',
                boxShadow: '0 8px 25px rgba(0, 0, 0, 0.8), 0 0 15px rgba(212, 175, 55, 0.25)',
                backdropFilter: 'blur(10px)',
                borderRadius: 20,
                padding: '6px 14px',
                color: '#F7E7CE',
                fontFamily: '"Cormorant Garamond", serif',
                fontSize: 13,
                fontWeight: 600,
                letterSpacing: 0.8,
                whiteSpace: 'nowrap',
                pointerEvents: 'none',
                maxWidth: 'calc(100vw - 120px)',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {toastMessage}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Music Disc Button & Popover */}
        <div
          style={{ position: 'relative' }}
          onMouseEnter={() => setShowControls(true)}
          onMouseLeave={() => setShowControls(false)}
        >
          <motion.button
            onClick={togglePlay}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.92 }}
            style={{
              width: 'clamp(36px, 4vw, 42px)',
              height: 'clamp(36px, 4vw, 42px)',
              borderRadius: '50%',
              background: isPlaying
                ? 'radial-gradient(circle at 35% 35%, #C41E3A 0%, #8B0000 65%, #3D0C02 100%)'
                : 'rgba(26, 5, 12, 0.88)',
              border: `1.5px solid ${isPlaying ? 'rgba(212, 175, 55, 0.85)' : 'rgba(212, 175, 55, 0.4)'}`,
              boxShadow: isPlaying
                ? '0 0 20px rgba(196, 30, 58, 0.6), 0 0 15px rgba(212, 175, 55, 0.35)'
                : '0 4px 15px rgba(0, 0, 0, 0.6)',
              backdropFilter: 'blur(10px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: '#D4AF37',
              transition: 'all 0.3s ease',
            }}
            title={isPlaying ? 'Pause Music' : 'Play Music'}
            aria-label="Toggle Romantic Music"
          >
            {isPlaying ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                <Disc3 size={20} color="#D4AF37" />
              </motion.div>
            ) : (
              <Music size={18} color="rgba(212, 175, 55, 0.65)" />
            )}
          </motion.button>

          {/* Interactive Popover with Track Selector */}
          <AnimatePresence>
            {showControls && (
              <motion.div
                initial={{ opacity: 0, y: -8, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                style={{
                  position: 'absolute',
                  top: 'calc(100% + 8px)',
                  right: 0,
                  background: 'linear-gradient(155deg, #240712 0%, #120208 100%)',
                  border: '1px solid rgba(212, 175, 55, 0.45)',
                  boxShadow: '0 15px 35px rgba(0, 0, 0, 0.9), 0 0 20px rgba(196, 30, 58, 0.25)',
                  borderRadius: 14,
                  padding: '12px 14px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 10,
                  minWidth: 220,
                  backdropFilter: 'blur(16px)',
                  zIndex: 70,
                }}
              >
                {/* Now Playing Title */}
                <div style={{ textAlign: 'center', borderBottom: '1px solid rgba(212, 175, 55, 0.2)', paddingBottom: 8 }}>
                  <div
                    style={{
                      fontFamily: '"Cormorant Garamond", serif',
                      fontSize: 14.5,
                      fontWeight: 700,
                      color: '#D4AF37',
                      letterSpacing: 1,
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    {currentTrack.title}
                  </div>
                  <div
                    style={{
                      fontFamily: '"Playfair Display", serif',
                      fontStyle: 'italic',
                      fontSize: 11,
                      color: 'rgba(232, 146, 154, 0.85)',
                      marginTop: 2,
                    }}
                  >
                    {currentTrack.artist}
                  </div>
                </div>

                {/* Volume Slider & Mute Toggle */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <button
                    onClick={() => setIsMuted((m) => !m)}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#D4AF37',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      padding: 2,
                    }}
                    title={isMuted ? 'Unmute' : 'Mute'}
                  >
                    {isMuted ? <VolumeX size={15} /> : <Volume2 size={15} />}
                  </button>
                  <input
                    type="range"
                    min={0}
                    max={1}
                    step={0.05}
                    value={isMuted ? 0 : volume}
                    onChange={(e) => {
                      setVolume(Number(e.target.value));
                      if (isMuted) setIsMuted(false);
                    }}
                    style={{
                      flex: 1,
                      accentColor: '#D4AF37',
                      height: 4,
                      cursor: 'pointer',
                    }}
                  />
                </div>

                {/* Song Quick Selector */}
                <div style={{ borderTop: '1px solid rgba(212, 175, 55, 0.15)', paddingTop: 8 }}>
                  <div
                    style={{
                      fontFamily: '"Cormorant Garamond", serif',
                      fontSize: 10,
                      letterSpacing: 2,
                      color: 'rgba(212, 175, 55, 0.65)',
                      textTransform: 'uppercase',
                      marginBottom: 6,
                    }}
                  >
                    Romantic Playlist
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                    {TRACKS.map((t) => {
                      const isSelected = currentTrack.src === t.src;
                      return (
                        <button
                          key={t.id}
                          onClick={() => {
                            manualTrackOverrideRef.current = true;
                            selectTrack(t, true);
                          }}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            padding: '5px 8px',
                            borderRadius: 6,
                            background: isSelected ? 'rgba(196, 30, 58, 0.35)' : 'rgba(255, 255, 255, 0.03)',
                            border: `1px solid ${isSelected ? 'rgba(212, 175, 55, 0.5)' : 'transparent'}`,
                            color: isSelected ? '#D4AF37' : '#F7E7CE',
                            cursor: 'pointer',
                            textAlign: 'left',
                            transition: 'all 0.15s ease',
                          }}
                        >
                          <div>
                            <div style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: 12.5, fontWeight: 600 }}>
                              {t.title}
                            </div>
                            <div style={{ fontSize: 9.5, opacity: 0.65 }}>{t.artist}</div>
                          </div>
                          {isSelected && <Check size={13} color="#D4AF37" />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </>
  );
}
