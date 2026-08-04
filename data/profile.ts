export const profile = {
  nama: "Yosuanry Simbolon",
  namaPanggilan: "Yosua",
  peran: "Full-Stack Developer",
  tagline: "Membangun aplikasi web modern yang cepat, indah, dan terukur.",
  githubUsername: "Yosuanry0812",

  // GANTI: alamat email kamu
  email: "yosuanry66@gmail.com",

  // WhatsApp (nomor tanpa +62 — pakai format 628...)
  whatsapp: "6281268247843",

  // GANTI: URL Formspree dari https://formspree.io (sudah terisi dari akunmu)
  formspreeEndpoint: "https://formspree.io/f/xeeyyvly",

  // GANTI: ganti dengan tautan file CV kamu (mis. /cv.pdf di folder public)
  cvUrl: "#cv-belum-ada",

  // GANTI: domain setelah deploy ke Vercel
  siteUrl: "https://GANTI.vercel.app",

  // GANTI: taruh foto kamu di /public/foto.jpg lalu isi "/foto.jpg" (kosongkan untuk placeholder)
  foto: "/Yosua_foto.jpg",

  socials: [
    { nama: "GitHub", url: "https://github.com/Yosuanry0812" },
    { nama: "LinkedIn", url: "https://www.linkedin.com/in/yosuanry-simbolon-5540222a7/" },
    { nama: "WhatsApp", url: "https://wa.me/6281268247843" },
    { nama: "Email", url: "mailto:yosuanry66@gmail.com" },
  ],
};

// Kalimat yang diketik bergantian di Hero
export const typingRoles = [
  "Full-Stack Developer",
  "Frontend Engineer",
  "UI/UX Enthusiast",
  "Open Source Contributor",
];

// Data JSON yang tampil di terminal Hero
export const terminalData = [
  { key: "nama", value: "Yosuanry Simbolon", type: "string" },
  { key: "peran", value: "Full-Stack Developer", type: "string" },
  { key: "lokasi", value: "Indonesia", type: "string" },
  { key: "status", value: "open to opportunities", type: "string" },
  { key: "bahasa", value: "['TS', 'JS', 'PHP', 'Dart']", type: "array" },
  { key: "email", value: profile.email, type: "string" },
  { key: "availableForHire", value: "true", type: "boolean" },
];

export const about = {
  // GANTI: tulis bio singkat tentang kamu
  bio: "Halo, saya Yosuanry Simbolon — developer yang senang mengubah ide menjadi produk digital yang fungsional dan enak dipakai. Fokus pada frontend yang tajam, backend yang bersih, dan detail kecil yang bikin pengalaman terasa premium.",
  info: [
    { label: "Lokasi", value: "Indonesia" },
    { label: "Status", value: "Open to Opportunities" },
    { label: "Bahasa", value: "Indonesia, English" },
    { label: "Minat", value: "Web, Mobile, UI/UX" },
  ],
  // GANTI: inisial untuk avatar placeholder
  inisial: "YS",
};

export const skills = [
  {
    grup: "Bahasa",
    deskripsi: "Bahasa pemrograman yang saya kuasai",
    items: ["TypeScript", "JavaScript", "Python", "PHP", "Kotlin", "Java"],
  },
  {
    grup: "Backend & Frameworks",
    deskripsi: "Stack untuk membangun aplikasi web & mobile",
    items: ["Node.js", "Laravel", "React Native", "Expo", "React.js", "Next.js", "Vue.js"],
  },
  {
    grup: "Database",
    deskripsi: "Penyimpanan dan pengelolaan data",
    items: ["PostgreSQL", "MySQL", "Supabase"],
  },
  {
    grup: "Cloud & DevOps",
    deskripsi: "Deployment, infrastruktur, dan otomasi",
    items: ["Docker", "Cloudflare", "Vercel"],
  },
  {
    grup: "AI & Automation",
    deskripsi: "Alat bantu AI untuk produktivitas developer",
    items: ["DeepSeek", "Claude Code", "OpenCode", "9Router", "GitHub", "ClickUp"],
  },
];

export const techMarquee = [
  "TypeScript",
  "React",
  "Next.js",
  "Tailwind CSS",
  "Node.js",
  "Express",
  "Flutter",
  "Dart",
  "MySQL",
  "Prisma",
  "Git",
  "Docker",
  "Figma",
  "Vercel",
];

export type ProjectCategory = "web" | "mobile";

export interface Project {
  judul: string;
  deskripsi: string;
  tech: string[];
  kategori: ProjectCategory;
  demo: string;
  repo: string;
}

