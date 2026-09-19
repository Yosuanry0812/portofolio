"use client";

import { useEffect } from "react";
import { profile } from "@/data/profile";
import { useI18n } from "@/lib/i18n";

export default function EasterEgg() {
  const { t } = useI18n();
  useEffect(() => {
    console.log(
      `%c\n  ${profile.namaPanggilan} — ${t("profile.role")}\n  %c▸ ${profile.githubUsername}\n  %c${t("ee.thanks")}\n`,
      "color:#22d3ee; font-size:14px; font-weight:bold; font-family:monospace;",
      "color:#38bdf8; font-size:12px; font-family:monospace;",
      "color:#c084fc; font-size:11px; font-family:monospace;"
    );
  }, [t]);

  return null;
}
