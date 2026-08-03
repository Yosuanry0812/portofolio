"use client";

import { useEffect, useState } from "react";
import { GitHubCalendar } from "react-github-calendar";
import { animate, motion, useMotionValue, useReducedMotion } from "framer-motion";
import { FolderGit2, Star, UserPlus, Users } from "lucide-react";
import { profile } from "@/data/profile";
import SectionHeading from "./SectionHeading";

const theme = {
  light: ["#e2e8f0", "#a7f3d0", "#6ee7b7", "#34d399", "#10b981"],
  dark: ["#1f2937", "#064e3b", "#047857", "#059669", "#10b981"],
};

interface UserData {
  public_repos: number;
  followers: number;
  following: number;
}

interface RepoData {
  stargazers_count: number;
}

type Status = "loading" | "error" | "done";

function AnimatedNumber({ value }: { value: number }) {
  const mv = useMotionValue(0);
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const controls = animate(mv, value, {
      duration: 1.2,
      ease: "easeOut",
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [value, mv]);

  return <>{display.toLocaleString("id-ID")}</>;
}

export default function GithubSection() {
  const reduce = useReducedMotion();
  // Kalender fetch data di client — render hanya setelah mount agar tidak
  // bentrok dengan HTML server (hydration mismatch).
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const [status, setStatus] = useState<Status>("loading");
  const [data, setData] = useState<UserData>({ public_repos: 0, followers: 0, following: 0 });
  const [stars, setStars] = useState(0);

  const loadStats = async () => {
    setStatus("loading");
    try {
      const [userRes, reposRes] = await Promise.all([
        fetch(`https://api.github.com/users/${profile.githubUsername}`),
        fetch(`https://api.github.com/users/${profile.githubUsername}/repos?per_page=100`),
      ]);
      if (!userRes.ok || !reposRes.ok) throw new Error("Gagal memuat");
      const user: UserData = await userRes.json();
      const repos: RepoData[] = await reposRes.json();
      setData({
        public_repos: user.public_repos,
        followers: user.followers,
        following: user.following,
      });
      setStars(repos.reduce((sum, r) => sum + r.stargazers_count, 0));
      setStatus("done");
    } catch {
      setStatus("error");
    }
  };

  useEffect(() => {
    loadStats();
  }, []);

  const cards = [
    { judul: "Repositori Publik", ikon: FolderGit2, value: data.public_repos },
    { judul: "Pengikut", ikon: Users, value: data.followers },
    { judul: "Mengikuti", ikon: UserPlus, value: data.following },
    { judul: "Total Bintang", ikon: Star, value: stars },
  ];

  return (
    <section id="aktivitas" className="container-x scroll-mt-24 py-24">
      <SectionHeading
        label="aktivitas.tsx"
        judul="Aktivitas GitHub"
        deskripsi={`Jejak kontribusi ${profile.githubUsername} di dunia open source.`}
      />

      <motion.div
        initial={{ opacity: 0, y: reduce ? 0 : 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6 }}
        className="mb-8 overflow-x-auto rounded-2xl border border-slate-200 bg-white/60 p-6 dark:border-line dark:bg-surface/60"
      >
        {mounted ? (
          <GitHubCalendar
            username={profile.githubUsername}
            theme={theme}
            blockSize={11}
            blockMargin={3}
          />
        ) : (
          <div className="h-[120px] animate-pulse rounded-xl bg-slate-200/60 dark:bg-white/5" />
        )}
      </motion.div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((card, i) => (
          <motion.div
            key={card.judul}
            initial={{ opacity: 0, y: reduce ? 0 : 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className="rounded-2xl border border-slate-200 bg-white/60 p-5 transition-colors hover:border-emerald-500/40 dark:border-line dark:bg-surface/60 dark:hover:border-emerald-500/40"
          >
            <p className="mb-3 flex items-center gap-2 font-mono text-xs text-slate-500 dark:text-slate-400">
              <card.ikon size={14} className="text-emerald-400" />
              {card.judul}
            </p>
            {status === "loading" ? (
              <div className="h-8 w-20 animate-pulse rounded-lg bg-slate-200/60 dark:bg-white/5" />
            ) : (
              <p className="font-mono text-3xl font-bold text-slate-900 dark:text-white">
                <AnimatedNumber value={card.value} />
              </p>
            )}
          </motion.div>
        ))}
      </div>

      {status === "error" ? (
        <div className="mt-6 flex flex-col items-center gap-3 rounded-2xl border border-red-500/30 bg-red-500/5 p-6 text-center">
          <p className="font-mono text-sm text-red-400">
            Gagal memuat statistik GitHub. Periksa koneksi atau coba lagi.
          </p>
          <button
            type="button"
            onClick={loadStats}
            className="rounded-xl border border-red-500/40 px-4 py-2 font-mono text-sm text-red-400 transition-colors hover:bg-red-500/10"
          >
            Coba Lagi
          </button>
        </div>
      ) : null}
    </section>
  );
}
