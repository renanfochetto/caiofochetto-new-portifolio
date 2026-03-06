"use client";

import { useState, useRef, } from "react";
import Image from "next/image";
import { useI18n } from "@/components/providers/i18n-provider";
import { Briefcase, ChevronDown, ChevronUp, Plus, TrendingUp, Footprints, Clipboard } from "@/lib/icons";
import { AnimatedSection, AnimatedItem } from "../ui/animated-section";
import { getFeaturedExperiences, getOlderExperiences } from "@/lib/data/experiences";
import { m, AnimatePresence } from "framer-motion";
import type { Locale } from "@/lib/i18n/dictionaries";

export function ExperienceSection() {
  const { t, locale } = useI18n();
  const [expandedOlder, setExpandedOlder] = useState(false);
  const [expandedDetails, setExpandedDetails] = useState<Set<string>>(new Set());
  const buttonRef = useRef<HTMLDivElement>(null);

  const featuredExps = getFeaturedExperiences();
  const olderExps = getOlderExperiences();

  const toggleDetails = (id: string) => {
    setExpandedDetails(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const toggleOlder = () => {
    const nextState = !expandedOlder;

    if (!nextState) {
      // Ao fechar, limpamos os IDs das experiências antigas do set de detalhes expandidos.
      // Isso dispara as animações de saída (exit) dos accordions internos em paralelo ao fechamento principal.
      setExpandedDetails(prev => {
        const newSet = new Set(prev);
        olderExps.forEach(exp => newSet.delete(exp.id));
        return newSet;
      });

      // Scroll suave para o topo da seção de experiências ao fechar
      // Isso ajuda a manter o contexto visual sem os "trancos" do intervalo anterior
      const section = document.getElementById("experience");
      if (section) {
        section.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }

    setExpandedOlder(nextState);
  };

  return (
    <section id="experience" className="px-6 py-24 lg:px-8">
      <AnimatedSection className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="flex items-center gap-2 mb-2">
          <Footprints className="h-4 w-4 text-primary" aria-hidden="true" />
          <p className="text-xs font-medium uppercase tracking-widest text-primary">
            {t.experience.sectionLabel}
          </p>
        </div>
        <h2 className="mt-2 text-3xl font-bold text-foreground md:text-4xl">
          {t.experience.heading}
        </h2>
        <p className="mt-4 text-base text-muted-foreground md:text-lg max-w-2xl">
          {t.experience.subheading}
        </p>

        <div className="mt-12 space-y-0">
          {/* EXPERIÊNCIAS FEATURED */}
          {featuredExps.map((exp, i) => (
            <AnimatedItem
              key={exp.id}
              index={i}
              className="border-b border-neutral-600 py-6 first:border-t"
            >
              {/* Desktop/Tablet Layout: 2 colunas */}
              <div className="flex items-center justify-between gap-6">
                {/* COLUNA ESQUERDA: Logo + Empresa + Cargo */}
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <div className="flex items-center justify-center flex-shrink-0">
                    <Image
                      src={exp.logo}
                      alt={`${exp.company} logo`}
                      width={64}
                      height={64}
                      className="w-12 h-12 sm:w-16 sm:h-16 rounded object-contain"
                      unoptimized={true}
                      loading="lazy"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm sm:text-base font-medium text-primary">
                      {exp.company}
                    </h3>
                    <div className="flex items-center gap-2 mt-1 group/role cursor-default">
                      <Briefcase className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary flex-shrink-0" aria-hidden="true" />
                      <p className="text-sm sm:text-base font-bold text-foreground leading-tight transition-colors group-hover/role:text-primary">
                        {exp.role[locale as Locale]}
                      </p>
                    </div>
                  </div>
                </div>

                {/* COLUNA DIREITA: Datas (Desktop) */}
                <div className="hidden md:flex flex-col items-end text-right flex-shrink-0 gap-1">
                  <p className="font-heading text-sm font-semibold text-primary">
                    {exp.period.start} - {exp.period.end || t.experience.present}
                  </p>
                  <p className="text-sm text-muted-foreground transition-colors hover:text-primary cursor-default">
                    {exp.period.duration}
                  </p>
                </div>
              </div>

              {/* MOBILE: Datas empilhadas */}
              <div className="md:hidden mt-3 text-xs space-y-1">
                <p className="font-heading text-sm font-semibold text-primary">
                  {exp.period.start} - {exp.period.end || t.experience.present}
                </p>
                <p className="text-sm text-muted-foreground transition-colors hover:text-primary cursor-default">
                  {exp.period.duration}
                </p>
              </div>
              {/* BOTÃO EXPANDIR (quando fechado) */}
              {!expandedDetails.has(exp.id) && (
                <div className="flex justify-center mt-4">
                  <button
                    onClick={() => toggleDetails(exp.id)}
                    className="group/btn text-primary transition-all duration-200 hover:scale-110 active:scale-95"
                    aria-label={`${t.experience.showMore} - ${exp.company}`}
                    aria-expanded={false}
                  >
                    <Plus className="h-5 w-5" aria-hidden="true" />
                  </button>
                </div>
              )}

              {/* ACCORDION EXPANDIDO */}
              <AnimatePresence>
                {expandedDetails.has(exp.id) && (
                  <m.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="overflow-hidden"
                  >
                    <div className="mt-6 space-y-6">
                      {/* SUMMARY */}
                      <p className="text-base text-muted-foreground leading-relaxed">
                        {exp.details[locale as Locale].summary}
                      </p>

                      {/* RESPONSIBILITIES */}
                      {exp.details[locale as Locale].responsibilities && (
                        <div>
                          <p className="text-sm font-bold uppercase tracking-widest text-primary mb-3 flex items-center gap-2">
                            <Clipboard className="h-4 w-4 text-primary" aria-hidden="true" />
                            {t.experience.responsibilities}
                          </p>
                          <ul className="space-y-2">
                            {exp.details[locale as Locale].responsibilities.map((item, idx) => (
                              <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                                <span className="text-primary mt-0.5 flex-shrink-0">•</span>
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* ACHIEVEMENTS */}
                      {exp.details[locale as Locale].achievements &&
                        exp.details[locale as Locale].achievements!.length > 0 && (
                          <div>
                            <p className="text-sm font-bold uppercase tracking-widest text-primary mb-3 flex items-center gap-2">
                              <TrendingUp className="h-4 w-4 text-primary" aria-hidden="true" />
                              {t.experience.achievements}
                            </p>
                            <ul className="space-y-2">
                              {exp.details[locale as Locale].achievements!.map((item, idx) => (
                                <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                                  <span className="text-primary mt-0.5 flex-shrink-0">•</span>
                                  <span>{item}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                    </div>

                    {/* BOTÃO FECHAR (embaixo do conteúdo) */}
                    <div className="flex justify-center mt-6 pt-4">
                      <button
                        onClick={() => toggleDetails(exp.id)}
                        className="group/btn text-primary transition-all duration-200 hover:scale-110 active:scale-95"
                        aria-label={`${t.experience.showLess} - ${exp.company}`}
                        aria-expanded={true}
                      >
                        <Plus className="h-5 w-5 rotate-45" aria-hidden="true" />
                      </button>
                    </div>
                  </m.div>
                )}
              </AnimatePresence>
            </AnimatedItem>
          ))}

          {/* EXPERIÊNCIAS ANTIGAS */}
          <AnimatePresence>
            {expandedOlder && (
              <m.div
                key="older-experiences-container"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ 
                  duration: 0.8,
                  ease: [0.32, 0.23, 0.4, 0.9] 
                }}
                className="space-y-0 overflow-hidden"
              >
                {olderExps.map((exp, i) => (
                  <div
                    key={exp.id}
                    className="border-b border-neutral-600 py-6"
                  >
                    {/* Desktop/Tablet Layout */}
                    <div className="flex items-center justify-between gap-6">
                      {/* COLUNA ESQUERDA */}
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        <div className="flex items-center justify-center flex-shrink-0">
                          <Image
                            src={exp.logo}
                            alt={`Logo ${exp.company}`}
                            width={64}
                            height={64}
                            className="w-12 h-12 sm:w-16 sm:h-16 rounded object-contain"
                            unoptimized={true}
                            loading="lazy"
                          />
                        </div>

                        <div className="flex-1 min-w-0">
                          <h3 className="text-sm sm:text-base font-medium text-primary">
                            {exp.company}
                          </h3>
                          <div className="flex items-center gap-2 mt-1 group/role cursor-default">
                            <Briefcase className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary flex-shrink-0" aria-hidden="true" />
                            <p className="text-sm sm:text-base font-bold text-foreground leading-tight transition-colors group-hover/role:text-primary">
                              {exp.role[locale as Locale]}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* COLUNA DIREITA: Datas (Desktop) */}
                      <div className="hidden md:flex flex-col items-end text-right flex-shrink-0 gap-1">
                        <p className="font-heading text-sm font-semibold text-primary">
                          {exp.period.start} - {exp.period.end || t.experience.present}
                        </p>
                        <p className="text-sm text-muted-foreground transition-colors hover:text-primary cursor-default">
                          {exp.period.duration}
                        </p>
                      </div>
                    </div>

                    {/* MOBILE: Datas */}
                    <div className="md:hidden mt-3 text-xs space-y-1">
                      <p className="font-heading text-sm font-semibold text-primary">
                        {exp.period.start} - {exp.period.end || t.experience.present}
                      </p>
                      <p className="text-sm text-muted-foreground transition-colors hover:text-primary cursor-default">
                        {exp.period.duration}
                      </p>
                    </div>

                    {/* BOTÃO EXPANDIR */}
                    {!expandedDetails.has(exp.id) && (
                      <div className="flex justify-center mt-4">
                        <button
                          onClick={() => toggleDetails(exp.id)}
                          className="group/btn text-primary transition-all duration-200 hover:scale-110 active:scale-95"
                          aria-label={`${t.experience.showMore} - ${exp.company}`}
                          aria-expanded={false}
                        >
                          <Plus className="h-5 w-5" aria-hidden="true" />
                        </button>
                      </div>
                    )}

                    {/* ACCORDION EXPANDIDO */}
                    <AnimatePresence>
                      {expandedDetails.has(exp.id) && (
                        <m.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.5, ease: "easeOut" }}
                          className="overflow-hidden"
                        >
                          <div className="mt-6 space-y-6">
                            {/* SUMMARY */}
                            <p className="text-base text-muted-foreground leading-relaxed">
                              {exp.details[locale as Locale].summary}
                            </p>

                            {/* RESPONSIBILITIES */}
                            {exp.details[locale as Locale].responsibilities && (
                              <div>
                                <p className="text-sm font-bold uppercase tracking-widest text-primary mb-3 flex items-center gap-2">
                                  <Clipboard className="h-4 w-4 text-primary" aria-hidden="true" />
                                  {t.experience.responsibilities}
                                </p>
                                <ul className="space-y-2">
                                  {exp.details[locale as Locale].responsibilities.map((item, idx) => (
                                    <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                                      <span className="text-primary mt-0.5 flex-shrink-0">•</span>
                                      <span>{item}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}

                            {/* ACHIEVEMENTS */}
                            {exp.details[locale as Locale].achievements &&
                              exp.details[locale as Locale].achievements!.length > 0 && (
                                <div>
                                  <p className="text-sm font-bold uppercase tracking-widest text-primary mb-3 flex items-center gap-2">
                                    <TrendingUp className="h-4 w-4 text-primary" aria-hidden="true" />
                                    {t.experience.achievements}
                                  </p>
                                  <ul className="space-y-2">
                                    {exp.details[locale as Locale].achievements!.map((item, idx) => (
                                      <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                                        <span className="text-primary mt-0.5 flex-shrink-0">•</span>
                                        <span>{item}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              )}
                          </div>

                          {/* BOTÃO FECHAR */}
                          <div className="flex justify-center mt-6 pt-4">
                            <button
                              onClick={() => toggleDetails(exp.id)}
                              className="group/btn text-primary transition-all duration-200 hover:scale-110 active:scale-95"
                              aria-label={`${t.experience.showLess} - ${exp.company}`}
                              aria-expanded={true}
                            >
                              <Plus className="h-5 w-5 rotate-45" aria-hidden="true" />
                            </button>
                          </div>
                        </m.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </m.div>
            )}
          </AnimatePresence>

          {/* BOTÃO "VER ANTERIORES" */}
          <div ref={buttonRef} className="flex justify-center pt-6 sm:pt-8">
            <button
              onClick={toggleOlder}
              aria-expanded={expandedOlder}
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
                {expandedOlder ? t.experience.showLess : t.experience.showMore}
              </span>
              {expandedOlder ? (
                <ChevronUp className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-muted-foreground transition-all group-hover:text-primary group-hover:-translate-y-0.5" aria-hidden="true" />
              ) : (
                <ChevronDown className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-muted-foreground transition-all group-hover:text-primary group-hover:translate-y-0.5" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </AnimatedSection>
    </section>
  );
}
