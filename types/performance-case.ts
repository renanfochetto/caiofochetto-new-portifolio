// types/performance-case.ts

export interface CaseMetric {
  value: string;
  label_pt: string;
  label_en: string;
  label_es: string;
  description_pt?: string;
  description_en?: string;
  description_es?: string;
}

export interface CaseData {
  slug: string;

  // Metadata
  title_pt: string;
  title_en: string;
  title_es: string;
  brand: string | string[];
  company: string;
  role_pt: string;
  role_en: string;
  role_es: string;
  period: string;
  year_display?: string;
  industry?: string;
  type?: string;
  icon?: string;

  // Content
  challenge_pt: string;
  challenge_en: string;
  challenge_es: string;
  solution_pt: string;
  solution_en: string;
  solution_es: string;

  // Results
  metrics: CaseMetric[];

  // Learnings
  key_learnings_pt: string[];
  key_learnings_en: string[];
  key_learnings_es: string[];

  // Tags
  tags_pt: string[];
  tags_en: string[];
  tags_es: string[];

  // Media
  playlist_url?: string;
  thumbnail?: string;
  hero_type?: "video" | "image";
  hero_placeholder?: string;

  // SEO
  meta_title_pt?: string;
  meta_title_en?: string;
  meta_title_es?: string;
  meta_description_pt?: string;
  meta_description_en?: string;
  meta_description_es?: string;
  og_image?: string;
}
