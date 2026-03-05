// /components/case-template.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import {ArrowLeft, ArrowRight, Tag, Play, Calendar, ArrowUpRight} from "lucide-react";
import {Header} from "@/components/layout/header";
import {Footer} from "@/components/layout/footer";
import {YouTubeEmbed} from "@/components/media/youtube-embed";
import {PerformanceSections} from "@/components/case/performance-sections";
import {ProductionSections} from "@/components/case/production-sections";
import {companyLogos, brandLogos} from "@/lib/helpers/case-helpers";
import {AnimatedSection} from "@/components/ui/animated-section";
import type {CaseData} from "@/types/performance-case";
import type {ProductionCase} from "@/types/production-case";
import {CaseStudySchema, BreadcrumbSchema} from "@/components/seo/structured-data";
import { trackCaseView, trackCaseVideoPlay } from "@/lib/analytics/track";
import {useEffect} from "react";

interface CaseTemplateProps {
  variant: "performance" | "production";
  caseData: CaseData | ProductionCase;
  locale: string;
  theme: string;
  navigation: {
    prev: {
      slug: string;
      title_pt?: string;
      title_en?: string;
      title_es?: string;
      brand: string | string[];
    } | null;
    next: {
      slug: string;
      title_pt?: string;
      title_en?: string;
      title_es?: string;
      brand: string | string[];
    } | null;
  };
}

// ✅ HELPER: Type guard melhorado
type LocalizedField<T extends CaseData | ProductionCase> = T extends CaseData
  ? CaseData
  : ProductionCase;

