"use client";

import { useSyncExternalStore } from "react";

const storageKey = "portfolio-motion-v1";
const changeEvent = "portfolio-motion-change";
let fallbackPreference: boolean | undefined;

const readPreference = () => {
  if (fallbackPreference !== undefined) return fallbackPreference;
  try {
    return localStorage.getItem(storageKey) === "off";
  } catch {
    return document.documentElement.dataset.motion === "off";
  }
};

const subscribe = (notify: () => void) => {
  const update = () => {
    document.documentElement.dataset.motion = readPreference() ? "off" : "on";
    notify();
  };
  const syncStorage = (event: StorageEvent) => {
    if (event.key === storageKey || event.key === null) {
      fallbackPreference = undefined;
      update();
    }
  };
  window.addEventListener(changeEvent, update);
  window.addEventListener("storage", syncStorage);
  return () => {
    window.removeEventListener(changeEvent, update);
    window.removeEventListener("storage", syncStorage);
  };
};
const serverPreference = () => false;

export function setMotionEnabled(enabled: boolean) {
  const value = enabled ? "on" : "off";
  document.documentElement.dataset.motion = value;
  try {
    localStorage.setItem(storageKey, value);
    fallbackPreference = undefined;
  } catch {
    // The current tab still works when browser storage is unavailable.
    fallbackPreference = !enabled;
  }
  window.dispatchEvent(new Event(changeEvent));
}

// Default to motion; the site's explicit pause setting persists across visits.
// A stable server snapshot keeps hydration independent of browser preferences.
export function useMotionPreference() {
  return useSyncExternalStore(subscribe, readPreference, serverPreference);
}
