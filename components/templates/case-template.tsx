// /components/case-template.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Tag, Play, Calendar, ArrowUpRight } from "lucide-react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { YouTubeEmbed } from "@/components/media/youtube-embed";
import { PerformanceSections } from "@/components/case/performance-sections";
import { ProductionSections } from "@/components/case/production-sections";
import { companyLogos, brandLogos } from "@/lib/helpers/case-helpers";
import type { CaseData } from "@/types/performance-case";
import type { ProductionCase } from "@/types/production-case";

interface CaseTemplateProps {
  variant: "performance" | "production";
  caseData: CaseData | ProductionCase;
  locale: string;
  theme: string;
  navigation: {
    prev: { slug: string; title_pt?: string; title_en?: string; title_es?: string; title?: string; brand: string | string[] } | null;
    next: { slug: string; title_pt?: string; title_en?: string; title_es?: string; title?: string; brand: string | string[] } | null;
  };
}

export function CaseTemplate({
                               variant,
                               caseData,
                               locale,
                               theme,
                               navigation,
                             }: CaseTemplateProps) {
  const logoFolder = theme === "dark" ? "white" : "black";

  // Extrair dados comuns
  const title = locale === 'pt'
    ? (caseData as any).title_pt
    : locale === 'en'
      ? (caseData as any).title_en
      : (caseData as any).title_es || (caseData as any).title_en || (caseData as any).title_pt || '';

  const role = locale === 'pt'
    ? (caseData as any).role_pt
    : locale === 'en'
      ? (caseData as any).role_en
      : (caseData as any).role_es || (caseData as any).role_en || (caseData as any).role_pt || '';

  const capabilities = locale === 'pt'
    ? (caseData as any).capabilities_pt || (caseData as any).tags_pt
    : locale === 'en'
      ? (caseData as any).capabilities_en || (caseData as any).tags_en
      : (caseData as any).capabilities_es || (caseData as any).tags_es || (caseData as any).capabilities_en || (caseData as any).tags_en || [];

  const company = (caseData as any).company;
  const brand = (caseData as any).brand;
  const period = variant === "performance" ? (caseData as CaseData).period : (caseData as ProductionCase).year;

  // Logos
  const companyLogo = companyLogos[company];
  const firstBrand = Array.isArray(brand) ? brand[0] : brand;
  const brandLogo = brandLogos[firstBrand];

  // Labels traduzidos
  const sectionLabels = locale === "pt"
    ? {
      capabilities: "Competências",
      relatedContent: "CONTEÚDO RELACIONADO",
      viewFullPlaylist: "Ver playlist completa no YouTube",
      back: "Voltar",
      previous: "Anterior",
      next: "Próximo",
    }
    : locale === "es"
      ? {
        capabilities: "Competencias",
        relatedContent: "CONTENIDO RELACIONADO",
        viewFullPlaylist: "Ver playlist completa en YouTube",
        back: "Volver",
        previous: "Anterior",
        next: "Siguiente",
      }
      : {
        capabilities: "Capabilities",
        relatedContent: "RELATED CONTENT",
        viewFullPlaylist: "View full playlist on YouTube",
        back: "Back",
        previous: "Previous",
        next: "Next",
      };

  // URL base para links
  const baseUrl = variant === "performance" ? "performance-case" : "production-case";

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      {/* ✅ HERO - NOVO LAYOUT */}
      <section className="px-6 pt-28 pb-16 lg:px-8">
        <div className="mx-auto max-w-4xl">

          {/* Topo: Voltar (esquerda) + Ano (direita) */}
          <div className="flex items-center justify-between mb-8">
            <Link
              href={`/${locale}`}
              className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-all hover:text-primary active:scale-95"
            >
              <ArrowLeft className="h-4 w-4" />
              {sectionLabels.back}
            </Link>

            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <span className="font-medium text-foreground">{period}</span>
            </div>
          </div>

          {/* Título */}
          <h1 className="text-3xl font-bold text-foreground md:text-5xl mb-8">
            {title}
          </h1>

          {/* Linha divisória */}
          <div className="border-t border-neutral-600 mb-8" />

          {/* Base: Logo Empresa (esquerda) + Logo Brand (direita) */}
          <div className="flex items-center justify-between gap-4">
            {/* Esquerda: Logo Empresa + Info */}
            <div className="flex items-center gap-3">
              {companyLogo && (
                <div className="flex h-12 w-12 items-center justify-center rounded-lg border border-neutral-600 bg-card overflow-hidden">
                  <Image
                    src={`/companies/${companyLogo}`}
                    alt={`${company} logo`}
                    width={48}
                    height={48}
                    className="h-full w-auto object-cover"
                    unoptimized
                  />
                </div>
              )}

              <div>
                <p className="text-sm font-semibold text-foreground">{company}</p>
                <p className="text-xs text-muted-foreground">{role}</p>
              </div>
            </div>

            {/* Direita: Logo Brand */}
            {brandLogo && (
              <div className="flex h-16 w-32 items-center justify-end">
                <Image
                  src={`/logos/${logoFolder}/${brandLogo}.svg`}
                  alt={`${firstBrand} logo`}
                  width={128}
                  height={64}
                  className="h-full w-auto object-contain object-right"
                  style={{ maxWidth: "100%" }}
                  unoptimized
                />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* VIDEO SECTION */}
      {variant === "performance" && (caseData as CaseData).playlist_url && (() => {
        const playlistId = (() => {
          try {
            const url = new URL((caseData as CaseData).playlist_url!);
            return url.searchParams.get('list');
          } catch {
            return null;
          }
        })();

        if (!playlistId) return null;

        const embedUrl = `https://www.youtube.com/embed/videoseries?list=${playlistId}`;

        return (
          <section className="px-0 sm:px-6 py-12 sm:py-16 lg:px-8">
            <div className="mx-auto w-full sm:max-w-4xl">
              <div className="px-6 sm:px-0 mb-6 sm:mb-8">
                <div className="flex items-center gap-2">
                  <Play className="h-4 w-4 text-primary" />
                  <h2 className="text-xs font-medium uppercase tracking-widest text-primary">
                    {sectionLabels.relatedContent}
                  </h2>
                </div>
              </div>

              <div className="relative aspect-video w-full overflow-hidden sm:rounded-lg border-0 sm:border sm:border-neutral-600 bg-background">
                <iframe
                  width="100%"
                  height="100%"
                  src={embedUrl}
                  title={`${firstBrand} - Playlist`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="h-full w-full"
                />
              </div>

              <div className="mt-4 px-6 sm:px-0 flex justify-center">
                <a
                  href={(caseData as CaseData).playlist_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  <span>{sectionLabels.viewFullPlaylist}</span>
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          </section>
        );
      })()}

      {variant === "production" && (caseData as ProductionCase).media?.hero && (() => {
        const { type, videoId, videoIds } = (caseData as ProductionCase).media.hero;

        if (!type || (!videoId && !videoIds)) return null;

        return (
          <section className="px-0 sm:px-6 py-12 sm:py-16 lg:px-8">
            <div className="mx-auto w-full sm:max-w-4xl">
              <div className="px-6 sm:px-0 mb-6 sm:mb-8">
                <div className="flex items-center gap-2">
                  <Play className="h-4 w-4 text-primary" />
                  <h2 className="text-xs font-medium uppercase tracking-widest text-primary">
                    {sectionLabels.relatedContent}
                  </h2>
                </div>
              </div>

              <div className="sm:rounded-lg overflow-hidden border-0 sm:border sm:border-neutral-600">
                <YouTubeEmbed
                  type={type}
                  videoId={videoId}
                  videoIds={videoIds}
                  title={title}
                  placeholder={(caseData as ProductionCase).media.hero.placeholder}
                />
              </div>
            </div>
          </section>
        );
      })()}

      {/* SPECIFIC SECTIONS */}
      {variant === "performance" ? (
        <PerformanceSections caseData={caseData as CaseData} locale={locale} />
      ) : (
        <ProductionSections caseData={caseData as ProductionCase} locale={locale} />
      )}

      {/* CAPABILITIES / TAGS */}
      <section className="px-6 py-16 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="mb-4 flex items-center gap-2">
            <Tag className="h-4 w-4 text-primary" />
            <p className="text-xs font-medium uppercase tracking-widest text-primary">
              {sectionLabels.capabilities}
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {capabilities.map((capability: string, index: number) => (
              <span
                key={index}
                className="rounded-full border border-neutral-600 px-4 py-2 text-sm font-medium text-muted-foreground transition-colors duration-200 hover:border-primary hover:text-primary"
              >
                {capability}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* NAVIGATION */}
      <section className="px-6 py-16 lg:px-8">
        <div className="mx-auto max-w-4xl border-t border-neutral-600 pt-12">
          <div className="grid gap-6 md:grid-cols-2">
            {navigation.prev && (
              <Link
                href={`/${locale}/${baseUrl}/${navigation.prev.slug}`}
                className="group flex flex-col gap-3 rounded-lg border border-neutral-600 p-6 transition-all duration-200 hover:border-primary hover:bg-card/50 active:scale-[0.98]"
              >
                <div className="flex items-center gap-2 text-xs font-semibold text-primary">
                  <ArrowLeft className="h-4 w-4" />
                  {sectionLabels.previous}
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">
                    {Array.isArray(navigation.prev.brand)
                      ? navigation.prev.brand.join(', ')
                      : navigation.prev.brand}
                  </p>
                  <h3 className="mt-1 line-clamp-2 text-base font-bold text-foreground group-hover:text-primary transition-colors">
                    {locale === 'pt'
                      ? navigation.prev.title_pt || navigation.prev.title
                      : locale === 'en'
                        ? navigation.prev.title_en || navigation.prev.title
                        : navigation.prev.title_es || navigation.prev.title_en || navigation.prev.title}
                  </h3>
                </div>
              </Link>
            )}

            {navigation.next && (
              <Link
                href={`/${locale}/${baseUrl}/${navigation.next.slug}`}
                className="group flex flex-col gap-3 rounded-lg border border-neutral-600 p-6 transition-all duration-200 hover:border-primary hover:bg-card/50 active:scale-[0.98]"
              >
                <div className="flex items-center justify-end gap-2 text-xs font-semibold text-primary">
                  {sectionLabels.next}
                  <ArrowRight className="h-4 w-4" />
                </div>
                <div className="text-right">
                  <p className="text-xs text-muted-foreground">
                    {Array.isArray(navigation.next.brand)
                      ? navigation.next.brand.join(', ')
                      : navigation.next.brand}
                  </p>
                  <h3 className="mt-1 line-clamp-2 text-base font-bold text-foreground group-hover:text-primary transition-colors">
                    {locale === 'pt'
                      ? navigation.next.title_pt || navigation.next.title
                      : locale === 'en'
                        ? navigation.next.title_en || navigation.next.title
                        : navigation.next.title_es || navigation.next.title_en || navigation.next.title}
                  </h3>
                </div>
              </Link>
            )}
          </div>
        </div>
      </section>

      <Footer hideContact={true} />
    </div>
  );
}
