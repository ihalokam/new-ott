"use client";

import { useSyncExternalStore } from "react";

type ThemeName = "white" | "dark";

const storageKey = "latest-ott-theme";

function getThemeSnapshot(): ThemeName {
  if (typeof document === "undefined") {
    return "white";
  }

  return document.documentElement.dataset.theme === "dark" ? "dark" : "white";
}

function getServerThemeSnapshot(): ThemeName {
  return "white";
}

function subscribe(callback: () => void) {
  if (typeof window === "undefined") {
    return () => {};
  }

  const onThemeChange = () => callback();
  window.addEventListener("storage", onThemeChange);
  window.addEventListener("themechange", onThemeChange);

  return () => {
    window.removeEventListener("storage", onThemeChange);
    window.removeEventListener("themechange", onThemeChange);
  };
}

function applyTheme(theme: ThemeName) {
  document.documentElement.dataset.theme = theme;
  window.localStorage.setItem(storageKey, theme);
  window.dispatchEvent(new Event("themechange"));
}

export function ThemeToggle() {
  const theme = useSyncExternalStore(
    subscribe,
    getThemeSnapshot,
    getServerThemeSnapshot
  );
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={() => applyTheme(isDark ? "white" : "dark")}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      aria-pressed={isDark}
      className="ios-toggle relative inline-flex h-12 w-24 items-center rounded-full p-1 transition duration-300"
    >
      <span className="pointer-events-none absolute left-3 text-[1.05rem] opacity-90">
        ☀
      </span>
      <span className="pointer-events-none absolute right-3 text-[1rem] opacity-90">
        ☾
      </span>
      <span
        className={`ios-toggle-thumb relative z-10 flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold transition duration-300 ${
          isDark ? "translate-x-12" : "translate-x-0"
        }`}
      >
        {isDark ? "☾" : "☀"}
      </span>
    </button>
  );
}
