"use client";

import { useState, type MouseEvent } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ExternalLink, Folder, Github } from "lucide-react";
import { projects, type ProjectCategory } from "@/data/profile";
import SectionHeading from "./SectionHeading";
import { cn } from "@/lib/utils";

type Filter = "semua" | ProjectCategory;

const filters: { key: Filter; label: string }[] = [
  { key: "semua", label: "semua" },
  { key: "web", label: "web" },
  { key: "mobile", label: "mobile" },
];

// Warna dot bahasa — lookup by tech pertama yang dikenali
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
  return { color: "#f472b6", label: "Other" };
}

function slugify(judul: string) {
  return judul.toLowerCase().replace(/[^a-z0-9]+/g, "-");
}

export default function Projects() {
  const [filter, setFilter] = useState<Filter>("semua");
  const reduce = useReducedMotion();

  const visible =
    filter === "semua" ? projects : projects.filter((p) => p.kategori === filter);

  const handleMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - rect.top}px`);
  };

  return (
    <section id="proyek" className="container-x scroll-mt-24 py-24">
      <SectionHeading
        label="proyek.tsx"
        judul="Proyek Pilihan"
        deskripsi="Beberapa karya yang pernah saya kerjakan — filter sesuai kategori."
      />

      {/* Bar filter ala command line */}
      <div className="mb-10 flex flex-wrap items-center gap-2 overflow-hidden rounded-xl border border-slate-200 bg-white/60 font-mono text-sm dark:border-line dark:bg-surface/60">
        <span className="hidden px-4 py-3 text-slate-500 sm:block dark:text-slate-400">
          <span className="text-pink-400">$</span> ls proyek --kategori=
          <span className="text-purple-400">{filter}</span>
        </span>
        <div className="flex flex-1 flex-wrap gap-1 p-2 sm:justify-end">
          {filters.map((f) => (
            <button
              key={f.key}
              type="button"
              onClick={() => setFilter(f.key)}
              aria-pressed={filter === f.key}
              className={cn(
                "rounded-lg px-3 py-1.5 font-mono text-xs transition-colors",
                filter === f.key
                  ? "bg-pink-500 text-slate-900 shadow-lg shadow-pink-500/25"
                  : "text-slate-500 hover:bg-white/60 hover:text-pink-400 dark:text-slate-400 dark:hover:bg-white/5"
              )}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      <motion.div layout className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {visible.map((project, i) => {
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
                className="card-spotlight group flex flex-col rounded-2xl border border-slate-200 bg-white/60 transition-all duration-300 hover:-translate-y-1.5 hover:border-pink-500/50 hover:shadow-xl hover:shadow-pink-500/10 dark:border-line dark:bg-surface/60 dark:hover:border-pink-500/50"
              >
                {/* Breadcrumb + index */}
                <div className="flex items-center justify-between border-b border-slate-100 px-5 pt-4 pb-3 font-mono text-[11px] text-slate-400 dark:border-white/5 dark:text-slate-500">
                  <span className="truncate">
                    <span className="text-sky-400">~/</span>proyek/
                    <span className="text-slate-500 dark:text-slate-400">{slugify(project.judul)}.tsx</span>
                  </span>
                  <span className="shrink-0 text-pink-400/70">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>

                {/* Header kartu */}
                <div className="flex items-start justify-between px-5 pt-5">
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-pink-500/30 bg-pink-500/10 text-pink-400 transition-transform group-hover:scale-110">
                      <Folder size={18} />
                    </span>
                    <div>
                      <h3 className="font-semibold text-slate-900 transition-colors group-hover:text-pink-400 dark:text-white dark:group-hover:text-pink-400">
                        {project.judul}
                      </h3>
                      <p className="flex items-center gap-1.5 font-mono text-[11px] text-slate-500 dark:text-slate-400">
                        <span className="h-2 w-2 rounded-full" style={{ backgroundColor: lang.color }} />
                        {lang.label}
                        <span className="text-slate-300 dark:text-slate-600">·</span>
                        <span className="text-pink-500">{project.kategori === "mobile" ? "mobile" : "web"}</span>
                      </p>
                    </div>
                  </div>
                  <span
                    className={cn(
                      "shrink-0 rounded-md border px-2 py-0.5 font-mono text-[10px]",
                      project.demo
                        ? "border-pink-500/40 bg-pink-500/10 text-pink-400"
                        : "border-sky-500/40 bg-sky-500/10 text-sky-400"
                    )}
                  >
                    {project.demo ? "deployed" : "repo-only"}
                  </span>
                </div>

                {/* Deskripsi */}
                <p className="mt-4 flex-1 px-5 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                  {project.deskripsi}
                </p>

                {/* Tech badges */}
                <div className="mt-5 flex flex-wrap gap-2 px-5">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="rounded-md bg-slate-100 px-2 py-1 font-mono text-[11px] text-slate-600 transition-colors hover:bg-pink-500/10 hover:text-pink-400 dark:bg-white/5 dark:text-slate-400 dark:hover:text-pink-400"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {/* Footer aksi */}
                <div className="mt-5 flex items-center justify-between border-t border-slate-100 px-5 py-3 dark:border-white/5">
                  <div className="flex gap-1">
                    {project.demo ? (
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Demo ${project.judul}`}
                        className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 font-mono text-xs text-slate-500 transition-colors hover:bg-pink-500/10 hover:text-pink-400 dark:text-slate-400"
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
                  <span className="font-mono text-[11px] text-slate-400 opacity-0 transition-opacity group-hover:opacity-100 dark:text-slate-500">
                    ▹ buka
                  </span>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
