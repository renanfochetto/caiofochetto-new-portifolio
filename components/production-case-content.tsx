"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Play } from "lucide-react";
import { useTheme } from "./theme-provider";
import { YouTubeEmbed } from "./youtube-embed";
import type { ProductionCase } from "@/types/production";
import { getAllProductionCases } from "@/lib/production-cases";

interface ProductionCaseContentProps {
  productionCase: ProductionCase;
}

export function ProductionCaseContent({ productionCase }: ProductionCaseContentProps) {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Determinar pasta de logo baseado no tema
  const logoFolder = theme === "dark" ? "white" : "black";

  // Mapping de logos
  const logoMapping: Record<string, string> = {
    "Netflix": "netflix",
    "Natura": "natura",
    "Havaianas + Netflix": "havaianas",
    "Playground": "playground",
    "Bohemia": "bohemia",
    "Nestlé": "nestle",
  };

  const brandLogo = logoMapping[productionCase.brand];

  // Navegação (prev/next - isolada apenas production)
  const allCases = getAllProductionCases();
  const currentIndex = allCases.findIndex((c) => c.slug === productionCase.slug);
  const prevCase = currentIndex > 0 ? allCases[currentIndex - 1] : null;
  const nextCase = currentIndex < allCases.length - 1 ? allCases[currentIndex + 1] : null;

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative bg-card">
        <div className="mx-auto max-w-6xl px-6 py-12 lg:px-8">
          {/* Back button */}
          <Link
            href="/#work"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar para trabalhos
          </Link>

          {/* Logo + Title */}
          <div className="mt-8 flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
            <div className="flex-1">
              {/* Logo */}
              {mounted && brandLogo && (
                <div className="mb-6 flex h-16 w-32 items-center justify-start">
                  <Image
                    src={`/logos/${logoFolder}/${brandLogo}.svg`}
                    alt={`${productionCase.brand} logo`}
                    width={128}
                    height={64}
                    className="h-full w-auto object-contain object-left"
                    unoptimized
                  />
                </div>
              )}

              {/* Title */}
              <h1 className="text-4xl font-bold text-foreground md:text-5xl">
                {productionCase.title}
              </h1>

              {/* Meta info */}
              <div className="mt-4 flex flex-wrap items-center gap-3 text-muted-foreground">
                <span className="font-semibold text-primary">{productionCase.role}</span>
                <span>•</span>
                <span>{productionCase.type}</span>
                <span>•</span>
                <span>{productionCase.year}</span>
              </div>
            </div>

            {/* Video badge */}
            <div className="flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/5 px-4 py-2">
              <Play className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-primary">Vídeo disponível</span>
            </div>
          </div>
        </div>
      </section>

      {/* Hero Video/Image */}
      {productionCase.media.hero && (
        <section className="bg-card">
          <div className="mx-auto max-w-6xl px-6 pb-12 lg:px-8">
            <div className="overflow-hidden rounded-lg">
              {productionCase.media.hero.type === "video" ? (
                <YouTubeEmbed
                  videoId={productionCase.media.hero.videoId || ""}
                  title={productionCase.title}
                  placeholder={productionCase.media.hero.placeholder}
                />
              ) : productionCase.media.hero.type == "playlist" ? (
                <YouTubeEmbed
                  type="playlist"
                  videoId={productionCase.media.hero.videoId}
                  title={productionCase.title}
                  placeholder={productionCase.media.hero.placeholder}
                />
              ) : (
                <div className="space-y-4">
                  {productionCase.media.hero.videoIds?.map((videoId, idx) => (
                    <YouTubeEmbed
                      key={idx}
                      videoId={videoId}
                      title={`${productionCase.title} - Part ${idx + 1}`}
                      placeholder={productionCase.media.hero.placeholder}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Content */}
      <section className="py-16">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          {/* What is it? */}
          <div className="mb-12">
            <h2 className="mb-4 text-2xl font-bold text-foreground">What is it?</h2>
            <p className="text-lg leading-relaxed text-muted-foreground">
              {productionCase.what}
            </p>
          </div>

          {/* My Role */}
          <div className="mb-12">
            <h2 className="mb-4 text-2xl font-bold text-foreground">My Role</h2>
            <p className="text-lg leading-relaxed text-muted-foreground">
              {productionCase.myRole}
            </p>
          </div>

          {/* Tags */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Capabilities
            </h3>
            <div className="flex flex-wrap gap-2">
              {productionCase.tags.map((tag, index) => (
                <span
                  key={index}
                  className="rounded-full border border-neutral-600 px-4 py-2 text-sm font-medium text-muted-foreground transition-colors duration-200 hover:border-primary hover:text-primary"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Navigation */}
      <section className="border-t border-neutral-600 bg-card py-12">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="grid gap-6 md:grid-cols-2">
            {/* Previous Case */}
            {prevCase && (
              <Link
                href={`/production/${prevCase.slug}`}
                className="group flex items-center gap-4 rounded-lg border border-neutral-600 bg-background p-6 transition-all hover:border-primary"
              >
                <ArrowLeft className="h-5 w-5 flex-shrink-0 text-muted-foreground transition-colors group-hover:text-primary" />
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    Anterior
                  </p>
                  <p className="mt-1 truncate text-lg font-semibold text-foreground group-hover:text-primary">
                    {prevCase.title}
                  </p>
                </div>
              </Link>
            )}

            {/* Next Case */}
            {nextCase && (
              <Link
                href={`/production/${nextCase.slug}`}
                className="group flex items-center gap-4 rounded-lg border border-neutral-600 bg-background p-6 transition-all hover:border-primary md:ml-auto"
              >
                <div className="min-w-0 flex-1 text-right">
                  <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    Próximo
                  </p>
                  <p className="mt-1 truncate text-lg font-semibold text-foreground group-hover:text-primary">
                    {nextCase.title}
                  </p>
                </div>
                <ArrowRight className="h-5 w-5 flex-shrink-0 text-muted-foreground transition-colors group-hover:text-primary" />
              </Link>
            )}
          </div>

          {/* Back to all cases */}
          <div className="mt-8 text-center">
            <Link
              href="/#work"
              className="inline-flex items-center gap-2 rounded-lg border border-neutral-600 px-6 py-3 text-sm font-medium text-foreground transition-all hover:border-primary hover:text-primary"
            >
              Ver todos os trabalhos
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
