export interface GitHubRepository {
  name: string;
  url: string;
  language: string | null;
  homepage: string | null;
  description: string | null;
  fork: boolean;
  archived: boolean;
  updatedAt: string;
  branch: string;
}

export interface GitHubData {
  username: string;
  fetchedAt: string;
  repositories: GitHubRepository[];
  contributions: { date: string; count: number; level: number }[];
  totalContributions: number;
}

export function isGitHubData(value: unknown): value is GitHubData {
  if (!value || typeof value !== "object") return false;
  const data = value as GitHubData;
  return (
    data.username === "Yosuanry0812" &&
    typeof data.fetchedAt === "string" &&
    Number.isFinite(Date.parse(data.fetchedAt)) &&
    Array.isArray(data.repositories) &&
    data.repositories.every(
      (repo) =>
        repo !== null &&
        typeof repo === "object" &&
        typeof repo.name === "string" &&
        repo.url === `https://github.com/Yosuanry0812/${repo.name}`,
    ) &&
    Array.isArray(data.contributions) &&
    data.contributions.length > 0 &&
    data.contributions.every(
      (day) =>
        day !== null &&
        typeof day === "object" &&
        /^\d{4}-\d{2}-\d{2}$/.test(day.date) &&
        Number.isInteger(day.count) &&
        day.count >= 0 &&
        Number.isInteger(day.level) &&
        day.level >= 0 &&
        day.level <= 4,
    ) &&
    data.totalContributions ===
      data.contributions.reduce((sum, day) => sum + day.count, 0)
  );
}
