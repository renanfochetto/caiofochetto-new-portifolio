"use client";

import { useI18n } from "@/context/i18n-provider";
import { useTheme } from "../providers/theme-provider";
import { Linkedin, Mail } from "lucide-react";
import { AnimatedSection, AnimatedItem } from "../ui/animated-section";

export function ContactSection() {
  const { t } = useI18n();
  const { theme } = useTheme();

  const isLight = theme === "light";

  return (
    <section id="contact" className="px-6 py-16 md:py-20 lg:py-24 lg:px-8">
      <div className="mx-auto max-w-6xl">
        {/* Linha divisória contida */}
        <div className="border-t border-neutral-600 pt-16 md:pt-20 lg:pt-24">
          <AnimatedSection>
            <div className="flex flex-col gap-6 sm:gap-8 md:flex-row md:items-end md:justify-between">
              <AnimatedItem index={0}>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground">
                  {t.footer.cta}
                </h2>
                <div className="mt-4 sm:mt-6 flex flex-wrap gap-2 sm:gap-3">
                  {/* Email - Inverte tema */}
                  <a
                    href="mailto:caiofochetto@gmail.com"
                    className={`
                      inline-flex items-center justify-center gap-2
                      rounded-full
                      bg-transparent
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
                    <Mail className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                    E-Mail
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
                    <Linkedin className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                    LinkedIn
                  </a>
                </div>
              </AnimatedItem>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
