"use client";

import type { ComponentType } from "react";
import { Github, Linkedin, Mail } from "lucide-react";
import { SiWhatsapp } from "react-icons/si";
import { profile } from "@/data/profile";
import { useI18n } from "@/lib/i18n";

type IconProps = { size?: number | string; className?: string };
const icons: Record<string, ComponentType<IconProps>> = {
  GitHub: Github,
  LinkedIn: Linkedin,
  WhatsApp: SiWhatsapp,
  Email: Mail,
};

export default function Footer() {
  const { t } = useI18n();
  return (
    <footer className="border-t border-slate-200 dark:border-line">
      <div className="container-x flex flex-col items-center justify-between gap-6 py-10 sm:flex-row">
        <p className="font-mono text-sm text-slate-500 dark:text-slate-400">
          <span className="text-cyan-600 dark:text-cyan-400">©</span> {new Date().getFullYear()}{" "}
          <span className="text-slate-900 dark:text-white">{profile.nama}</span>
          {" · "}
          {t("footer.rights")}
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
                className="rounded-xl border border-slate-200 p-2.5 text-slate-500 transition-all hover:-translate-y-1 hover:border-cyan-500 hover:text-cyan-500 dark:border-line dark:text-slate-400 dark:hover:border-cyan-500 dark:hover:text-cyan-400"
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
