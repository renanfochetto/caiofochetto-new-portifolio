// components/cards/performance-card.tsx
"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useTheme } from "../providers/theme-provider";
import { useI18n } from "@/components/providers/i18n-provider";
import { AnimatedCounter } from "../ui/animated-counter";
import { trackCaseCardClick } from "@/lib/analytics/track";
import { Logo } from "@/components/ui/logo";
import { getMetricIcon } from "@/lib/helpers/case-helpers";

import {
  CaseData,
  Locale,
  getLocalizedField,
  getLocalizedArray
} from '@/types';

import { ArrowUpRight, Play } from "@/lib/icons";

interface PerformanceCardProps {
  caseData: CaseData;
  brandLogo?: string;
}

// Componente de card para cases de performance
export function PerformanceCard({ caseData, brandLogo }: PerformanceCardProps) {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const { t, locale } = useI18n();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Extração de campos localizados
  const localeTyped = locale as Locale;

  const title = getLocalizedField(caseData, 'title', localeTyped);
  const tags = getLocalizedArray(caseData, 'tags', localeTyped);

  const brand = Array.isArray(caseData.brand)
    ? caseData.brand.join(', ')
    : caseData.brand;

  // Handler de clique para analytics
  const handleClick = () => {
    trackCaseCardClick(caseData.slug, title, 'performance');
  };

  const displayTags = tags.slice(0, 3);
  const remainingTags = tags.length - 3;
  
  // Métricas em destaque
  const displayMetrics = caseData.metrics.slice(0, 3);

  return (
    <Link
      href={`/${locale}/performance-case/${caseData.slug}`}
      onClick={handleClick}
      className="group relative block"
    >
      <div className="
        relative overflow-hidden
        rounded-lg
        border border-neutral-600
        bg-card
        p-4 sm:p-6
        transition-all duration-200
        hover:border-primary
        active:scale-[0.98]
      ">

        {/* Header: LOGO + Badge (+ Arrow apenas em tablet+) */}
        <div className="mb-4 sm:mb-6 flex items-start justify-between">
          {/* Logo */}
          {mounted && brandLogo && (
            <div className="flex h-12 w-12 sm:h-16 sm:w-16 items-center justify-start">
              <Logo
                name={brandLogo}
                alt={`${brand} logo`}
                width={64}
                height={64}
                className="object-contain object-left"
                style={{ width: "auto", height: "100%", maxWidth: "100px" }}
              />
            </div>
          )}

          {/* Badge + Arrow (arrow oculta em mobile) */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/5 px-2.5 py-1 sm:px-3 sm:py-1.5">
              <Play className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-primary" aria-hidden="true" />
              <span className="text-xs font-medium text-primary">
                {t.work.video}
              </span>
            </div>
            {/* Seta decorativa - APENAS em tablet+ */}
            <ArrowUpRight className="hidden sm:block h-5 w-5 text-muted-foreground transition-all duration-200 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-primary" aria-hidden="true" />
          </div>
        </div>

        {/* Título */}
        <h3 className="mb-4 sm:mb-6 text-lg sm:text-xl md:text-2xl font-bold leading-tight text-foreground transition-colors duration-200 group-hover:text-primary">
          {title}
        </h3>

        {/* Métricas - 2 colunas no mobile, 3 no tablet+ */}
        <div className="mb-4 sm:mb-6 grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
          {displayMetrics.map((metric, index: number) => {
            // ✅ Type-safe label extraction - inline (não usa getLocalizedField pois estrutura diferente)
            const metricLabel = locale === 'pt' ? metric.label_pt :
              locale === 'en' ? metric.label_en :
                metric.label_es || metric.label_en || metric.label_pt || '';

            const IconComponent = getMetricIcon(metricLabel);

            return (
              <div key={index} className="flex flex-col gap-1">
                <div className="flex items-center gap-1.5">
                  <IconComponent className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary flex-shrink-0" aria-hidden="true" />
                  <AnimatedCounter
                    value={metric.value}
                    duration={2}
                    className="text-base sm:text-lg md:text-xl font-bold text-primary"
                  />
                </div>
                <p className="text-xs text-muted-foreground line-clamp-1">
                  {metricLabel}
                </p>
              </div>
            );
          })}
        </div>

        {/* Tags */}
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
          {displayTags.map((tag, index: number) => (
            <span
              key={index}
              className="rounded-full border border-neutral-600 px-2.5 py-1 sm:px-4 sm:py-2 text-xs sm:text-sm font-medium text-muted-foreground transition-colors duration-200 bg-secondary hover:border-primary hover:text-primary"
            >
              {tag}
            </span>
          ))}
          {remainingTags > 0 && (
            <span className="group/tag relative flex items-center gap-1.5 rounded-full border border-neutral-600 px-2.5 py-1 sm:px-4 sm:py-2 text-xs sm:text-sm font-medium text-primary transition-all duration-300 bg-secondary hover:border-primary hover:scale-105 active:scale-95">
              <span className="flex items-center">
                +
                <AnimatedCounter
                  value={remainingTags.toString()}
                  duration={1.5}
                  className="text-xs sm:text-sm font-bold"
                />
              </span>
              <span className="max-w-0 overflow-hidden whitespace-nowrap transition-all duration-500 group-hover/tag:max-w-[120px] group-hover/tag:ml-1 opacity-0 group-hover/tag:opacity-100">
                {t.work.more}
              </span>

              {/* Efeito de brilho sutil ao redor */}
              <span className="absolute inset-0 rounded-full bg-primary/20 opacity-0 blur-md transition-opacity duration-300 group-hover/tag:opacity-40" />
            </span>
          )}
        </div>

        {/* CTA - seta funcional SEMPRE visível */}
        <div className="mt-4 sm:mt-6 flex items-center gap-2 text-xs sm:text-sm font-medium text-primary">
          <span>{t.work.viewCase}</span>
          <ArrowUpRight className="h-3.5 w-3.5 sm:h-4 sm:w-4 transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1" aria-hidden="true" />
        </div>

      </div>
    </Link>
  );
}
