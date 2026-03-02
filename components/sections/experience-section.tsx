"use client";
import {useState} from "react";
import Image from "next/image";
import {useI18n} from "@/context/i18n-provider";
import {Briefcase, ChevronDown, ChevronUp, Footprints} from "lucide-react";
import {AnimatedSection, AnimatedItem} from "../ui/animated-section";

const experiences = [
  {
    roleKey: "directorDigitalContent", // ← usar key
    company: "Octagon",
    logo: "/companies/octagon.avif",
    period: "2023 - 2026"
  },
  {
    roleKey: "latamOperationsLead",
    company: "Jellysmack",
    logo: "/companies/jellysmack.avif",
    period: "2021 - 2023"
  },
  {
    roleKey: "contentProductManager",
    company: "Playground",
    logo: "/companies/playground.avif",
    period: "2020 - 2021"
  },
  {
    roleKey: "digitalPlatformsManager",
    company: "A+E Networks",
    logo: "/companies/aenetworks.avif",
    period: "2012 - 2019"
  },
];

const experiencesOlder = [
  {
    roleKey: "digitalContentProducer",
    company: "Portal R7",
    logo: "/companies/portalr7.avif",
    period: "2010 - 2012"
  },
  {
    roleKey: "digitalContentProducer",
    company: "TV Cultura",
    logo: "/companies/tvcultura.avif",
    period: "2009 - 2010"
  },
  {
    roleKey: "webContentProducer",
    company: "Rede Boa Nova",
    logo: "/companies/redeboanova.avif",
    period: "2009 - 2010"
  },
  {
    roleKey: "tvProducerCoordinator",
    company: "TV Mundo Maior",
    logo: "/companies/tvmundomaior.avif",
    period: "2005 - 2008"
  },
];

export function ExperienceSection() {
  const {t} = useI18n(); // ← remover locale
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <section id="experience" className="px-6 py-24 lg:px-8">
      <AnimatedSection className="mx-auto max-w-6xl">
        <div className="flex items-center gap-2 mb-2">
          <Footprints className="h-4 w-4 text-primary"/>
          <p className="text-xs font-medium uppercase tracking-widest text-primary">
            {t.experience.sectionLabel}
          </p>
        </div>
        <h2 className="mt-2 text-3xl font-bold text-foreground md:text-4xl">
          {t.experience.heading}
        </h2>
        {/* ✅ DESCRIPTION - mt-4 */}
        <p className="mt-4 text-base text-muted-foreground md:text-lg max-w-2xl">
          {t.experience.subheading}
        </p>

        <div className="mt-12 space-y-0">
          {/* Experiências principais */}
          {experiences.map((exp, i) => (
            <AnimatedItem
              key={i}
              index={i}
              className="flex gap-3 sm:gap-4 border-b border-neutral-600 py-4 sm:py-6 first:border-t"
            >
              <div className="flex items-center justify-center flex-shrink-0">
                <Image
                  src={exp.logo}
                  alt={`${exp.company} logo`}
                  width={64}
                  height={64}
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
                <h3
                  className="mt-1.5 sm:mt-2 flex items-center gap-2 text-base sm:text-lg font-semibold text-foreground">
                  <Briefcase className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary flex-shrink-0"/>
                  <span className="line-clamp-2">
                    {t.experienceRoles[exp.roleKey as keyof typeof t.experienceRoles]}
                  </span>
                </h3>
                <p className="mt-1 text-sm font-medium text-primary">{exp.company}</p>
              </div>
            </AnimatedItem>
          ))}

          {/* Experiências antigas */}
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
                    <h3
                      className="mt-1.5 sm:mt-2 flex items-center gap-2 text-base sm:text-lg font-semibold text-foreground">
                      <Briefcase className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary flex-shrink-0"/>
                      <span className="line-clamp-2">
                        {t.experienceRoles[exp.roleKey as keyof typeof t.experienceRoles]}
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
                bg-card
                border border-neutral-600
                hover:border-primary
                active:scale-95
                px-3 py-2 sm:px-4 sm:py-2.5
                transition-all duration-200
              "
            >
              <span className="text-xs sm:text-sm text-muted-foreground transition-colors group-hover:text-primary">
                {isExpanded ? t.experience.showLess : t.experience.showMore} {/* ✅ USAR t */}
              </span>
              {isExpanded ? (
                <ChevronUp
                  className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-muted-foreground transition-all group-hover:text-primary group-hover:-translate-y-0.5"/>
              ) : (
                <ChevronDown
                  className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-muted-foreground transition-all group-hover:text-primary group-hover:translate-y-0.5"/>
              )}
            </button>
          </div>
        </div>
      </AnimatedSection>
    </section>
  );
}
