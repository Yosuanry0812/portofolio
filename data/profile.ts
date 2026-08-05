export const profile = {
  nama: "Yosuanry Simbolon",
  namaPanggilan: "Yosua",
  peran: "Full-Stack Developer",
  tagline: "I build fast, beautiful, and scalable web apps.",
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

export const about = {
  // REPLACE: write a short bio about yourself
  bio: "Hi, I'm Yosuanry Simbolon a developer who loves turning ideas into digital products people genuinely enjoy using. I obsess over sharp frontends, clean backends, and the small details that make an experience feel premium.",
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
    deskripsi: "The programming languages I work with",
    items: ["TypeScript", "JavaScript", "Python", "PHP", "Kotlin", "Java"],
  },
  {
    grup: "Backend & Frameworks",
    deskripsi: "The stack I use to build web and mobile apps",
    items: ["Node.js", "Laravel", "React Native", "Expo", "React.js", "Next.js", "Vue.js"],
  },
  {
    grup: "Database",
    deskripsi: "Storing and managing data",
    items: ["PostgreSQL", "MySQL", "Supabase"],
  },
  {
    grup: "Cloud & DevOps",
    deskripsi: "Deployment, infrastructure, and automation",
    items: ["Docker", "Cloudflare", "Vercel"],
  },
  {
    grup: "AI & Automation",
    deskripsi: "AI tools that boost developer productivity",
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
      "Finance app for managing Pondok Daun's cash flow income, expenses, and reports in one organized place.",
    tech: ["Next.js", "TypeScript", "Tailwind CSS"],
    kategori: "web",
    demo: "https://keuangan-pondok-daun.vercel.app",
    repo: "https://github.com/Yosuanry0812/Keuangan_Pondok_Daun",
  },
  {
    judul: "Site Plan Website",
    deskripsi:
      "Interactive web app for visualizing and planning land layouts.",
    tech: ["Next.js", "TypeScript", "Tailwind CSS"],
    kategori: "web",
    demo: "https://site-plan-website.vercel.app",
    repo: "https://github.com/Yosuanry0812/site-plan-website",
  },
  {
    judul: "Pondok Daun Website",
    deskripsi:
      "Modern profile site for Pondok Daun, presenting activities, facilities, and contact info in a clean layout.",
    tech: ["Next.js", "TypeScript", "Tailwind CSS"],
    kategori: "web",
    demo: "https://pondok-daun-website.vercel.app",
    repo: "https://github.com/Yosuanry0812/pondok-daun-website",
  },
  {
    judul: "Bangkiang Jaran Web",
    deskripsi:
      "Laravel-powered site for Bangkiang Jaran with content management and a full admin panel.",
    tech: ["Laravel", "Blade", "PHP", "MySQL"],
    kategori: "web",
    demo: "",
    repo: "https://github.com/Yosuanry0812/bangkiang-jaran-web",
  },
  {
    judul: "Batik Mobile",
    deskripsi:
      "Mobile app that showcases Indonesian batik catalog, motif details, and cultural context.",
    tech: ["React Native", "JavaScript"],
    kategori: "mobile",
    demo: "",
    repo: "https://github.com/Yosuanry0812/batik-mobile-js",
  },
  {
    judul: "Credit Agreement Progress",
    deskripsi:
      "End-to-end tracker for credit agreement applications status, documents, and progress at a glance.",
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
    deskripsi: "Pursuing a degree while building technical and organizational skills along the way.",
  },
  {
    periode: "Feb 2026 — May 2026",
    posisi: "Intern",
    tempat: "NDS (New Directions Success) Guestlist",
    deskripsi: "4-month internship at NDS Guestlist, learning the ropes in a real professional environment.",
  },
  {
    periode: "May 2026 — Present",
    posisi: "Part-Time Staff",
    tempat: "NDS (New Direction Success) Guestlist",
    deskripsi: "Stayed on as a part-time team member after the internship wrapped up.",
  },
  {
    periode: "2023 — 2024",
    posisi: "Head of PSDM Division",
    tempat: "FPK-KEMAHKRIS",
    deskripsi: "Core board member leading human resource development for the organization.",
  },
  {
    periode: "2024 — 2025",
    posisi: "Vice Chairman",
    tempat: "FPK-KEMAHKRIS",
    deskripsi: "Worked alongside the chairman to lead and coordinate every division.",
  },
  {
    periode: "2025 — 2026",
    posisi: "Chairman",
    tempat: "FPK-KEMAHKRIS",
    deskripsi: "Led the organization, setting direction and keeping operations running smoothly.",
  },
];
