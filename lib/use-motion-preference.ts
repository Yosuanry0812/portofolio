"use client";

import { useSyncExternalStore } from "react";

let query: MediaQueryList | undefined;
const preference = () =>
  (query ??= window.matchMedia("(prefers-reduced-motion: reduce)"));
const subscribe = (notify: () => void) => {
  const media = preference();
  media.addEventListener("change", notify);
  return () => media.removeEventListener("change", notify);
};
const readPreference = () => preference().matches;
const serverPreference = () => false;

// Hydration uses the server snapshot; the OS preference is applied immediately after.
export function useMotionPreference() {
  return useSyncExternalStore(subscribe, readPreference, serverPreference);
}
