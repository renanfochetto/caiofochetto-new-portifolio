// components/templates/case-template.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import {ArrowLeft, ArrowRight, Tag, Play, Calendar, ArrowUpRight} from "@/lib/icons";
import {Header} from "@/components/layout/header";
import {Footer} from "@/components/layout/footer";
import {YouTubeEmbed} from "@/components/media/youtube-embed";
import dynamic from "next/dynamic";
import {companyLogos, brandLogos} from "@/lib/helpers/case-helpers";
import {AnimatedSection} from "@/components/ui/animated-section";
import {CaseStudySchema, BreadcrumbSchema} from "@/components/seo/structured-data";
import {trackCaseView, trackCaseVideoPlay} from "@/lib/analytics/track";
import {useEffect} from "react";
import {Logo} from "@/components/ui/logo";

// ✅ SINGLE IMPORT POINT!
import {
  CaseData,
  ProductionCase,
  CaseNavigation,
  Locale,
  isCaseData,
  isProductionCase,
  getLocalizedField,
  getLocalizedArray
} from '@/types';

const PerformanceSections = dynamic(
  () => import("@/components/case/performance-sections").then(mod => ({default: mod.PerformanceSections})),
  {ssr: true}
);

const ProductionSections = dynamic(
  () => import("@/components/case/production-sections").then(mod => ({default: mod.ProductionSections})),
  {ssr: true}
);

// ✅ Props locais do componente (não exportadas)
interface CaseTemplateProps {
  variant: "performance" | "production";
  caseData: CaseData | ProductionCase;
  locale: string;
  theme: string;
  navigation: CaseNavigation;
}

export function CaseTemplate({
                               variant,
                               caseData,
                               locale,
                               theme,
                               navigation,
                             }: CaseTemplateProps) {

  // ✅ TYPE-SAFE EXTRACTION usando utilities
  const localeTyped = locale as Locale;

  const title = getLocalizedField(caseData, 'title', localeTyped);
  const role = getLocalizedField(caseData, 'role', localeTyped);
  const challenge = getLocalizedField(caseData, 'challenge', localeTyped);
  const tags = getLocalizedArray(caseData, 'tags', localeTyped);

  const brand = caseData.brand;
  const company = caseData.company;

  // ✅ Type-safe period extraction usando type guard
  const period = isCaseData(caseData) ? caseData.period : caseData.year;

  const baseUrl = variant === "performance" ? "performance-case" : "production-case";

  // Logos
  const companyLogo = companyLogos[company];
  const firstBrand = Array.isArray(brand) ? brand[0] : brand;
  const brandLogo = brandLogos[firstBrand];

  const caseUrl = `https://caiofochetto.com/${locale}/${baseUrl}/${caseData.slug}`;

  // ✅ TRACK PAGE VIEW
  useEffect(() => {
    trackCaseView(caseData.slug, title, variant);
  }, [caseData.slug, title, variant]);

  // ✅ HANDLER PARA VIDEO PLAY (type-safe)
  const handleVideoPlay = () => {
    if (isCaseData(caseData)) {
      trackCaseVideoPlay(caseData.slug, 'playlist');
    } else if (isProductionCase(caseData)) {
      const videoType = caseData.media?.hero?.videoIds ? 'carousel' : 'single';
      trackCaseVideoPlay(caseData.slug, videoType);
    }
  };

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
        description={challenge}
        brand={brand}
        company={company}
        year={period}
        url={caseUrl}
        image={`https://caiofochetto.com/logos/${brandLogo}.svg`}
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

          {/* Base: Logo Empresa + Logo Brand */}
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
                    loading="lazy"
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
                <Logo
                  name={brandLogo}
                  alt={`${firstBrand} logo`}
                  width={128}
                  height={64}
                  className="h-full w-auto object-contain object-right"
                  style={{maxWidth: "100%"}}
                />
              </div>
            )}
          </div>
        </AnimatedSection>
      </section>

      {/* ✅ VIDEO SECTION - PERFORMANCE (type-safe!) */}
      {variant === "performance" && isCaseData(caseData) && caseData.playlist_url && (() => {
        const url = new URL(caseData.playlist_url);
        const playlistId = url.searchParams.get("list");
        const videoId = url.searchParams.get("v");

        if (!playlistId && !videoId) return null;

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
                  type={playlistId ? "playlist" : "video"}
                  videoId={playlistId || videoId || ""}
                  title={`${firstBrand} - Playlist`}
                />
              </div>

              <div className="mt-4 px-6 sm:px-0 flex justify-center">
                <a
                  href={caseData.playlist_url}
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

      {/* ✅ VIDEO SECTION - PRODUCTION (type-safe!) */}
      {variant === "production" && isProductionCase(caseData) && caseData.media?.hero && (() => {
        const {type, videoId, videoIds, placeholder} = caseData.media.hero;

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
                  placeholder={placeholder}
                />
              </div>
            </AnimatedSection>
          </section>
        );
      })()}

      {/* ✅ SPECIFIC SECTIONS (type-safe!) */}
      {isCaseData(caseData) ? (
        <PerformanceSections caseData={caseData} locale={locale}/>
      ) : (
        <ProductionSections caseData={caseData} locale={locale}/>
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
                    {getLocalizedField(navigation.prev, 'title', localeTyped)}
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
                    {getLocalizedField(navigation.next, 'title', localeTyped)}
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
  );
}
