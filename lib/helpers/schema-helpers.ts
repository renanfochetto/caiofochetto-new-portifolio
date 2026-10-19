// lib/helpers/schema-helpers.ts
/**
 * Schema.org helpers - Dynamic data extraction
 * ONLY calculates truly dynamic data (years of experience)
 */

import { experiences } from '@/lib/data/experiences';
import type { ExperiencePeriod } from '@/types/experience';

/**
 * Extract work history for Schema.org Person
 * Returns EXACT dates from experiences.ts (NO auto-calculation)
 */
export function getWorkHistory() {
  return experiences
    .filter(exp => exp.featured)
    .map(exp => ({
      "@type": "WorkHistory" as const,
      "startDate": exp.period.start,
      // ✅ CORRIGIDO - Usa data EXATA de experiences.ts
      "endDate": !exp.period.end
        ? undefined  // Omite se ainda trabalha (opcional no Schema.org)
        : exp.period.end,
      "employer": {
        "@type": "Organization" as const,
        "name": exp.company
      },
      "jobTitle": exp.role.pt
    }));
}

/**
 * Get total years of experience (ONLY dynamic calculation needed)
 * Calculates from earliest experience to today
 */
export function getTotalYearsOfExperience(): number {
  if (experiences.length === 0) return 0;

  const parseDates = experiences.map(exp => {
    const start = parseExperienceDate(exp.period.start);
    // Para cálculo de anos TOTAIS, usamos "hoje" se ainda trabalha
    const end = !exp.period.end
      ? new Date()
      : parseExperienceDate(exp.period.end!);

    return { start, end };
  });

  const earliestStart = new Date(Math.min(...parseDates.map(d => d.start.getTime())));
  // ✅ Para anos totais, usamos hoje ou última experiência
  const latestEnd = new Date(Math.max(...parseDates.map(d => d.end.getTime())));

  const years = (latestEnd.getTime() - earliestStart.getTime()) / (1000 * 60 * 60 * 24 * 365.25);

  return Math.floor(years);
}

/**
 * Get current position (if any "Atual")
 */
export function getCurrentPosition() {
  const currentExp = experiences.find(
    exp => exp.featured && (!exp.period.end)
  );

  if (!currentExp) {
    // ✅ Se nenhum "Atual", retorna a experiência mais recente
    const mostRecent = experiences
      .filter(exp => exp.featured)
      .sort((a, b) => {
        const dateA = parseExperienceDate(a.period.start);
        const dateB = parseExperienceDate(b.period.start);
        return dateB.getTime() - dateA.getTime();
      })[0];

    if (!mostRecent) return null;

    return {
      "@type": "OrganizationRole" as const,
      "roleName": mostRecent.role.pt,
      "startDate": mostRecent.period.start,
      "endDate": mostRecent.period.end,
      "organization": {
        "@type": "Organization" as const,
        "name": mostRecent.company
      }
    };
  }

  return {
    "@type": "OrganizationRole" as const,
    "roleName": currentExp.role.pt,
    "startDate": currentExp.period.start,
    "organization": {
      "@type": "Organization" as const,
      "name": currentExp.company
    }
  };
}

/**
 * Helper: Parse experience date string to Date object
 */
function parseExperienceDate(dateStr: string): Date {
  if (dateStr.includes('-')) {
    return new Date(dateStr + '-01');
  }

  const [monthStr, yearStr] = dateStr.split('/');

  const monthMap: Record<string, number> = {
    'jan': 0, 'fev': 1, 'feb': 1, 'mar': 2, 'abr': 3, 'apr': 3,
    'mai': 4, 'may': 4, 'jun': 5, 'jul': 6, 'ago': 7, 'aug': 7,
    'set': 8, 'sep': 8, 'out': 9, 'oct': 9, 'nov': 10, 'dez': 11, 'dec': 11
  };

  const month = monthMap[monthStr.toLowerCase()] ?? 0;
  const year = parseInt(yearStr.length === 2 ? '20' + yearStr : yearStr);

  return new Date(year, month, 1);
}

/**
 * Duração da experiência: usa o texto fixo de experiences.ts ou,
 * se ainda trabalha (end null), calcula até hoje (contando o mês atual, como o LinkedIn)
 */
export function getExperienceDuration(period: ExperiencePeriod, now = new Date()): string {
  if (period.end || period.duration) return period.duration ?? '';

  const start = parseExperienceDate(period.start);
  const total = (now.getFullYear() - start.getFullYear()) * 12 + now.getMonth() - start.getMonth() + 1;
  const years = Math.floor(total / 12);
  const months = total % 12;

  const parts = [
    years && `${years} ${years === 1 ? 'ano' : 'anos'}`,
    months && `${months} ${months === 1 ? 'mês' : 'meses'}`,
  ].filter(Boolean);

  return parts.join(' e ');
}
