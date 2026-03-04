"use client";

import {useI18n} from "@/components/providers/i18n-provider";
import {ArrowDown} from "lucide-react";
import {AnimatedSection} from "../ui/animated-section";

export function HeroSection() {
  const {t} = useI18n();

  return (
    <section className="relative flex min-h-svh flex-col justify-center px-4 py-16 sm:px-6 md:px-8 md:py-20 lg:py-24">
      <AnimatedSection className="mx-auto w-full max-w-6xl">
        <div className="flex flex-col gap-6 md:gap-8">
          {/* Badge - AGORA CLICÁVEL */}
          <a
            href="#contact"
            className="inline-flex w-fit items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-3 py-1.5 md:px-4 md:py-2 hover:bg-primary/15 transition-colors cursor-pointer"
          >
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary"/>
            <span className="text-xs font-medium text-primary md:text-sm">{t.hero.badge}</span>
          </a>

          {/* Heading PRINCIPAL - todas as linhas com MESMO tamanho */}
          <h1
            className="font-display text-3xl font-bold leading-tight tracking-tight text-foreground text-balance sm:text-4xl md:text-5xl lg:text-7xl">
            {t.hero.headingLine1}
            <br/>
            {t.hero.headingLine2}
            <br/>
            {/* Forçar mesmo tamanho que as linhas acima */}
            <span className="font-heading text-primary text-3xl sm:text-4xl md:text-5xl lg:text-7xl">
              {t.hero.headingLine3}
            </span>
          </h1>

          {/* Subtitle/Descrição */}
          <p className="max-w-xl md:max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base md:text-lg lg:text-xl">
            {t.hero.subtitle}
          </p>

          {/* CTA */}
          <div>
            <a
              href="#work"
              className="
          inline-flex items-center justify-center gap-2
          rounded-full
          bg-primary/90
          hover:bg-primary
          active:scale-95
          border border-foreground/95
          px-4 py-2.5
          sm:px-5 sm:py-3
          md:px-6
          text-xs font-medium
          sm:text-sm
          text-primary-foreground
          transition-all duration-200
          "
            >
              {t.hero.cta}
              <ArrowDown className="h-3.5 w-3.5 sm:h-4 sm:w-4" aria-hidden="true" />
            </a>
          </div>
        </div>
      </AnimatedSection>
    </section>
  );
}