// Repo asli dari GitHub (github.com/Yosuanry0812)
export const projects: Project[] = [
  {
    judul: "Keuangan Pondok Daun",
    deskripsi:
      "Aplikasi pencatatan keuangan untuk pengelolaan kas Pondok Daun. Kelola pemasukan, pengeluaran, dan laporan keuangan secara terstruktur.",
    tech: ["Next.js", "TypeScript", "Tailwind CSS"],
    kategori: "web",
    demo: "https://keuangan-pondok-daun.vercel.app",
    repo: "https://github.com/Yosuanry0812/Keuangan_Pondok_Daun",
  },
  {
    judul: "Site Plan Website",
    deskripsi:
      "Aplikasi perencanaan site plan berbasis web untuk memvisualisasikan dan mengelola tata letak lahan secara interaktif.",
    tech: ["Next.js", "TypeScript", "Tailwind CSS"],
    kategori: "web",
    demo: "https://site-plan-website.vercel.app",
    repo: "https://github.com/Yosuanry0812/site-plan-website",
  },
  {
    judul: "Pondok Daun Website",
    deskripsi:
      "Website profil Pondok Daun yang menampilkan informasi kegiatan, fasilitas, dan kontak secara rapi dan modern.",
    tech: ["Next.js", "TypeScript", "Tailwind CSS"],
    kategori: "web",
    demo: "https://pondok-daun-website.vercel.app",
    repo: "https://github.com/Yosuanry0812/pondok-daun-website",
  },
  {
    judul: "Bangkiang Jaran Web",
    deskripsi:
      "Website berbasis Laravel untuk pengelolaan konten dan layanan Bangkiang Jaran dengan panel admin.",
    tech: ["Laravel", "Blade", "PHP", "MySQL"],
    kategori: "web",
    demo: "",
    repo: "https://github.com/Yosuanry0812/bangkiang-jaran-web",
  },
  {
    judul: "Batik Mobile",
    deskripsi:
      "Aplikasi mobile untuk memperkenalkan batik: katalog produk, detail motif, dan informasi budaya.",
    tech: ["React Native", "JavaScript"],
    kategori: "mobile",
    demo: "",
    repo: "https://github.com/Yosuanry0812/batik-mobile-js",
  },
  {
    judul: "Progress Akad Kredit",
    deskripsi:
      "Aplikasi pelacak progres pengajuan akad kredit untuk memantau status dan dokumen dari awal hingga selesai.",
    tech: ["Next.js", "TypeScript", "Tailwind CSS"],
    kategori: "web",
    demo: "",
    repo: "https://github.com/Yosuanry0812/progress-akad-kredit-web",
  },
];

export interface Experience {
  periode: string;
  posisi: string;
  tempat: string;
  deskripsi: string;
}

// GANTI: isi dengan riwayat kerja/organisasi kamu
export const experience: Experience[] = [
  {
    periode: "Okt 2023 — Sekarang",
    posisi: "Mahasiswa (Semester 7)",
    tempat: "INSTIKI",
    deskripsi: "Menempuh pendidikan tinggi sambil aktif mengembangkan skill teknis dan organisasi.",
  },
  {
    periode: "Feb 2026 — Mei 2026",
    posisi: "Magang (4 Bulan)",
    tempat: "NDS (New Directions Success) Guestlist",
    deskripsi: "Magang selama 4 bulan di NDS Guestlist, belajar langsung di lingkungan kerja profesional.",
  },
  {
    periode: "Mei 2026 — Sekarang",
    posisi: "Kerja Paruh Waktu",
    tempat: "NDS (New Direction Success) Guestlist",
    deskripsi: "Lanjut sebagai pekerja paruh waktu di NDS Guestlist setelah masa magang selesai.",
  },
  {
    periode: "2023 — 2024",
    posisi: "Kepala Bidang PSDM",
    tempat: "FPK-KEMAHKRIS",
    deskripsi: "Pengurus inti yang mengelola pengembangan sumber daya manusia di organisasi.",
  },
  {
    periode: "2024 — 2025",
    posisi: "Wakil Ketua Umum",
    tempat: "FPK-KEMAHKRIS",
    deskripsi: "Mendampingi ketua umum dalam memimpin dan mengkoordinasikan seluruh bidang organisasi.",
  },
  {
    periode: "2025 — 2026",
    posisi: "Ketua Umum",
    tempat: "FPK-KEMAHKRIS",
    deskripsi: "Memimpin FPK-KEMAHKRIS dan bertanggung jawab atas arah serta jalannya organisasi.",
  },
];
