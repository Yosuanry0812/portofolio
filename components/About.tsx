"use client";

import { motion, useReducedMotion } from "framer-motion";
import { about, profile } from "@/data/profile";
import SectionHeading from "./SectionHeading";

export default function About() {
  const reduce = useReducedMotion();

  return (
    <section id="about" className="container-x scroll-mt-24 py-24">
      <SectionHeading
        label="about.ts"
        judul="About Me"
        deskripsi="A quick look at who I am and what I do."
      />

      <div className="grid items-start gap-8 lg:grid-cols-[300px_1fr]">
        {/* Terminal-style profile card */}
        <motion.div
          initial={{ opacity: 0, scale: reduce ? 1 : 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="overflow-hidden rounded-2xl border border-slate-200 bg-surface shadow-2xl shadow-pink-500/5 dark:border-line dark:bg-surface"
        >
          <div className="flex items-center gap-2 border-b border-slate-200 bg-white/60 px-4 py-3 dark:border-line dark:bg-slate-900/60">
            <span className="h-3 w-3 rounded-full bg-pink-500" />
            <span className="h-3 w-3 rounded-full bg-yellow-500" />
            <span className="h-3 w-3 rounded-full bg-sky-500" />
            <span className="ml-3 font-mono text-xs text-slate-500 dark:text-slate-400">
              {profile.githubUsername}/profile.tsx
            </span>
          </div>

          <div className="p-6">
            {profile.foto ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={profile.foto}
                alt={`Photo of ${profile.nama}`}
                className="mx-auto h-32 w-32 rounded-2xl border border-pink-500/30 object-cover shadow-lg"
              />
            ) : (
              <div className="mx-auto flex h-32 w-32 items-center justify-center rounded-2xl border border-pink-500/30 bg-gradient-to-br from-pink-500/15 via-sky-500/15 to-purple-500/15">
                <span className="font-mono text-5xl font-bold text-gradient">{about.inisial}</span>
              </div>
            )}
            <p className="mt-5 text-center font-mono text-sm text-slate-900 dark:text-white">
              {profile.nama}
            </p>
            <p className="text-center font-mono text-xs text-slate-500 dark:text-slate-400">
              {profile.peran}
            </p>
            <div className="mt-4 flex items-center justify-center gap-2 rounded-lg border border-pink-500/30 bg-pink-500/10 px-3 py-1.5 font-mono text-xs text-pink-400">
              <span className="h-2 w-2 animate-pulse-dot rounded-full bg-pink-400" />
              online — open to work
            </div>
          </div>
        </motion.div>

        {/* Terminal session */}
        <motion.div
          initial={{ opacity: 0, y: reduce ? 0 : 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="overflow-hidden rounded-2xl border border-slate-200 bg-surface shadow-2xl shadow-pink-500/5 dark:border-line dark:bg-surface"
        >
          <div className="flex items-center gap-2 border-b border-slate-200 bg-white/60 px-4 py-3 dark:border-line dark:bg-slate-900/60">
            <span className="h-3 w-3 rounded-full bg-pink-500" />
            <span className="h-3 w-3 rounded-full bg-yellow-500" />
            <span className="h-3 w-3 rounded-full bg-sky-500" />
            <span className="ml-3 font-mono text-xs text-slate-500 dark:text-slate-400">
              {profile.githubUsername}@devfolio: ~/about
            </span>
          </div>

          <div className="p-5 font-mono text-[13px] leading-6 sm:p-6">
            {/* whoami */}
            <p className="text-slate-500 dark:text-slate-400">
              <span className="text-pink-400">➜</span> <span className="text-sky-400">~</span> whoami
            </p>
            <p className="mb-4 text-slate-700 dark:text-slate-300">
              {profile.nama} — <span className="text-pink-400">{profile.peran}</span>
            </p>

            {/* bio */}
            <p className="text-slate-500 dark:text-slate-400">
              <span className="text-pink-400">➜</span> <span className="text-sky-400">~</span> cat bio.txt
            </p>
            <p className="mb-4 whitespace-pre-line text-slate-600 dark:text-slate-300">{about.bio}</p>

            {/* profile json */}
            <p className="text-slate-500 dark:text-slate-400">
              <span className="text-pink-400">➜</span> <span className="text-sky-400">~</span> cat profile.json
            </p>
            <pre className="mb-4 overflow-x-auto whitespace-pre text-slate-600 dark:text-slate-300">
              <span className="text-purple-400">{"{"}</span>
              {about.info.map((item) => (
                <span key={item.label} className="block pl-4">
                  <span className="text-sky-400">"{item.label.toLowerCase()}"</span>
                  <span className="text-slate-500">: </span>
                  <span className="text-pink-400">"{item.value}"</span>
                  <span className="text-slate-500">,</span>
                </span>
              ))}
              <span className="text-purple-400">{"}"}</span>
            </pre>

            {/* status */}
            <p className="text-slate-500 dark:text-slate-400">
              <span className="text-pink-400">➜</span> <span className="text-sky-400">~</span>{" "}
              ./check-status --github=<span className="text-purple-400">{profile.githubUsername}</span>
            </p>
            <p className="text-slate-600 dark:text-slate-300">
              <span className="text-pink-400">✓</span> online — always learning, always building
              <span className="ml-1 inline-block h-4 w-2 animate-blink bg-pink-400 align-middle" />
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
