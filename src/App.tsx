import { useEffect, useState } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import CursorTrail from './components/CursorTrail';
import RosePetals from './components/RosePetals';
import AudioManager from './components/AudioManager';
import TransitionOverlay from './components/TransitionOverlay';

import Page0_Invitation from './pages/Page0_Invitation';
import Page1_OurStory from './pages/Page1_OurStory';
import Page2_ReasonsILoveYou from './pages/Page2_ReasonsILoveYou';
import Page3_Memories from './pages/Page3_Memories';
import Page4_Countdown21 from './pages/Page4_Countdown21';
import Page6_RoseGarden3D from './pages/Page6_RoseGarden3D';
import Page7_Promises from './pages/Page7_Promises';
import Page9_NightSky from './pages/Page9_NightSky';
import Page10_Forever from './pages/Page10_Forever';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const PAGES = [
  { path: '/', name: 'The Invitation', component: Page0_Invitation },
  { path: '/story', name: 'Our Story', component: Page1_OurStory },
  { path: '/reasons', name: '21 Reasons I Love You', component: Page2_ReasonsILoveYou },
  { path: '/memories', name: 'Memory Theater', component: Page3_Memories },
  { path: '/countdown', name: 'The 21 Countdown', component: Page4_Countdown21 },
  { path: '/garden', name: 'The Enchanted Rose', component: Page6_RoseGarden3D },
  { path: '/promises', name: 'Promises to You', component: Page7_Promises },
  { path: '/night-sky', name: 'Your Star in the Sky', component: Page9_NightSky },
  { path: '/forever', name: 'Forever With You', component: Page10_Forever },
];

export default function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const [transitioning, setTransitioning] = useState(false);
  const [transitionTitle, setTransitionTitle] = useState('');
  const [pageToast, setPageToast] = useState<string | null>(null);

  const currentIndex = PAGES.findIndex((p) => p.path === location.pathname);
  const safeIndex = currentIndex >= 0 ? currentIndex : 0;

  const goToPage = (idx: number) => {
    if (idx < 0 || idx >= PAGES.length || transitioning) return;
    setTransitioning(true);
    setTransitionTitle(PAGES[idx].name);
    setPageToast(PAGES[idx].name);

    setTimeout(() => {
      navigate(PAGES[idx].path);
      setTimeout(() => {
        setTransitioning(false);
      }, 450);
    }, 450);
  };

  // Keyboard navigation: Left/Right arrows
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (e.key === 'ArrowRight' || e.key === ' ') {
        if (safeIndex < PAGES.length - 1) goToPage(safeIndex + 1);
      } else if (e.key === 'ArrowLeft') {
        if (safeIndex > 0) goToPage(safeIndex - 1);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [safeIndex, transitioning]);

  // Mobile Touch Swipe Navigation
  useEffect(() => {
    let startX = 0;
    let startY = 0;

    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
      }
    };

    const onTouchEnd = (e: TouchEvent) => {
      if (e.changedTouches.length > 0) {
        const deltaX = e.changedTouches[0].clientX - startX;
        const deltaY = e.changedTouches[0].clientY - startY;

        // Trigger chapter transition on horizontal swipe > 60px
        if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 60) {
          if (deltaX < 0 && safeIndex < PAGES.length - 1) {
            goToPage(safeIndex + 1);
          } else if (deltaX > 0 && safeIndex > 0) {
            goToPage(safeIndex - 1);
          }
        }
      }
    };

    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchend', onTouchEnd, { passive: true });

    return () => {
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchend', onTouchEnd);
    };
  }, [safeIndex, transitioning]);

  // Toast on route change
  useEffect(() => {
    setPageToast(PAGES[safeIndex].name);
    const timer = setTimeout(() => setPageToast(null), 2500);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh', overflow: 'hidden' }}>
      {/* Global Interactive Elements */}
      <CursorTrail />
      <RosePetals />
      <AudioManager currentPage={safeIndex} />

      {/* Cinematic Royal Curtain Transition */}
      <TransitionOverlay isVisible={transitioning} chapterTitle={transitionTitle} />

      {/* Floating Left Navigation Arrow (hidden on invitation) */}
      {safeIndex > 0 && (
        <motion.button
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => goToPage(safeIndex - 1)}
          style={{
            position: 'fixed',
            left: 'clamp(12px, 2.5vw, 24px)',
            bottom: 'clamp(14px, 2.8vh, 24px)',
            width: 'clamp(38px, 4vw, 44px)',
            height: 'clamp(38px, 4vw, 44px)',
            borderRadius: '50%',
            background: 'rgba(26,5,10,0.8)',
            border: '1px solid rgba(212,175,55,0.4)',
            color: '#D4AF37',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            zIndex: 100,
            backdropFilter: 'blur(8px)',
            boxShadow: '0 4px 15px rgba(0,0,0,0.6)',
          }}
          title="Previous Chapter"
        >
          <ChevronLeft size={18} />
        </motion.button>
      )}

      {/* Floating Right Navigation Arrow */}
      {safeIndex < PAGES.length - 1 && safeIndex > 0 && (
        <motion.button
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => goToPage(safeIndex + 1)}
          style={{
            position: 'fixed',
            right: 'clamp(12px, 2.5vw, 24px)',
            bottom: 'clamp(14px, 2.8vh, 24px)',
            width: 'clamp(38px, 4vw, 44px)',
            height: 'clamp(38px, 4vw, 44px)',
            borderRadius: '50%',
            background: 'rgba(26,5,10,0.8)',
            border: '1px solid rgba(212,175,55,0.4)',
            color: '#D4AF37',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            zIndex: 100,
            backdropFilter: 'blur(8px)',
            boxShadow: '0 4px 15px rgba(0,0,0,0.6)',
          }}
          title="Next Chapter"
        >
          <ChevronRight size={18} />
        </motion.button>
      )}

      {/* Page Title Toast Indicator */}
      <AnimatePresence>
        {pageToast && safeIndex > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            style={{
              position: 'fixed',
              top: 'clamp(12px, 2vh, 20px)',
              left: 'clamp(14px, 2.5vw, 24px)',
              maxWidth: 'calc(100vw - 90px)',
              zIndex: 100,
              fontFamily: '"Cormorant Garamond", serif',
              fontSize: 'clamp(11px, 1.2vw, 12px)',
              letterSpacing: 3,
              color: 'rgba(212,175,55,0.85)',
              textTransform: 'uppercase',
              pointerEvents: 'none',
              background: 'rgba(20,5,10,0.65)',
              padding: '4px 14px',
              borderRadius: 14,
              border: '1px solid rgba(212,175,55,0.3)',
              backdropFilter: 'blur(8px)',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            Chapter {safeIndex} • {pageToast}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Animated Route Views */}
      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          style={{ width: '100%', height: '100%' }}
        >
          <Routes location={location}>
            {PAGES.map((page) => (
              <Route key={page.path} path={page.path} element={<page.component />} />
            ))}
          </Routes>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
