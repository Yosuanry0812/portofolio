import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { profile } from "@/data/profile";
import { ThemeProvider } from "@/lib/theme";
import { I18nProvider } from "@/lib/i18n";
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
    "portfolio",
    "developer",
    profile.peran,
    "Next.js",
    "React",
    "TypeScript",
    profile.githubUsername,
  ],
  authors: [{ name: profile.nama }],
  icons: {
    icon: profile.foto,
    apple: profile.foto,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: profile.siteUrl,
    siteName: profile.nama,
    title: `${profile.nama} — ${profile.peran}`,
    description: profile.tagline,
    images: [{ url: profile.foto, width: 1200, height: 630, alt: profile.nama }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${profile.nama} — ${profile.peran}`,
    description: profile.tagline,
    images: [profile.foto],
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
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');var m=window.matchMedia('(prefers-color-scheme: light)').matches;var d=t?t==='dark':!m;document.documentElement.classList.toggle('dark',d);document.documentElement.style.colorScheme=d?'dark':'light';}catch(e){}})()`,
          }}
        />
      </head>
      <body className={`${inter.variable} ${jetbrains.variable} font-sans`}>
        <ThemeProvider>
          <I18nProvider>
            <a
              href="#main"
              className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-xl focus:bg-cyan-500 focus:px-4 focus:py-2 focus:font-medium focus:text-slate-900"
            >
              Skip to main content
            </a>
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            {children}
          </I18nProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
