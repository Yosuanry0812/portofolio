"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { BrainCircuit, Cloud, Code2, Database, Server } from "lucide-react";
import { skills } from "@/data/profile";
import { useI18n } from "@/lib/i18n";
import { getSkillColor, getSkillIcon } from "@/data/skills-icons";
import SectionHeading from "./SectionHeading";
import { cn } from "@/lib/utils";

const icons = [Code2, Server, Database, Cloud, BrainCircuit];
const accents = ["text-cyan-400", "text-sky-400", "text-purple-400", "text-yellow-400", "text-cyan-400"];

export default function Skills() {
  const [active, setActive] = useState(0);
  const reduce = useReducedMotion();
  const { t } = useI18n();

  const group = skills[active];
  const Icon = icons[active % icons.length];
  const accent = accents[active % accents.length];

  return (
    <section id="skills" className="container-x scroll-mt-24 py-24">
      <SectionHeading judul={t("skills.title")} deskripsi={t("skills.desc")} />

      <motion.div
        initial={{ opacity: 0, y: reduce ? 0 : 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6 }}
        className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl shadow-cyan-500/5 dark:border-line dark:bg-surface"
      >
        <div className="grid md:grid-cols-[220px_1fr]">
          {/* Category sidebar */}
          <div className="flex overflow-x-auto border-b border-slate-200 md:flex-col md:border-b-0 md:border-r dark:border-line">
            {skills.map((s, i) => {
              const TabIcon = icons[i % icons.length];
              const isActive = active === i;
              return (
                <button
                  key={s.grup}
                  type="button"
                  onClick={() => setActive(i)}
                  aria-current={isActive ? "true" : undefined}
                  className={cn(
                    "flex items-center gap-2 whitespace-nowrap border-l-2 px-4 py-2.5 font-mono text-sm transition-colors",
                    isActive
                      ? "border-cyan-400 bg-cyan-500/5 text-cyan-400"
                      : "border-transparent text-slate-500 hover:bg-white/5 hover:text-slate-200 dark:text-slate-500 dark:hover:text-slate-200"
                  )}
                >
                  <TabIcon size={14} className={isActive ? "text-cyan-400" : ""} />
                  {s.grup.toLowerCase()}
                  <span className="ml-auto font-mono text-[10px] text-slate-500">{s.items.length}</span>
                </button>
              );
            })}
          </div>

          {/* Active category content */}
          <div className="min-w-0 p-5 sm:p-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: reduce ? 0 : 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: reduce ? 0 : -8 }}
                transition={{ duration: 0.25 }}
              >
                <p className="font-mono text-xs text-slate-500 dark:text-slate-400">{group.deskripsi}</p>
                <h3 className="mt-1 flex items-center gap-2 text-lg font-semibold text-slate-900 dark:text-white">
                  <Icon size={18} className={accent} />
                  {group.grup}
                </h3>

                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  {group.items.map((item, idx) => {
                    const ItemIcon = getSkillIcon(item);
                    const color = getSkillColor(item);
                    return (
                      <motion.div
                        key={item}
                        initial={{ opacity: 0, y: reduce ? 0 : 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.25, delay: idx * 0.05 }}
                        className="group flex items-center gap-3 rounded-xl border border-slate-200 bg-white/60 px-4 py-3 transition-all duration-200 hover:-translate-y-0.5 hover:border-cyan-500/40 dark:border-line dark:bg-bg/60 dark:hover:border-cyan-500/40"
                      >
                        <ItemIcon size={16} style={color ? { color } : undefined} className="shrink-0" />
                        <span className="font-mono text-sm text-slate-700 dark:text-slate-300">{item}</span>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
