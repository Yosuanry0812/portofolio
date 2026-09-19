"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { flushSync } from "react-dom";

export type Theme = "dark" | "light";

const ThemeContext = createContext<{ theme: Theme; toggle: (x?: number, y?: number) => void } | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "light" || saved === "dark") setTheme(saved);
    else if (window.matchMedia("(prefers-color-scheme: light)").matches) setTheme("light");
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    document.documentElement.style.colorScheme = theme;
    localStorage.setItem("theme", theme);
    // ponytail: keep mobile browser chrome in sync with theme (static viewport.themeColor can't).
    let meta = document.querySelector('meta[name="theme-color"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute("name", "theme-color");
      document.head.appendChild(meta);
    }
    meta.setAttribute("content", theme === "dark" ? "#0B0F17" : "#f8fafc");
  }, [theme]);

  const toggle = (x?: number, y?: number) => {
    const next = theme === "dark" ? "light" : "dark";
    const root = document.documentElement;
    // global color easing so every surface fades instead of snapping
    root.classList.add("theming");
    window.setTimeout(() => root.classList.remove("theming"), 650);
    const apply = () => {
      flushSync(() => setTheme(next));
    };
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const vt = (document as Document & { startViewTransition?: (cb: () => void) => void }).startViewTransition;
    if (x !== undefined && y !== undefined && vt && !reduce) {
      root.style.setProperty("--tx", `${x}px`);
      root.style.setProperty("--ty", `${y}px`);
      vt.call(document, apply);
    } else {
      apply();
    }
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
