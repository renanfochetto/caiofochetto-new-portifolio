"use client";
import { useState } from "react";
import Image from "next/image";
import { useI18n } from "@/lib/i18n";
import { Briefcase, ChevronDown, ChevronUp } from "lucide-react";
import { AnimatedSection, AnimatedItem } from "./animated-section";

const experiences = [
  {
    role: "Diretor de Conteúdo Digital, Marketing de Influência e Talentos",
    roleEn: "Director of Digital Content, Influencer Marketing & Talent",
    company: "Octagon",
    logo: "/companies/octagon.avif",
    period: "2023 - 2026"
  },
  {
    role: "Líder de Operações LATAM",
    roleEn: "LATAM Operations Lead",
    company: "Jellysmack",
    logo: "/companies/jellysmack.avif",
    period: "2021 - 2023"
  },
  {
    role: "Content and Product Manager",
    roleEn: "Content and Product Manager",
    company: "Playground",
    logo: "/companies/playground.avif",
    period: "2020 - 2021"
  },
  {
    role: "Digital Platforms Manager",
    roleEn: "Digital Platforms Manager",
    company: "A+E Networks",
    logo: "/companies/aenetworks.avif",
    period: "2012 - 2019"
  },
];

const experiencesOlder = [
  {
    role: "Digital Content Producer",
    roleEn: "Digital Content Producer",
    company: "Portal R7",
    logo: "/companies/portalr7.avif",
    period: "2010 - 2012"
  },
  {
    role: "Digital Content Producer",
    roleEn: "Digital Content Producer",
    company: "TV Cultura",
    logo: "/companies/tvcultura.avif",
    period: "2009 - 2010"
  },
  {
    role: "Web Content Producer",
    roleEn: "Web Content Producer",
    company: "Rede Boa Nova",
    logo: "/companies/redeboanova.avif",
    period: "2009 - 2010"
  },
  {
    role: "TV Producer Coordinator",
    roleEn: "TV Producer Coordinator",
    company: "TV Mundo Maior",
    logo: "/companies/tvmundomaior.avif",
    period: "2005 - 2008"
  },
];

export function ExperienceSection() {
  const { t, locale } = useI18n();
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <section id="experience" className="px-6 py-24 lg:px-8">
      <AnimatedSection className="mx-auto max-w-6xl">
        <p className="text-xs font-medium uppercase tracking-widest text-primary">
          {t.experience.sectionLabel}
        </p>
        <h2 className="mt-2 text-3xl font-bold text-foreground md:text-4xl">
          {t.experience.heading}
        </h2>

        <div className="mt-12 space-y-0">
          {/* Experiências principais */}
          {experiences.map((exp, i) => (
            <AnimatedItem
              key={i}
              index={i}
              className="flex gap-3 sm:gap-4 border-b border-neutral-600 py-4 sm:py-6 first:border-t"
            >
              {/* Logo responsivo */}
              <div className="flex items-center justify-center flex-shrink-0">
                <Image
                  src={exp.logo}
                  alt={`${exp.company} logo`}
                  width={64}
                  height={64}
                  className="w-12 h-12 sm:w-16 sm:h-16 rounded object-contain"
                  unoptimized={true}
                />              </div>

              {/* Conteúdo */}
              <div className="flex-1 min-w-0">
                <p className="font-mono text-xs text-muted-foreground sm:text-sm">
                  {exp.period.endsWith("- ")
                    ? `${exp.period}${t.experience.present}`
                    : exp.period}
                </p>
                <h3 className="mt-1.5 sm:mt-2 flex items-center gap-2 text-base sm:text-lg font-semibold text-foreground">
                  <Briefcase className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary flex-shrink-0" />
                  <span className="line-clamp-2">
                    {locale === "en" ? exp.roleEn : exp.role}
                  </span>
                </h3>
                <p className="mt-1 text-sm font-medium text-primary">{exp.company}</p>
              </div>
            </AnimatedItem>
          ))}

          {/* Experiências antigas (só quando expandido) */}
          {isExpanded && (
            <div className="space-y-0">
              {experiencesOlder.map((exp, i) => (
                <AnimatedItem
                  key={`old-${i}`}
                  index={i}
                  className="flex gap-3 sm:gap-4 border-b border-neutral-600 py-4 sm:py-6"
                >
                  <div className="flex items-center justify-center flex-shrink-0">
                    <Image
                      src={exp.logo}
                      alt={`${exp.company} logo`}
                      width={48}
                      height={48}
                      className="w-12 h-12 sm:w-16 sm:h-16 rounded object-contain"
                      unoptimized={true}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-mono text-xs text-muted-foreground sm:text-sm">
                      {exp.period.endsWith("- ")
                        ? `${exp.period}${t.experience.present}`
                        : exp.period}
                    </p>
                    <h3 className="mt-1.5 sm:mt-2 flex items-center gap-2 text-base sm:text-lg font-semibold text-foreground">
                      <Briefcase className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary flex-shrink-0" />
                      <span className="line-clamp-2">
                        {locale === "en" ? exp.roleEn : exp.role}
                      </span>
                    </h3>
                    <p className="mt-1 text-sm font-medium text-primary">{exp.company}</p>
                  </div>
                </AnimatedItem>
              ))}
            </div>
          )}

          {/* Botão expansor */}
          <div className="flex justify-center pt-6 sm:pt-8">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="
                group 
                flex items-center gap-2 
                rounded-full 
                border border-neutral-600
                hover:border-primary
                active:scale-95
                px-3 py-2 sm:px-4 sm:py-2.5
                transition-all duration-200
              "
            >
              <span className="text-xs sm:text-sm text-muted-foreground transition-colors group-hover:text-primary">
                {isExpanded
                  ? (locale === "pt" ? "Ver menos" : "Show less")
                  : (locale === "pt" ? "Ver anteriores" : "Show older")
                }
              </span>
              {isExpanded ? (
                <ChevronUp className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-muted-foreground transition-all group-hover:text-primary group-hover:-translate-y-0.5" />
              ) : (
                <ChevronDown className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-muted-foreground transition-all group-hover:text-primary group-hover:translate-y-0.5" />
              )}
            </button>
          </div>
        </div>
      </AnimatedSection>
    </section>
  );
}