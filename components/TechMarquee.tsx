"use client";

import { techMarquee } from "@/data/profile";
import { getSkillColor, getSkillIcon } from "@/data/skills-icons";

const list = [...techMarquee, ...techMarquee];

export default function TechMarquee() {
  return (
    <div className="relative overflow-hidden border-y border-slate-200 bg-white/50 dark:border-line dark:bg-surface/50">
      {/* Text marquee — right to left */}
      <div className="relative border-b border-slate-200/70 py-4 dark:border-line/70">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-slate-50 to-transparent dark:from-bg" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-slate-50 to-transparent dark:from-bg" />
        <div className="flex w-max animate-marquee gap-8">
          {list.map((tech, i) => (
            <span
              key={`text-${tech}-${i}`}
              className="flex items-center gap-2 whitespace-nowrap font-mono text-sm text-slate-500 dark:text-slate-400"
            >
              <span className="text-cyan-400">▹</span>
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Icon marquee — left to right */}
      <div className="relative py-5">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-slate-50 to-transparent dark:from-bg" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-slate-50 to-transparent dark:from-bg" />
        <div className="flex w-max animate-marquee-reverse items-center gap-12">
          {list.map((tech, i) => {
            const Icon = getSkillIcon(tech);
            const color = getSkillColor(tech);
            return (
              <Icon
                key={`icon-${tech}-${i}`}
                size={24}
                style={color ? { color } : undefined}
                className="shrink-0 opacity-80 transition-all duration-200 hover:scale-125 hover:opacity-100"
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
