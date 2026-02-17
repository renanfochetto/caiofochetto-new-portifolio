import type { CaseData } from "@/types/case";
import casesData from "@/data/cases.json";

/**
 * Retorna todos os cases
 */
export function getAllCases(): CaseData[] {
  return casesData.cases as CaseData[];
}

/**
 * Retorna um case específico pelo slug
 */
export function getCaseBySlug(slug: string): CaseData | undefined {
  return casesData.cases.find((caseItem) => caseItem.slug === slug) as
    | CaseData
    | undefined;
}

/**
 * Retorna todos os slugs dos cases (útil para geração estática)
 */
export function getAllCaseSlugs(): string[] {
  return casesData.cases.map((caseItem) => caseItem.slug);
}

/**
 * Retorna um case com validação de campos obrigatórios
 */
export function getCaseValidated(slug: string): CaseData | null {
  const caseItem = getCaseBySlug(slug);

  if (!caseItem) {
    console.error(`Case com slug "${slug}" não encontrado`);
    return null;
  }

  // Validar campos obrigatórios
  const requiredFields = [
    "title_pt",
    "title_en",
    "challenge_pt",
    "challenge_en",
    "solution_pt",
    "solution_en",
    "metrics",
    "key_learnings_pt",
    "key_learnings_en",
  ];

  const missingFields = requiredFields.filter(
    (field) =>
      !caseItem[field as keyof CaseData] ||
      (Array.isArray(caseItem[field as keyof CaseData]) &&
        (caseItem[field as keyof CaseData] as unknown[]).length === 0)
  );

  if (missingFields.length > 0) {
    console.warn(
      `Case "${slug}" tem campos vazios:`,
      missingFields.join(", ")
    );
  }

  return caseItem;
}

/**
 * Retorna metadados para SEO de um case
 */
export function getCaseSEO(caseItem: CaseData, locale: "pt" | "en") {
  const isBrand = Array.isArray(caseItem.brand)
    ? caseItem.brand.join(" & ")
    : caseItem.brand;

  return {
    title:
      locale === "pt" ? caseItem.meta_title_pt : caseItem.meta_title_en,
    description:
      locale === "pt"
        ? caseItem.meta_description_pt
        : caseItem.meta_description_en,
    og_image: caseItem.og_image,
    brand: isBrand,
    year: caseItem.year_display,
  };
}
