"use client";

import { useState } from "react";
import { Pause, Play } from "lucide-react";
import { getSkillIcon } from "@/data/skills-icons";
import { useI18n } from "@/lib/i18n";
import { setMotionEnabled, useMotionPreference } from "@/lib/use-motion-preference";

const technologies = [
  { icon: "Next.js", label: "Next.js" },
  { icon: "React.js", label: "React" },
  { icon: "TypeScript", label: "TypeScript" },
  { icon: "Laravel", label: "Laravel" },
  { icon: "Node.js", label: "Node.js" },
  { icon: "PostgreSQL", label: "PostgreSQL" },
];

export default function StackMarquee({
  paused: globalPaused = false,
}: {
  paused?: boolean;
}) {
  const { lang } = useI18n();
  const reduced = useMotionPreference();
  const [paused, setPaused] = useState(false);
  const id = lang === "id";
  const stopped = paused || reduced || globalPaused;
  return (
    <section
      className={`stack-band${stopped ? " is-paused" : ""}`}
      aria-label={id ? "Teknologi yang saya gunakan" : "Technologies I use"}
    >
      <div className="site-container stack-band-inner">
        <div className="stack-band-caption">
          <span className="eyebrow">TECH STACK</span>
          <p>{id ? "Teknologi yang saya gunakan" : "Technologies I use"}</p>
        </div>
        <div
          className="stack-viewport"
          tabIndex={0}
          role="group"
          aria-label={
            id
              ? "Geser untuk melihat semua teknologi"
              : "Scroll to see all technologies"
          }
        >
          <div className="stack-track">
            {[0, 1].map((copy) => (
              <ul key={copy} className="stack-list" aria-hidden={copy === 1}>
                {technologies.map((tech) => {
                  const Icon = getSkillIcon(tech.icon);
                  return (
                    <li key={tech.label}>
                      <Icon size={23} aria-hidden="true" />
                      <span>{tech.label}</span>
                      <i aria-hidden="true" />
                    </li>
                  );
                })}
              </ul>
            ))}
          </div>
        </div>
        <button
          type="button"
          className="stack-motion-toggle"
          aria-pressed={stopped}
          onClick={() => {
            if (reduced || globalPaused) {
              setMotionEnabled(true);
              setPaused(false);
            } else {
              setPaused((value) => !value);
            }
          }}
          aria-label={
            id
              ? stopped
                ? "Putar daftar teknologi"
                : "Jeda daftar teknologi"
              : stopped
                ? "Play technology list"
                : "Pause technology list"
          }
        >
          {stopped ? <Play size={14} /> : <Pause size={14} />}
        </button>
      </div>
    </section>
  );
}
