import pt from "@/messages/pt.json";
import en from "@/messages/en.json";

export type Locale = "pt" | "en";
export type Dictionary = typeof pt;

const dictionaries: Record<Locale, Dictionary> = { pt, en };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale] ?? dictionaries.pt;
}

export const locales: Locale[] = ["pt", "en"];
