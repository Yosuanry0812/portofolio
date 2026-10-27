import { unstable_cache } from "next/cache";
import { NextResponse } from "next/server";
import snapshot from "@/data/github-snapshot.json";
import { isGitHubData, type GitHubData } from "@/lib/github-types";

type RepositoryResponse = {
  name: string;
  html_url: string;
  language: string | null;
  homepage: string | null;
  description: string | null;
  fork: boolean;
  archived: boolean;
  pushed_at: string;
  default_branch: string;
};

const getGitHub = unstable_cache(
  async (): Promise<GitHubData> => {
    const get = async (url: string) => {
      const response = await fetch(url, {
        signal: AbortSignal.timeout(4500),
        headers: { Accept: "application/json" },
        cache: "no-store",
      });
      if (!response.ok) throw new Error(`GitHub HTTP ${response.status}`);
      return response.json();
    };
    try {
      const [repositories, calendar] = await Promise.all([
        get("https://api.github.com/users/Yosuanry0812/repos?per_page=100"),
        get(
          "https://github-contributions-api.jogruber.de/v4/Yosuanry0812?y=last",
        ),
      ]);
      if (
        !Array.isArray(repositories) ||
        !Array.isArray(calendar.contributions)
      )
        return snapshot;
      const data: GitHubData = {
        username: snapshot.username,
        fetchedAt: new Date().toISOString(),
        repositories: repositories.map((repo: RepositoryResponse) => ({
          name: repo.name,
          url: repo.html_url,
          language: repo.language,
          homepage: repo.homepage,
          description: repo.description,
          fork: repo.fork,
          archived: repo.archived,
          updatedAt: repo.pushed_at,
          branch: repo.default_branch,
        })),
        contributions: calendar.contributions,
        totalContributions: calendar.contributions.reduce(
          (sum: number, day: { count: number }) => sum + day.count,
          0,
        ),
      };
      return isGitHubData(data) ? data : snapshot;
    } catch {
      return snapshot;
    }
  },
  ["portfolio-github-v1"],
  { revalidate: 3600 },
);

export async function GET() {
  return NextResponse.json(await getGitHub(), {
    headers: {
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
