export const profile = {
  nama: "Yosuanry Simbolon",
  namaPanggilan: "Yosua",
  peran: "Full-Stack Developer",
  tagline: "Building modern web apps that are fast, beautiful, and scalable.",
  githubUsername: "Yosuanry0812",

  // REPLACE: your email address
  email: "yosuanry66@gmail.com",

  // WhatsApp (number without +62 — use 628... format)
  whatsapp: "6281268247843",

  // REPLACE: Formspree URL from https://formspree.io (already filled from your account)
  formspreeEndpoint: "https://formspree.io/f/xeeyyvly",

  // REPLACE: link to your CV file (e.g. /cv.pdf in the public folder)
  cvUrl: "#cv-not-available",

  // REPLACE: domain after deploying to Vercel
  siteUrl: "https://GANTI.vercel.app",

  // REPLACE: put your photo in /public/foto.jpg then fill "/foto.jpg" (leave empty for placeholder)
  foto: "/Yosua_foto.jpg",

  socials: [
    { nama: "GitHub", url: "https://github.com/Yosuanry0812" },
    { nama: "LinkedIn", url: "https://www.linkedin.com/in/yosuanry-simbolon-5540222a7/" },
    { nama: "WhatsApp", url: "https://wa.me/6281268247843" },
    { nama: "Email", url: "mailto:yosuanry66@gmail.com" },
  ],
};

// Words typed alternately in the Hero
export const typingRoles = [
  "Full-Stack Developer",
  "Frontend Engineer",
  "UI/UX Enthusiast",
  "Open Source Contributor",
];

// JSON data shown in the Hero terminal
export const terminalData = [
  { key: "name", value: "Yosuanry Simbolon", type: "string" },
  { key: "role", value: "Full-Stack Developer", type: "string" },
  { key: "location", value: "Indonesia", type: "string" },
  { key: "status", value: "open to opportunities", type: "string" },
  { key: "languages", value: "['TS', 'JS', 'PHP', 'Dart']", type: "array" },
  { key: "email", value: profile.email, type: "string" },
  { key: "availableForHire", value: "true", type: "boolean" },
];

export const about = {
  // REPLACE: write a short bio about yourself
  bio: "Hi, I'm Yosuanry Simbolon — a developer who loves turning ideas into digital products that are functional and enjoyable to use. Focused on sharp frontends, clean backends, and the small details that make experiences feel premium.",
  info: [
    { label: "Location", value: "Indonesia" },
    { label: "Status", value: "Open to Opportunities" },
    { label: "Languages", value: "Indonesian, English" },
    { label: "Interests", value: "Web, Mobile, UI/UX" },
  ],
  // REPLACE: initials for the avatar placeholder
  inisial: "YS",
};

export const skills = [
  {
    grup: "Languages",
    deskripsi: "Programming languages I work with",
    items: ["TypeScript", "JavaScript", "Python", "PHP", "Kotlin", "Java"],
  },
  {
    grup: "Backend & Frameworks",
    deskripsi: "Stack for building web & mobile apps",
    items: ["Node.js", "Laravel", "React Native", "Expo", "React.js", "Next.js", "Vue.js"],
  },
  {
    grup: "Database",
    deskripsi: "Data storage and management",
    items: ["PostgreSQL", "MySQL", "Supabase"],
  },
  {
    grup: "Cloud & DevOps",
    deskripsi: "Deployment, infrastructure, and automation",
    items: ["Docker", "Cloudflare", "Vercel"],
  },
  {
    grup: "AI & Automation",
    deskripsi: "AI tools for developer productivity",
    items: ["DeepSeek", "Claude Code", "OpenCode", "9Router", "GitHub", "ClickUp"],
  },
];

// Mastered stack — taken automatically from all skill categories.
// Move to /data/skills-icons.ts if you want to add icon/logo per tech.
export const techMarquee = skills.flatMap((s) => s.items);

export type ProjectCategory = "web" | "mobile";

export interface Project {
  judul: string;
  deskripsi: string;
  tech: string[];
  kategori: ProjectCategory;
  demo: string;
  repo: string;
}

// Original repos from GitHub (github.com/Yosuanry0812)
export const projects: Project[] = [
  {
    judul: "Pondok Daun Finance",
    deskripsi:
      "A finance tracking app for managing Pondok Daun's treasury. Manage income, expenses, and financial reports in an organized way.",
    tech: ["Next.js", "TypeScript", "Tailwind CSS"],
    kategori: "web",
    demo: "https://keuangan-pondok-daun.vercel.app",
    repo: "https://github.com/Yosuanry0812/Keuangan_Pondok_Daun",
  },
  {
    judul: "Site Plan Website",
    deskripsi:
      "A web-based site planning app for visualizing and managing land layout interactively.",
    tech: ["Next.js", "TypeScript", "Tailwind CSS"],
    kategori: "web",
    demo: "https://site-plan-website.vercel.app",
    repo: "https://github.com/Yosuanry0812/site-plan-website",
  },
  {
    judul: "Pondok Daun Website",
    deskripsi:
      "A Pondok Daun profile website showcasing activities, facilities, and contact info neatly and modernly.",
    tech: ["Next.js", "TypeScript", "Tailwind CSS"],
    kategori: "web",
    demo: "https://pondok-daun-website.vercel.app",
    repo: "https://github.com/Yosuanry0812/pondok-daun-website",
  },
  {
    judul: "Bangkiang Jaran Web",
    deskripsi:
      "A Laravel-based website for managing Bangkiang Jaran content and services with an admin panel.",
    tech: ["Laravel", "Blade", "PHP", "MySQL"],
    kategori: "web",
    demo: "",
    repo: "https://github.com/Yosuanry0812/bangkiang-jaran-web",
  },
  {
    judul: "Batik Mobile",
    deskripsi:
      "A mobile app introducing batik: product catalog, motif details, and cultural information.",
    tech: ["React Native", "JavaScript"],
    kategori: "mobile",
    demo: "",
    repo: "https://github.com/Yosuanry0812/batik-mobile-js",
  },
  {
    judul: "Credit Agreement Progress",
    deskripsi:
      "A tracker for credit agreement applications to monitor status and documents from start to finish.",
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

// REPLACE: fill with your work/organization history
export const experience: Experience[] = [
  {
    periode: "Oct 2023 — Present",
    posisi: "Student (Semester 7)",
    tempat: "INSTIKI",
    deskripsi: "Pursuing higher education while actively developing technical and organizational skills.",
  },
  {
    periode: "Feb 2026 — May 2026",
    posisi: "Internship (4 Months)",
    tempat: "NDS (New Directions Success) Guestlist",
    deskripsi: "Interned for 4 months at NDS Guestlist, learning directly in a professional work environment.",
  },
  {
    periode: "May 2026 — Present",
    posisi: "Part-Time Job",
    tempat: "NDS (New Direction Success) Guestlist",
    deskripsi: "Continued as a part-time worker at NDS Guestlist after the internship ended.",
  },
  {
    periode: "2023 — 2024",
    posisi: "Head of PSDM Division",
    tempat: "FPK-KEMAHKRIS",
    deskripsi: "Core board member managing human resource development within the organization.",
  },
  {
    periode: "2024 — 2025",
    posisi: "Vice Chairman",
    tempat: "FPK-KEMAHKRIS",
    deskripsi: "Assisted the chairman in leading and coordinating all organizational divisions.",
  },
  {
    periode: "2025 — 2026",
    posisi: "Chairman",
    tempat: "FPK-KEMAHKRIS",
    deskripsi: "Led FPK-KEMAHKRIS and was responsible for the direction and operations of the organization.",
  },
];
