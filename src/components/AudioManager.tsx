import { useState, useRef, useEffect, useCallback } from 'react';
import { Volume2, VolumeX, Music, Disc3 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface TrackInfo {
  title: string;
  artist: string;
  src: string;
  fallbackSrc?: string;
  pages: number[];
}

const TRACKS: TrackInfo[] = [
  {
    title: 'Perfect',
    artist: 'Ed Sheeran',
    src: '/assets/perfect.mp3',
    pages: [0, 1, 2], // The Invitation, Our Story, 21 Reasons
  },
  {
    title: 'Khat',
    artist: 'Navv Inder',
    src: '/assets/khat.mp3',
    pages: [3, 4], // Memory Theater, The 21 Countdown
  },
  {
    title: 'Afreen Afreen',
    artist: 'Rahat Fateh Ali Khan & Momina',
    src: '/assets/afreen.mp3',
    pages: [5, 6, 7], // The Enchanted Rose, Promises, Night Sky
  },
  {
    title: 'Alfaaz',
    artist: 'Romantic Finale',
    src: '/assets/alfaaz.mp3',
    fallbackSrc: '/assets/afreen.mp3',
    pages: [8], // Forever With You
  },
];

interface AudioManagerProps {
  currentPage?: number;
}

export default function AudioManager({ currentPage = 0 }: AudioManagerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [showControls, setShowControls] = useState(false);
  const [volume, setVolume] = useState(0.65);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const currentTrackRef = useRef<TrackInfo>(TRACKS[0]);
  const isPlayingRef = useRef(false);
  const toastTimeoutRef = useRef<number | null>(null);

  // Find track corresponding to current page
  const targetTrack = TRACKS.find((t) => t.pages.includes(currentPage)) || TRACKS[0];

  const showTrackToast = (text: string) => {
    if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
    setToastMessage(text);
    toastTimeoutRef.current = window.setTimeout(() => {
      setToastMessage(null);
    }, 3800);
  };

  // Switch or play track
  const playTrack = useCallback(
    (track: TrackInfo, shouldForcePlay = false) => {
      const audio = audioRef.current;
      if (!audio) return;

      const trackChanged = currentTrackRef.current.src !== track.src;
      currentTrackRef.current = track;

      if (trackChanged) {
        audio.src = track.src;
        audio.load();
      }

      if (shouldForcePlay || isPlayingRef.current) {
        audio
          .play()
          .then(() => {
            setIsPlaying(true);
            isPlayingRef.current = true;
            if (trackChanged || shouldForcePlay) {
              showTrackToast(`♪ ${track.title} • ${track.artist}`);
            }
          })
          .catch((err) => {
            console.warn('Playback error or auto-play prevented:', err);
          });
      }
    },
    []
  );

  // Toggle play/pause
  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
      isPlayingRef.current = false;
      showTrackToast('♪ Music Paused');
    } else {
      audio
        .play()
        .then(() => {
          setIsPlaying(true);
          isPlayingRef.current = true;
          showTrackToast(`♪ Playing: ${currentTrackRef.current.title}`);
        })
        .catch((err) => {
          console.warn('Playback resume failed:', err);
        });
    }
  };

  // Handle page change: switch track if needed without interrupting if on the same track
  useEffect(() => {
    if (targetTrack.src !== currentTrackRef.current.src) {
      playTrack(targetTrack, isPlayingRef.current);
    }
  }, [currentPage, targetTrack, playTrack]);

  // Volume & mute controls
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  // Listen to the custom event from "Begin Our Story" button on Page 0
  useEffect(() => {
    const handleStartAudio = () => {
      const trackToPlay = TRACKS.find((t) => t.pages.includes(1)) || TRACKS[0];
      playTrack(trackToPlay, true);
    };

    window.addEventListener('start-romantic-music', handleStartAudio);
    return () => {
      window.removeEventListener('start-romantic-music', handleStartAudio);
    };
  }, [playTrack]);

  // Fallback for alfaaz or missing audio
  const handleAudioError = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (currentTrackRef.current.fallbackSrc) {
      console.log(`Audio error on ${currentTrackRef.current.src}, falling back to ${currentTrackRef.current.fallbackSrc}`);
      audio.src = currentTrackRef.current.fallbackSrc;
      audio.load();
      if (isPlayingRef.current) {
        audio.play().catch(() => {});
      }
    }
  };

  return (
    <>
      {/* Hidden audio element */}
      <audio
        ref={audioRef}
        src={currentTrackRef.current.src}
        preload="auto"
        loop
        onError={handleAudioError}
      />

      <div
        style={{
          position: 'fixed',
          top: 'clamp(12px, 2vh, 18px)',
          right: 'clamp(12px, 2.5vw, 20px)',
          zIndex: 50,
          display: 'flex',
          alignItems: 'center',
          gap: 10,
        }}
      >
        {/* Floating Now-Playing Song Toast */}
        <AnimatePresence>
          {toastMessage && (
            <motion.div
              initial={{ opacity: 0, x: 20, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 20, scale: 0.9 }}
              style={{
                background: 'rgba(26, 5, 12, 0.92)',
                border: '1px solid rgba(212, 175, 55, 0.55)',
                boxShadow: '0 8px 25px rgba(0, 0, 0, 0.7), 0 0 15px rgba(212, 175, 55, 0.25)',
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

        {/* Music Player Button & Popover */}
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
                transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                <Disc3 size={19} color="#D4AF37" />
              </motion.div>
            ) : (
              <Music size={18} color="rgba(212, 175, 55, 0.65)" />
            )}
          </motion.button>

          {/* Interactive Popover Controls */}
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
                  minWidth: 190,
                  backdropFilter: 'blur(16px)',
                  zIndex: 60,
                }}
              >
                {/* Track Details */}
                <div style={{ textAlign: 'center', borderBottom: '1px solid rgba(212, 175, 55, 0.2)', paddingBottom: 8 }}>
                  <div
                    style={{
                      fontFamily: '"Cormorant Garamond", serif',
                      fontSize: 14,
                      fontWeight: 700,
                      color: '#D4AF37',
                      letterSpacing: 1,
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    {currentTrackRef.current.title}
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
                    {currentTrackRef.current.artist}
                  </div>
                </div>

                {/* Status & Volume Slider */}
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
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </>
  );
}
