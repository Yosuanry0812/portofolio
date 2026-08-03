"use client";

import { useState, type FormEvent } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowUpRight,
  Check,
  Copy,
  Github,
  Linkedin,
  Loader2,
  Mail,
  Send,
} from "lucide-react";
import { profile } from "@/data/profile";
import SectionHeading from "./SectionHeading";
import { cn } from "@/lib/utils";

type Status = "idle" | "loading" | "success" | "error";

const socialIcons: Record<string, typeof Github> = {
  GitHub: Github,
  LinkedIn: Linkedin,
  Email: Mail,
};

const inputClass =
  "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 font-mono text-sm text-slate-900 shadow-inner outline-none transition-all placeholder:text-slate-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 dark:border-line dark:bg-bg dark:text-white";

export default function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [copied, setCopied] = useState(false);
  const reduce = useReducedMotion();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus("loading");

    try {
      const res = await fetch(profile.formspreeEndpoint, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      });
      if (!res.ok) throw new Error("Gagal mengirim");
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard tidak tersedia — abaikan */
    }
  };

  return (
    <section id="kontak" className="container-x relative scroll-mt-24 overflow-hidden py-24">
      {/* Glow dekoratif */}
      <div className="pointer-events-none absolute -top-32 right-0 h-80 w-80 rounded-full bg-emerald-500/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 left-0 h-80 w-80 rounded-full bg-cyan-500/10 blur-3xl" />

      <SectionHeading
        label="kontak.tsx"
        judul="Mari Berkenalan"
        deskripsi="Punya proyek, peluang kerja, atau sekadar ingin menyapa? Kirim pesan."
      />

      <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr]">
        {/* Kiri: kartu profil kontak */}
        <motion.div
          initial={{ opacity: 0, y: reduce ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white/60 p-6 dark:border-line dark:bg-surface/60"
        >
          {/* Garis atas ala terminal */}
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-emerald-500 via-cyan-500 to-emerald-500" />

          <div className="flex items-center gap-2 font-mono text-xs text-slate-500 dark:text-slate-400">
            <span className="flex gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-red-500" />
              <span className="h-2.5 w-2.5 rounded-full bg-yellow-500" />
              <span className="h-2.5 w-2.5 rounded-full bg-green-500" />
            </span>
            <span className="ml-2 truncate">yosuanry@devfolio: ~/kontak</span>
          </div>

          <h3 className="mt-6 text-2xl font-bold text-slate-900 dark:text-white">
            Jangan ragu,
            <br />
            <span className="text-gradient">sapa saya langsung.</span>
          </h3>

          <div className="mt-4 flex items-center gap-2 font-mono text-xs">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            <span className="text-slate-500 dark:text-slate-400">// status: open to opportunities</span>
          </div>

          {/* Email + tombol salin */}
          <button
            type="button"
            onClick={copyEmail}
            className="group mt-6 flex w-full items-center justify-between gap-3 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 p-[1px] transition-transform hover:-translate-y-0.5"
          >
            <span className="flex w-full items-center gap-3 rounded-xl bg-white px-4 py-4 dark:bg-surface">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-500 transition-colors group-hover:bg-emerald-500 group-hover:text-white dark:text-emerald-400">
                <Mail size={18} />
              </span>
              <span className="min-w-0 text-left">
                <span className="block font-mono text-[11px] text-slate-500 dark:text-slate-400">
                  klik untuk salin
                </span>
                <span className="block truncate font-mono text-sm font-medium text-slate-900 dark:text-white">
                  {profile.email}
                </span>
              </span>
              <AnimatePresence mode="wait">
                {copied ? (
                  <motion.span
                    key="copied"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="flex shrink-0 items-center gap-1 rounded-lg bg-emerald-500/10 px-3 py-1.5 text-xs font-medium text-emerald-400"
                  >
                    <Check size={14} /> Tersalin!
                  </motion.span>
                ) : (
                  <motion.span
                    key="copy"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="shrink-0 text-slate-400 transition-colors group-hover:text-emerald-400"
                  >
                    <Copy size={18} />
                  </motion.span>
                )}
              </AnimatePresence>
            </span>
          </button>

          {/* Sosmed */}
          <div className="mt-6 flex flex-col gap-2.5">
            {profile.socials.map((social, i) => {
              const Icon = socialIcons[social.nama] ?? ArrowUpRight;
              return (
                <motion.a
                  key={social.nama}
                  href={social.url}
                  target={social.nama === "Email" ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, x: reduce ? 0 : -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="group flex items-center gap-3 rounded-xl border border-slate-200 bg-white/60 px-4 py-3 text-slate-700 transition-all hover:translate-x-1 hover:border-emerald-500/40 hover:shadow-lg hover:shadow-emerald-500/5 dark:border-line dark:bg-surface/60 dark:text-slate-300 dark:hover:border-emerald-500/40 dark:hover:text-emerald-400"
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 text-slate-500 transition-colors group-hover:bg-emerald-500/10 group-hover:text-emerald-400 dark:bg-bg dark:text-slate-400">
                    <Icon size={15} />
                  </span>
                  <span className="font-medium">{social.nama}</span>
                  <span className="ml-auto font-mono text-xs text-slate-400">0{i + 1}</span>
                  <ArrowUpRight
                    size={15}
                    className="text-slate-400 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-emerald-400"
                  />
                </motion.a>
              );
            })}
          </div>
        </motion.div>

        {/* Kanan: form */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: reduce ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="rounded-2xl bg-gradient-to-br from-emerald-500/40 via-slate-200/10 to-cyan-500/40 p-[1px] dark:from-emerald-500/40 dark:via-line dark:to-cyan-500/40"
        >
          <div className="rounded-[15px] bg-white/80 p-6 backdrop-blur dark:bg-surface/80">
            <p className="font-mono text-xs text-slate-500 dark:text-slate-400">
              <span className="text-emerald-400">➜</span>{" "}
              <span className="text-cyan-400">~</span> buat pesan baru
            </p>

            <div className="mt-5 grid gap-5 sm:grid-cols-2">
              <label className="block">
                <span className="mb-2 block font-mono text-xs text-slate-500 dark:text-slate-400">
                  <span className="text-emerald-400">$</span> nama_kamu
                </span>
                <input
                  name="nama"
                  type="text"
                  required
                  placeholder="Nama lengkap"
                  className={inputClass}
                />
              </label>
              <label className="block">
                <span className="mb-2 block font-mono text-xs text-slate-500 dark:text-slate-400">
                  <span className="text-emerald-400">$</span> email_kamu
                </span>
                <input
                  name="email"
                  type="email"
                  required
                  placeholder="kamu@email.com"
                  className={inputClass}
                />
              </label>
            </div>

            <label className="mt-5 block">
              <span className="mb-2 block font-mono text-xs text-slate-500 dark:text-slate-400">
                <span className="text-emerald-400">$</span> pesan_kamu
              </span>
              <textarea
                name="pesan"
                required
                rows={5}
                placeholder="Tulis pesanmu di sini..."
                className={cn(inputClass, "resize-none")}
              />
            </label>

            <button
              type="submit"
              disabled={status === "loading"}
              className="group mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 px-6 py-3.5 font-medium text-slate-900 shadow-lg shadow-emerald-500/25 transition-all hover:shadow-emerald-500/40 hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {status === "loading" ? (
                <>
                  <Loader2 size={18} className="animate-spin" /> Mengirim...
                </>
              ) : (
                <>
                  <Send size={18} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  Kirim Pesan
                </>
              )}
            </button>

            <AnimatePresence>
              {status === "success" ? (
                <motion.p
                  initial={{ opacity: 0, y: reduce ? 0 : 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="mt-4 rounded-xl border border-emerald-500/40 bg-emerald-500/10 px-4 py-3 font-mono text-sm text-emerald-400"
                >
                  <span className="text-emerald-400">✓</span> Pesan terkirim! Terima kasih, saya akan
                  membalas secepatnya.
                </motion.p>
              ) : null}
              {status === "error" ? (
                <motion.p
                  initial={{ opacity: 0, y: reduce ? 0 : 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="mt-4 rounded-xl border border-red-500/40 bg-red-500/10 px-4 py-3 font-mono text-sm text-red-400"
                >
                  <span className="text-red-400">✗</span> Gagal mengirim. Pastikan endpoint Formspree di
                  data/profile.ts sudah diisi, lalu coba lagi.
                </motion.p>
              ) : null}
            </AnimatePresence>
          </div>
        </motion.form>
      </div>
    </section>
  );
}
