"use client";

import { useEffect } from "react";
import { profile } from "@/data/profile";

export default function EasterEgg() {
  useEffect(() => {
    console.log(
      `%c\n  ${profile.namaPanggilan} — ${profile.peran}\n  %c▸ ${profile.githubUsername}\n  %cTerima kasih sudah menyelami source code-ku.\n  Kalau kamu baca ini, berarti kita vibe yang sama. 👋\n`,
      "color:#f472b6; font-size:14px; font-weight:bold; font-family:monospace;",
      "color:#38bdf8; font-size:12px; font-family:monospace;",
      "color:#c084fc; font-size:11px; font-family:monospace;"
    );
  }, []);

  return null;
}
