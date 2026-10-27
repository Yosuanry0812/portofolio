"use client";

import { ActivityCalendar, type ThemeInput } from "react-activity-calendar";
import { ArrowUpRight } from "lucide-react";
import { profile } from "@/data/profile";
import { useI18n } from "@/lib/i18n";
import { useTheme } from "@/lib/theme";
import { useGitHub } from "@/lib/github-client";

const calendarTheme = {
  light: ["#dfe4d6", "#b5cb96", "#8dad63", "#668841", "#3b5c25"],
  dark: ["#272f22", "#41562d", "#64883e", "#8fba5a", "#c2ef82"],
} satisfies ThemeInput;

export default function GitHubActivity() {
  const { t, lang } = useI18n();
  const { theme } = useTheme();
  const data = useGitHub();
  const id = lang === "id";
  return (
    <section id="activity" className="github-section">
      <div className="activity-heading">
        <div>
          <p className="eyebrow">GITHUB / {profile.githubUsername}</p>
          <h2>{t("activity.title")}</h2>
        </div>
        <a
          className="text-button"
          href={`https://github.com/${profile.githubUsername}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          {id ? "Buka profil" : "View profile"}
          <ArrowUpRight size={16} />
        </a>
      </div>
      <div className="github-calendar-panel">
        <div className="github-calendar-scroll">
          <ActivityCalendar
            data={data.contributions}
            theme={calendarTheme}
            colorScheme={theme}
            blockSize={13}
            blockMargin={4}
            blockRadius={3}
            fontSize={12}
            maxLevel={4}
            labels={{
              totalCount: t("activity.totalCount"),
              legend: {
                less: t("activity.legendLess"),
                more: t("activity.legendMore"),
              },
              months: id
                ? [
                    "Jan",
                    "Feb",
                    "Mar",
                    "Apr",
                    "Mei",
                    "Jun",
                    "Jul",
                    "Agu",
                    "Sep",
                    "Okt",
                    "Nov",
                    "Des",
                  ]
                : undefined,
            }}
          />
        </div>
        <div className="github-calendar-footer">
          <span>
            {id
              ? "Kontribusi 12 bulan terakhir"
              : "Contributions in the last 12 months"}
          </span>
          <span>
            {id ? "Diperbarui" : "Updated"}{" "}
            {new Date(data.fetchedAt).toLocaleDateString(
              id ? "id-ID" : "en-GB",
              {
                day: "numeric",
                month: "short",
                year: "numeric",
                timeZone: "Asia/Makassar",
              },
            )}
          </span>
        </div>
      </div>
    </section>
  );
}
