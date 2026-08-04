"use client";

import { motion, useReducedMotion } from "framer-motion";
import { experience } from "@/data/profile";
import SectionHeading from "./SectionHeading";

export default function Experience() {
  const reduce = useReducedMotion();

  return (
    <section id="pengalaman" className="container-x scroll-mt-24 py-24">
      <SectionHeading
        label="pengalaman.ts"
        judul="Pengalaman"
        deskripsi="Perjalanan saya sejauh ini — kerja, magang, dan eksplorasi."
      />

      <ol className="relative border-l border-slate-200 pl-8 dark:border-line">
        {experience.map((item, i) => (
          <motion.li
            key={`${item.tempat}-${i}`}
            initial={{ opacity: 0, x: reduce ? 0 : -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="relative pb-10 last:pb-0"
          >
            <span className="absolute -left-[37px] top-1 flex h-5 w-5 items-center justify-center rounded-full border-2 border-pink-500 bg-white dark:bg-bg">
              <span className="h-1.5 w-1.5 rounded-full bg-pink-400" />
            </span>
            <p className="font-mono text-sm text-sky-400">{item.periode}</p>
            <h3 className="mt-1 text-lg font-semibold text-slate-900 dark:text-white">{item.posisi}</h3>
            <p className="text-sm text-pink-500">{item.tempat}</p>
            <p className="mt-2 text-slate-600 dark:text-slate-400">{item.deskripsi}</p>
          </motion.li>
        ))}
      </ol>
    </section>
  );
}
