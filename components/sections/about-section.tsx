"use client";

import Image from "next/image";
import { useI18n } from "@/context/i18n-provider";
import { Sparkles, Globe } from "lucide-react";
import { AnimatedSection, AnimatedItem } from "../ui/animated-section";
import { useTheme } from "@/components/providers/theme-provider";
import { useState } from "react";

export function AboutSection() {
  const { t } = useI18n();
  const { theme } = useTheme();
  const [isHovered, setIsHovered] = useState(false);

  // ✅ Profundidade equilibrada nos dois modos
  const getShadowStyle = () => {
    if (theme === 'dark') {
      return {
        filter: isHovered
          ? 'drop-shadow(0px 0px 20px rgba(202, 255, 0, 0.4))'   // Hover
          : 'drop-shadow(0px 0px 12px rgba(202, 255, 0, 0.3))'   // Normal
      };
    } else {
      return {
        filter: isHovered
          ? 'drop-shadow(0px 0px 20px rgba(0, 0, 0, 0.4))'       // Hover
          : 'drop-shadow(0px 0px 12px rgba(0, 0, 0, 0.3))'       // Normal
      };
    }
  };

  return (
    <section id="about" className="px-6 py-24 lg:px-8">
      <AnimatedSection className="mx-auto max-w-6xl">
        <p className="text-xs font-medium uppercase tracking-widest text-primary">
          {t.about.sectionLabel}
        </p>
        <h2 className="mt-2 text-3xl font-bold text-foreground md:text-4xl">
          {t.about.heading}
        </h2>

        {/* Grid: 1 coluna no mobile (apenas texto), 2 colunas no tablet+ (com foto) */}
        <div className="mt-12 grid gap-10 md:grid-cols-[280px_1fr] md:gap-12 lg:grid-cols-[380px_1fr] lg:gap-16">

          <AnimatedItem index={0} className="hidden md:flex justify-start">
            <div className="relative group w-full max-w-[380px]">
              {/* ✨ Shadow simétrico e equilibrado */}
              <div
                className="relative transition-all duration-700"
                style={getShadowStyle()}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                <Image
                  src="/images/foto_caio.avif"
                  alt="Caio Fochetto em evento de marketing"
                  width={380}
                  height={475}
                  className="w-full h-auto object-cover transition-all duration-700
                    rounded-[2rem]
                    group-hover:scale-105
                  "
                  unoptimized={true}
                  priority={false}
                />
              </div>
            </div>
          </AnimatedItem>

          {/* Texto */}
          <div className="space-y-3 sm:space-y-4">
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
                <Globe className="mt-1 h-3.5 w-3.5 sm:h-4 sm:w-4 flex-shrink-0 text-primary/60" />
                {t.about.p3}
              </p>
            </AnimatedItem>

            <AnimatedItem index={4} className="pt-3 sm:pt-4">
              <p className="mb-2 sm:mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-muted-foreground">
                <Sparkles className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-primary" />
                {t.about.coreExpertise}
              </p>
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {t.about.expertise.map((skill: string, idx: number) => (
                  <AnimatedItem
                    key={skill}
                    index={idx}
                    className="rounded-full border border-primary/35 bg-primary/10 px-2.5 py-1 sm:px-3 sm:py-1.5 text-xs font-medium text-primary hover:bg-primary/15"
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
