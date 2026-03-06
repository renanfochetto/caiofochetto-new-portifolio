"use client";

import Image from "next/image";
import {useI18n} from "@/components/providers/i18n-provider";
import {Sparkles, Globe, Fingerprint} from "@/lib/icons";
import {AnimatedSection, AnimatedItem} from "../ui/animated-section";
import {useTheme} from "@/components/providers/theme-provider";
import {useState} from "react";

export function AboutSection() {
  const {t} = useI18n();
  const {theme} = useTheme();
  const [isHovered, setIsHovered] = useState(false);

  // ✅ Glow sutil e elegante
  const getShadowStyle = () => {
    if (theme === 'dark') {
      return {
        filter: isHovered
          ? 'drop-shadow(0px 2px 12px rgba(202, 255, 0, 0.25))'   // Hover
          : 'drop-shadow(0px 2px 8px rgba(202, 255, 0, 0.2))'     // Normal
      };
    } else {
      return {
        filter: isHovered
          ? 'drop-shadow(0px 2px 12px rgba(0, 0, 0, 0.45))'       // Hover
          : 'drop-shadow(0px 2px 8px rgba(0, 0, 0, 0.4))'         // Normal
      };
    }
  };

  return (
    <section id="about" className="px-6 py-24 lg:px-8">
      <AnimatedSection className="mx-auto max-w-6xl">
        <div className="flex items-center gap-2 mb-2">
          <Fingerprint className="h-4 w-4 text-primary" aria-hidden="true" />
          <p className="text-xs font-medium uppercase tracking-widest text-primary">
            {t.about.sectionLabel}
          </p>
        </div>
        <h2 className="mt-2 text-3xl font-bold text-foreground md:text-4xl">
          {t.about.heading}
        </h2>

        {/*
          ✅ LAYOUT RESPONSIVO:
          - Mobile: Texto contorna foto (float-left)
          - Tablet/Desktop: Grid 2 colunas (foto | texto)
        */}
        <div className="mt-12 md:grid md:gap-12 md:grid-cols-[280px_1fr] lg:grid-cols-[380px_1fr] lg:gap-16">

          {/* COLUNA 1: Foto */}
          <AnimatedItem index={0}
                        className="float-left mr-4 mb-2 w-[140px] sm:w-[180px] md:float-none md:mr-0 md:mb-0 md:w-full">
            <div className="relative group w-full">
              {/* ✨ Shadow sutil e elegante */}
              <div
                className="relative transition-all duration-700"
                style={getShadowStyle()}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                <Image
                  src="/images/foto_caio.avif"
                  alt={t.about.imageAlt}
                  width={380}
                  height={475}
                  className="w-full h-auto object-cover transition-all duration-700
                    rounded-2xl md:rounded-[2rem]
                    group-hover:scale-105
                  "
                  unoptimized={true}
                  priority={false}
                />
              </div>
            </div>
          </AnimatedItem>

          {/* COLUNA 2: Texto e Tags */}
          <div className="space-y-3 sm:space-y-4 md:flex md:flex-col md:justify-between md:h-full">
            <AnimatedItem index={1}>
              <p className="text-sm sm:text-base leading-relaxed text-muted-foreground">
                {t.about.p1}
              </p>
            </AnimatedItem>

            <AnimatedItem index={2}>
              <p className="text-sm sm:text-base leading-relaxed text-muted-foreground">
                {t.about.p2}
              </p>
            </AnimatedItem>

            <AnimatedItem index={3}>
              <p className="flex items-start gap-2 text-sm sm:text-base leading-relaxed text-muted-foreground">
                <Globe className="mt-1 h-3.5 w-3.5 sm:h-4 sm:w-4 flex-shrink-0 text-primary/60" aria-hidden="true" />
                {t.about.p3}
              </p>
            </AnimatedItem>

            <AnimatedItem index={4} className="pt-3 sm:pt-4 clear-both md:clear-none">
              <p
                className="mb-2 sm:mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-muted-foreground">
                <Sparkles className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-primary" aria-hidden="true" />
                {t.about.coreExpertise}
              </p>
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {t.about.expertise.map((skill: string, idx: number) => (
                  <AnimatedItem
                    key={skill}
                    index={idx}
                    className="rounded-full border border-primary/35 bg-secondary px-2.5 py-1 sm:px-3 sm:py-1.5 text-xs font-medium text-primary hover:bg-primary/15"
                  >
                    {skill}
                  </AnimatedItem>
                ))}
              </div>
            </AnimatedItem>
          </div>
        </div>
      </AnimatedSection>
    </section>
  );
}
