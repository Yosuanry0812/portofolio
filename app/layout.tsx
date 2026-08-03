import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { profile } from "@/data/profile";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const jetbrains = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(profile.siteUrl),
  title: {
    default: `${profile.nama} — ${profile.peran}`,
    template: `%s — ${profile.nama}`,
  },
  description: profile.tagline,
  keywords: [
    "portofolio",
    "developer",
    profile.peran,
    "Next.js",
    "React",
    "TypeScript",
    profile.githubUsername,
  ],
  authors: [{ name: profile.nama }],
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: profile.siteUrl,
    siteName: profile.nama,
    title: `${profile.nama} — ${profile.peran}`,
    description: profile.tagline,
  },
  twitter: {
    card: "summary",
    title: `${profile.nama} — ${profile.peran}`,
    description: profile.tagline,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0B0F17",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.nama,
  jobTitle: profile.peran,
  url: profile.siteUrl,
  sameAs: profile.socials.map((s) => s.url),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" className="dark">
      <body className={`${inter.variable} ${jetbrains.variable} font-sans`}>
        <a
          href="#konten"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-xl focus:bg-emerald-500 focus:px-4 focus:py-2 focus:font-medium focus:text-slate-900"
        >
          Lewati ke konten utama
        </a>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
