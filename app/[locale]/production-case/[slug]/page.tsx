// /app/[locale]/production-case/[slug]/page.tsx
"use client";

import { notFound } from "next/navigation";
import { useState, useEffect } from "react";
import { useTheme } from "@/components/providers/theme-provider";
import { CaseTemplate } from "@/components/templates/case-template";
// ✅ APENAS DADOS
import { productionCases } from "@/lib/data/production-cases";
// ✅ APENAS HELPERS GENÉRICOS
import { getCaseBySlug, getCircularNavigation } from "@/lib/helpers/case-helpers";

type PageProps = { params: Promise<{ locale: string; slug: string }> };

export default function ProductionCasePage({ params }: PageProps) {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [resolvedParams, setResolvedParams] = useState<{ locale: string; slug: string } | null>(null);

  useEffect(() => {
    setMounted(true);
    params.then(setResolvedParams);
  }, [params]);

  if (!mounted || !resolvedParams) return null;

  const { locale, slug } = resolvedParams;

  // ✅ USA HELPER GENÉRICO + DADOS
  const caseData = getCaseBySlug(productionCases, slug);

  if (!caseData) notFound();

  // ✅ USA HELPER GENÉRICO + DADOS
  const navigation = getCircularNavigation(productionCases, slug);

  return (
    <CaseTemplate
      variant="production"
      caseData={caseData}
      locale={locale}
      theme={theme}
      navigation={navigation}
    />
  );
}
