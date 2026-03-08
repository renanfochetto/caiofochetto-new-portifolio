// components/sections/work-section.tsx
"use client";

import { useState } from "react";
import { useI18n } from "@/components/providers/i18n-provider";
import { PerformanceCard } from "../cards/performance-card";
import { ProductionCard } from "../cards/production-card";
import { WorkToggle } from "../ui/work-toggle";
import { AnimatedSection, AnimatedItem } from "../ui/animated-section";
import { Award } from "@/lib/icons";
import { performanceCases } from "@/lib/data/performance-cases";
import { productionCases } from "@/lib/data/production-cases";
import { brandLogos } from "@/lib/helpers/case-helpers";
import { CaseData, ProductionCase } from '@/types';

// Seção de portfólio (Trabalhos/Cases)
export function WorkSection() {
  const { t } = useI18n();

  // Estado do toggle (default: performance)
  const [view, setView] = useState<"performance" | "production">("performance");

  // Função para reordenar itens para layout de colunas (masonry style)
  const reorderForColumns = <T,>(items: T[]) => {
    if (items.length <= 2) return items;

    const col1: T[] = [];
    const col2: T[] = [];

    items.forEach((item, idx) => {
      if (idx % 2 === 0) col1.push(item);
      else col2.push(item);
    });

    return [...col1, ...col2];
  };

  // Arrays tipados para exibição
  const displayPerformance: CaseData[] = reorderForColumns(performanceCases);
  const displayProduction: ProductionCase[] = reorderForColumns(productionCases);

  return (
    <section id="work" className="px-6 py-24 lg:px-8">
      <AnimatedSection className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2">
            <Award className="h-4 w-4 text-primary" aria-hidden="true" />
            <p className="text-xs font-medium uppercase tracking-widest text-primary">
              {t.work.sectionLabel}
            </p>
          </div>
          <h2 className="mt-2 text-3xl font-bold text-foreground md:text-4xl">
            {t.work.heading}
          </h2>
          <p className="mt-4 text-base text-muted-foreground md:text-lg max-w-xl md:max-w-2xl">
            {t.work.subheading}
          </p>
        </div>

        {/* Toggle - Centralizado */}
        <WorkToggle value={view} onChange={setView} />

        {/* Cases Grid - Muda baseado no view */}
        <div className="mt-12 columns-1 gap-6 md:columns-2 md:gap-8">
          {view === "performance" ? (
            <>
              {displayPerformance.map((caseData, idx) => {
                // Pegar logo do primeiro brand
                const brandArray = Array.isArray(caseData.brand)
                  ? caseData.brand
                  : [caseData.brand];
                const brandLogo = brandLogos[brandArray[0]] || undefined;

                return (
                  <div
                    key={caseData.slug}
                    className="mb-6 break-inside-avoid md:mb-8"
                  >
                    <AnimatedItem index={idx}>
                      <PerformanceCard
                        caseData={caseData}
                        brandLogo={brandLogo}
                      />
                    </AnimatedItem>
                  </div>
                );
              })}
            </>
          ) : (
            <>
              {displayProduction.map((caseData, idx) => {
                // Pegar logo da marca
                const brandLogo = brandLogos[caseData.brand] || undefined;

                return (
                  <div
                    key={caseData.slug}
                    className="mb-6 break-inside-avoid md:mb-8"
                  >
                    <AnimatedItem index={idx}>
                      <ProductionCard
                        caseData={caseData}
                        brandLogo={brandLogo}
                      />
                    </AnimatedItem>
                  </div>
                );
              })}
            </>
          )}
        </div>
      </AnimatedSection>
    </section>
  );
}
