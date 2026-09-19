"use client";

import { motion, useReducedMotion } from "framer-motion";
import { experience } from "@/data/profile";
import { useI18n } from "@/lib/i18n";
import { Calendar, CheckCircle2 } from "lucide-react";

export default function Experience() {
  const reduce = useReducedMotion();
  const { t } = useI18n();

  return (
    <section id="experience" className="container-x scroll-mt-24 py-24">
      {/* Screenshot-style header */}
      <div className="mb-12 flex items-center gap-2.5 font-mono text-xs uppercase tracking-widest text-emerald-400">
        <Calendar size={16} className="text-emerald-400" />
        <span>{t("exp.title")}</span>
      </div>

      {/* Horizontal Timeline Container */}
      <div className="relative w-full">
        <div className="flex w-full gap-8 overflow-x-auto pb-10 pt-2 scrollbar-thin scrollbar-thumb-emerald-500/20 scrollbar-track-transparent snap-x select-none">
          {experience.map((item, i) => {
            return (
              <motion.div
                key={`${item.tempat}-${i}`}
                initial={{ opacity: 0, y: reduce ? 0 : 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="relative flex w-[280px] shrink-0 flex-col snap-start group"
              >
                {/* Horizontal line segment to next item */}
                {i < experience.length - 1 && (
                  <div className="absolute left-[10px] top-[9px] h-[2px] w-[calc(100%+32px)] bg-emerald-500/20 dark:bg-emerald-500/25" />
                )}

                {/* Dot */}
                <div className="relative z-10 flex h-[20px] w-[20px] items-center justify-center rounded-full border border-emerald-500/40 bg-white dark:bg-bg transition-colors group-hover:border-emerald-400">
                  <div className="h-1.5 w-1.5 rounded-full bg-emerald-500/80 transition-transform group-hover:scale-125" />
                </div>

                {/* Date */}
                <p className="mt-5 font-mono text-xs font-semibold text-emerald-400 uppercase tracking-wider">
                  {t(item.periode)}
                </p>

                {/* Title */}
                <h3 className="mt-2 text-base font-bold text-slate-900 dark:text-white leading-snug group-hover:text-emerald-400 transition-colors">
                  {t(item.posisi)}
                </h3>

                {/* Badge */}
                <div className="mt-2.5 self-start flex items-center gap-1.5 rounded border border-emerald-500/20 bg-emerald-500/5 px-2.5 py-1 font-mono text-[10px] text-emerald-400/95">
                  <CheckCircle2 size={11} className="text-emerald-400" />
                  <span>{item.tempat}</span>
                </div>

                {/* Description */}
                <p className="mt-3.5 text-[12px] leading-relaxed text-slate-500 dark:text-slate-400">
                  {t(item.deskripsi)}
                </p>
              </motion.div>
            );
          })}
        </div>
        <div className="mt-4 flex justify-center font-mono text-[10px] uppercase tracking-widest text-slate-400 dark:text-slate-600 animate-pulse">
          <span>{t("exp.scroll")}</span>
        </div>
      </div>
    </section>
  );
}
