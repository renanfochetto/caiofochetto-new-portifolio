"use client";

import { useState } from "react";
import { useI18n } from "@/lib/i18n";
import { CaseCard } from "./case-card";
import { ProductionCard } from "./production-card";
import { WorkToggle } from "./work-toggle";
import { AnimatedSection, AnimatedItem } from "./animated-section";
import { caseStudies } from "@/lib/cases";
import { getAllProductionCases } from "@/lib/production-cases";

// Mapeamento de brand → logo filename (Performance)
const brandLogoMap: Record<string, string> = {
  "Betfair": "betfair",
  "Budweiser": "budweiser",
  "Formula E": "formulae",
  "HISTORY": "ae",
  "A&E": "ae",
  "Lifetime": "lifetime",
  "Octagon": "octagon",
  "Ambev": "ambev",
  "Jellysmack": "jellysmack",
};

// Mapeamento de brand → logo filename (Production)
const productionBrandLogoMap: Record<string, string> = {
  "Netflix": "netflix",
  "Natura": "natura",
  "Havaianas + Netflix": "havaianas",
  "Playground": "playground",
  "Bohemia": "bohemia",
  "Nestlé": "nestle",
};

export function WorkSection() {
  const { locale, t } = useI18n();

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
        <div className="mt-12 grid gap-6 md:grid-cols-2 md:gap-8">
          {view === "performance" ? (
            // PERFORMANCE CASES
            <>
              {caseStudies.map((study, idx) => {
                // Extrair título baseado no locale
                const title = locale === 'pt' ? study.title_pt : study.title_en;

                // Extrair brand (pode ser string ou array)
                const brandArray = Array.isArray(study.brand) ? study.brand : [study.brand];
                const brandDisplay = brandArray.join(', ');

                // Pegar logo do primeiro brand (se houver múltiplos)
                const brandLogo = brandLogoMap[brandArray[0]] || undefined;

                // Extrair métricas com labels traduzidos
                const metrics = study.metrics.map(m => ({
                  value: m.value,
                  label: locale === 'pt' ? m.label_pt : m.label_en,
                }));

                // Tags já vêm prontas
                const tags = study.tags;

                return (
                  <AnimatedItem key={study.slug} index={idx}>
                    <CaseCard
                      slug={study.slug}
                      brand={brandDisplay}
                      brandLogo={brandLogo}
                      title={title}
                      metrics={metrics}
                      tags={tags}
                      locale={locale}
                    />
                  </AnimatedItem>
                );
              })}
            </>
          ) : (
            // PRODUCTION CASES
            <>
              {productionCases.map((prodCase, idx) => (
                <AnimatedItem key={prodCase.slug} index={idx}>
                  <ProductionCard
                    case={prodCase}
                  />
                </AnimatedItem>
              ))}
            </>
          )}
        </div>
      </AnimatedSection>
    </section>
  );
}
