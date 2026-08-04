"use client";

import { techMarquee } from "@/data/profile";

export default function TechMarquee() {
  const list = [...techMarquee, ...techMarquee];

  return (
    <div className="relative overflow-hidden border-y border-slate-200 bg-white/50 py-4 dark:border-line dark:bg-surface/50">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-slate-50 to-transparent dark:from-bg" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-slate-50 to-transparent dark:from-bg" />
      <div className="flex w-max animate-marquee gap-8">
        {list.map((tech, i) => (
          <span
            key={`${tech}-${i}`}
            className="flex items-center gap-2 whitespace-nowrap font-mono text-sm text-slate-500 dark:text-slate-400"
          >
            <span className="text-pink-400">▹</span>
            {tech}
          </span>
        ))}
      </div>
    </div>
  );
}
