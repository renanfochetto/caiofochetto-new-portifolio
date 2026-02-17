"use client";

import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { CaseData } from "@/types/case";

interface CaseHeroProps {
  caseData: CaseData;
  locale: "pt" | "en";
  prevCase?: CaseData;
  nextCase?: CaseData;
}

// Função helper para extrair playlist ID
function getPlaylistId(url: string): string | null {
  try {
    const urlObj = new URL(url);
    return urlObj.searchParams.get('list');
  } catch {
    return null;
  }
}

export function CaseHero({
  caseData,
  locale,
  prevCase,
  nextCase,
}: CaseHeroProps) {
  const title = locale === "pt" ? caseData.title_pt : caseData.title_en;
  const role = locale === "pt" ? caseData.role_pt : caseData.role_en;

  // Extrair playlist ID e gerar URL de embed correta
  const playlistId = getPlaylistId(caseData.playlist_url);
  const embedUrl = playlistId
    ? `https://www.youtube.com/embed/videoseries?list=${playlistId}`
    : null;

  return (
    <section className="relative min-h-screen bg-background pt-20">
      {/* Breadcrumb */}
      <div className="mx-auto max-w-6xl px-6 pb-8">
        <nav className="flex items-center gap-2 text-sm text-muted-foreground">
          <Link
            href={`/${locale}`}
            className="transition-colors hover:text-primary"
          >
            Home
          </Link>
          <span>/</span>
          <Link
            href={`/${locale}#work`}
            className="transition-colors hover:text-primary"
          >
            Trabalho
          </Link>
          <span>/</span>
          <span className="text-foreground">{title}</span>
        </nav>
      </div>

      {/* Navigation Buttons - Desktop Only */}
      {(prevCase || nextCase) && (
        <div className="absolute right-6 top-24 hidden gap-4 md:flex">
          {prevCase && (
            <Link
              href={`/${locale}/case/${prevCase.slug}`}
              className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm transition-all hover:border-primary hover:text-primary"
              aria-label={`Previous case: ${prevCase.brand}`}
            >
              <ChevronLeft className="h-4 w-4" />
              Anterior
            </Link>
          )}
          {nextCase && (
            <Link
              href={`/${locale}/case/${nextCase.slug}`}
              className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm transition-all hover:border-primary hover:text-primary"
              aria-label={`Next case: ${nextCase.brand}`}
            >
              Próximo
              <ChevronRight className="h-4 w-4" />
            </Link>
          )}
        </div>
      )}

      {/* Hero Video/Image */}
      <div className="mx-auto max-w-5xl px-6 pb-16">
        <div className="aspect-video w-full overflow-hidden rounded-lg bg-neutral-900">
          {caseData.hero_type === "video" && embedUrl ? (
            <iframe
              width="100%"
              height="100%"
              src={embedUrl}
              title={`${caseData.brand} case study video`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="h-full w-full"
            />
          ) : (
            <Image
              src={caseData.hero_placeholder}
              alt={`${caseData.brand} case study`}
              width={1200}
              height={675}
              className="h-full w-full object-cover"
              priority
            />
          )}
        </div>
      </div>

      {/* Title Section */}
      <div className="mx-auto max-w-5xl px-6 pb-16">
        <div className="space-y-4">
          <p className="text-xs font-medium uppercase tracking-widest text-primary">
            {Array.isArray(caseData.brand)
              ? caseData.brand.join(" · ")
              : caseData.brand}
          </p>
          <h1 className="font-display text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl">
            {title}
          </h1>
          <p className="text-sm text-muted-foreground">
            {caseData.company} · {caseData.year_display}
          </p>
          <p className="pt-4 text-lg text-muted-foreground">
            {role}
          </p>
        </div>
      </div>
    </section>
  );
}