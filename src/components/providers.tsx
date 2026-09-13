"use client";

import type { ReactNode } from "react";
import { ThemeProvider } from "@/lib/theme/provider";
import { I18nProvider } from "@/lib/i18n/provider";

/** App-wide client providers (theme + i18n). */
export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <I18nProvider>{children}</I18nProvider>
    </ThemeProvider>
  );
}
