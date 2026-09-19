"use client";

import { Languages, Moon, Sun } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { useTheme } from "@/lib/theme";

const btn =
  "rounded-lg p-2 text-slate-600 transition-colors hover:bg-slate-900/5 hover:text-cyan-600 dark:text-slate-400 dark:hover:bg-white/5 dark:hover:text-cyan-400";

export function ThemeToggle() {
  const { theme, toggle } = useTheme();
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
      title={theme === "dark" ? "Light mode" : "Dark mode"}
      className={btn}
    >
      {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
}

export function LangToggle({ compact }: { compact?: boolean }) {
  const { lang, setLang } = useI18n();
  const next = lang === "id" ? "en" : "id";
  return (
    <button
      type="button"
      onClick={() => setLang(next)}
      aria-label={lang === "id" ? "Switch to English" : "Ganti ke Bahasa Indonesia"}
      title={lang === "id" ? "English" : "Indonesia"}
      className="flex items-center gap-1.5 rounded-lg px-2 py-2 font-mono text-xs font-bold text-slate-600 transition-colors hover:bg-slate-900/5 hover:text-cyan-600 dark:text-slate-400 dark:hover:bg-white/5 dark:hover:text-cyan-400"
    >
      <Languages size={compact ? 16 : 18} />
      {next.toUpperCase()}
    </button>
  );
}
