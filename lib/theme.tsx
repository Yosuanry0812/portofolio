"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Theme = "dark" | "light";

const ThemeContext = createContext<{ theme: Theme; toggle: () => void } | null>(null);

const syncDom = (value: Theme) => {
  const root = document.documentElement;
  root.classList.toggle("dark", value === "dark");
  root.style.colorScheme = value;
  localStorage.setItem("theme", value);
  // ponytail: keep mobile browser chrome in sync with theme (static viewport.themeColor can't).
  let meta = document.querySelector('meta[name="theme-color"]');
  if (!meta) {
    meta = document.createElement("meta");
    meta.setAttribute("name", "theme-color");
    document.head.appendChild(meta);
  }
  meta.setAttribute("content", value === "dark" ? "#0B0F17" : "#f8fafc");
};

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>("dark");

  // mount once: adopt saved / OS theme into state + DOM together
  useEffect(() => {
    const saved = localStorage.getItem("theme");
    const initial: Theme =
      saved === "light" || saved === "dark"
        ? saved
        : window.matchMedia("(prefers-color-scheme: light)").matches
          ? "light"
          : "dark";
    setTheme(initial);
    syncDom(initial);
  }, []);

  const toggle = () => {
    const root = document.documentElement;
    if (root.classList.contains("theming")) return;
    const next = theme === "dark" ? "light" : "dark";
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      syncDom(next);
      setTheme(next);
      return;
    }
    // veil: opaque layer in old bg hides instant swap, then fades — one opacity anim, GPU-only
    const veil = document.createElement("div");
    veil.setAttribute("aria-hidden", "true");
    veil.setAttribute("data-theme-veil", "");
    veil.style.cssText = `position:fixed;inset:0;z-index:100;pointer-events:none;background:${theme === "dark" ? "#0B0F17" : "#f8fafc"};opacity:1;transition:opacity 0.55s ease;`;
    document.body.appendChild(veil);
    root.classList.add("theming");
    syncDom(next);
    setTheme(next);
    // double rAF so first paint holds old color before fading
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        veil.style.opacity = "0";
      });
    });
    window.setTimeout(() => {
      veil.remove();
      root.classList.remove("theming");
    }, 600);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be inside ThemeProvider");
  return ctx;
}
