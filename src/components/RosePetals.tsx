import { useEffect, useRef } from 'react';

interface Petal {
  x: number;
  y: number;
  size: number;
  rotation: number;
  rotationSpeed: number;
  flipAngle: number;
  flipSpeed: number;
  vx: number;
  vy: number;
  opacity: number;
  colorType: number;
  wobble: number;
  wobbleSpeed: number;
  wobbleAmp: number;
}

interface Sparkle {
  x: number;
  y: number;
  size: number;
  vy: number;
  vx: number;
  alpha: number;
  maxAlpha: number;
  pulseSpeed: number;
  pulseOffset: number;
}

interface BokehOrb {
  x: number;
  y: number;
  radius: number;
  vy: number;
  vx: number;
  color: string;
  alpha: number;
  pulse: number;
}

export default function RosePetals() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const petalsRef = useRef<Petal[]>([]);
  const sparklesRef = useRef<Sparkle[]>([]);
  const bokehRef = useRef<BokehOrb[]>([]);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const rafRef = useRef<number>(0);

  function createPetal(randomY = false): Petal {
    const w = window.innerWidth;
    const h = window.innerHeight;
    return {
      x: Math.random() * w,
      y: randomY ? Math.random() * h : -30 - Math.random() * 40,
      size: 11 + Math.random() * 14,
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.04,
      flipAngle: Math.random() * Math.PI * 2,
      flipSpeed: 0.02 + Math.random() * 0.035,
      vx: (Math.random() - 0.5) * 0.8,
      vy: 0.9 + Math.random() * 1.3,
      opacity: 0.65 + Math.random() * 0.35,
      colorType: Math.floor(Math.random() * 3),
      wobble: Math.random() * Math.PI * 2,
      wobbleSpeed: 0.018 + Math.random() * 0.025,
      wobbleAmp: 0.8 + Math.random() * 1.2,
    };
  }

  function createSparkle(randomY = false): Sparkle {
    const w = window.innerWidth;
    const h = window.innerHeight;
    return {
      x: Math.random() * w,
      y: randomY ? Math.random() * h : h + 10,
      size: 1.5 + Math.random() * 2.5,
      vy: -(0.4 + Math.random() * 0.8),
      vx: (Math.random() - 0.5) * 0.4,
      alpha: 0.2,
      maxAlpha: 0.5 + Math.random() * 0.5,
      pulseSpeed: 0.03 + Math.random() * 0.04,
      pulseOffset: Math.random() * Math.PI * 2,
    };
  }

  function createBokeh(): BokehOrb {
    const w = window.innerWidth;
    const h = window.innerHeight;
    const colors = [
      'rgba(212, 175, 55, ', // Warm Gold
      'rgba(196, 30, 58, ',  // Deep Rose
      'rgba(255, 180, 80, ', // Candlelight Amber
      'rgba(183, 110, 121, ',// Rose Gold
    ];
    return {
      x: Math.random() * w,
      y: Math.random() * h,
      radius: 40 + Math.random() * 90,
      vy: -(0.15 + Math.random() * 0.3),
      vx: (Math.random() - 0.5) * 0.2,
      color: colors[Math.floor(Math.random() * colors.length)],
      alpha: 0.04 + Math.random() * 0.07,
      pulse: Math.random() * Math.PI * 2,
    };
  }

  useEffect(() => {
    const canvas = canvasRef.current;
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
    };
    window.addEventListener('mousemove', onMouseMove);

    // Initial Seeds
    petalsRef.current = [];
    for (let i = 0; i < 22; i++) {
      petalsRef.current.push(createPetal(true));
    }

    sparklesRef.current = [];
    for (let i = 0; i < 35; i++) {
      sparklesRef.current.push(createSparkle(true));
    }

    bokehRef.current = [];
    for (let i = 0; i < 10; i++) {
      bokehRef.current.push(createBokeh());
    }

    let frame = 0;

    const drawPetalShape = (c: CanvasRenderingContext2D, size: number, colorType: number) => {
      c.beginPath();
      c.moveTo(0, -size);
      // Right curved lobe
      c.bezierCurveTo(size * 0.75, -size * 0.65, size * 0.9, size * 0.25, 0, size);
      // Left curved lobe
      c.bezierCurveTo(-size * 0.9, size * 0.25, -size * 0.75, -size * 0.65, 0, -size);
      c.closePath();

      // Dual-tone radial velvet shading
      const grad = c.createRadialGradient(-size * 0.2, -size * 0.3, size * 0.1, 0, 0, size * 1.1);
      if (colorType === 0) {
        // Deep Crimson Velvet
        grad.addColorStop(0, '#E8929A');
        grad.addColorStop(0.35, '#C41E3A');
        grad.addColorStop(0.8, '#8B0000');
        grad.addColorStop(1, '#4A0005');
      } else if (colorType === 1) {
        // Soft Rose Petal
        grad.addColorStop(0, '#FFF0F2');
        grad.addColorStop(0.4, '#F4C2C2');
        grad.addColorStop(0.8, '#C41E3A');
        grad.addColorStop(1, '#6B000B');
      } else {
        // Royal Wine & Gold Tint
        grad.addColorStop(0, '#FFD1DC');
        grad.addColorStop(0.4, '#B76E79');
        grad.addColorStop(0.85, '#5C0816');
        grad.addColorStop(1, '#2E0209');
      }

      c.fillStyle = grad;
      c.fill();

      // Subtle delicate center petal vein line
      c.beginPath();
      c.moveTo(0, -size * 0.75);
      c.quadraticCurveTo(size * 0.08, 0, 0, size * 0.75);
      c.strokeStyle = 'rgba(255, 255, 255, 0.18)';
      c.lineWidth = 0.8;
      c.stroke();
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      frame++;

      const w = canvas.width;
      const h = canvas.height;
      const mouse = mouseRef.current;

      // 1. Render Atmospheric Bokeh / Candlelight Orbs
      for (const b of bokehRef.current) {
        b.y += b.vy;
        b.x += b.vx;
        b.pulse += 0.015;
        if (b.y < -b.radius) {
          b.y = h + b.radius;
          b.x = Math.random() * w;
        }

        const currentAlpha = b.alpha * (0.8 + Math.sin(b.pulse) * 0.3);
        const grad = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, b.radius);
        grad.addColorStop(0, `${b.color}${currentAlpha})`);
        grad.addColorStop(0.6, `${b.color}${currentAlpha * 0.4})`);
        grad.addColorStop(1, `${b.color}0)`);

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      // 2. Render Golden Fairy Lights / Stardust Embers
      if (frame % 25 === 0 && sparklesRef.current.length < 40) {
        sparklesRef.current.push(createSparkle());
      }
      sparklesRef.current = sparklesRef.current.filter((s) => s.y > -20);

      for (const s of sparklesRef.current) {
        s.y += s.vy;
        s.x += s.vx + Math.sin(frame * 0.02 + s.pulseOffset) * 0.3;
        s.alpha = (Math.sin(frame * s.pulseSpeed + s.pulseOffset) * 0.5 + 0.5) * s.maxAlpha;

        ctx.save();
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 230, 140, ${s.alpha})`;
        ctx.shadowColor = 'rgba(212, 175, 55, 0.8)';
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.restore();
      }

      // 3. Render 3D Tumbling Realistic Rose Petals
      if (frame % 35 === 0 && petalsRef.current.length < 28) {
        petalsRef.current.push(createPetal());
      }
      petalsRef.current = petalsRef.current.filter((p) => p.y < h + 50);

      for (const p of petalsRef.current) {
        p.wobble += p.wobbleSpeed;
        p.flipAngle += p.flipSpeed;
        p.rotation += p.rotationSpeed;

        // Natural horizontal sway
        p.x += p.vx + Math.sin(p.wobble) * p.wobbleAmp;
        p.y += p.vy;

        // Gentle breeze pushed by cursor
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120 && dist > 0) {
          const force = (120 - dist) / 120;
          p.x += (dx / dist) * force * 3;
          p.y += (dy / dist) * force * 1.5;
        }

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);

        // 3D Flip effect (scaleX cosine curve mimics petal fluttering through air)
        const flipScale = Math.cos(p.flipAngle);
        ctx.scale(flipScale, 1);

        ctx.globalAlpha = p.opacity * (0.8 + Math.abs(flipScale) * 0.2);

        // Petal Shadow for depth
        ctx.shadowColor = 'rgba(20, 0, 5, 0.35)';
        ctx.shadowBlur = 6;
        ctx.shadowOffsetY = 4;

        drawPetalShape(ctx, p.size, p.colorType);

        ctx.restore();
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 1,
      }}
    />
  );
}
