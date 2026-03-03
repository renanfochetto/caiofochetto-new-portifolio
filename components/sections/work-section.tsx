"use client";

import {useState} from "react";
import {useI18n} from "@/components/providers/i18n-provider";
import {PerformanceCard} from "../cards/performance-card";
import {ProductionCard} from "../cards/production-card";
import {WorkToggle} from "../ui/work-toggle";
import {AnimatedSection, AnimatedItem} from "../ui/animated-section";
import {Award} from "lucide-react";
import {performanceCases} from "@/lib/data/performance-cases";
import {productionCases} from "@/lib/data/production-cases";
import {brandLogos} from "@/lib/helpers/case-helpers";

export function WorkSection() {
  const {t} = useI18n();

  // Estado do toggle (default: performance)
  const [view, setView] = useState<"performance" | "production">("performance");

  // ✅ Função para reordenar itens para layout de colunas
  // Garante ordem visual horizontal em 2 colunas (1, 2, 3, 4 -> 1, 3, 2, 4)
  const reorderForColumns = <T, >(items: T[]) => {
    if (items.length <= 2) return items;

    const col1: T[] = [];
    const col2: T[] = [];

    items.forEach((item, idx) => {
      if (idx % 2 === 0) col1.push(item);
      else col2.push(item);
    });

    return [...col1, ...col2];
  };

  const displayPerformance = reorderForColumns(performanceCases);
  const displayProduction = reorderForColumns(productionCases);

  return (
    <section id="work" className="px-6 py-24 lg:px-8">
      <AnimatedSection className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2">
            <Award className="h-4 w-4 text-primary"/>
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
        <WorkToggle value={view} onChange={setView}/>

        {/* Cases Grid - Muda baseado no view */}
        <div className="mt-12 columns-1 gap-6 md:columns-2 md:gap-8">
          {view === "performance" ? (
            // ✅ PERFORMANCE CASES
            <>
              {displayPerformance.map((study, idx) => {
                // Extrair brand (pode ser string ou array)
                const brandArray = Array.isArray(study.brand)
                  ? study.brand
                  : [study.brand];
                const brandDisplay = brandArray.join(', ');

                // Pegar logo do primeiro brand
                const brandLogo = brandLogos[brandArray[0]] || undefined;

                return (
                  <div
                    key={study.slug}
                    className="mb-6 break-inside-avoid md:mb-8"
                  >
                    <AnimatedItem index={idx}>
                      <PerformanceCard
                        slug={study.slug}
                        brand={brandDisplay}
                        brandLogo={brandLogo}
                        title_pt={study.title_pt}
                        title_en={study.title_en}
                        title_es={study.title_es}
                        metrics={study.metrics}
                        tags_pt={study.tags_pt}
                        tags_en={study.tags_en}
                        tags_es={study.tags_es}
                      />
                    </AnimatedItem>
                  </div>
                );
              })}
            </>
          ) : (
            // ✅ PRODUCTION CASES
            <>
              {displayProduction.map((prodCase, idx) => {
                // Pegar logo da marca
                const brandLogo = brandLogos[prodCase.brand] || undefined;

                return (
                  <div
                    key={prodCase.slug}
                    className="mb-6 break-inside-avoid md:mb-8"
                  >
                    <AnimatedItem index={idx}>
                      <ProductionCard
                        slug={prodCase.slug}
                        brand={prodCase.brand}
                        brandLogo={brandLogo}
                        title_pt={prodCase.title_pt}
                        title_en={prodCase.title_en}
                        title_es={prodCase.title_es}
                        description_pt={prodCase.description_pt}
                        description_en={prodCase.description_en}
                        description_es={prodCase.description_es}
                        tags_pt={prodCase.tags_pt}
                        tags_en={prodCase.tags_en}
                        tags_es={prodCase.tags_es}
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
