"use client";

import { useState, type FormEvent } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowUpRight,
  Check,
  Copy,
  Github,
  Linkedin,
  Mail,
  MessageCircle,
} from "lucide-react";
import { profile } from "@/data/profile";
import SectionHeading from "./SectionHeading";
import { cn } from "@/lib/utils";

const socialIcons: Record<string, typeof Github> = {
  GitHub: Github,
  LinkedIn: Linkedin,
  WhatsApp: MessageCircle,
  Email: Mail,
};

const inputClass =
  "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 font-mono text-sm text-slate-900 shadow-inner outline-none transition-all placeholder:text-slate-400 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 dark:border-line dark:bg-bg dark:text-white";

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const [sent, setSent] = useState(false);
  const reduce = useReducedMotion();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const nama = String(data.get("nama") ?? "");
    const email = String(data.get("email") ?? "");
    const pesan = String(data.get("pesan") ?? "");

    const text = [
      `Hello, I'm ${nama}.`,
      email ? `Email: ${email}` : "",
      "",
      pesan,
    ]
      .filter(Boolean)
      .join("\n");

    window.open(
      `https://wa.me/${profile.whatsapp}?text=${encodeURIComponent(text)}`,
      "_blank",
      "noopener,noreferrer"
    );
    setSent(true);
    form.reset();
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable — ignore */
    }
  };

  return (
    <section id="contact" className="container-x relative scroll-mt-24 overflow-hidden py-24">
      {/* Decorative glow */}
      <div className="pointer-events-none absolute -top-32 right-0 h-80 w-80 rounded-full bg-cyan-500/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 left-0 h-80 w-80 rounded-full bg-sky-500/10 blur-3xl" />

      <SectionHeading
        judul="Get In Touch"
        deskripsi="Have a project, job opportunity, or just want to say hi? Send a message."
      />

      <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr]">
        {/* Left: contact profile card */}
        <motion.div
          initial={{ opacity: 0, y: reduce ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white/60 p-6 dark:border-line dark:bg-surface/60"
        >
          {/* Terminal-style top line */}
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-cyan-500 via-sky-500 to-cyan-500" />

          <h3 className="mt-6 text-2xl font-bold text-slate-900 dark:text-white">
            Don't be shy,
            <br />
            <span className="text-gradient">let's talk.</span>
          </h3>

          <div className="mt-4 flex items-center gap-2 font-mono text-xs">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-500" />
            </span>
            <span className="text-slate-500 dark:text-slate-400">open to opportunities</span>
          </div>

          {/* Email + copy button */}
          <button
            type="button"
            onClick={copyEmail}
            className="group mt-6 flex w-full items-center justify-between gap-3 rounded-xl bg-gradient-to-r from-cyan-500 to-sky-500 p-[1px] transition-transform hover:-translate-y-0.5"
          >
            <span className="flex w-full items-center gap-3 rounded-xl bg-white px-4 py-4 dark:bg-surface">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-cyan-500/10 text-cyan-500 transition-colors group-hover:bg-cyan-500 group-hover:text-white dark:text-cyan-400">
                <Mail size={18} />
              </span>
              <span className="min-w-0 text-left">
                <span className="block font-mono text-[11px] text-slate-500 dark:text-slate-400">
                  click to copy
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
                    className="flex shrink-0 items-center gap-1 rounded-lg bg-cyan-500/10 px-3 py-1.5 text-xs font-medium text-cyan-400"
                  >
                    <Check size={14} /> Copied!
                  </motion.span>
                ) : (
                  <motion.span
                    key="copy"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="shrink-0 text-slate-400 transition-colors group-hover:text-cyan-400"
                  >
                    <Copy size={18} />
                  </motion.span>
                )}
              </AnimatePresence>
            </span>
          </button>

          {/* Socials */}
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
                  className="group flex items-center gap-3 rounded-xl border border-slate-200 bg-white/60 px-4 py-3 text-slate-700 transition-all hover:translate-x-1 hover:border-cyan-500/40 hover:shadow-lg hover:shadow-cyan-500/5 dark:border-line dark:bg-surface/60 dark:text-slate-300 dark:hover:border-cyan-500/40 dark:hover:text-cyan-400"
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 text-slate-500 transition-colors group-hover:bg-cyan-500/10 group-hover:text-cyan-400 dark:bg-bg dark:text-slate-400">
                    <Icon size={15} />
                  </span>
                  <span className="font-medium">{social.nama}</span>
                  <span className="ml-auto font-mono text-xs text-slate-400">0{i + 1}</span>
                  <ArrowUpRight
                    size={15}
                    className="text-slate-400 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-cyan-400"
                  />
                </motion.a>
              );
            })}
          </div>
        </motion.div>

        {/* Right: form */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: reduce ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="rounded-2xl bg-gradient-to-br from-cyan-500/40 via-slate-200/10 to-sky-500/40 p-[1px] dark:from-cyan-500/40 dark:via-line dark:to-sky-500/40"
        >
          <div className="rounded-[15px] bg-white/80 p-6 backdrop-blur dark:bg-surface/80">
            <p className="font-mono text-xs text-slate-500 dark:text-slate-400">
              Send a message
            </p>

            <div className="mt-5 grid gap-5 sm:grid-cols-2">
              <label className="block">
                <span className="mb-2 block font-mono text-xs text-slate-500 dark:text-slate-400">
                  Your Name
                </span>
                <input
                  name="nama"
                  type="text"
                  required
                  placeholder="Full name"
                  className={inputClass}
                />
              </label>
              <label className="block">
                <span className="mb-2 block font-mono text-xs text-slate-500 dark:text-slate-400">
                  Your Email
                </span>
                <input
                  name="email"
                  type="email"
                  required
                  placeholder="you@email.com"
                  className={inputClass}
                />
              </label>
            </div>

            <label className="mt-5 block">
              <span className="mb-2 block font-mono text-xs text-slate-500 dark:text-slate-400">
                Your Message
              </span>
              <textarea
                name="pesan"
                required
                rows={5}
                placeholder="Write your message here..."
                className={cn(inputClass, "resize-none")}
              />
            </label>

            <button
              type="submit"
              className="group mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-sky-500 px-6 py-3.5 font-medium text-slate-900 shadow-lg shadow-cyan-500/25 transition-all hover:shadow-cyan-500/40 hover:brightness-110"
            >
              <MessageCircle size={18} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              Send via WhatsApp
            </button>

            <AnimatePresence>
              {sent ? (
                <motion.p
                  initial={{ opacity: 0, y: reduce ? 0 : 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="mt-4 rounded-xl border border-cyan-500/40 bg-cyan-500/10 px-4 py-3 font-mono text-sm text-cyan-400"
                >
                  <span className="text-cyan-400">✓</span> WhatsApp opened — just hit send
                  there.
                </motion.p>
              ) : null}
            </AnimatePresence>
          </div>
        </motion.form>
      </div>
    </section>
  );
}
