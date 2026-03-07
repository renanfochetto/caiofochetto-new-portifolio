// app/[locale]/performance-case/[slug]/page.tsx
"use client";

import { notFound } from "next/navigation";
import { useState, useEffect } from "react";
import { useTheme } from "@/components/providers/theme-provider";
import { CaseTemplate } from "@/components/templates/case-template";
import { performanceCases } from "@/lib/data/performance-cases";
import { getCaseBySlug, getCircularNavigation } from "@/lib/helpers/case-helpers";

// ✅ IMPORT TYPES
import { CaseData, CaseNavigation } from '@/types';

type PageProps = { params: Promise<{ locale: string; slug: string }> };

export default function PerformanceCasePage({ params }: PageProps) {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [resolvedParams, setResolvedParams] = useState<{ locale: string; slug: string } | null>(null);

  useEffect(() => {
    setMounted(true);
    params.then(setResolvedParams);
  }, [params]);

  if (!mounted || !resolvedParams) return null;

  const { locale, slug } = resolvedParams;

  // ✅ TYPE-SAFE
  const caseData: CaseData | undefined = getCaseBySlug(performanceCases, slug);

  if (!caseData) notFound();

  // ✅ TYPE-SAFE
  const navigation: CaseNavigation = getCircularNavigation(performanceCases, slug);

  return (
    <CaseTemplate
      variant="performance"
      caseData={caseData}
      locale={locale}
      theme={theme}
      navigation={navigation}
    />
  );
}
