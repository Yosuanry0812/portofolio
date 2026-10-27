"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import snapshot from "@/data/github-snapshot.json";
import { isGitHubData, type GitHubData } from "./github-types";

const GitHubContext = createContext<GitHubData>(snapshot);
const cacheKey = "portfolio-github-v1";
const maxAge = 24 * 60 * 60 * 1000;

export function GitHubProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<GitHubData>(snapshot);
  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem(cacheKey) || "null");
      if (
        isGitHubData(stored) &&
        Date.now() - Date.parse(stored.fetchedAt) < maxAge &&
        Date.parse(stored.fetchedAt) > Date.parse(snapshot.fetchedAt)
      )
        setData(stored);
    } catch {
      /* The bundled snapshot is already available. */
    }
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 6500);
    fetch("/api/github", { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error("GitHub update unavailable");
        return response.json();
      })
      .then((value) => {
        if (!isGitHubData(value) || controller.signal.aborted) return;
        setData(value);
        try {
          localStorage.setItem(cacheKey, JSON.stringify(value));
        } catch {
          /* Storage may be disabled. */
        }
      })
      .catch(() => {
        /* Keep the last verified data when offline. */
      })
      .finally(() => clearTimeout(timeout));
    return () => {
      controller.abort();
      clearTimeout(timeout);
    };
  }, []);
  return (
    <GitHubContext.Provider value={data}>{children}</GitHubContext.Provider>
  );
}

export const useGitHub = () => useContext(GitHubContext);
