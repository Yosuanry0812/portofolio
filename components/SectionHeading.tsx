"use client";

import { motion, useReducedMotion } from "framer-motion";

interface SectionHeadingProps {
  id?: string;
  judul: string;
  deskripsi?: string;
}

export default function SectionHeading({ id, judul, deskripsi }: SectionHeadingProps) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      id={id}
      initial={{ opacity: 0, y: reduce ? 0 : 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="mb-12"
    >
      <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
        {judul}
      </h2>
      <div className="mt-4 h-px w-24 bg-gradient-to-r from-cyan-400 to-sky-400" />
      {deskripsi ? (
        <p className="mt-4 max-w-2xl text-slate-600 dark:text-slate-400">{deskripsi}</p>
      ) : null}
    </motion.div>
  );
}
