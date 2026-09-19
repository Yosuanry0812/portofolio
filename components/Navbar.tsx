"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { profile } from "@/data/profile";
import { useI18n } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { LangToggle, ThemeToggle } from "./Toggles";

export default function Navbar() {
  const { t } = useI18n();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const barRef = useRef<HTMLDivElement>(null);

  const links = [
    { label: t("nav.about"), href: "#about" },
    { label: t("nav.experience"), href: "#experience" },
    { label: t("nav.skills"), href: "#skills" },
    { label: t("nav.projects"), href: "#projects" },
    { label: t("nav.contact"), href: "#contact" },
  ];

  // ponytail: progress bar via rAF + transform only — useScroll+useSpring re-rendered React every scroll pixel.
  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const el = barRef.current;
      if (el) {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        el.style.transform = `scaleX(${max > 0 ? window.scrollY / max : 0})`;
      }
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", update);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  useEffect(() => {
    let ticking = false;
    const update = () => {
      ticking = false;
      const v = window.scrollY > 12;
      setScrolled((prev) => (prev === v ? prev : v));
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {/* Scroll progress — transform-only via ref, zero React re-render on scroll */}
      <div
        ref={barRef}
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
          <a href="#home" aria-label="Yosua — beranda" className="group relative flex items-baseline font-mono text-lg font-bold tracking-tight">
            <span className="text-cyan-500 transition-transform duration-300 group-hover:-translate-x-0.5 dark:text-cyan-400">&lt;</span>
            <span className="mx-0.5 text-slate-900 transition-colors duration-300 group-hover:text-cyan-600 dark:text-white dark:group-hover:text-cyan-300">{profile.namaPanggilan.toLowerCase()}</span>
            <span className="text-violet-500 transition-transform duration-300 group-hover:translate-x-0.5 dark:text-violet-400">/&gt;</span>
            <span aria-hidden="true" className="ml-0.5 animate-blink text-cyan-500 dark:text-cyan-400">_</span>
            <span className="logo-underline" aria-hidden="true" />
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

          <div className="flex items-center gap-1 sm:gap-2">
            <span className="hidden items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1.5 font-mono text-xs text-cyan-600 lg:flex dark:text-cyan-400">
              <span className="h-2 w-2 animate-pulse-dot rounded-full bg-cyan-500 dark:bg-cyan-400" />
              {t("nav.open")}
            </span>
            <LangToggle />
            <ThemeToggle />
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-label={open ? t("nav.closeMenu") : t("nav.openMenu")}
              className="rounded-lg p-2 text-slate-600 transition-colors hover:bg-slate-900/5 hover:text-cyan-500 md:hidden dark:text-slate-400 dark:hover:bg-white/5 dark:hover:text-cyan-400"
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </nav>
        <AnimatePresence>
          {open ? (
            <motion.nav
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="overflow-hidden border-t border-slate-200 bg-white/95 backdrop-blur-md md:hidden dark:border-line dark:bg-bg/95"
            >
              <ul className="container-x flex flex-col gap-1 py-4">
                {links.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className="block rounded-lg px-3 py-2.5 text-sm text-slate-600 transition-colors hover:bg-slate-900/5 hover:text-cyan-600 dark:text-slate-400 dark:hover:bg-white/5 dark:hover:text-cyan-400"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
                <li className="flex items-center gap-1 border-t border-slate-200 pt-3 dark:border-line">
                  <LangToggle compact />
                  <span className="font-mono text-xs text-slate-400">·</span>
                  <ThemeToggle />
                  <span className="ml-auto font-mono text-[11px] text-slate-400">{t("nav.open")}</span>
                </li>
              </ul>
            </motion.nav>
          ) : null}
        </AnimatePresence>
      </div>
    </header>
  );
}
