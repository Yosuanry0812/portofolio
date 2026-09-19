"use client";

import { useEffect, useRef, useState } from "react";
import { GitHubCalendar } from "react-github-calendar";
import type { ThemeInput } from "react-activity-calendar";
import { profile, stats } from "@/data/profile";
import { useI18n } from "@/lib/i18n";
import { useTheme } from "@/lib/theme";
import SectionHeading from "./SectionHeading";

const calendarTheme = {
  light: ["#e2e8f0", "#a5f3fc", "#67e8f9", "#22d3ee", "#0e7490"],
  dark: ["#1f2937", "#164e63", "#0e7490", "#06b6d4", "#22d3ee"],
} satisfies ThemeInput;

export default function GitHubActivity() {
  // ponytail: calendar fetches client-side + renders ~400 SVG nodes; load only when scrolled into view.
  const [visible, setVisible] = useState(false);
  const { t } = useI18n();
  const { theme: colorScheme } = useTheme();
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { rootMargin: "400px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section ref={ref} id="activity" className="container-x scroll-mt-24 py-24">
      <SectionHeading judul={t("activity.title")} deskripsi={t("activity.desc")} />

      <div className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {stats.map((s) => (
          <div
            key={s.label}
            className="rounded-2xl border border-slate-200 bg-white/60 px-4 py-5 text-center dark:border-line dark:bg-surface/60"
          >
            <p className="text-2xl font-bold text-gradient">{s.value}</p>
            <p className="mt-1 font-mono text-[11px] uppercase tracking-widest text-slate-500 dark:text-slate-400">
              {t(s.label)}
            </p>
          </div>
        ))}
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white/60 p-5 shadow-2xl shadow-cyan-500/5 sm:p-7 dark:border-line dark:bg-surface/60">
        <div className="min-h-40 overflow-x-auto pb-2">
          {visible ? (
            <GitHubCalendar
              username={profile.githubUsername}
              year="last"
              theme={calendarTheme}
              colorScheme={colorScheme}
              blockSize={12}
              blockMargin={4}
              fontSize={12}
              errorMessage={t("activity.error")}
              labels={{
                totalCount: t("activity.totalCount"),
                legend: { less: t("activity.legendLess"), more: t("activity.legendMore") },
              }}
            />
          ) : (
            <div
              aria-hidden
              className="h-40 animate-pulse rounded-xl bg-slate-200/60 dark:bg-white/5"
            />
          )}
        </div>
        <p className="mt-4 text-center font-mono text-xs text-slate-500 dark:text-slate-400">
          github.com/{profile.githubUsername} — {t("activity.last")}
        </p>
      </div>
    </section>
  );
}
