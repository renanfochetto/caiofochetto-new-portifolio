"use client";

import { useI18n } from "@/lib/i18n";
import { Linkedin, Mail } from "lucide-react";
import { AnimatedSection, AnimatedItem } from "./animated-section";

interface FooterProps {
  hideContact?: boolean;
}

export function Footer({ hideContact = false }: FooterProps) {
  const { t } = useI18n();

  return (
    <footer id="contact" className="border-t border-neutral-600 px-6 py-16 md:py-20 lg:py-24 lg:px-8">
      <AnimatedSection className="mx-auto max-w-6xl">

        {/* CTA section */}
        {!hideContact && (
          <>
            <div className="flex flex-col gap-6 sm:gap-8 md:flex-row md:items-end md:justify-between">
              <AnimatedItem index={0}>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground">
                  {t.footer.cta}
                </h2>
                <p className="mt-2 max-w-md text-sm sm:text-base text-muted-foreground">
                  {t.footer.ctaDescription}
                </p>
                <div className="mt-4 sm:mt-6 flex flex-wrap gap-2 sm:gap-3">
                  <a
                    href="https://linkedin.com/in/caiofochetto"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="
                      inline-flex items-center justify-center gap-2 
                      rounded-full 
                      border border-white
                      bg-[#0a66c2] 
                      hover:bg-[#0b75d9]
                      active:scale-95
                      text-white
                      px-3.5 py-2 sm:px-4 sm:py-2.5
                      text-xs sm:text-sm font-medium
                      transition-all duration-200
                    "
                  >
                    <Linkedin className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                    LinkedIn
                  </a>
                  <a
                    href="mailto:caiofochetto@gmail.com"
                    className="
                      inline-flex items-center justify-center gap-2 
                      rounded-full 
                      border border-white
                      bg-[#059669] 
                      hover:bg-[#10b981]
                      active:scale-95
                      text-white
                      px-3.5 py-2 sm:px-4 sm:py-2.5
                      text-xs sm:text-sm font-medium
                      transition-all duration-200
                    "
                  >
                    <Mail className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                    E-Mail
                  </a>
                </div>
              </AnimatedItem>
            </div>

            <div className="mt-8 sm:mt-12 border-t border-neutral-600 pt-6 sm:pt-8" />
          </>
        )}

        {/* Copyright */}
        <div className="flex flex-row flex-wrap items-center justify-center sm:justify-between gap-2 sm:gap-4 text-xs text-muted-foreground">
          <p className="text-xs">&copy; {new Date().getFullYear()} Caio Fochetto.</p>
          <p className="text-xs">
            {t.footer.developedBy}{" "}
            <a
              href="https://renanfochetto.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-foreground/70 transition-colors hover:text-primary"
            >
              Renan Fochetto
            </a>
          </p>
        </div>
      </AnimatedSection>
    </footer>
  );
}
