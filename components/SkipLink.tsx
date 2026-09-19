"use client";

import { useI18n } from "@/lib/i18n";

export default function SkipLink() {
  const { t } = useI18n();
  return (
    <a
      href="#main"
      className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-xl focus:bg-cyan-500 focus:px-4 focus:py-2 focus:font-medium focus:text-slate-900"
    >
      {t("common.skip")}
    </a>
  );
}
