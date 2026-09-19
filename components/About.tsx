"use client";

import { motion, useReducedMotion } from "framer-motion";
import { about, profile } from "@/data/profile";
import { useI18n } from "@/lib/i18n";
import SectionHeading from "./SectionHeading";

export default function About() {
  const reduce = useReducedMotion();
  const { t } = useI18n();

  return (
    <section id="about" className="container-x scroll-mt-24 py-24">
      <SectionHeading judul={t("about.title")} deskripsi={t("about.desc")} />

      <div className="grid items-start gap-8 lg:grid-cols-[300px_1fr]">
        {/* Profile card */}
        <motion.div
          initial={{ opacity: 0, scale: reduce ? 1 : 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl shadow-cyan-500/5 dark:border-line dark:bg-surface"
        >
          <div className="p-6">
            {profile.foto ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={profile.foto}
                alt={`Photo of ${profile.nama}`}
                className="mx-auto h-32 w-32 rounded-2xl border border-cyan-500/30 object-cover shadow-lg"
              />
            ) : (
              <div className="mx-auto flex h-32 w-32 items-center justify-center rounded-2xl border border-cyan-500/30 bg-gradient-to-br from-cyan-500/15 via-sky-500/15 to-purple-500/15">
                <span className="font-mono text-5xl font-bold text-gradient">{about.inisial}</span>
              </div>
            )}
            <p className="mt-5 text-center font-mono text-sm text-slate-900 dark:text-white">
              {profile.nama}
            </p>
            <p className="text-center font-mono text-xs text-slate-500 dark:text-slate-400">
              {profile.peran}
            </p>
            <div className="mt-4 flex items-center justify-center gap-2 rounded-lg border border-cyan-500/30 bg-cyan-500/10 px-3 py-1.5 font-mono text-xs text-cyan-400">
              <span className="h-2 w-2 animate-pulse-dot rounded-full bg-cyan-400" />
              {t("about.online")}
            </div>
          </div>
        </motion.div>

        {/* Bio + info */}
        <motion.div
          initial={{ opacity: 0, y: reduce ? 0 : 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl shadow-cyan-500/5 dark:border-line dark:bg-surface"
        >
          <div className="p-6 sm:p-8">
            <p className="leading-relaxed text-slate-600 dark:text-slate-300">{about.bio}</p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {about.info.map((item) => (
                <div
                  key={item.label}
                  className="rounded-xl border border-slate-200 bg-white/60 px-4 py-3 dark:border-line dark:bg-bg/60"
                >
                  <p className="font-mono text-[11px] uppercase tracking-widest text-slate-400 dark:text-slate-500">
                    {item.label}
                  </p>
                  <p className="mt-1 font-medium text-slate-900 dark:text-white">{item.value}</p>
                </div>
              ))}
            </div>

            <p className="mt-6 text-sm text-slate-500 dark:text-slate-400">
              <span className="mr-1.5 inline-block h-2 w-2 rounded-full bg-cyan-400 align-middle" />
              {t("about.footer")}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
