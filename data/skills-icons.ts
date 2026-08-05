import type { ComponentType, CSSProperties } from "react";
import {
  SiClaude,
  SiClickup,
  SiCloudflare,
  SiDeepseek,
  SiDocker,
  SiExpo,
  SiGithub,
  SiJavascript,
  SiKotlin,
  SiLaravel,
  SiMysql,
  SiNextdotjs,
  SiNodedotjs,
  SiOpenjdk,
  SiPhp,
  SiPostgresql,
  SiPython,
  SiReact,
  SiSupabase,
  SiTypescript,
  SiVercel,
  SiVuedotjs,
} from "react-icons/si";
import { Code2, Router, Terminal } from "lucide-react";

type TechIcon = ComponentType<{ size?: number | string; className?: string; style?: CSSProperties }>;

const brandIcons: Record<string, TechIcon> = {
  TypeScript: SiTypescript,
  JavaScript: SiJavascript,
  Python: SiPython,
  PHP: SiPhp,
  Kotlin: SiKotlin,
  Java: SiOpenjdk,
  "Node.js": SiNodedotjs,
  Laravel: SiLaravel,
  "React Native": SiReact,
  Expo: SiExpo,
  "React.js": SiReact,
  "Next.js": SiNextdotjs,
  "Vue.js": SiVuedotjs,
  PostgreSQL: SiPostgresql,
  MySQL: SiMysql,
  Supabase: SiSupabase,
  Docker: SiDocker,
  Cloudflare: SiCloudflare,
  Vercel: SiVercel,
  DeepSeek: SiDeepseek,
  "Claude Code": SiClaude,
  GitHub: SiGithub,
  ClickUp: SiClickup,
};

// Tech tanpa brand icon di react-icons — pakai ikon generik dari lucide
const fallbackIcons: Record<string, TechIcon> = {
  OpenCode: Terminal,
  "9Router": Router,
};

// Warna resmi brand (palette simple-icons). Logo hitam (#000000 / #181717)
// dikosongkan supaya ikut warna teks tema (terlihat di mode gelap).
const brandColors: Record<string, string> = {
  TypeScript: "#3178C6",
  JavaScript: "#F7DF1E",
  Python: "#3776AB",
  PHP: "#777BB4",
  Kotlin: "#7F52FF",
  Java: "#F89820",
  "Node.js": "#5FA04E",
  Laravel: "#FF2D20",
  "React Native": "#61DAFB",
  Expo: "#000000",
  "React.js": "#61DAFB",
  "Next.js": "#000000",
  "Vue.js": "#4FC08D",
  PostgreSQL: "#4169E1",
  MySQL: "#4479A1",
  Supabase: "#3FCF8E",
  Docker: "#2496ED",
  Cloudflare: "#F38020",
  Vercel: "#000000",
  DeepSeek: "#4D6BFE",
  "Claude Code": "#D97757",
  GitHub: "#181717",
  ClickUp: "#7B68EE",
};

export function getSkillIcon(tech: string): TechIcon {
  return brandIcons[tech] ?? fallbackIcons[tech] ?? Code2;
}

export function getSkillColor(tech: string): string | undefined {
  const color = brandColors[tech];
  return color && color !== "#000000" && color !== "#181717" ? color : undefined;
}
