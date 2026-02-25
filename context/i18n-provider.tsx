"use client";

import { createContext, useContext } from "react";
import { getDictionary } from "@/lib/i18n/dictionaries";
import type { Locale, Dictionary } from "@/lib/i18n/dictionaries";

export type { Locale, Dictionary };
export { getDictionary };

const I18nContext = createContext<{ locale: Locale; t: Dictionary }>({
  locale: "pt",
  t: getDictionary("pt"),
});

export function I18nProvider({
  locale,
  children,
}: {
  locale: Locale;
  children: React.ReactNode;
}) {
  const t = getDictionary(locale);
  return (
    <I18nContext.Provider value={{ locale, t }}>{children}</I18nContext.Provider>
  );
}

export function useI18n() {
  return useContext(I18nContext);
}
