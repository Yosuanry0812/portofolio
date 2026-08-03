"use client";

import { motion, useReducedMotion } from "framer-motion";
import { about, profile } from "@/data/profile";
import SectionHeading from "./SectionHeading";

export default function About() {
  const reduce = useReducedMotion();

  return (
    <section id="tentang" className="container-x scroll-mt-24 py-24">
      <SectionHeading
        label="tentang.ts"
        judul="Tentang Saya"
        deskripsi="Sekilas tentang siapa saya dan apa yang saya kerjakan."
      />

      <div className="grid items-start gap-10 md:grid-cols-[240px_1fr]">
        {/* Avatar placeholder */}
        <motion.div
          initial={{ opacity: 0, scale: reduce ? 1 : 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="card-spotlight mx-auto flex h-56 w-56 items-center justify-center rounded-3xl border border-slate-200 bg-gradient-to-br from-emerald-500/10 via-cyan-500/10 to-violet-500/10 dark:border-line"
        >
          <span className="font-mono text-6xl font-bold text-gradient">{about.inisial}</span>
        </motion.div>

        <div>
          <motion.p
            initial={{ opacity: 0, y: reduce ? 0 : 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
            className="text-slate-600 dark:text-slate-400"
          >
            {about.bio}
          </motion.p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {about.info.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: reduce ? 0 : 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="rounded-xl border border-slate-200 bg-white/60 p-4 dark:border-line dark:bg-surface/60"
              >
                <p className="font-mono text-xs text-emerald-400">{item.label}</p>
                <p className="mt-1 font-medium text-slate-900 dark:text-white">{item.value}</p>
              </motion.div>
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-8 font-mono text-sm text-slate-500 dark:text-slate-400"
          >
            <span className="text-cyan-400">{"// "}</span>
            {profile.githubUsername} — selalu belajar, selalu membangun.
          </motion.p>
        </div>
      </div>
    </section>
  );
}