export function CaseTemplate({
                               variant,
                               caseData,
                               locale,
                               theme,
                               navigation,
                             }: CaseTemplateProps) {
  const logoFolder = theme === "dark" ? "white" : "black";

  // ✅ Helper function para extrair campos localizados
  const getLocalizedField = (
    fieldPt?: string,
    fieldEn?: string,
    fieldEs?: string
  ): string => {
    if (locale === "pt") return fieldPt || fieldEn || fieldEs || "";
    if (locale === "en") return fieldEn || fieldEs || fieldPt || "";
    return fieldEs || fieldEn || fieldPt || "";
  };

  // ✅ Extrair dados comuns (mais limpo)
  const data = caseData as any; // Single cast point

  const title = getLocalizedField(data.title_pt, data.title_en, data.title_es);

  // ✅ TRACK PAGE VIEW
  useEffect(() => {
    trackCaseView(caseData.slug, title, variant);
  }, [caseData.slug, title, variant]);

  // ✅ HANDLER PARA VIDEO PLAY (CORRIGIDO)
  const handleVideoPlay = () => {
    if (variant === 'performance') {
      trackCaseVideoPlay(caseData.slug, 'playlist'); // ✅ USAR videoType
    } else {
      const production = caseData as ProductionCase;
      const videoType = production.media?.hero?.videoIds ? 'carousel' : 'single';
      trackCaseVideoPlay(caseData.slug, videoType); // ✅ USAR videoType
    }
  };

  const brand = data.brand;

  const role = getLocalizedField(data.role_pt, data.role_en, data.role_es);
  const tags = locale === "pt"
    ? data.tags_pt
    : locale === "en"
      ? data.tags_en
      : data.tags_es || data.tags_en || data.tags_pt || [];

  const company = data.company;
  const period = variant === "performance"
    ? (caseData as CaseData).period
    : (caseData as ProductionCase).year;

  const baseUrl =
    variant === "performance" ? "performance-case" : "production-case";

  // Logos
  const companyLogo = companyLogos[company];
  const firstBrand = Array.isArray(brand) ? brand[0] : brand;
  const brandLogo = brandLogos[firstBrand];

  const caseUrl = `https://caiofochetto.com/${locale}/${baseUrl}/${caseData.slug}`;

  // Labels traduzidos
  const sectionLabels =
    locale === "pt"
      ? {
        capabilities: "Competências",
        relatedContent: "EXEMPLOS DE MÍDIA DESTE PROJETO",
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

  return (
      <div className="min-h-screen bg-background text-foreground">
        <CaseStudySchema
          title={title}
          description={data.challenge_pt || data.challenge_en || ""} // Usar challenge como description
          brand={brand}
          company={company}
          year={period}
          url={caseUrl}
          image={`https://caiofochetto.com/logos/${logoFolder}/${brandLogo}.svg`}
        />

        <BreadcrumbSchema
          items={[
            {name: "Home", url: `https://caiofochetto.com/${locale}`},
            {name: title, url: caseUrl}
          ]}
        />
        <Header/>

        {/* ✅ HERO */}
        <section className="px-6 pt-28 pb-16 lg:px-8">
          <AnimatedSection className="mx-auto max-w-4xl">
            {/* Topo: Voltar + Ano */}
            <div className="flex items-center justify-between mb-8">
              <Link
                href={`/${locale}`}
                className="group inline-flex items-center gap-2 text-sm text-muted-foreground transition-all hover:text-primary active:scale-95"
              >
                <ArrowLeft className="h-4 w-4 transition-transform duration-200 group-hover:-translate-x-1"
                           aria-hidden="true"/>
                {sectionLabels.back}
              </Link>

              <div
                className="group flex items-center gap-2 text-sm text-muted-foreground transition-colors duration-200 hover:text-primary">
                <Calendar
                  className="h-4 w-4 transition-transform duration-200 group-hover:rotate-12 group-hover:scale-110"
                  aria-hidden="true"/>
                <span className="font-medium text-foreground transition-colors duration-200 group-hover:text-primary">
                {period}
              </span>
              </div>
            </div>

            {/* Título */}
            <h1
              className="text-3xl font-bold text-foreground md:text-5xl mb-8 transition-colors duration-200 hover:text-primary">
              {title}
            </h1>

            {/* Linha divisória */}
            <div className="border-t border-neutral-600 mb-8"/>

            {/* Base: Logo Empresa + Logo Brand - LAYOUT FLUIDO */}
            <div className="grid grid-cols-[1fr_auto] gap-4 items-center auto-rows-auto">

              {/* Bloco 1: Logo Empresa + Info */}
              <div className="flex items-center gap-3 min-w-0">
                {companyLogo && (
                  <div
                    className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg border border-neutral-600 bg-card overflow-hidden transition-transform duration-200 hover:scale-105">
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

                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-foreground">
                    {company}
                  </p>
                  <p
                    className="text-xs text-muted-foreground transition-colors duration-200 hover:text-primary leading-tight line-clamp-4">
                    {role}
                  </p>
                </div>
              </div>

              {/* Bloco 2: Logo Brand */}
              {brandLogo && (
                <div
                  className="flex h-16 w-24 sm:w-28 md:w-32 items-center justify-end transition-transform duration-200 hover:scale-105">
                  <Image
                    src={`/logos/${logoFolder}/${brandLogo}.svg`}
                    alt={`${firstBrand} logo`}
                    width={128}
                    height={64}
                    className="h-full w-auto object-contain object-right"
                    style={{maxWidth: "100%"}}
                    unoptimized
                  />
                </div>
              )}
            </div>
          </AnimatedSection>
        </section>

        {/* ✅ VIDEO SECTION - PERFORMANCE */}
        {variant === "performance" &&
          (caseData as CaseData).playlist_url &&
          (() => {
            const url = new URL((caseData as CaseData).playlist_url!);

            const playlistId = url.searchParams.get("list");
            const videoId = url.searchParams.get("v");

            if (!playlistId && !videoId) return null;

            const embedUrl = playlistId
              ? `https://www.youtube.com/embed/videoseries?list=${playlistId}`
              : `https://www.youtube.com/embed/${videoId}`;

            return (
              <section className="px-0 sm:px-6 py-12 sm:py-16 lg:px-8">
                <AnimatedSection className="mx-auto w-full sm:max-w-4xl">
                  <div className="px-6 sm:px-0 mb-6 sm:mb-8">
                    <div className="flex items-center gap-2">
                      <Play className="h-4 w-4 text-primary" aria-hidden="true"/>
                      <h2 className="text-xs font-medium uppercase tracking-widest text-primary">
                        {sectionLabels.relatedContent}
                      </h2>
                    </div>
                  </div>

                  <div
                    onClick={handleVideoPlay}
                    className="relative aspect-video w-full overflow-hidden sm:rounded-lg border-0 sm:border sm:border-neutral-600 bg-card/50 backdrop-blur-sm">
                    <YouTubeEmbed
                      type={playlistId ? "playlist" : "video"} // ✅ DETECTAR TIPO
                      videoId={playlistId || videoId || ""} // ✅ PLAYLIST ID OU VIDEO ID
                      title={`${firstBrand} - Playlist`}
                    />
                  </div>

                  <div className="mt-4 px-6 sm:px-0 flex justify-center">
                    <a
                      href={(caseData as CaseData).playlist_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
                    >
                      <span>{sectionLabels.viewFullPlaylist}</span>
                      <ArrowUpRight
                        className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1"
                        aria-hidden="true"/>
                    </a>
                  </div>
                </AnimatedSection>
              </section>
            );
          })()}

        {/* ✅ VIDEO SECTION - PRODUCTION */}
        {variant === "production" &&
          (caseData as ProductionCase).media?.hero &&
          (() => {
            const {type, videoId, videoIds} = (caseData as ProductionCase)
              .media.hero;

            if (!type || (!videoId && !videoIds)) return null;

            return (
              <section className="px-0 sm:px-6 py-12 sm:py-16 lg:px-8">
                <AnimatedSection className="mx-auto w-full sm:max-w-4xl">
                  <div className="px-6 sm:px-0 mb-6 sm:mb-8">
                    <div className="flex items-center gap-2">
                      <Play className="h-4 w-4 text-primary" aria-hidden="true"/>
                      <h2 className="text-xs font-medium uppercase tracking-widest text-primary">
                        {sectionLabels.relatedContent}
                      </h2>
                    </div>
                  </div>

                  <div
                    onClick={handleVideoPlay}
                    className="sm:rounded-lg overflow-hidden border-0 sm:border sm:border-neutral-600 bg-card/50 backdrop-blur-sm">
                    <YouTubeEmbed
                      type={type}
                      videoId={videoId}
                      videoIds={videoIds}
                      title={title}
                      placeholder={
                        (caseData as ProductionCase).media.hero.placeholder
                      }
                    />
                  </div>
                </AnimatedSection>
              </section>
            );
          })()}

        {/* ✅ SPECIFIC SECTIONS */}
        {variant === "performance" ? (
          <PerformanceSections caseData={caseData as CaseData} locale={locale}/>
        ) : (
          <ProductionSections
            caseData={caseData as ProductionCase}
            locale={locale}
          />
        )}

        {/* ✅ TAGS / CAPABILITIES */}
        <section className="px-6 py-16 lg:px-8">
          <AnimatedSection className="mx-auto max-w-4xl">
            <div className="mb-4 flex items-center gap-2">
              <Tag className="h-4 w-4 text-primary" aria-hidden="true"/>
              <p className="text-xs font-medium uppercase tracking-widest text-primary">
                {sectionLabels.capabilities}
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag: string, index: number) => (
                <span
                  key={index}
                  className="rounded-full border border-neutral-600 px-4 py-2 text-sm font-medium text-muted-foreground transition-all duration-200 bg-card hover:border-primary hover:text-primary hover:scale-105"
                >
                {tag}
              </span>
              ))}
            </div>
          </AnimatedSection>
        </section>

        {/* ✅ NAVIGATION */}
        <section className="px-6 py-16 lg:px-8">
          <AnimatedSection className="mx-auto max-w-4xl border-t border-neutral-600 pt-12">
            <div className="grid gap-6 md:grid-cols-2">
              {navigation.prev && (
                <Link
                  href={`/${locale}/${baseUrl}/${navigation.prev.slug}`}
                  className="group flex flex-col gap-3 rounded-lg border border-neutral-600 bg-card p-6 transition-all duration-200 hover:border-primary active:scale-[0.98]"
                >
                  <div className="flex items-center gap-2 text-xs font-semibold text-primary">
                    <ArrowLeft className="h-4 w-4 transition-transform duration-200 group-hover:-translate-x-1"
                               aria-hidden="true"/>
                    {sectionLabels.previous}
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">
                      {Array.isArray(navigation.prev.brand)
                        ? navigation.prev.brand.join(", ")
                        : navigation.prev.brand}
                    </p>
                    <h3
                      className="mt-1 line-clamp-2 text-base font-bold text-foreground group-hover:text-primary transition-colors">
                      {getLocalizedField(
                        navigation.prev.title_pt,
                        navigation.prev.title_en,
                        navigation.prev.title_es
                      )}
                    </h3>
                  </div>
                </Link>
              )}

              {navigation.next && (
                <Link
                  href={`/${locale}/${baseUrl}/${navigation.next.slug}`}
                  className="group flex flex-col gap-3 rounded-lg border border-neutral-600 bg-card p-6 transition-all duration-200 hover:border-primary active:scale-[0.98]"
                >
                  <div className="flex items-center justify-end gap-2 text-xs font-semibold text-primary">
                    {sectionLabels.next}
                    <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
                                aria-hidden="true"/>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground">
                      {Array.isArray(navigation.next.brand)
                        ? navigation.next.brand.join(", ")
                        : navigation.next.brand}
                    </p>
                    <h3
                      className="mt-1 line-clamp-2 text-base font-bold text-foreground group-hover:text-primary transition-colors">
                      {getLocalizedField(
                        navigation.next.title_pt,
                        navigation.next.title_en,
                        navigation.next.title_es
                      )}
                    </h3>
                  </div>
                </Link>
              )}
            </div>
          </AnimatedSection>
        </section>

        {/* ✅ FOOTER */}
        <Footer/>
      </div>
  )
}


