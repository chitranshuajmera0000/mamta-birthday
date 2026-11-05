import { useEffect, useRef } from 'react';

interface Heart {
  x: number;
  y: number;
  size: number;
  opacity: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
}

export default function CursorTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const heartsRef = useRef<Heart[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number>(0);
  const lastSpawnRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const dot = cursorDotRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
      if (dot) {
        dot.style.left = e.clientX + 'px';
        dot.style.top = e.clientY + 'px';
      }

      const now = Date.now();
      if (now - lastSpawnRef.current > 60) {
        lastSpawnRef.current = now;
        heartsRef.current.push({
          x: e.clientX + (Math.random() - 0.5) * 10,
          y: e.clientY + (Math.random() - 0.5) * 10,
          size: 6 + Math.random() * 8,
          opacity: 0.8,
          vx: (Math.random() - 0.5) * 1.5,
          vy: -1 - Math.random() * 2,
          life: 0,
          maxLife: 40 + Math.random() * 20,
        });
      }
    };

    const onClick = (e: MouseEvent) => {
      for (let i = 0; i < 6; i++) {
        heartsRef.current.push({
          x: e.clientX,
          y: e.clientY,
          size: 8 + Math.random() * 12,
          opacity: 1,
          vx: (Math.random() - 0.5) * 4,
          vy: -2 - Math.random() * 3,
          life: 0,
          maxLife: 50 + Math.random() * 30,
        });
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('click', onClick);

    function drawHeart(ctx: CanvasRenderingContext2D, x: number, y: number, size: number) {
      ctx.beginPath();
      ctx.moveTo(x, y + size / 4);
      ctx.bezierCurveTo(x, y, x - size / 2, y, x - size / 2, y + size / 4);
      ctx.bezierCurveTo(x - size / 2, y + size / 2, x, y + size * 0.75, x, y + size);
      ctx.bezierCurveTo(x, y + size * 0.75, x + size / 2, y + size / 2, x + size / 2, y + size / 4);
      ctx.bezierCurveTo(x + size / 2, y, x, y, x, y + size / 4);
      ctx.closePath();
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      heartsRef.current = heartsRef.current.filter(h => h.life < h.maxLife);
      for (const h of heartsRef.current) {
        h.life++;
        h.x += h.vx;
        h.y += h.vy;
        h.vy += 0.05; // gravity
        h.opacity = (1 - h.life / h.maxLife) * 0.8;
        ctx.globalAlpha = h.opacity;
        ctx.fillStyle = '#C41E3A';
        drawHeart(ctx, h.x - h.size / 2, h.y - h.size / 2, h.size);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      rafRef.current = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('click', onClick);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <>
      <div
        ref={cursorDotRef}
        className="cursor-dot"
        style={{ position: 'fixed', pointerEvents: 'none', zIndex: 9999 }}
      />
      <canvas
        ref={canvasRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          pointerEvents: 'none',
          zIndex: 9998,
        }}
      />
    </>
  );
}
