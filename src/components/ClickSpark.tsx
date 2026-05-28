import React, { useRef, useEffect } from 'react';

interface ClickSparkProps {
  sparkCount?: number;
  children?: React.ReactNode;
}

interface Spark {
  x: number;
  y: number;
  angle: number;
  startTime: number;
  length: number;
  color: string;
}

interface Residue {
  x: number;
  y: number;
  startTime: number;
}

const COLORS = ['var(--accent-violet)', 'var(--accent-fuchsia)'];

const ClickSpark: React.FC<ClickSparkProps> = ({
  sparkCount = 6,
  children
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sparksRef = useRef<Spark[]>([]);
  const residuesRef = useRef<Residue[]>([]);

  // Resize & DPR aware
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const parent = canvas.parentElement;
    if (!parent) return;

    let rafId = 0;

    const resize = () => {
      const rect = parent.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const w = Math.max(1, Math.floor(rect.width));
      const h = Math.max(1, Math.floor(rect.height));
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      const ctx = canvas.getContext('2d');
      if (ctx) ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const ro = new ResizeObserver(() => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(resize);
    });
    ro.observe(parent);
    resize();

    return () => {
      ro.disconnect();
      cancelAnimationFrame(rafId);
    };
  }, []);

  const triggerLoopRef = useRef<() => void>(() => {});

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId = 0;
    let isRunning = false;
    const total = 380; // ms (80ms in, 300ms out)

    const draw = (ts: number) => {
      if (sparksRef.current.length === 0 && residuesRef.current.length === 0) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        isRunning = false;
        return;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw residues (expanding faint circle)
      residuesRef.current = residuesRef.current.filter(r => {
        const elapsed = ts - r.startTime;
        if (elapsed > total) return false;
        const t = Math.max(0, Math.min(1, elapsed / total));
        const radius = 6 + t * 30;
        const alpha = 1 - t;
        ctx.beginPath();
        ctx.fillStyle = `rgba(139,92,246,${0.08 * alpha})`;
        ctx.arc(r.x, r.y, radius, 0, Math.PI * 2);
        ctx.fill();
        return true;
      });

      // Draw sparks (short lines)
      sparksRef.current = sparksRef.current.filter(s => {
        const elapsed = ts - s.startTime;
        if (elapsed > total) return false;
        let alpha = 1;
        if (elapsed < 80) alpha = elapsed / 80;
        else alpha = 1 - (elapsed - 80) / (total - 80);

        const progress = Math.max(0, Math.min(1, elapsed / total));
        const distance = progress * s.length;
        const lineLen = Math.max(2, s.length * (1 - progress));

        const x1 = s.x + (distance - lineLen) * Math.cos(s.angle);
        const y1 = s.y + (distance - lineLen) * Math.sin(s.angle);
        const x2 = s.x + distance * Math.cos(s.angle);
        const y2 = s.y + distance * Math.sin(s.angle);

        // Resolve CSS variable color if needed
        let color = s.color;
        try {
          if (color.startsWith('var(')) {
            const prop = color.replace(/var\(|\)/g, '');
            const computed = getComputedStyle(document.documentElement).getPropertyValue(prop).trim();
            if (computed) color = computed;
          }
        } catch (err) {}

        ctx.beginPath();
        ctx.strokeStyle = color;
        ctx.globalAlpha = alpha;
        ctx.lineWidth = 2;
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
        ctx.globalAlpha = 1;

        return true;
      });

      animId = requestAnimationFrame(draw);
    };

    triggerLoopRef.current = () => {
      if (!isRunning) {
        isRunning = true;
        animId = requestAnimationFrame(draw);
      }
    };

    return () => cancelAnimationFrame(animId);
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const now = performance.now();

    // Create residue
    residuesRef.current.push({ x, y, startTime: now });

    // Create sparks
    const count = Math.max(3, Math.min(8, Math.floor(sparkCount)));
    for (let i = 0; i < count; i++) {
      const angle = (Math.random() * Math.PI * 2);
      const length = 12 + Math.random() * 8; // 12-20px
      const color = `var(${COLORS[Math.floor(Math.random() * COLORS.length)]})`;
      sparksRef.current.push({ x, y, angle, startTime: now, length, color });
    }

    triggerLoopRef.current();
  };

  return (
    <div className="relative w-full h-full" onClick={handleClick}>
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />
      {children}
    </div>
  );
};

export default ClickSpark;
