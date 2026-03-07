// components/case/production-sections.tsx
"use client";

import { BookOpen, User } from "@/lib/icons";
import { AnimatedSection } from "@/components/ui/animated-section";

// ✅ SINGLE IMPORT!
import { ProductionCase, Locale, getLocalizedField } from '@/types';

interface ProductionSectionsProps {
  caseData: ProductionCase;
  locale: string;
}

export function ProductionSections({ caseData, locale }: ProductionSectionsProps) {
  // ✅ TYPE-SAFE extraction usando utilities
  const localeTyped = locale as Locale;

  const what = getLocalizedField(caseData, 'what', localeTyped);
  const myRole = getLocalizedField(caseData, 'myRole', localeTyped);

  const sectionLabels = locale === "pt"
    ? {
      what: "O QUE É?",
      myRole: "MEU PAPEL",
    }
    : locale === "es"
      ? {
        what: "¿QUÉ ES?",
        myRole: "MI PAPEL",
      }
      : {
        what: "WHAT IS IT?",
        myRole: "MY ROLE",
      };

  return (
    <>
      {/* O QUE É? */}
      <section className="px-6 py-12 lg:px-8">
        <AnimatedSection className="mx-auto max-w-4xl">
          <div className="flex items-center gap-2 mb-4">
            <BookOpen className="h-4 w-4 text-primary" />
            <h2 className="text-xs font-medium uppercase tracking-widest text-primary">
              {sectionLabels.what}
            </h2>
          </div>
          <p className="text-base leading-relaxed text-muted-foreground transition-colors duration-200 hover:text-foreground">{what}</p>
        </AnimatedSection>
      </section>

      {/* MEU PAPEL */}
      <section className="px-6 py-12 lg:px-8">
        <AnimatedSection className="mx-auto max-w-4xl">
          <div className="flex items-center gap-2 mb-4">
            <User className="h-4 w-4 text-primary" />
            <h2 className="text-xs font-medium uppercase tracking-widest text-primary">
              {sectionLabels.myRole}
            </h2>
          </div>
          <p className="text-base leading-relaxed text-muted-foreground transition-colors duration-200 hover:text-foreground">{myRole}</p>
        </AnimatedSection>
      </section>
    </>
  );
}
