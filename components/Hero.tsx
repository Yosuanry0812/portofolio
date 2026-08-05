"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown, Cpu, FileDown, Sparkles } from "lucide-react";
import { profile, typingRoles, terminalData } from "@/data/profile";
import { cn } from "@/lib/utils";

function useTypewriter(words: string[]) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[index % words.length];
    const done = text === word;
    const empty = text === "";

    const delay = deleting ? 40 : done ? 1800 : 85;

    const timer = setTimeout(() => {
      if (!deleting && !done) {
        setText(word.slice(0, text.length + 1));
      } else if (!deleting && done) {
        setDeleting(true);
      } else if (deleting && !empty) {
        setText(word.slice(0, text.length - 1));
      } else if (deleting && empty) {
        setDeleting(false);
        setIndex((i) => i + 1);
      }
    }, delay);

    return () => clearTimeout(timer);
  }, [text, deleting, index, words]);

  return text;
}

const tokenColors: Record<string, string> = {
  string: "text-pink-400",
  array: "text-sky-400",
  boolean: "text-yellow-400",
};

export default function Hero() {
  const typed = useTypewriter(typingRoles);
  const reduce = useReducedMotion();

  const fadeUp = (delay: number) => ({
    initial: { opacity: 0, y: reduce ? 0 : 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, delay, ease: "easeOut" as const },
  });

  return (
    <section id="beranda" className="container-x relative flex min-h-screen items-center overflow-hidden pt-28 pb-20">
      {/* Glow dekorasi */}
      <div className="pointer-events-none absolute -left-32 top-24 h-72 w-72 rounded-full bg-pink-500/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-10 h-80 w-80 rounded-full bg-sky-500/20 blur-3xl" />

      <div className="grid w-full items-center gap-12 lg:grid-cols-[1.2fr_1fr]">
        {/* Teks kiri */}
        <div>
          <motion.p {...fadeUp(0)} className="mb-4 font-mono text-sm text-pink-400">
            <span className="text-sky-400">$</span> whoami
          </motion.p>

          <motion.h1
            {...fadeUp(0.1)}
            className="text-4xl font-bold leading-tight tracking-tight text-slate-900 sm:text-5xl lg:text-6xl dark:text-white"
          >
            {profile.nama.split(" ")[0]}
            <br />
            <span className="text-gradient">{profile.nama.split(" ").slice(1).join(" ")}</span>
          </motion.h1>

          <motion.p {...fadeUp(0.2)} className="mt-5 h-8 font-mono text-lg text-slate-600 dark:text-slate-400">
            <span className="text-purple-400">{"const"}</span> peran ={" "}
            <span className="text-pink-400">"{typed}"</span>
            <span className="ml-0.5 inline-block h-5 w-2.5 animate-blink bg-pink-400 align-middle" />
          </motion.p>

          <motion.p {...fadeUp(0.3)} className="mt-6 max-w-lg text-slate-600 dark:text-slate-400">
            {profile.tagline}
          </motion.p>

          <motion.div {...fadeUp(0.4)} className="mt-9 flex flex-wrap items-center gap-4">
            <a
              href="#proyek"
              className="group inline-flex items-center gap-2 rounded-xl bg-pink-500 px-6 py-3 font-medium text-slate-900 shadow-lg shadow-pink-500/25 transition-all hover:-translate-y-0.5 hover:bg-pink-400"
            >
              <ArrowDown size={18} className="transition-transform group-hover:translate-y-0.5" />
              Lihat Proyek
            </a>
            <a
              href={profile.cvUrl}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-300 px-6 py-3 font-medium text-slate-700 transition-all hover:-translate-y-0.5 hover:border-pink-500 hover:text-pink-500 dark:border-line dark:text-slate-300 dark:hover:border-pink-500 dark:hover:text-pink-400"
            >
              <FileDown size={18} />
              Unduh CV
            </a>
          </motion.div>

          {/* Dev persona strip */}
          <motion.div
            {...fadeUp(0.5)}
            className="mt-10 flex max-w-md items-center gap-3 rounded-xl border border-slate-200 bg-white/60 px-4 py-3 font-mono text-sm text-slate-500 dark:border-line dark:bg-surface/60 dark:text-slate-400"
          >
            <Sparkles size={16} className="shrink-0 text-sky-400" />
            <span className="truncate">
              <span className="text-slate-900 dark:text-slate-200">$</span> npm i{" "}
              <span className="text-pink-400">yosuanry</span>
              <span className="ml-0.5 inline-block h-4 w-2 animate-blink bg-sky-400 align-middle" />
            </span>
          </motion.div>
        </div>

        {/* Terminal kanan */}
        <motion.div
          initial={{ opacity: 0, x: reduce ? 0 : 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.25, ease: "easeOut" }}
          className="w-full"
        >
          <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-surface shadow-2xl shadow-pink-500/10 dark:border-line dark:bg-surface">
            {/* Header terminal */}
            <div className="flex items-center gap-2 border-b border-slate-200 bg-white/60 px-4 py-3 dark:border-line dark:bg-slate-900/60">
              <span className="h-3 w-3 rounded-full bg-pink-500" />
              <span className="h-3 w-3 rounded-full bg-yellow-500" />
              <span className="h-3 w-3 rounded-full bg-sky-500" />
              <span className="ml-3 flex items-center gap-1.5 font-mono text-xs text-slate-500 dark:text-slate-400">
                <Cpu size={12} className="text-pink-400" />
                yosuanry@devfolio: ~
              </span>
            </div>

            <div className="space-y-1 p-5 font-mono text-sm sm:p-6">
              <p className="text-slate-500 dark:text-slate-500">
                <span className="text-pink-400">➜</span> <span className="text-sky-400">~</span> cat stack.ts
              </p>
              <p className="mb-3 text-slate-500 dark:text-slate-500">{"// profile.dev"}</p>

              <pre className="overflow-x-auto whitespace-pre text-slate-300">
                <span className="text-purple-400">{"{"}</span>
                {terminalData.map((item) => (
                  <span key={item.key} className="block pl-4">
                    <span className="text-sky-400">"{item.key}"</span>
                    <span className="text-slate-500">: </span>
                    <span className={cn(tokenColors[item.type] ?? "text-emerald-400")}>{item.value}</span>
                    <span className="text-slate-500">,</span>
                  </span>
                ))}
                <span className="text-purple-400">{"}"}</span>
              </pre>

              {/* Status bar */}
              <p className="mt-3 flex items-center gap-2 text-slate-500 dark:text-slate-500">
                <span className="h-2 w-2 animate-pulse-dot rounded-full bg-emerald-400" />
                build finished · 100% ready
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}