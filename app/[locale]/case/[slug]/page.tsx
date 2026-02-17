// app/[locale]/case/[slug]/page.tsx
// VERSÃO FINAL: Logo uniforme (padrão production) + Ano oculto mobile

"use client";

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { useState, useEffect } from "react";
import { AnimatedCounter } from "@/components/animated-counter";
import { useTheme } from "@/components/theme-provider";
import {
  ArrowLeft,
  ArrowUpRight,
  CheckCircle,
  Tag,
  ArrowRight,
  Target,
  Lightbulb,
  TrendingUp,
  BookOpen,
  Calendar,
  Users,
  Eye,
  Heart,
  MessageCircle,
  DollarSign,
  MousePointerClick,
  Play,
  BarChart3
} from "lucide-react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { getCaseBySlug, getAllSlugs, caseStudies } from "@/lib/cases";

const SITE_URL = "https://www.caiofochetto.com";

const companyLogos: Record<string, string> = {
  "Octagon": "octagon.avif",
  "A+E Networks": "aenetworks.avif",
  "Jellysmack": "jellysmack.avif",
  "Playground": "playground.avif",
  "Portal R7": "portalr7.avif",
  "Rede Boa Nova": "redeboanova.avif",
  "TV Cultura": "tvcultura.avif",
  "TV Mundo Maior": "tvmundomaior.avif",
};

const brandLogos: Record<string, string> = {
  "Betfair": "betfair",
  "Budweiser": "budweiser",
  "Formula E": "formulae",
  "HISTORY": "history",
  "A&E": "ae",
  "Lifetime": "lifetime",
};

