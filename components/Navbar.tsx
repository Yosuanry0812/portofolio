"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { profile } from "@/data/profile";
import { cn } from "@/lib/utils";

const links = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {/* Scroll progress */}
      <motion.div
        style={{ scaleX: progress }}
        className="h-0.5 origin-left bg-gradient-to-r from-cyan-400 via-sky-400 to-purple-400"
      />
      <div
        className={cn(
          "border-b backdrop-blur-md transition-colors duration-300",
          scrolled
            ? "border-slate-200 bg-white/80 dark:border-line dark:bg-bg/80"
            : "border-transparent bg-transparent"
        )}
      >
        <nav className="container-x flex h-16 items-center justify-between">
          <a href="#home" className="group font-mono text-lg font-bold text-slate-900 dark:text-white">
            <span className="text-cyan-400 group-hover:text-sky-400">&lt;</span>
            {profile.namaPanggilan.toLowerCase()}
            <span className="text-purple-400"> /&gt;</span>
          </a>

          <ul className="hidden items-center gap-1 md:flex">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="rounded-lg px-3 py-2 text-sm text-slate-600 transition-colors hover:bg-slate-900/5 hover:text-cyan-500 dark:text-slate-400 dark:hover:bg-white/5 dark:hover:text-cyan-400"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            <span className="hidden items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1.5 font-mono text-xs text-cyan-400 sm:flex">
              <span className="h-2 w-2 animate-pulse-dot rounded-full bg-cyan-400" />
              Open to Opportunities
            </span>
          </div>
        </nav>
      </div>
    </header>
  );
}
