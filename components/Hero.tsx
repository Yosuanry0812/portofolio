"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown, FileDown, Sparkles } from "lucide-react";
import { profile, typingRoles, about } from "@/data/profile";

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

export default function Hero() {
  const typed = useTypewriter(typingRoles);
  const reduce = useReducedMotion();

  const fadeUp = (delay: number) => ({
    initial: { opacity: 0, y: reduce ? 0 : 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, delay, ease: "easeOut" as const },
  });

  return (
    <section id="beranda" className="container-x flex min-h-screen items-center pt-28 pb-20">
      <div className="grid w-full items-center gap-12 lg:grid-cols-2">
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

        {/* Foto diri */}
        <motion.div
          initial={{ opacity: 0, scale: reduce ? 1 : 0.95, y: reduce ? 0 : 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
          className="mx-auto w-full max-w-md"
        >
          <div className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-surface shadow-2xl shadow-pink-500/5 transition-transform duration-300 hover:-translate-y-1 dark:border-line dark:bg-surface">
            <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 via-transparent to-sky-500/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            {profile.foto ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={profile.foto}
                alt={`Foto ${profile.nama}`}
                className="aspect-square w-full object-cover"
              />
            ) : (
              <div className="flex aspect-square w-full flex-col items-center justify-center gap-4">
                <div className="flex h-28 w-28 items-center justify-center rounded-2xl border-2 border-dashed border-pink-400/40 text-4xl font-bold text-pink-400/60">
                  {about.inisial}
                </div>
                <p className="px-6 text-center font-mono text-xs text-slate-500 dark:text-slate-400">
                  Taruh foto di <span className="text-pink-400">/public/foto.jpg</span>
                  <br />
                  lalu isi <span className="text-sky-400">profile.foto</span> di data/profile.ts
                </p>
              </div>
            )}
            <div className="absolute inset-x-0 bottom-0 border-t border-slate-200 bg-white/60 px-4 py-2.5 font-mono text-xs text-slate-500 dark:border-line dark:bg-slate-900/60 dark:text-slate-400">
              <span className="text-pink-400">$</span> whoami — {profile.nama}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
