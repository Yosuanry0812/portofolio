"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

interface SectionHeadingProps {
  id?: string;
  judul: string;
  deskripsi?: string;
}

export default function SectionHeading({ id, judul, deskripsi }: SectionHeadingProps) {
  const reduce = useReducedMotion();
  // ponytail: mobile reveal travels half distance + shorter duration — same feel as desktop, less frame cost on scroll.
  const [coarse, setCoarse] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(pointer: coarse)");
    setCoarse(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setCoarse(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  const y = reduce ? 0 : coarse ? 12 : 24;

  return (
    <motion.div
      id={id}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: coarse ? "-40px" : "-80px" }}
      transition={{ duration: coarse ? 0.4 : 0.6, ease: "easeOut" }}
      className="mb-12"
    >
      <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
        {judul}
      </h2>
      <div className="mt-4 h-px w-24 bg-gradient-to-r from-cyan-500 to-sky-500 dark:from-cyan-400 dark:to-sky-400" />
      {deskripsi ? (
        <p className="mt-4 max-w-2xl text-slate-600 dark:text-slate-400">{deskripsi}</p>
      ) : null}
    </motion.div>
  );
}
