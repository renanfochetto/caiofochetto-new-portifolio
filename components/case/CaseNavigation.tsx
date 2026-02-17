"use client";

import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { CaseData } from "@/types/case";

interface CaseNavigationProps {
  prevCase?: CaseData;
  nextCase?: CaseData;
  locale: "pt" | "en";
}

function NavigationCard({
  caseData,
  direction,
  locale,
}: {
  caseData: CaseData;
  direction: "prev" | "next";
  locale: "pt" | "en";
}) {
  const title = locale === "pt" ? caseData.title_pt : caseData.title_en;
  const metrics = caseData.metrics[0];
  const metricLabel =
    locale === "pt" ? metrics.label_pt : metrics.label_en;

  return (
    <Link
      href={`/${locale}/case/${caseData.slug}`}
      className="group flex flex-col gap-4 rounded-lg border border-border bg-card/50 p-6 transition-all hover:border-primary hover:bg-card"
    >
      <div className="aspect-video w-full overflow-hidden rounded bg-neutral-900 relative">
        <Image
          src={caseData.hero_placeholder}
          alt={`${caseData.brand} case study`}
          fill
          className="object-cover transition-transform group-hover:scale-105"
        />
      </div>

      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-xs font-medium uppercase tracking-widest text-primary">
            {direction === "prev" ? "← Anterior" : "Próximo →"}
          </p>
          <h3 className="mt-2 line-clamp-2 font-semibold text-foreground">
            {title}
          </h3>
        </div>
        <div className="text-muted-foreground">
          {direction === "prev" ? (
            <ChevronLeft className="h-5 w-5" />
          ) : (
            <ChevronRight className="h-5 w-5" />
          )}
        </div>
      </div>

      <p className="text-xs text-muted-foreground">
        {metrics.value} {metricLabel}
      </p>
    </Link>
  );
}

export function CaseNavigation({
  prevCase,
  nextCase,
  locale,
}: CaseNavigationProps) {
  return (
    <section className="border-t border-border bg-background py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <p className="mb-8 text-xs font-medium uppercase tracking-widest text-primary">
          Navegação
        </p>

        <div className="grid gap-6 md:grid-cols-3">
          {/* Prev Case */}
          {prevCase ? (
            <NavigationCard
              caseData={prevCase}
              direction="prev"
              locale={locale}
            />
          ) : (
            <div className="rounded-lg border border-border/30 bg-card/20 p-6 opacity-50" />
          )}

          {/* Center - All Cases Button */}
          <div className="flex items-center justify-center">
            <Link
              href={`/${locale}#work`}
              className="group inline-flex items-center gap-2 rounded-full border border-border bg-card px-6 py-3 text-sm font-semibold transition-all hover:border-primary hover:bg-primary/10"
            >
              Ver todos os cases
            </Link>
          </div>

          {/* Next Case */}
          {nextCase ? (
            <NavigationCard
              caseData={nextCase}
              direction="next"
              locale={locale}
            />
          ) : (
            <div className="rounded-lg border border-border/30 bg-card/20 p-6 opacity-50" />
          )}
        </div>
      </div>
    </section>
  );
}