const getMetricIcon = (label: string) => {
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

type PageProps = { params: Promise<{ locale: string; slug: string }> };

export default function CaseStudyPage({ params }: PageProps) {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [resolvedParams, setResolvedParams] = useState<{ locale: string; slug: string } | null>(null);

  useEffect(() => {
    setMounted(true);
    params.then(setResolvedParams);
  }, [params]);

  if (!mounted || !resolvedParams) return null;

  const { locale, slug } = resolvedParams;
  const study = getCaseBySlug(slug);
  if (!study) notFound();

  const logoFolder = theme === "dark" ? "white" : "black";
  const title = locale === 'pt' ? study.title_pt : study.title_en;
  const challenge = locale === 'pt' ? study.challenge_pt : study.challenge_en;
  const solution = locale === 'pt' ? study.solution_pt : study.solution_en;
  const learnings = locale === 'pt' ? study.key_learnings_pt : study.key_learnings_en;
  const capabilities = locale === 'pt' ? study.capabilities_pt : study.capabilities_en;
  const role = locale === 'pt' ? study.role_pt : study.role_en;

  const brandDisplay = Array.isArray(study.brand) ? study.brand.join(', ') : study.brand;
  const companyLogo = companyLogos[study.company];
  const firstBrand = Array.isArray(study.brand) ? study.brand[0] : study.brand;
  const brandLogo = brandLogos[firstBrand];

  const sectionLabels = locale === "pt"
    ? {
      challenge: "Desafio",
      solution: "Solução",
      results: "Resultados",
      learnings: "Principais Aprendizados",
      capabilities: "Competências",
      back: "Voltar",
      previous: "Anterior",
      next: "Próximo"
    }
    : {
      challenge: "Challenge",
      solution: "Solution",
      results: "Results",
      learnings: "Key Learnings",
      capabilities: "Capabilities",
      back: "Back",
      previous: "Previous",
      next: "Next"
    };

  const currentIndex = caseStudies.findIndex((c) => c.slug === slug);
  const prevCase = currentIndex > 0 ? caseStudies[currentIndex - 1] : caseStudies[caseStudies.length - 1];
  const prevCaseTitle = locale === 'pt' ? prevCase.title_pt : prevCase.title_en;
  const prevCaseBrand = Array.isArray(prevCase.brand) ? prevCase.brand.join(', ') : prevCase.brand;

  const nextCase = currentIndex < caseStudies.length - 1 ? caseStudies[currentIndex + 1] : caseStudies[0];
  const nextCaseTitle = locale === 'pt' ? nextCase.title_pt : nextCase.title_en;
  const nextCaseBrand = Array.isArray(nextCase.brand) ? nextCase.brand.join(', ') : nextCase.brand;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: `${brandDisplay} - ${title}`,
    description: challenge,
    url: `${SITE_URL}/${locale}/case/${slug}`,
    author: { "@type": "Person", name: "Caio Fochetto", url: SITE_URL },
    dateCreated: study.period,
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <section className="px-6 pt-28 pb-16 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="flex items-center justify-between gap-4">
            {brandLogo ? (
              <div className="flex h-16 w-32 items-center justify-start">
                <Image
                  src={`/logos/${logoFolder}/${brandLogo}.svg`}
                  alt={`${firstBrand} logo`}
                  width={128}
                  height={64}
                  className="h-full w-auto object-contain object-left"
                  style={{ maxWidth: "100%" }}
                  unoptimized
                />
              </div>
            ) : (
              <div className="h-16 w-32" />
            )}

            <Link
              href={`/${locale}`}
              className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-all hover:text-primary active:scale-95"
            >
              <ArrowLeft className="h-4 w-4" />
              {sectionLabels.back}
            </Link>
          </div>

          <div className="mt-8">
            <h1 className="text-3xl font-bold text-foreground md:text-5xl">
              {title}
            </h1>
          </div>

          {/* ✅ Meta Info - Logo uniforme + Ano oculto em mobile */}
          <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-neutral-600 pt-6">
            <div className="flex items-center gap-3 sm:gap-4">
              {companyLogo && (
                <div className="flex-shrink-0 flex h-12 w-12 items-center justify-center rounded-lg border border-neutral-600 bg-card overflow-hidden">
                  <Image
                    src={`/companies/${companyLogo}`}
                    alt={`${study.company} logo`}
                    width={48}
                    height={48}
                    className="h-full w-auto object-cover"
                    unoptimized
                  />
                </div>
              )}

              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-foreground truncate">{study.company}</p>
                <p className="text-xs text-muted-foreground line-clamp-2">{role}</p>
              </div>
            </div>

            {/* Ano - APENAS tablet+ */}
            <div className="hidden sm:flex items-center gap-2 text-sm">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium text-foreground">{study.period}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Playlist Section - Vídeo full-width mobile */}
      {study.playlist_url && (() => {
        const playlistId = (() => {
          try {
            const url = new URL(study.playlist_url);
            return url.searchParams.get('list');
          } catch {
            return null;
          }
        })();

        if (!playlistId) return null;

        const embedUrl = `https://www.youtube.com/embed/videoseries?list=${playlistId}`;
        const playlistLabel = locale === 'pt' ? 'CONTEÚDO RELACIONADO' : 'RELATED CONTENT';
        const viewFullLabel = locale === 'pt' ? 'Ver playlist completa no YouTube' : 'View full playlist on YouTube';

        return (
          <section className="px-0 sm:px-6 py-12 sm:py-16 lg:px-8">
            <div className="mx-auto w-full sm:max-w-4xl">
              <div className="px-6 sm:px-0 mb-6 sm:mb-8">
                <div className="flex items-center gap-2">
                  <Play className="h-4 w-4 text-primary" />
                  <h2 className="text-xs font-medium uppercase tracking-widest text-primary">
                    {playlistLabel}
                  </h2>
                </div>
              </div>

              <div className="relative aspect-video w-full overflow-hidden sm:rounded-lg border-0 sm:border sm:border-neutral-600 bg-background">
                <iframe
                  width="100%"
                  height="100%"
                  src={embedUrl}
                  title={`${brandDisplay} - Playlist`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="h-full w-full"
                />
              </div>

              <div className="mt-4 px-6 sm:px-0 flex justify-center">
                <a
                  href={study.playlist_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  <span>{viewFullLabel}</span>
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          </section>
        );
      })()}

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
            {study.metrics.map((metric, index) => {
              const label = locale === 'pt' ? metric.label_pt : metric.label_en;
              const description = locale === 'pt' ? metric.description_pt : metric.description_en;
              const IconComponent = getMetricIcon(label);

              return (
                <div key={index} className="rounded-lg border border-neutral-600 bg-card p-6 transition-colors hover:border-primary">
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

      {/* Capabilities */}
      <section className="px-6 py-16 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="mb-4 flex items-center gap-2">
            <Tag className="h-4 w-4 text-primary" />
            <p className="text-xs font-medium uppercase tracking-widest text-primary">
              {sectionLabels.capabilities}
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {capabilities.map((capability, index) => (
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

      {/* Navigation */}
      <section className="px-6 py-16 lg:px-8">
        <div className="mx-auto max-w-4xl border-t border-neutral-600 pt-12">
          <div className="grid gap-6 md:grid-cols-2">
            <Link
              href={`/${locale}/case/${prevCase.slug}`}
              className="group flex flex-col gap-3 rounded-lg border border-neutral-600 p-6 transition-all duration-200 hover:border-primary hover:bg-card/50 active:scale-[0.98]"
            >
              <div className="flex items-center gap-2 text-xs font-semibold text-primary">
                <ArrowLeft className="h-4 w-4" />
                {sectionLabels.previous}
              </div>
              <div>
                <p className="text-xs text-muted-foreground">{prevCaseBrand}</p>
                <h3 className="mt-1 line-clamp-2 text-base font-bold text-foreground group-hover:text-primary transition-colors">
                  {prevCaseTitle}
                </h3>
              </div>
            </Link>

            <Link
              href={`/${locale}/case/${nextCase.slug}`}
              className="group flex flex-col gap-3 rounded-lg border border-neutral-600 p-6 transition-all duration-200 hover:border-primary hover:bg-card/50 active:scale-[0.98]"
            >
              <div className="flex items-center justify-end gap-2 text-xs font-semibold text-primary">
                {sectionLabels.next}
                <ArrowRight className="h-4 w-4" />
              </div>
              <div className="text-right">
                <p className="text-xs text-muted-foreground">{nextCaseBrand}</p>
                <h3 className="mt-1 line-clamp-2 text-base font-bold text-foreground group-hover:text-primary transition-colors">
                  {nextCaseTitle}
                </h3>
              </div>
            </Link>
          </div>
        </div>
      </section>

      <Footer hideContact={true} />
    </div>
  );
}