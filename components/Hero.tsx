"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown, FileDown } from "lucide-react";
import { about, profile } from "@/data/profile";
import { useI18n } from "@/lib/i18n";
import { getSkillColor, getSkillIcon } from "@/data/skills-icons";

const heroIcons = [
  "TypeScript",
  "React.js",
  "Next.js",
  "Node.js",
  "Docker",
  "PostgreSQL",
  "Supabase",
  "Laravel",
];

const iconPositions = [
  { top: "6%", left: "34%" },
  { top: "12%", left: "62%" },
  { top: "26%", left: "6%" },
  { top: "30%", left: "72%" },
  { top: "52%", left: "8%" },
  { top: "50%", left: "68%" },
  { top: "72%", left: "28%" },
  { top: "78%", left: "58%" },
];

export default function Hero() {
  const reduce = useReducedMotion();
  const { t } = useI18n();

  const fadeUp = (delay: number) => ({
    initial: { opacity: 0, y: reduce ? 0 : 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, delay, ease: "easeOut" as const },
  });

  return (
    <section id="home" className="container-x relative flex min-h-screen items-center overflow-hidden pt-28 pb-20">
      {/* Glow decoration */}
      <div className="pointer-events-none absolute -left-32 top-24 h-72 w-72 rounded-full bg-cyan-500/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-10 h-80 w-80 rounded-full bg-sky-500/20 blur-3xl" />

      <div className="grid w-full items-center gap-12 lg:grid-cols-[1.2fr_0.8fr]">
        {/* Left text */}
        <div>
          <motion.h1
            {...fadeUp(0)}
            className="text-4xl font-bold leading-tight tracking-tight text-slate-900 sm:text-5xl lg:text-6xl dark:text-white"
          >
            {profile.nama.split(" ")[0]}
            <br />
            <span className="text-gradient">{profile.nama.split(" ").slice(1).join(" ")}</span>
          </motion.h1>

          <motion.p {...fadeUp(0.1)} className="mt-6 max-w-lg text-slate-600 dark:text-slate-400">
            {t("hero.tagline")}
          </motion.p>

          <motion.div {...fadeUp(0.2)} className="mt-9 flex flex-wrap items-center gap-4">
            <a
              href="#projects"
              className="group inline-flex items-center gap-2 rounded-xl bg-cyan-500 px-6 py-3 font-medium text-slate-900 shadow-lg shadow-cyan-500/25 transition-all hover:-translate-y-0.5 hover:bg-cyan-400"
            >
              <ArrowDown size={18} className="transition-transform group-hover:translate-y-0.5" />
              {t("hero.viewProjects")}
            </a>
            <a
              href={profile.cvUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-300 px-6 py-3 font-medium text-slate-700 transition-all hover:-translate-y-0.5 hover:border-cyan-500 hover:text-cyan-500 dark:border-line dark:text-slate-300 dark:hover:border-cyan-500 dark:hover:text-cyan-400"
            >
              <FileDown size={18} />
              {t("hero.downloadCv")}
            </a>
          </motion.div>
        </div>

        {/* Right: floating tech icons */}
        <div className="relative hidden lg:block">
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <div className="h-96 w-96 rounded-full bg-gradient-to-br from-cyan-500/20 via-sky-500/10 to-purple-500/20 blur-3xl" />
          </div>

          <div className="relative mx-auto flex h-[480px] w-full max-w-md items-center justify-center">
            {/* Center rings */}
            <div className="absolute h-72 w-72 rounded-full border border-slate-200/80 dark:border-line" />
            <div className="absolute h-52 w-52 rounded-full border border-slate-200/60 dark:border-line/70" />

            {/* Center monogram */}
            <motion.div
              initial={{ opacity: 0, scale: reduce ? 1 : 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="relative flex h-28 w-28 items-center justify-center rounded-full bg-white/70 shadow-xl shadow-cyan-500/10 backdrop-blur dark:bg-surface/70"
            >
              <span className="text-3xl font-bold text-gradient">{about.inisial}</span>
            </motion.div>

            {/* Floating tech icons */}
            {heroIcons.map((name, i) => {
              const Icon = getSkillIcon(name);
              const color = getSkillColor(name);
              const pos = iconPositions[i];
              return (
                <motion.div
                  key={name}
                  className="absolute"
                  style={{ top: pos.top, left: pos.left }}
                  initial={{ opacity: 0, scale: 0.6 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
                >
                  {/* CSS float runs on compositor; framer infinite loop blocked main thread on scroll */}
                  <div
                    className={reduce ? undefined : "animate-float"}
                    style={
                      reduce
                        ? undefined
                        : {
                            animationDuration: `${3 + (i % 3)}s`,
                            animationDelay: `${i * 0.45}s`,
                          }
                    }
                  >
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-slate-200 bg-white/70 shadow-lg shadow-slate-900/5 backdrop-blur dark:border-line dark:bg-surface/70 dark:shadow-black/40">
                      <Icon size={26} style={color ? { color } : undefined} />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
