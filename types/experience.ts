export interface ExperienceDetails {
  summary: string;
  responsibilities: string[];
  achievements?: string[];
}

export interface ExperiencePeriod {
  start: string;
  end: string | null;
  duration: string;
}

// lib/types/experience.ts
export interface Experience {
  id: string;
  company: string;
  logo: string;
  role: {
    pt: string;
    en: string;
    es: string;
  };
  period: ExperiencePeriod;
  featured: boolean;
  details: {
    pt: ExperienceDetails;
    en: ExperienceDetails;
    es: ExperienceDetails;
  };
}
