"use client";

import {useI18n} from "@/components/providers/i18n-provider";
import {useTheme} from "../providers/theme-provider";
import {Linkedin, Mail, MessageCircle} from "lucide-react";
import {AnimatedSection} from "../ui/animated-section";

export function ContactSection() {
  const {t} = useI18n();
  const {theme} = useTheme();

  const isLight = theme === "light";

  return (
    <section id="contact" className="px-6 py-16 md:py-20 lg:py-24 lg:px-8">
      <div className="mx-auto max-w-6xl">
        {/* Linha divisória contida */}
        <div className="border-t border-neutral-600 pt-16 md:pt-20 lg:pt-24">
          <AnimatedSection>
            <div className="flex items-center gap-2 mb-2">
              <MessageCircle className="h-4 w-4 text-primary"/>
              {/* ✅ LABEL - Espaçamento padronizado (sem mb-6) */}
              <p className="text-xs font-medium uppercase tracking-widest text-primary">
                {t.contact.sectionLabel}
              </p>
            </div>

            {/* ✅ HEADING - mt-2 como About Section */}
            <h2 className="mt-2 text-2xl sm:text-3xl md:text-4xl font-bold text-foreground">
              {t.contact.heading}
            </h2>

            {/* ✅ DESCRIPTION - mt-4 */}
            <p className="mt-4 text-base text-muted-foreground md:text-lg max-w-2xl">
              {t.contact.description}
            </p>

            {/* ✅ BUTTONS - mt-6 */}
            <div className="mt-6 flex flex-wrap gap-2 sm:gap-3">
              {/* Email - Inverte tema */}
              <a
                href="mailto:caiofochetto@gmail.com"
                className={`
                  inline-flex items-center justify-center gap-2
                  rounded-full
                  bg-card
                  active:scale-95
                  border border-foreground/95
                  px-4 py-2.5 sm:px-6 sm:py-3
                  text-xs sm:text-sm font-medium
                  text-foreground
                  transition-all duration-200
                  ${
                  isLight
                    ? "hover:bg-black hover:border-white hover:text-white"
                    : "hover:bg-white hover:border-black hover:text-black"
                }
                `}
              >
                <Mail className="h-3.5 w-3.5 sm:h-4 sm:w-4"/>
                {t.contact.emailButton}
              </a>

              {/* LinkedIn - Padrão */}
              <a
                href="https://linkedin.com/in/caiofochetto"
                target="_blank"
                rel="noopener noreferrer"
                className="
                  inline-flex items-center justify-center gap-2
                  rounded-full
                  bg-primary/90
                  hover:bg-[#0a66c2]
                  active:scale-95
                  border border-black
                  hover:border-white
                  px-4 py-2.5 sm:px-6 sm:py-3
                  text-xs sm:text-sm font-medium
                  text-primary-foreground
                  hover:text-white
                  transition-all duration-200
                "
              >
                <Linkedin className="h-3.5 w-3.5 sm:h-4 sm:w-4"/>
                {t.contact.linkedinButton}
              </a>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
