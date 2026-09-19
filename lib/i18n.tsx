"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Lang = "id" | "en";

type Dict = Record<string, string>;

const dict: Record<Lang, Dict> = {
  en: {
    "nav.about": "About",
    "nav.experience": "Experience",
    "nav.skills": "Skills",
    "nav.projects": "Projects",
    "nav.contact": "Contact",
    "nav.open": "Open to Opportunities",
    "hero.viewProjects": "View Projects",
    "hero.downloadCv": "Download CV",
    "about.title": "About Me",
    "about.desc": "A quick look at who I am and what I do.",
    "about.online": "online — open to work",
    "about.footer": "always learning, always building",
    "exp.title": "Career Timeline",
    "exp.scroll": "< scroll >",
    "skills.title": "Tech Stack & Skills",
    "skills.desc": "Technologies I use to turn ideas into products.",
    "activity.title": "GitHub Activity",
    "activity.desc": "Consistent commits — a habit of shipping and learning in public.",
    "activity.last": "last 12 months",
    "projects.title": "Featured Projects",
    "projects.desc": "A few things I've built — filter by category.",
    "projects.featured": "featured project",
    "projects.deployed": "deployed",
    "projects.repoOnly": "repo-only",
    "projects.viewLive": "view live",
    "projects.viewRepo": "view repo",
    "projects.demo": "demo",
    "projects.repo": "repo",
    "contact.title": "Get In Touch",
    "contact.desc": "Have a project, job opportunity, or just want to say hi? Send a message.",
    "contact.letsTalk": "let's talk.",
    "contact.dontBeShy": "Don't be shy,",
    "contact.openTo": "open to opportunities",
    "contact.clickToCopy": "click to copy",
    "contact.copied": "Copied!",
    "contact.sendMessage": "Send a message",
    "contact.yourName": "Your Name",
    "contact.yourEmail": "Your Email",
    "contact.yourMessage": "Your Message",
    "contact.phName": "Full name",
    "contact.phEmail": "you@email.com",
    "contact.phMessage": "Write your message here...",
    "contact.sendWa": "Send via WhatsApp",
    "contact.sent": "WhatsApp opened — just hit send there.",
    "footer.rights": "All rights reserved.",
  },
  id: {
    "nav.about": "Tentang",
    "nav.experience": "Pengalaman",
    "nav.skills": "Keahlian",
    "nav.projects": "Proyek",
    "nav.contact": "Kontak",
    "nav.open": "Terbuka untuk Peluang",
    "hero.viewProjects": "Lihat Proyek",
    "hero.downloadCv": "Unduh CV",
    "about.title": "Tentang Saya",
    "about.desc": "Sekilas tentang siapa saya dan apa yang saya kerjakan.",
    "about.online": "online — siap kerja",
    "about.footer": "selalu belajar, selalu membangun",
    "exp.title": "Linimasa Karier",
    "exp.scroll": "< geser >",
    "skills.title": "Teknologi & Keahlian",
    "skills.desc": "Teknologi yang saya gunakan untuk wujudkan ide jadi produk.",
    "activity.title": "Aktivitas GitHub",
    "activity.desc": "Komit konsisten — kebiasaan rilis dan belajar di publik.",
    "activity.last": "12 bulan terakhir",
    "projects.title": "Proyek Unggulan",
    "projects.desc": "Beberapa hal yang sudah saya bangun — filter per kategori.",
    "projects.featured": "proyek unggulan",
    "projects.deployed": "deployed",
    "projects.repoOnly": "repo saja",
    "projects.viewLive": "lihat live",
    "projects.viewRepo": "lihat repo",
    "projects.demo": "demo",
    "projects.repo": "repo",
    "contact.title": "Hubungi Saya",
    "contact.desc": "Punya proyek, peluang kerja, atau sekadar sapa? Kirim pesan.",
    "contact.letsTalk": "yuk ngobrol.",
    "contact.dontBeShy": "Jangan ragu,",
    "contact.openTo": "terbuka untuk peluang",
    "contact.clickToCopy": "klik untuk salin",
    "contact.copied": "Tersalin!",
    "contact.sendMessage": "Kirim pesan",
    "contact.yourName": "Nama Anda",
    "contact.yourEmail": "Email Anda",
    "contact.yourMessage": "Pesan Anda",
    "contact.phName": "Nama lengkap",
    "contact.phEmail": "kamu@email.com",
    "contact.phMessage": "Tulis pesanmu di sini...",
    "contact.sendWa": "Kirim via WhatsApp",
    "contact.sent": "WhatsApp terbuka — tinggal tekan kirim di sana.",
    "footer.rights": "Hak cipta dilindungi.",
  },
};

type Ctx = {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: string) => string;
};

const I18nContext = createContext<Ctx | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    const saved = localStorage.getItem("lang") as Lang | null;
    if (saved === "id" || saved === "en") setLangState(saved);
    else {
      const nav = navigator.language.toLowerCase();
      if (nav.startsWith("id")) setLangState("id");
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
    localStorage.setItem("lang", lang);
  }, [lang]);

  const setLang = (l: Lang) => setLangState(l);
  const t = (key: string) => dict[lang][key] ?? key;

  return <I18nContext.Provider value={{ lang, setLang, t }}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be inside I18nProvider");
  return ctx;
}
