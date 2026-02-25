// /components/case/performance-sections.tsx
"use client";

import { AnimatedCounter } from "@/components/ui/animated-counter";
import { getMetricIcon } from "@/lib/helpers/case-helpers";
import {
  Target,
  Lightbulb,
  TrendingUp,
  BookOpen,
  CheckCircle,
} from "lucide-react";
import type { CaseData } from "@/types/performance-case";

interface PerformanceSectionsProps {
  caseData: CaseData;
  locale: string;
}

export function PerformanceSections({ caseData, locale }: PerformanceSectionsProps) {
  // Selecionar conteúdo baseado no locale com fallback
  const challenge = locale === 'pt' ? caseData.challenge_pt :
    locale === 'en' ? caseData.challenge_en :
      caseData.challenge_es || caseData.challenge_en || caseData.challenge_pt || '';

  const solution = locale === 'pt' ? caseData.solution_pt :
    locale === 'en' ? caseData.solution_en :
      caseData.solution_es || caseData.solution_en || caseData.solution_pt || '';

  const learnings = locale === 'pt' ? caseData.key_learnings_pt :
    locale === 'en' ? caseData.key_learnings_en :
      caseData.key_learnings_es || caseData.key_learnings_en || caseData.key_learnings_pt || [];

  const sectionLabels = locale === "pt"
    ? {
      challenge: "Desafio",
      solution: "Solução",
      results: "Resultados",
      learnings: "Principais Aprendizados",
    }
    : locale === "es"
      ? {
        challenge: "Desafío",
        solution: "Solución",
        results: "Resultados",
        learnings: "Aprendizajes Clave",
      }
      : {
        challenge: "Challenge",
        solution: "Solution",
        results: "Results",
        learnings: "Key Learnings",
      };

  return (
    <>
      {/* Challenge */}
      <section className="px-6 py-12 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="flex items-center gap-2 mb-4">
            <Target className="h-4 w-4 text-primary" />
            <h2 className="text-xs font-medium uppercase tracking-widest text-primary">
              {sectionLabels.challenge}
            </h2>
          </div>
          <p className="text-base leading-relaxed text-muted-foreground">
            {challenge}
          </p>
        </div>
      </section>

      {/* Solution */}
      <section className="px-6 py-12 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="flex items-center gap-2 mb-4">
            <Lightbulb className="h-4 w-4 text-primary" />
            <h2 className="text-xs font-medium uppercase tracking-widest text-primary">
              {sectionLabels.solution}
            </h2>
          </div>
          <p className="text-base leading-relaxed text-muted-foreground">
            {solution}
          </p>
        </div>
      </section>

      {/* Results */}
      <section className="px-6 py-16 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="flex items-center gap-2 mb-8">
            <TrendingUp className="h-4 w-4 text-primary" />
            <h2 className="text-xs font-medium uppercase tracking-widest text-primary">
              {sectionLabels.results}
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {caseData.metrics.map((metric, index) => {
              const label = locale === 'pt' ? metric.label_pt :
                locale === 'en' ? metric.label_en :
                  metric.label_es || metric.label_en || metric.label_pt || '';

              const description = locale === 'pt' ? metric.description_pt :
                locale === 'en' ? metric.description_en :
                  metric.description_es || metric.description_en || metric.description_pt || '';

              const IconComponent = getMetricIcon(label);

              return (
                <div
                  key={index}
                  className="rounded-lg border border-neutral-600 bg-card p-6 transition-colors hover:border-primary"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <IconComponent className="h-6 w-6 text-primary flex-shrink-0" />
                    <AnimatedCounter
                      value={metric.value}
                      duration={2}
                      className="text-4xl font-bold text-primary md:text-5xl"
                    />
                  </div>
                  <p className="mt-2 text-sm font-semibold text-foreground">{label}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Key Learnings */}
      <section className="px-6 py-16 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="flex items-center gap-2 mb-6">
            <BookOpen className="h-4 w-4 text-primary" />
            <h2 className="text-xs font-medium uppercase tracking-widest text-primary">
              {sectionLabels.learnings}
            </h2>
          </div>
          <ul className="space-y-4">
            {learnings.map((learning, i) => (
              <li key={i} className="flex gap-3">
                <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                <p className="text-sm leading-relaxed text-muted-foreground">{learning}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
