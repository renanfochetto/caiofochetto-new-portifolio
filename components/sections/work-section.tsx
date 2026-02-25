"use client";

import { useState } from "react";
import { useI18n } from "@/context/i18n-provider";
import { PerformanceCard } from "../cards/performance-card";
import { ProductionCard } from "../cards/production-card";
import { WorkToggle } from "../ui/work-toggle";
import { AnimatedSection, AnimatedItem } from "../ui/animated-section";
import { caseStudies } from "@/lib/data/performance-cases";
import { getAllProductionCases } from "@/lib/data/production-cases";
import { brandLogos } from "@/lib/helpers/case-helpers"; // ✅ Importar do helpers

export function WorkSection() {
  const { t } = useI18n();

  // Estado do toggle (default: performance)
  const [view, setView] = useState<"performance" | "production">("performance");

  // Production cases
  const productionCases = getAllProductionCases();

  return (
    <section id="work" className="px-6 py-24 lg:px-8">
      <AnimatedSection className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <p className="text-xs font-medium uppercase tracking-widest text-primary">
            {t.work.sectionLabel}
          </p>
          <h2 className="mt-2 text-3xl font-bold text-foreground md:text-4xl">
            {t.work.heading}
          </h2>
        </div>

        {/* Toggle - Centralizado */}
        <WorkToggle value={view} onChange={setView} />

        {/* Cases Grid - Muda baseado no view */}
        <div className="mt-12 columns-1 gap-6 md:columns-2 md:gap-8">
          {view === "performance" ? (
            // ✅ PERFORMANCE CASES
            <>
              {caseStudies.map((study, idx) => {
                // Extrair brand (pode ser string ou array)
                const brandArray = Array.isArray(study.brand) ? study.brand : [study.brand];
                const brandDisplay = brandArray.join(', ');

                // Pegar logo do primeiro brand
                const brandLogo = brandLogos[brandArray[0]] || undefined;

                return (
                  <div key={study.slug} className="break-inside-avoid mb-6 md:mb-8 last:mb-0">
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
              {productionCases.map((prodCase, idx) => {
                // Pegar logo da marca
                const brandLogo = brandLogos[prodCase.brand] || undefined;

                return (
                  <div key={prodCase.slug} className="break-inside-avoid mb-6 md:mb-8 last:mb-0">
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
