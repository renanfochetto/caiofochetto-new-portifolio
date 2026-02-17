"use client";

import { useState } from "react";
import { useI18n } from "@/lib/i18n";
import { WorkToggle } from "@/components/work-toggle";
import { CaseCard } from "@/components/case-card";
import { ProductionCard } from "@/components/production-card";
import { getAllCases } from "@/lib/cases";
import { getAllProductionCases } from "@/lib/production-cases";

type WorkView = "performance" | "production";

export function Work() {
  const { t, locale } = useI18n();
  const [view, setView] = useState<WorkView>("performance");

  const performanceCases = getAllCases();
  const productionCases = getAllProductionCases();

  return (
    <section id="work" className="px-6 py-16 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-12 text-center">
          <p className="text-xs font-medium uppercase tracking-widest text-primary">
            {t.work.sectionLabel}
          </p>
          <h2 className="mt-2 text-3xl font-bold text-foreground md:text-4xl">
            {t.work.heading}
          </h2>
        </div>

        {/* Toggle */}
        <WorkToggle value={view} onChange={setView} />

        {/* Cases Grid */}
        <div className="grid gap-6 md:grid-cols-2 md:gap-8">
          {view === "performance" ? (
            <>
              {performanceCases.map((caseItem) => (
                <CaseCard
                  key={caseItem.slug}
                  slug={caseItem.slug}
                  brand={
                    typeof caseItem.brand === "string"
                      ? caseItem.brand
                      : caseItem.brand[0]
                  }
                  brandLogo={
                    caseItem.brand instanceof Array
                      ? caseItem.brand[0].toLowerCase()
                      : typeof caseItem.brand === "string"
                        ? caseItem.brand.toLowerCase()
                        : undefined
                  }
                  title={locale === "pt" ? caseItem.title_pt : caseItem.title_en}
                  metrics={caseItem.metrics.map((m) => ({
                    value: m.value,
                    label: locale === "pt" ? m.label_pt : m.label_en,
                  }))}
                  tags={caseItem.tags}
                  locale={locale}
                />
              ))}
            </>
          ) : (
            <>
              {productionCases.map((caseItem) => (
                <ProductionCard
                  key={caseItem.slug}
                  case={caseItem}
                />
              ))}
            </>
          )}
        </div>
      </div>
    </section>
  );
}