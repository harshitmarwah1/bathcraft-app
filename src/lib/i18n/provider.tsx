"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import type { Language } from "@/lib/types";
import { dictionaries, type Dictionary } from "./dictionaries";

const STORAGE_KEY = "bathcraft.lang";

interface I18nContextValue {
  lang: Language;
  t: Dictionary;
  toggleLanguage: () => void;
  setLanguage: (l: Language) => void;
}

const I18nContext = createContext<I18nContextValue | null>(null);

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Language>("en");

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY) as Language | null;
      if (saved === "en" || saved === "hi") setLangState(saved);
    } catch {
      /* ignore */
    }
  }, []);

  const setLanguage = useCallback((l: Language) => {
    setLangState(l);
    try {
      window.localStorage.setItem(STORAGE_KEY, l);
    } catch {
      /* ignore */
    }
  }, []);

  const toggleLanguage = useCallback(() => {
    setLanguage(lang === "en" ? "hi" : "en");
  }, [lang, setLanguage]);

  return (
    <I18nContext.Provider
      value={{ lang, t: dictionaries[lang], toggleLanguage, setLanguage }}
    >
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n(): I18nContextValue {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}
