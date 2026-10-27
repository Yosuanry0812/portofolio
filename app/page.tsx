import CreativePortfolio from "@/components/CreativePortfolio";
import { GitHubProvider } from "@/lib/github-client";

export default function Home() {
  return (
    <GitHubProvider>
      <CreativePortfolio />
    </GitHubProvider>
  );
}
