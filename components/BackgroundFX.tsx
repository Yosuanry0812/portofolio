"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

interface Star {
  x: number;
  y: number;
  r: number;
  base: number;
  speed: number;
  phase: number;
}

interface Orb {
  x: number; // center px
  y: number;
  r: number;
  dx: number; // drift amplitude
  dy: number;
  sx: number; // drift speed
  sy: number;
  ph: number;
  color: string;
}

interface Meteor {
  x: number;
  y: number;
  vx: number;
  vy: number;
  len: number;
  life: number;
  maxLife: number;
}

const ORB_COLORS = [
  "244, 114, 182, 0.10",
  "56, 189, 248, 0.08",
  "192, 132, 252, 0.10",
  "250, 204, 21, 0.08",
];

export default function BackgroundFX() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = 0;
    let h = 0;
    let dpr = 1;
    let stars: Star[] = [];
    let orbs: Orb[] = [];
    let meteors: Meteor[] = [];
    let raf = 0;
    let nextMeteor = 0;
    let last = 0;
    const t0 = performance.now();
    const small = () => w < 768;

    const spawnMeteor = (now: number) => {
      const x = Math.random() * w;
      const y = -40;
      const angle = Math.PI / 4 + (Math.random() * 0.4 - 0.2);
      const speed = Math.random() * 1.6 + 3.4;
      meteors.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        len: Math.random() * 70 + 45,
        life: 0,
        maxLife: 130,
      });
      nextMeteor = now + (Math.random() * 4000 + 6000);
    };

    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, small() ? 1 : 1.5);
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      orbs = [
        { x: w * 0.12, y: h * 0.2, r: Math.min(w, h) * 0.55, dx: 60, dy: 30, sx: 0.12, sy: 0.09, ph: 0, color: ORB_COLORS[0] },
        { x: w * 0.85, y: h * 0.25, r: Math.min(w, h) * 0.5, dx: 70, dy: 40, sx: 0.1, sy: 0.13, ph: 2.1, color: ORB_COLORS[1] },
        { x: w * 0.75, y: h * 0.85, r: Math.min(w, h) * 0.6, dx: 80, dy: 50, sx: 0.13, sy: 0.1, ph: 4.2, color: ORB_COLORS[2] },
        { x: w * 0.2, y: h * 0.9, r: Math.min(w, h) * 0.5, dx: 50, dy: 60, sx: 0.09, sy: 0.12, ph: 5.5, color: ORB_COLORS[3] },
      ];

      const count = small()
        ? Math.min(60, Math.max(25, Math.floor((w * h) / 28000)))
        : Math.min(140, Math.max(50, Math.floor((w * h) / 14000)));
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 1.1 + 0.4,
        base: Math.random() * 0.35 + 0.1,
        speed: Math.random() * 0.9 + 0.3,
        phase: Math.random() * Math.PI * 2,
      }));
    };

    // ponytail: freeze loop while scrolling — canvas CPU raster was stealing frames from 90-120Hz scroll.
    let scrolling = false;
    let scrollTimer = 0;
    const onScrollPause = () => {
      scrolling = true;
      window.clearTimeout(scrollTimer);
      scrollTimer = window.setTimeout(() => {
        scrolling = false;
      }, 180);
    };

    const draw = (now: number) => {
      raf = requestAnimationFrame(draw);
      if (document.hidden || scrolling) return;
      if (now - last < 33) return; // ~30fps — fullscreen gradients cost GPU per frame
      last = now;
      const t = (now - t0) / 1000;
      ctx.clearRect(0, 0, w, h);

      // Aurora orbs
      for (const o of orbs) {
        const cx = o.x + Math.sin(t * o.sx + o.ph) * o.dx;
        const cy = o.y + Math.cos(t * o.sy + o.ph) * o.dy;
        const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, o.r);
        g.addColorStop(0, `rgba(${o.color})`);
        g.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = g;
        ctx.fillRect(cx - o.r, cy - o.r, o.r * 2, o.r * 2);
      }

      // Twinkling stars (every other skipped on mobile — halves arc fills)
      for (let si = 0; si < stars.length; si++) {
        if (small() && (si & 1) === 1) continue;
        const s = stars[si];
        const a = s.base + Math.sin(t * s.speed + s.phase) * 0.12;
        if (a <= 0.02) continue;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${a})`;
        ctx.fill();
      }

      // Meteor (desktop only — linear-gradient strokes cost GPU on mobile)
      if (!small() && now >= nextMeteor && meteors.length < 2) spawnMeteor(now);
      for (let i = meteors.length - 1; i >= 0; i--) {
        const m = meteors[i];
        m.life += 2; // compensate 30fps step so meteors keep same lifetime
        if (m.life > m.maxLife || m.y > h + 60) {
          meteors.splice(i, 1);
          continue;
        }
        m.x += m.vx * 2;
        m.y += m.vy * 2;
        const a = 1 - m.life / m.maxLife;
        const tx = m.x - m.vx * m.len;
        const ty = m.y - m.vy * m.len;
        const g = ctx.createLinearGradient(m.x, m.y, tx, ty);
        g.addColorStop(0, `rgba(255,255,255,${a * 0.9})`);
        g.addColorStop(1, "rgba(255,255,255,0)");
        ctx.strokeStyle = g;
        ctx.lineWidth = 2;
        ctx.lineCap = "round";
        ctx.beginPath();
        ctx.moveTo(m.x, m.y);
        ctx.lineTo(tx, ty);
        ctx.stroke();
      }
    };

    resize();
    raf = requestAnimationFrame(draw);
    window.addEventListener("resize", resize);
    window.addEventListener("scroll", onScrollPause, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", onScrollPause);
      window.clearTimeout(scrollTimer);
    };
  }, [reduce]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10"
    />
  );
}
