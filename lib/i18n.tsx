"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Lang = "id" | "en";

type Dict = Record<string, string>;

// ponytail: data strings (bio, skills, experience...) use their English source as key —
// EN falls back to the key itself, ID provides translation. No profile restructure needed.
const dict: Record<Lang, Dict> = {
  en: {
    "nav.about": "About",
    "nav.experience": "Experience",
    "nav.skills": "Skills",
    "nav.projects": "Projects",
    "nav.contact": "Contact",
    "nav.open": "Open to Opportunities",
    "nav.openMenu": "Open menu",
    "nav.closeMenu": "Close menu",
    "hero.viewProjects": "View Projects",
    "hero.downloadCv": "Download CV",
    "hero.tagline": "I build fast, beautiful, and scalable web apps.",
    "profile.role": "Full-Stack Developer",
    "about.title": "About Me",
    "about.desc": "A quick look at who I am and what I do.",
    "about.online": "online — open to work",
    "about.footer": "always learning, always building",
    "about.photoAlt": "Photo of ",
    "exp.title": "Career Timeline",
    "exp.scroll": "< scroll >",
    "skills.title": "Tech Stack & Skills",
    "skills.desc": "Technologies I use to turn ideas into products.",
    "activity.title": "GitHub Activity",
    "activity.desc": "Consistent commits — a habit of shipping and learning in public.",
    "activity.last": "last 12 months",
    "activity.error":
      "Could not load contributions — check connection, then visit the GitHub profile.",
    "activity.totalCount": "{{count}} contributions in the last year",
    "activity.legendLess": "Less",
    "activity.legendMore": "More",
    "projects.title": "Featured Projects",
    "projects.desc": "A few things I've built — filter by category.",
    "projects.featured": "featured project",
    "projects.deployed": "deployed",
    "projects.repoOnly": "repo-only",
    "projects.viewLive": "view live",
    "projects.viewRepo": "view repo",
    "projects.demo": "demo",
    "projects.repo": "repo",
    "projects.filter.all": "all",
    "projects.filter.web": "web",
    "projects.filter.mobile": "mobile",
    "projects.other": "Other",
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
    "top.back": "Back to top",
    "common.skip": "Skip to main content",
    "ee.thanks": "Thanks for diving into my source code.\nIf you're reading this, we vibe the same. 👋",
    "theme.toLight": "Switch to light mode",
    "theme.toDark": "Switch to dark mode",
    "theme.light": "Light mode",
    "theme.dark": "Dark mode",
    "lang.toEn": "Switch to English",
    "lang.toId": "Switch to Indonesian",
  },
  id: {
    "nav.about": "Tentang",
    "nav.experience": "Pengalaman",
    "nav.skills": "Keahlian",
    "nav.projects": "Proyek",
    "nav.contact": "Kontak",
    "nav.open": "Terbuka untuk Peluang",
    "nav.openMenu": "Buka menu",
    "nav.closeMenu": "Tutup menu",
    "hero.viewProjects": "Lihat Proyek",
    "hero.downloadCv": "Unduh CV",
    "hero.tagline": "Saya membangun aplikasi web yang cepat, indah, dan skalabel.",
    "profile.role": "Pengembang Full-Stack",
    "about.title": "Tentang Saya",
    "about.desc": "Sekilas tentang siapa saya dan apa yang saya kerjakan.",
    "about.online": "online — siap kerja",
    "about.footer": "selalu belajar, selalu membangun",
    "about.photoAlt": "Foto ",
    "exp.title": "Linimasa Karier",
    "exp.scroll": "< geser >",
    "skills.title": "Teknologi & Keahlian",
    "skills.desc": "Teknologi yang saya gunakan untuk wujudkan ide jadi produk.",
    "activity.title": "Aktivitas GitHub",
    "activity.desc": "Komit konsisten — kebiasaan rilis dan belajar di publik.",
    "activity.last": "12 bulan terakhir",
    "activity.error":
      "Gagal memuat kontribusi — periksa koneksi, lalu kunjungi profil GitHub.",
    "activity.totalCount": "{{count}} kontribusi dalam setahun terakhir",
    "activity.legendLess": "Sedikit",
    "activity.legendMore": "Banyak",
    "projects.title": "Proyek Unggulan",
    "projects.desc": "Beberapa hal yang sudah saya bangun — filter per kategori.",
    "projects.featured": "proyek unggulan",
    "projects.deployed": "deployed",
    "projects.repoOnly": "repo saja",
    "projects.viewLive": "lihat live",
    "projects.viewRepo": "lihat repo",
    "projects.demo": "demo",
    "projects.repo": "repo",
    "projects.filter.all": "semua",
    "projects.filter.web": "web",
    "projects.filter.mobile": "mobile",
    "projects.other": "Lainnya",
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
    "top.back": "Kembali ke atas",
    "common.skip": "Lewati ke konten utama",
    "ee.thanks":
      "Makasih sudah ngulik source code saya.\nKalau kamu baca ini, kita satu frekuensi. 👋",
    "theme.toLight": "Ganti ke mode terang",
    "theme.toDark": "Ganti ke mode gelap",
    "theme.light": "Mode terang",
    "theme.dark": "Mode gelap",
    "lang.toEn": "Ganti ke Bahasa Inggris",
    "lang.toId": "Ganti ke Bahasa Indonesia",
    // --- data strings (English source → Indonesian) ---
    "Hi, I'm Yosuanry Simbolon a developer who loves turning ideas into digital products people genuinely enjoy using. I obsess over sharp frontends, clean backends, and the small details that make an experience feel premium.":
      "Halo, saya Yosuanry Simbolon, developer yang suka mengubah ide menjadi produk digital yang benar-benar dinikmati orang. Saya memperhatikan frontend yang tajam, backend yang bersih, dan detail kecil yang membuat pengalaman terasa premium.",
    Location: "Lokasi",
    Status: "Status",
    Languages: "Bahasa",
    Interests: "Minat",
    "Open to Opportunities": "Terbuka untuk Peluang",
    "Indonesian, English": "Indonesia, Inggris",
    "Web, Mobile, UI/UX": "Web, Mobile, UI/UX",
    "The programming languages I work with": "Bahasa pemrograman yang saya gunakan",
    "Backend & Frameworks": "Backend & Framework",
    "The stack I use to build web and mobile apps":
      "Stack yang saya gunakan untuk membangun aplikasi web dan mobile",
    "Storing and managing data": "Menyimpan dan mengelola data",
    "Deployment, infrastructure, and automation": "Deployment, infrastruktur, dan otomatisasi",
    "AI & Automation": "AI & Otomatisasi",
    "AI tools that boost developer productivity":
      "Perkakas AI yang meningkatkan produktivitas developer",
    Projects: "Proyek",
    Tech: "Teknologi",
    Years: "Tahun",
    Commits: "Komit",
    "Finance app for managing Pondok Daun's cash flow income, expenses, and reports in one organized place.":
      "Aplikasi keuangan untuk mengelola arus kas, pemasukan, pengeluaran, dan laporan Pondok Daun dalam satu tempat.",
    "Interactive web app for visualizing and planning land layouts.":
      "Aplikasi web interaktif untuk memvisualisasikan dan merencanakan tata letak lahan.",
    "Modern profile site for Pondok Daun, presenting activities, facilities, and contact info in a clean layout.":
      "Situs profil modern untuk Pondok Daun yang menampilkan kegiatan, fasilitas, dan info kontak dalam tata letak bersih.",
    "Laravel-powered site for Bangkiang Jaran with content management and a full admin panel.":
      "Situs Laravel untuk Bangkiang Jaran dengan manajemen konten dan panel admin lengkap.",
    "Mobile app that showcases Indonesian batik catalog, motif details, and cultural context.":
      "Aplikasi mobile yang menampilkan katalog batik Indonesia, detail motif, dan konteks budaya.",
    "End-to-end tracker for credit agreement applications status, documents, and progress at a glance.":
      "Pelacak status pengajuan akad kredit secara end-to-end — dokumen dan progres sekilas.",
    "Oct 2023 — Present": "Okt 2023 — Sekarang",
    "Feb 2026 — May 2026": "Feb 2026 — Mei 2026",
    "May 2026 — Present": "Mei 2026 — Sekarang",
    "Student (Semester 7)": "Mahasiswa (Semester 7)",
    Intern: "Magang",
    "Part-Time Staff": "Staf Paruh Waktu",
    "Head of PSDM Division": "Ketua Divisi PSDM",
    "Vice Chairman": "Wakil Ketua",
    Chairman: "Ketua",
    "Pursuing a degree while building technical and organizational skills along the way.":
      "Menempuh pendidikan sambil membangun kemampuan teknis dan organisasi.",
    "4-month internship at NDS Guestlist, learning the ropes in a real professional environment.":
      "Magang 4 bulan di NDS Guestlist, belajar langsung di lingkungan profesional.",
    "Stayed on as a part-time team member after the internship wrapped up.":
      "Lanjut sebagai anggota tim paruh waktu setelah magang selesai.",
    "Core board member leading human resource development for the organization.":
      "Pengurus inti yang memimpin pengembangan sumber daya manusia organisasi.",
    "Worked alongside the chairman to lead and coordinate every division.":
      "Bekerja bersama ketua untuk memimpin dan mengoordinasikan setiap divisi.",
    "Led the organization, setting direction and keeping operations running smoothly.":
      "Memimpin organisasi, menentukan arah, dan menjaga operasional berjalan lancar.",
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
