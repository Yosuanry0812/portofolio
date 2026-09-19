"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import { useTheme } from "@/lib/theme";

interface Flake {
  x: number;
  y: number;
  r: number;
  speed: number;
  drift: number;
  opacity: number;
}

export default function Snow() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduce = useReducedMotion();
  const { theme } = useTheme();
  const themeRef = useRef(theme);
  themeRef.current = theme;

  useEffect(() => {
    if (reduce) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let flakes: Flake[] = [];
    let raf = 0;
    let last = 0;
    let w = 0;
    let h = 0;
    let blend = themeRef.current === "dark" ? 0 : 1;

    const resize = () => {
      // ponytail: DPR locked to 1 — soft dots need no retina sharpness, halves fill cost on mobile.
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
      const small = w < 768;
      const count = small
        ? Math.min(45, Math.max(15, Math.floor(w / 28)))
        : Math.min(110, Math.max(30, Math.floor(w / 16)));
      flakes = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 2.2 + 0.6,
        speed: Math.random() * 0.7 + 0.3,
        drift: Math.random() * 0.4 - 0.2,
        opacity: Math.random() * 0.5 + 0.2,
      }));
    };

    // scroll wind — scroll cepat tiup salju miring, lalu reda sendiri
    let wind = 0;
    let lastSY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      wind += (y - lastSY) * 0.015;
      lastSY = y;
    };

    const draw = (now: number) => {
      raf = requestAnimationFrame(draw);
      if (document.hidden) return;
      if (now - last < 33) return; // ~30fps — snow drift invisible above this
      last = now;
      wind *= 0.94;
      const target = themeRef.current === "dark" ? 0 : 1;
      blend += (target - blend) * 0.14;
      if (Math.abs(target - blend) < 0.002) blend = target;
      // white (dark) -> slate (light), eased
      const r = Math.round(255 + (100 - 255) * blend);
      const g = Math.round(255 + (116 - 255) * blend);
      const b = Math.round(255 + (139 - 255) * blend);
      ctx.clearRect(0, 0, w, h);
      for (const f of flakes) {
        f.y += f.speed * 2; // compensate 30fps step
        f.x += f.drift * 2 + Math.sin(f.y * 0.01 + f.r) * 0.6 - wind;
        if (f.y > h + 4) {
          f.y = -4;
          f.x = Math.random() * w;
        }
        if (f.x > w + 4) f.x = -4;
        if (f.x < -4) f.x = w + 4;
        ctx.beginPath();
        ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r},${g},${b},${f.opacity})`;
        ctx.fill();
      }
    };

    resize();
    raf = requestAnimationFrame(draw);
    window.addEventListener("resize", resize);
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", onScroll);
    };
  }, [reduce]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[1]"
    />
  );
}
