import pt from "@/messages/pt.json";
import en from "@/messages/en.json";
import es from "@/messages/es.json";

export type Locale = "pt" | "en" | "es";
export type Dictionary = typeof pt;

const dictionaries: Record<Locale, Dictionary> = { pt, en, es };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale] ?? dictionaries.pt;
}

export const locales: Locale[] = ["pt", "en", "es"];
