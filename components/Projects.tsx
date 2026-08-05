"use client";

import { useState, type MouseEvent } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ExternalLink, Folder, Github } from "lucide-react";
import { projects, type ProjectCategory } from "@/data/profile";
import SectionHeading from "./SectionHeading";
import { cn } from "@/lib/utils";

type Filter = "all" | ProjectCategory;

const filters: { key: Filter; label: string }[] = [
  { key: "all", label: "all" },
  { key: "web", label: "web" },
  { key: "mobile", label: "mobile" },
];

// Language dot colors — lookup by first recognized tech
const langColors: { match: string; color: string }[] = [
  { match: "TypeScript", color: "#3178C6" },
  { match: "JavaScript", color: "#F7DF1E" },
  { match: "PHP", color: "#777BB4" },
  { match: "Laravel", color: "#FF2D20" },
  { match: "React Native", color: "#61DAFB" },
];

function langColor(tech: string[]): { color: string; label: string } {
  for (const lc of langColors) {
    const hit = tech.find((t) => t.includes(lc.match));
    if (hit) return { color: lc.color, label: lc.match };
  }
  return { color: "#22d3ee", label: "Other" };
}

export default function Projects() {
  const [filter, setFilter] = useState<Filter>("all");
  const reduce = useReducedMotion();

  const visible =
    filter === "all" ? projects : projects.filter((p) => p.kategori === filter);

  const handleMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - rect.top}px`);
  };

  return (
    <section id="projects" className="container-x scroll-mt-24 py-24">
      <SectionHeading
        judul="Featured Projects"
        deskripsi="A few things I've built — filter by category."
      />

      <div className="mb-10 flex flex-wrap gap-1.5">
        {filters.map((f) => (
          <button
            key={f.key}
            type="button"
            onClick={() => setFilter(f.key)}
            aria-pressed={filter === f.key}
            className={cn(
              "rounded-lg px-3.5 py-2 font-mono text-xs transition-colors",
              filter === f.key
                ? "bg-cyan-500 text-slate-900 shadow-lg shadow-cyan-500/25"
                : "text-slate-500 hover:bg-white/60 hover:text-cyan-400 dark:text-slate-400 dark:hover:bg-white/5"
            )}
          >
            {f.label}
          </button>
        ))}
      </div>

      <motion.div layout className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {visible.map((project) => {
            const lang = langColor(project.tech);
            return (
              <motion.div
                key={project.judul}
                layout
                initial={{ opacity: 0, scale: reduce ? 1 : 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: reduce ? 1 : 0.95 }}
                transition={{ duration: 0.3 }}
                onMouseMove={handleMove}
                className="card-spotlight group flex flex-col rounded-2xl border border-slate-200 bg-white/60 transition-all duration-300 hover:-translate-y-1.5 hover:border-cyan-500/50 hover:shadow-xl hover:shadow-cyan-500/10 dark:border-line dark:bg-surface/60 dark:hover:border-cyan-500/50"
              >
                {/* Card header */}
                <div className="flex items-start justify-between px-5 pt-5">
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 transition-transform group-hover:scale-110">
                      <Folder size={18} />
                    </span>
                    <div>
                      <h3 className="font-semibold text-slate-900 transition-colors group-hover:text-cyan-400 dark:text-white dark:group-hover:text-cyan-400">
                        {project.judul}
                      </h3>
                      <p className="flex items-center gap-1.5 font-mono text-[11px] text-slate-500 dark:text-slate-400">
                        <span className="h-2 w-2 rounded-full" style={{ backgroundColor: lang.color }} />
                        {lang.label}
                        <span className="text-slate-300 dark:text-slate-600">·</span>
                        <span className="text-cyan-500">{project.kategori === "mobile" ? "mobile" : "web"}</span>
                      </p>
                    </div>
                  </div>
                  <span
                    className={cn(
                      "shrink-0 rounded-md border px-2 py-0.5 font-mono text-[10px]",
                      project.demo
                        ? "border-cyan-500/40 bg-cyan-500/10 text-cyan-400"
                        : "border-sky-500/40 bg-sky-500/10 text-sky-400"
                    )}
                  >
                    {project.demo ? "deployed" : "repo-only"}
                  </span>
                </div>

                {/* Description */}
                <p className="mt-4 flex-1 px-5 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                  {project.deskripsi}
                </p>

                {/* Tech badges */}
                <div className="mt-5 flex flex-wrap gap-2 px-5">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="rounded-md bg-slate-100 px-2 py-1 font-mono text-[11px] text-slate-600 transition-colors hover:bg-cyan-500/10 hover:text-cyan-400 dark:bg-white/5 dark:text-slate-400 dark:hover:text-cyan-400"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {/* Action footer */}
                <div className="mt-5 flex items-center justify-between border-t border-slate-100 px-5 py-3 dark:border-white/5">
                  <div className="flex gap-1">
                    {project.demo ? (
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Demo ${project.judul}`}
                        className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 font-mono text-xs text-slate-500 transition-colors hover:bg-cyan-500/10 hover:text-cyan-400 dark:text-slate-400"
                      >
                        demo <ExternalLink size={13} />
                      </a>
                    ) : null}
                    <a
                      href={project.repo}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Repo ${project.judul}`}
                      className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 font-mono text-xs text-slate-500 transition-colors hover:bg-sky-500/10 hover:text-sky-400 dark:text-slate-400"
                    >
                      repo <Github size={13} />
                    </a>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
