// app/production/[slug]/page.tsx
// VERSÃO FINAL: Logo uniforme + Ano oculto mobile + Vídeo full-width

"use client";

import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { useState, useEffect } from "react";
import { useTheme } from "@/components/theme-provider";
import { YouTubeEmbed } from "@/components/youtube-embed";
import {
  ArrowLeft,
  ArrowRight,
  Tag,
  Play,
  Calendar,
  BookOpen,
  User,
} from "lucide-react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import {
  getProductionCaseBySlug,
  getProductionCaseNavigation,
} from "@/lib/production-cases";

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
  "Netflix": "netflix",
  "Budweiser": "budweiser",
  "HISTORY": "history",
  "Natura": "natura",
  "A&E": "ae",
  "Bradesco": "bradesco",
  "Havaianas": "havaianas",
  "Bohemia": "bohemia",
  "Nestlé": "nestle",
  "Playground": "playground",
};

type PageProps = { params: Promise<{ slug: string }> };

export default function ProductionCasePage({ params }: PageProps) {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [resolvedParams, setResolvedParams] = useState<{ slug: string } | null>(null);

  useEffect(() => {
    setMounted(true);
    params.then(setResolvedParams);
  }, [params]);

  if (!mounted || !resolvedParams) return null;

  const { slug } = resolvedParams;
  const productionCase = getProductionCaseBySlug(slug);
  if (!productionCase) notFound();

  const logoFolder = theme === "dark" ? "white" : "black";
  const { title, brand, company, year, role, what, myRole, tags, media } = productionCase;
  const navigation = getProductionCaseNavigation(slug);
  const brandLogo = brandLogos[brand];
  const companyLogo = companyLogos[company];

  const sectionLabels = {
    what: "O QUE É?",
    myRole: "MEU PAPEL",
    capabilities: "COMPETÊNCIAS",
    relatedContent: "CONTEÚDO RELACIONADO",
    back: "Voltar",
    previous: "Anterior",
    next: "Próximo",
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      {/* Hero */}
      <section className="px-6 pt-28 pb-16 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="flex items-center justify-between gap-4">
            {brandLogo ? (
              <div className="flex h-16 w-32 items-center justify-start">
                <Image
                  src={`/logos/${logoFolder}/${brandLogo}.svg`}
                  alt={`${brand} logo`}
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
              href="/#work"
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

            {/* Ano - APENAS tablet+ */}
            <div className="hidden sm:flex items-center gap-2 text-sm">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium text-foreground">{year}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Playlist/Video - Full-width mobile */}
      {media.hero.type && (media.hero.videoId || media.hero.videoIds) && (
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
                type={media.hero.type}
                videoId={media.hero.videoId}
                videoIds={media.hero.videoIds}
                title={title}
                placeholder={media.hero.placeholder}
              />
            </div>
          </div>
        </section>
      )}

      {/* O QUE É? */}
      <section className="px-6 py-12 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="flex items-center gap-2 mb-4">
            <BookOpen className="h-4 w-4 text-primary" />
            <h2 className="text-xs font-medium uppercase tracking-widest text-primary">
              {sectionLabels.what}
            </h2>
          </div>
          <p className="text-base leading-relaxed text-muted-foreground">{what}</p>
        </div>
      </section>

      {/* MEU PAPEL */}
      <section className="px-6 py-12 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="flex items-center gap-2 mb-4">
            <User className="h-4 w-4 text-primary" />
            <h2 className="text-xs font-medium uppercase tracking-widest text-primary">
              {sectionLabels.myRole}
            </h2>
          </div>
          <p className="text-base leading-relaxed text-muted-foreground">{myRole}</p>
        </div>
      </section>

      {/* COMPETÊNCIAS */}
      <section className="px-6 py-16 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="mb-4 flex items-center gap-2">
            <Tag className="h-4 w-4 text-primary" />
            <p className="text-xs font-medium uppercase tracking-widest text-primary">
              {sectionLabels.capabilities}
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {tags.map((capability, index) => (
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
            {navigation.prev && (
              <Link
                href={`/production/${navigation.prev.slug}`}
                className="group flex flex-col gap-3 rounded-lg border border-neutral-600 p-6 transition-all duration-200 hover:border-primary hover:bg-card/50 active:scale-[0.98]"
              >
                <div className="flex items-center gap-2 text-xs font-semibold text-primary">
                  <ArrowLeft className="h-4 w-4" />
                  {sectionLabels.previous}
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">{navigation.prev.brand}</p>
                  <h3 className="mt-1 line-clamp-2 text-base font-bold text-foreground group-hover:text-primary transition-colors">
                    {navigation.prev.title}
                  </h3>
                </div>
              </Link>
            )}

            {navigation.next && (
              <Link
                href={`/production/${navigation.next.slug}`}
                className="group flex flex-col gap-3 rounded-lg border border-neutral-600 p-6 transition-all duration-200 hover:border-primary hover:bg-card/50 active:scale-[0.98]"
              >
                <div className="flex items-center justify-end gap-2 text-xs font-semibold text-primary">
                  {sectionLabels.next}
                  <ArrowRight className="h-4 w-4" />
                </div>
                <div className="text-right">
                  <p className="text-xs text-muted-foreground">{navigation.next.brand}</p>
                  <h3 className="mt-1 line-clamp-2 text-base font-bold text-foreground group-hover:text-primary transition-colors">
                    {navigation.next.title}
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