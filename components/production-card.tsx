"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Play, Briefcase } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { useTheme } from "@/components/theme-provider";
import type { ProductionCase } from "@/types/production";

interface ProductionCardProps {
  case: ProductionCase;
}

export function ProductionCard({ case: productionCase }: ProductionCardProps) {
  const { locale } = useI18n();
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const { slug, title, brand, year, type, role, tags } = productionCase;
  const description = productionCase.description || "";

  const brandLogos: Record<string, string> = {
    "Netflix": "netflix",
    "Natura": "natura",
    "Havaianas": "havaianas",
    "Bohemia": "bohemia",
    "Nestlé": "nestle",
    "Playground": "playground",
  };

  const logoFolder = theme === "dark" ? "white" : "black";
  const logoFile = brandLogos[brand];
  const displayTags = tags.slice(0, 3);

  return (
    <Link
      href={`/production/${slug}`}
      aria-label={`Ver detalhes de ${title} - ${role}`}
      className="group block rounded-lg border border-neutral-600 bg-card p-4 sm:p-6 transition-all duration-200 hover:border-primary active:scale-[0.98]"
    >
      {/* Header: LOGO + Badge (+ Arrow apenas em tablet+) */}
      <div className="mb-4 sm:mb-6 flex items-start justify-between gap-2">
        {/* Logo */}
        <div className="flex h-12 w-24 sm:h-16 sm:w-32 items-center justify-start flex-shrink-0">
          {mounted && logoFile ? (
            <Image
              src={`/logos/${logoFolder}/${logoFile}.svg`}
              alt={`${brand} logo`}
              width={128}
              height={64}
              className="h-full w-auto max-w-full object-contain object-left"
              unoptimized
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
          ) : (
            <span className="text-xs sm:text-sm font-bold text-primary uppercase tracking-wider">
              {brand}
            </span>
          )}
        </div>

        {/* Badge + Arrow (arrow oculta em mobile) */}
        <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
          <div className="flex items-center gap-1 sm:gap-1.5 rounded-full border border-primary/30 bg-primary/5 px-2 py-1 sm:px-3 sm:py-1.5">
            <Play className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-primary" />
            <span className="text-xs font-medium text-primary">
              {locale === "pt" ? "Vídeo" : "Video"}
            </span>
          </div>
          {/* Seta decorativa - APENAS em tablet+ */}
          <ArrowUpRight className="hidden sm:block h-5 w-5 text-muted-foreground transition-all duration-200 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-primary" />
        </div>
      </div>

      {/* Título */}
      <h3 className="mb-3 sm:mb-4 text-lg sm:text-xl md:text-2xl font-bold leading-tight text-foreground transition-colors duration-200 group-hover:text-primary">
        {title}
      </h3>

      {/* Descrição */}
      {description && (
        <p className="mb-4 sm:mb-6 text-sm leading-relaxed text-muted-foreground line-clamp-2">
          {description}
        </p>
      )}

      {/* Role + Type */}
      <div className="mb-3 sm:mb-4 space-y-1.5 sm:space-y-2">
        <div className="flex items-center gap-2">
          <Briefcase className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary flex-shrink-0" />
          <p className="text-xs sm:text-sm font-semibold text-foreground">
            {role}
          </p>
        </div>
        <p className="text-xs sm:text-sm text-muted-foreground">
          {type} • {year}
        </p>
      </div>

      {/* Tags */}
      <div className="mb-4 sm:mb-6 flex flex-wrap gap-1.5 sm:gap-2">
        {displayTags.map((tag, index) => (
          <span
            key={index}
            className="rounded-full border border-neutral-600 px-2.5 py-1 sm:px-4 sm:py-2 text-xs sm:text-sm font-medium text-muted-foreground transition-colors duration-200 hover:border-primary hover:text-primary"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* CTA - seta funcional SEMPRE visível */}
      <div className="flex items-center gap-2 text-xs sm:text-sm font-medium text-primary transition-colors duration-200 group-hover:text-primary">
        <span>
          {locale === "pt" ? "Ver case completo" : "View full case"}
        </span>
        <ArrowUpRight className="h-3.5 w-3.5 sm:h-4 sm:w-4 transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1" />
      </div>
    </Link>
  );
}