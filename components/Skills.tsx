"use client";

import type { MouseEvent } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { skills } from "@/data/profile";
import SectionHeading from "./SectionHeading";

export default function Skills() {
  const reduce = useReducedMotion();

  const handleMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - rect.top}px`);
  };

  return (
    <section id="keahlian" className="container-x scroll-mt-24 py-24">
      <SectionHeading
        label="keahlian.ts"
        judul="Tech Stack & Keahlian"
        deskripsi="Teknologi yang saya pakai untuk mewujudkan ide menjadi produk."
      />

      <div className="grid gap-6 sm:grid-cols-2">
        {skills.map((group, gi) => (
          <motion.div
            key={group.grup}
            initial={{ opacity: 0, y: reduce ? 0 : 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: gi * 0.08 }}
            onMouseMove={handleMove}
            className="card-spotlight rounded-2xl border border-slate-200 bg-white/60 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-emerald-500/40 dark:border-line dark:bg-surface/60 dark:hover:border-emerald-500/40"
          >
            <p className="font-mono text-xs text-cyan-400">{"// "}kelompok</p>
            <h3 className="mt-1 text-lg font-semibold text-slate-900 dark:text-white">{group.grup}</h3>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{group.deskripsi}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {group.items.map((item) => (
                <span
                  key={item}
                  className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 font-mono text-xs text-slate-700 transition-colors hover:border-emerald-500 hover:text-emerald-500 dark:border-line dark:bg-bg dark:text-slate-300 dark:hover:border-emerald-500 dark:hover:text-emerald-400"
                >
                  {item}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
