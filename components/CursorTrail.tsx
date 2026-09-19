"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  life: number;
  maxLife: number;
  opacity: number;
}

export default function CursorTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) return;
    // ponytail: touch devices gain nothing from a cursor trail — skip canvas entirely.
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let particles: Particle[] = [];
    let raf = 0;
    let w = 0;
    let h = 0;
    // Cursor position lerped so the trail is smooth & naturally lagged
    let tx = -100;
    let ty = -100;
    let cx = -100;
    let cy = -100;
    let active = false;
    let lastEmit = 0;
    let last = 0;

    const resize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };

    const spawn = (x: number, y: number, count: number) => {
      for (let i = 0; i < count; i++) {
        if (particles.length > 120) particles.shift();
        particles.push({
          x: x + (Math.random() - 0.5) * 6,
          y: y + (Math.random() - 0.5) * 6,
          vx: (Math.random() - 0.5) * 0.6,
          vy: (Math.random() - 0.5) * 0.6,
          r: Math.random() * 2.4 + 0.8,
          life: 0,
          maxLife: Math.random() * 40 + 45,
          opacity: Math.random() * 0.5 + 0.25,
        });
      }
    };

    const onMove = (e: PointerEvent) => {
      tx = e.clientX;
      ty = e.clientY;
      if (!active) {
        cx = tx;
        cy = ty;
        active = true;
      }
    };

    const onLeave = () => {
      active = false;
    };

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
      if (now - last < 33) return; // ~30fps — particle fade invisible above this
      last = now;
      if (active) {
        const k = 0.16;
        cx += (tx - cx) * k;
        cy += (ty - cy) * k;
        if (now - lastEmit > 36) {
          spawn(cx, cy, 2);
          lastEmit = now;
        }
      }

      ctx.clearRect(0, 0, w, h);
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.life += 2; // compensate 30fps step
        if (p.life >= p.maxLife) {
          particles.splice(i, 1);
          continue;
        }
        p.x += p.vx * 2;
        p.y += p.vy * 2;
        // Light float like snow
        p.x += Math.sin(p.y * 0.02 + p.r) * 0.4;

        const t = p.life / p.maxLife;
        const alpha = p.opacity * (1 - t);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * (1 - t * 0.6), 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${alpha})`;
        ctx.fill();
      }
      // Sleep loop when idle — zero cost while user isn't moving the cursor.
      if (!active && particles.length === 0) {
        cancelAnimationFrame(raf);
        raf = 0;
        const wake = () => {
          if (raf) return;
          last = performance.now();
          raf = requestAnimationFrame(draw);
        };
        window.addEventListener("pointermove", wake, { once: true, passive: true });
      }
    };

    resize();
    raf = requestAnimationFrame(draw);
    window.addEventListener("resize", resize);
    window.addEventListener("scroll", onScrollPause, { passive: true });
    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", onScrollPause);
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      window.clearTimeout(scrollTimer);
    };
  }, [reduce]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[2] hidden [@media(pointer:fine)]:block"
    />
  );
}
