"use client";

import { useEffect } from "react";
import { profile } from "@/data/profile";

export default function EasterEgg() {
  useEffect(() => {
    console.log(
      `%c\n  ${profile.namaPanggilan} — ${profile.peran}\n  %c▸ ${profile.githubUsername}\n  %cTerima kasih sudah menyelami source code-ku.\n  Kalau kamu baca ini, berarti kita vibe yang sama. 👋\n`,
      "color:#34d399; font-size:14px; font-weight:bold; font-family:monospace;",
      "color:#22d3ee; font-size:12px; font-family:monospace;",
      "color:#a78bfa; font-size:11px; font-family:monospace;"
    );
  }, []);

  return null;
}
