"use client";

import { Github, Linkedin, Mail } from "lucide-react";
import { profile } from "@/data/profile";

const icons = {
  GitHub: Github,
  LinkedIn: Linkedin,
  Email: Mail,
};

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 dark:border-line">
      <div className="container-x flex flex-col items-center justify-between gap-6 py-10 sm:flex-row">
        <p className="font-mono text-sm text-slate-500 dark:text-slate-400">
          <span className="text-emerald-400">©</span> {new Date().getFullYear()}{" "}
          <span className="text-slate-900 dark:text-white">{profile.nama}</span>
        </p>

        <div className="flex gap-3">
          {profile.socials.map((social) => {
            const Icon = icons[social.nama as keyof typeof icons] ?? Github;
            return (
              <a
                key={social.nama}
                href={social.url}
                target={social.nama === "Email" ? undefined : "_blank"}
                rel="noopener noreferrer"
                aria-label={social.nama}
                className="rounded-xl border border-slate-200 p-2.5 text-slate-500 transition-all hover:-translate-y-1 hover:border-emerald-500 hover:text-emerald-500 dark:border-line dark:text-slate-400 dark:hover:border-emerald-500 dark:hover:text-emerald-400"
              >
                <Icon size={18} />
              </a>
            );
          })}
        </div>
      </div>
    </footer>
  );
}
