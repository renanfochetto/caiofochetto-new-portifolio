// components/production-card.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useTheme } from "../providers/theme-provider";
import { useI18n } from "@/components/providers/i18n-provider";
import { ArrowUpRight, Play } from "lucide-react";
import { AnimatedCounter } from "../ui/animated-counter";

interface ProductionCardProps {
  slug: string;
  brand: string;
  brandLogo?: string;
  title_pt: string;
  title_en: string;
  title_es: string;
  description_pt: string;
  description_en: string;
  description_es: string;
  tags_pt: string[];
  tags_en: string[];
  tags_es: string[];
}

export function ProductionCard({
                                 slug,
                                 brand,
                                 brandLogo,
                                 title_pt,
                                 title_en,
                                 title_es,
                                 description_pt,
                                 description_en,
                                 description_es,
                                 tags_pt,
                                 tags_en,
                                 tags_es,
                               }: ProductionCardProps) {
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

  const description = locale === 'pt' ? description_pt :
    locale === 'en' ? description_en :
      description_es || description_en || description_pt; // Fallback chain

  const tags = locale === 'pt' ? tags_pt :
    locale === 'en' ? tags_en :
      tags_es || tags_en || tags_pt; // Fallback chain

  const logoFolder = theme === "dark" ? "white" : "black";
  const displayTags = (tags || []).slice(0, 3);
  const remainingTags = (tags || []).length - 3;

  return (
    <Link
      href={`/${locale}/production-case/${slug}`}
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

        {/* Header: LOGO + Badge */}
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

          {/* Badge + Arrow */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/5 px-2.5 py-1 sm:px-3 sm:py-1.5">
              <Play className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-primary" />
              <span className="text-xs font-medium text-primary">
                {t.work.video}
              </span>
            </div>
            <ArrowUpRight className="hidden sm:block h-5 w-5 text-muted-foreground transition-all duration-200 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-primary" />
          </div>
        </div>

        {/* Título */}
        <h3 className="mb-3 sm:mb-4 text-lg sm:text-xl md:text-2xl font-bold leading-tight text-foreground transition-colors duration-200 group-hover:text-primary">
          {title}
        </h3>

        {/* Descrição */}
        <p className="mb-4 sm:mb-6 text-sm sm:text-base text-muted-foreground line-clamp-2">
          {description}
        </p>

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

        {/* CTA */}
        <div className="mt-4 sm:mt-6 flex items-center gap-2 text-xs sm:text-sm font-medium text-primary">
          <span>{t.work.viewCase}</span>
          <ArrowUpRight className="h-3.5 w-3.5 sm:h-4 sm:w-4 transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1" />
        </div>

      </div>
    </Link>
  );
}
