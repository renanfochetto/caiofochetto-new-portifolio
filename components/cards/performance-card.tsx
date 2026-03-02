// components/case-card.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useTheme } from "../providers/theme-provider";
import { useI18n } from "@/context/i18n-provider";
import { AnimatedCounter } from "../ui/animated-counter";
import {
  ArrowUpRight,
  Users,
  Eye,
  Heart,
  MessageCircle,
  TrendingUp,
  DollarSign,
  MousePointerClick,
  Play,
  BarChart3
} from "lucide-react";

const getMetricIcon = (label: string) => {
  if (!label) return BarChart3; // ✅ Safe check
  const lowerLabel = label.toLowerCase();
  if (lowerLabel.includes("alcance") || lowerLabel.includes("reach")) return Users;
  if (lowerLabel.includes("impressões") || lowerLabel.includes("impressions")) return Eye;
  if (lowerLabel.includes("engajamento") || lowerLabel.includes("engagement")) return Heart;
  if (lowerLabel.includes("interações") || lowerLabel.includes("interactions")) return MessageCircle;
  if (lowerLabel.includes("crescimento") || lowerLabel.includes("growth")) return TrendingUp;
  if (lowerLabel.includes("receita") || lowerLabel.includes("revenue")) return DollarSign;
  if (lowerLabel.includes("cliques") || lowerLabel.includes("ctr")) return MousePointerClick;
  if (lowerLabel.includes("views") || lowerLabel.includes("visualizações")) return Play;
  return BarChart3;
};

interface CaseCardProps {
  slug: string;
  brand: string;
  brandLogo?: string;
  title_pt: string;
  title_en: string;
  title_es: string;
  metrics: Array<{
    value: string;
    label_pt: string;
    label_en: string;
    label_es: string;
  }>;
  tags_pt: string[];
  tags_en: string[];
  tags_es: string[];
}

export function PerformanceCard({
                           slug,
                           brand,
                           brandLogo,
                           title_pt,
                           title_en,
                           title_es,
                           metrics,
                           tags_pt,
                           tags_en,
                           tags_es,
                         }: CaseCardProps) {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const { t, locale } = useI18n();

  useEffect(() => {
    setMounted(true);
  }, []);

  // ✅ Selecionar conteúdo baseado no locale com fallback
  const title = locale === 'pt' ? title_pt :
    locale === 'en' ? title_en :
      title_es || title_en || title_pt; // Fallback chain

  const tags = locale === 'pt' ? tags_pt :
    locale === 'en' ? tags_en :
      tags_es || tags_en || tags_pt; // Fallback chain

  const logoFolder = theme === "dark" ? "white" : "black";
  const displayTags = (tags || []).slice(0, 3);
  const remainingTags = (tags || []).length - 3;
  const displayMetrics = (metrics || []).slice(0, 3);

  return (
    <Link
      href={`/${locale}/performance-case/${slug}`}
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
              <Image
                src={`/logos/${logoFolder}/${brandLogo}.svg`}
                alt={`${brand} logo`}
                width={64}
                height={64}
                style={{ width: "auto", height: "100%", maxWidth: "100px" }}
                className="object-contain object-left"
                unoptimized
              />
            </div>
          )}

          {/* Badge + Arrow (arrow oculta em mobile) */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/5 px-2.5 py-1 sm:px-3 sm:py-1.5">
              <Play className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-primary" />
              <span className="text-xs font-medium text-primary">
                {t.work.video}
              </span>
            </div>
            {/* Seta decorativa - APENAS em tablet+ */}
            <ArrowUpRight className="hidden sm:block h-5 w-5 text-muted-foreground transition-all duration-200 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-primary" />
          </div>
        </div>

        {/* Título */}
        <h3 className="mb-4 sm:mb-6 text-lg sm:text-xl md:text-2xl font-bold leading-tight text-foreground transition-colors duration-200 group-hover:text-primary">
          {title}
        </h3>

        {/* Métricas - 2 colunas no mobile, 3 no tablet+ */}
        <div className="mb-4 sm:mb-6 grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
          {displayMetrics.map((metric, index) => {
            // ✅ Selecionar label baseado no locale com fallback
            const label = locale === 'pt' ? metric.label_pt :
              locale === 'en' ? metric.label_en :
                metric.label_es || metric.label_en || metric.label_pt || ''; // Fallback chain

            const IconComponent = getMetricIcon(label);

            return (
              <div key={index} className="flex flex-col gap-1">
                <div className="flex items-center gap-1.5">
                  <IconComponent className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary flex-shrink-0" />
                  <AnimatedCounter
                    value={metric.value}
                    duration={2}
                    className="text-base sm:text-lg md:text-xl font-bold text-primary"
                  />
                </div>
                <p className="text-xs text-muted-foreground line-clamp-1">
                  {label}
                </p>
              </div>
            );
          })}
        </div>

        {/* Tags */}
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
          {displayTags.map((tag, index) => (
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
          <ArrowUpRight className="h-3.5 w-3.5 sm:h-4 sm:w-4 transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1" />
        </div>

      </div>
    </Link>
  );
}
