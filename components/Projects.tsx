"use client";

import { useState, type MouseEvent } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ExternalLink, Folder, Github } from "lucide-react";
import { projects, type ProjectCategory } from "@/data/profile";
import SectionHeading from "./SectionHeading";
import { cn } from "@/lib/utils";

type Filter = "semua" | ProjectCategory;

const filters: { key: Filter; label: string }[] = [
  { key: "semua", label: "Semua" },
  { key: "web", label: "Web" },
  { key: "mobile", label: "Mobile" },
];

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

      {/* Filter */}
      <div className="mb-10 flex flex-wrap gap-2">
        {filters.map((f) => (
          <button
            key={f.key}
            type="button"
            onClick={() => setFilter(f.key)}
            className={cn(
              "rounded-xl border px-4 py-2 font-mono text-sm transition-colors",
              filter === f.key
                ? "border-emerald-500 bg-emerald-500/10 text-emerald-400"
                : "border-slate-200 text-slate-600 hover:border-emerald-500/40 hover:text-emerald-500 dark:border-line dark:text-slate-400 dark:hover:text-emerald-400"
            )}
          >
            {f.label}
          </button>
        ))}
      </div>

      <motion.div layout className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {visible.map((project) => (
            <motion.div
              key={project.judul}
              layout
              initial={{ opacity: 0, scale: reduce ? 1 : 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: reduce ? 1 : 0.95 }}
              transition={{ duration: 0.3 }}
              onMouseMove={handleMove}
              className="card-spotlight flex flex-col rounded-2xl border border-slate-200 bg-white/60 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-emerald-500/40 dark:border-line dark:bg-surface/60 dark:hover:border-emerald-500/40"
            >
              <div className="mb-4 flex items-start justify-between">
                <Folder size={28} className="text-emerald-400" />
                <div className="flex gap-2">
                  {project.demo ? (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Demo ${project.judul}`}
                      className="rounded-lg p-2 text-slate-500 transition-colors hover:bg-white/60 hover:text-emerald-500 dark:text-slate-400 dark:hover:bg-white/5 dark:hover:text-emerald-400"
                    >
                      <ExternalLink size={18} />
                    </a>
                  ) : null}
                  <a
                    href={project.repo}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Repo ${project.judul}`}
                    className="rounded-lg p-2 text-slate-500 transition-colors hover:bg-white/60 hover:text-cyan-500 dark:text-slate-400 dark:hover:bg-white/5 dark:hover:text-cyan-400"
                  >
                    <Github size={18} />
                  </a>
                </div>
              </div>

              <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{project.judul}</h3>
              <p className="mt-2 flex-1 text-sm text-slate-600 dark:text-slate-400">{project.deskripsi}</p>

              <div className="mt-4 flex flex-wrap gap-2">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="rounded-md bg-slate-100 px-2 py-1 font-mono text-[11px] text-slate-600 dark:bg-white/5 dark:text-slate-400"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
