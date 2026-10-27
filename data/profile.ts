import githubSnapshot from "./github-snapshot.json";

export const profile = {
  nama: "Yosuanry Simbolon",
  namaPanggilan: "Yosua",
  peran: "Full-Stack Developer",
  tagline:
    "Full-stack developer building web and mobile applications with React, Next.js, and Laravel.",
  githubUsername: "Yosuanry0812",

  // Email tetap pakai Drive (HR bisa copy/manual)
  email: "yosuanry66@gmail.com",

  // WhatsApp (format 628...)
  whatsapp: "6281268247843",

  // Alamat + target kerja
  location: "Bali, Indonesia",
  availability: "Full-time / Hybrid (Remote/Onsite)",
  workType: "Fullstack Developer (JavaScript/TypeScript ecosystem)",

  // CV static — letakkan file cv-yosuanry.pdf di folder public/
  // lalu panggil dari Navbar/footer: <a href="/cv-yosuanry.pdf" download>Download CV</a>
  cvUrl: "/cv-yosuanry.pdf",

  siteUrl: "https://portofolio-yosuanry-simbolon.vercel.app",

  // REPLACE: letak foto di /public/foto.jpg (opsional)
  foto: "/Yosua_foto.jpg",

  socials: [
    { nama: "GitHub", url: "https://github.com/Yosuanry0812" },
    {
      nama: "LinkedIn",
      url: "https://www.linkedin.com/in/yosuanry-simbolon-5540222a7/",
    },
    { nama: "WhatsApp", url: "https://wa.me/6281268247843" },
    { nama: "Email", url: "mailto:yosuanry66@gmail.com" },
  ],
};

export const about = {
  // REPLACE: write a short bio about yourself
  bio: "I'm Yosuanry Simbolon, a Full-Stack Developer based in Bali, Indonesia. I work on frontend, backend, and API integrations for web and mobile applications. Available for remote or onsite work.",
  info: [
    { label: "Lokasi", value: "Bali, Indonesia" },
    { label: "Status", value: "Open to Opportunities" },
    { label: "Languages", value: "Indonesian, English" },
    {
      label: "Work Type",
      value: "Fullstack Developer (JavaScript/TypeScript ecosystem)",
    },
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
    items: [
      "Node.js",
      "Laravel",
      "React Native",
      "Expo",
      "React.js",
      "Next.js",
      "Vue.js",
    ],
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
  image?: string;
  previewPage?: string;
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
    image: "/projects/finance-1ff6ea17.webp",
    previewPage: "Halaman masuk / Login",
  },
  {
    judul: "Site Plan Website",
    deskripsi: "Interactive web app for visualizing and planning land layouts.",
    tech: ["Next.js", "TypeScript", "Tailwind CSS"],
    kategori: "web",
    demo: "https://site-plan-website.vercel.app",
    repo: "https://github.com/Yosuanry0812/site-plan-website",
    image: "/projects/site-plan-387591d7.webp",
    previewPage: "Site plan interaktif",
  },
  {
    judul: "Pondok Daun Website",
    deskripsi:
      "Property website for Pondok Daun, with a housing catalog, unit details, and a mortgage information portal.",
    tech: ["Next.js", "TypeScript", "Tailwind CSS"],
    kategori: "web",
    demo: "https://pondok-daun-website.vercel.app",
    repo: "https://github.com/Yosuanry0812/pondok-daun-website",
    image: "/projects/pondok-daun-40d48499.webp",
    previewPage: "Katalog perumahan / Property catalog",
  },
  {
    judul: "Bangkiang Jaran Web",
    deskripsi:
      "Laravel powered site for Bangkiang Jaran with content management and a full admin panel.",
    tech: ["Laravel", "Blade", "PHP", "MySQL"],
    kategori: "web",
    demo: "",
    repo: "https://github.com/Yosuanry0812/bangkiang-jaran-web",
    image: "/projects/bangkiang-jaran-ee5998c2.webp",
    previewPage: "Beranda wisata / Tourism homepage",
  },
  {
    judul: "Batik Mobile",
    deskripsi:
      "iCareBatik mobile application for exploring batik motifs, their origins, and image-based motif identification.",
    tech: ["React Native", "Expo", "TypeScript"],
    kategori: "mobile",
    demo: "",
    repo: "https://github.com/Yosuanry0812/batik-mobile-js",
    image: "/projects/batik-mobile-5e4c5555.webp",
    previewPage: "iCareBatik / Mobile",
  },
  {
    judul: "Credit Agreement Progress",
    deskripsi:
      "End to end tracker for credit agreement applications status, documents, and progress at a glance.",
    tech: ["Next.js", "TypeScript", "Tailwind CSS"],
    kategori: "web",
    demo: "",
    repo: "https://github.com/Yosuanry0812/progress-akad-kredit-web",
    image: "/projects/credit-progress-5b8e5ccf.webp",
    previewPage: "Halaman masuk / Login",
  },
];

export const stats = [
  {
    label: "Public Repositories",
    value: String(githubSnapshot.repositories.length),
  },
  { label: "Projects", value: String(projects.length) },
  {
    label: "Primary Languages",
    value: String(
      new Set(
        githubSnapshot.repositories
          .map((repo) => repo.language)
          .filter(Boolean),
      ).size,
    ),
  },
  { label: "Contributions", value: String(githubSnapshot.totalContributions) },
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
    deskripsi:
      "Pursuing a degree while building technical and organizational skills along the way.",
  },
  {
    periode: "Feb 2026 — May 2026",
    posisi: "Intern",
    tempat: "NDS (New Directions Success) Guestlist",
    deskripsi:
      "4-month internship at NDS Guestlist, learning the ropes in a real professional environment.",
  },
  {
    periode: "May 2026 — Present",
    posisi: "Part-Time Staff",
    tempat: "NDS (New Direction Success) Guestlist",
    deskripsi:
      "Stayed on as a part-time team member after the internship wrapped up.",
  },
  {
    periode: "2023 — 2024",
    posisi: "Head of PSDM Division",
    tempat: "FPK-KEMAHKRIS",
    deskripsi:
      "Core board member leading human resource development for the organization.",
  },
  {
    periode: "2024 — 2025",
    posisi: "Vice Chairman",
    tempat: "FPK-KEMAHKRIS",
    deskripsi:
      "Worked alongside the chairman to lead and coordinate every division.",
  },
  {
    periode: "2025 — 2026",
    posisi: "Chairman",
    tempat: "FPK-KEMAHKRIS",
    deskripsi:
      "Led the organization, setting direction and keeping operations running smoothly.",
  },
];
