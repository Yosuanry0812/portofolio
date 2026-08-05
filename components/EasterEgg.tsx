"use client";

import { useEffect } from "react";
import { profile } from "@/data/profile";

export default function EasterEgg() {
  useEffect(() => {
    console.log(
      `%c\n  ${profile.namaPanggilan} — ${profile.peran}\n  %c▸ ${profile.githubUsername}\n  %cThanks for diving into my source code.\n  If you're reading this, we vibe the same. 👋\n`,
      "color:#22d3ee; font-size:14px; font-weight:bold; font-family:monospace;",
      "color:#38bdf8; font-size:12px; font-family:monospace;",
      "color:#c084fc; font-size:11px; font-family:monospace;"
    );
  }, []);

  return null;
}
