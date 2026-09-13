"use client";

import { createContext, useContext, useSyncExternalStore } from "react";
import type { Theme } from "@/lib/types";

const STORAGE_KEY = "bathcraft.theme";

/* ── Module-level store, read via useSyncExternalStore ──
 * The inline `themeInitScript` (in layout.tsx) paints the correct theme onto
 * <html data-theme> before hydration, so there is no flash. This store keeps
 * React state in sync with that choice and localStorage. */

let current: Theme | null = null;
const listeners = new Set<() => void>();

function applyTheme(theme: Theme) {
  if (typeof document !== "undefined") {
    document.documentElement.setAttribute("data-theme", theme);
  }
}

function readInitial(): Theme {
  if (typeof window === "undefined") return "light";
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY) as Theme | null;
    if (saved === "light" || saved === "dark") return saved;
    if (window.matchMedia?.("(prefers-color-scheme: dark)").matches) return "dark";
  } catch {
    /* ignore */
  }
  return "light";
}

function getSnapshot(): Theme {
  if (current === null) current = readInitial();
  return current;
}

function getServerSnapshot(): Theme {
  return "light";
}

function subscribe(cb: () => void): () => void {
  listeners.add(cb);
  return () => listeners.delete(cb);
}

function setThemeValue(theme: Theme) {
  current = theme;
  applyTheme(theme);
  try {
    window.localStorage.setItem(STORAGE_KEY, theme);
  } catch {
    /* ignore */
  }
  listeners.forEach((cb) => cb());
}

interface ThemeContextValue {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (t: Theme) => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const value: ThemeContextValue = {
    theme,
    setTheme: setThemeValue,
    toggleTheme: () => setThemeValue(theme === "dark" ? "light" : "dark"),
  };
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}

/** Inline script (runs before hydration) to set data-theme and avoid a flash. */
export const themeInitScript = `(function(){try{var t=localStorage.getItem('${STORAGE_KEY}');if(t!=='light'&&t!=='dark'){t=matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';}document.documentElement.setAttribute('data-theme',t);}catch(e){document.documentElement.setAttribute('data-theme','light');}})();`;
