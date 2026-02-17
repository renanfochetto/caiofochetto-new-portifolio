export interface CaseMetric {
  value: string;
  label_pt: string;
  label_en: string;
  description_pt: string;
  description_en: string;
}

export interface CaseData {
  slug: string;

  // Metadata
  title_pt: string;
  title_en: string;
  brand: string | string[];
  company: string;
  role_pt: string;
  role_en: string;
  period: string;
  year_display: string;
  industry: string;
  type: string;
  icon?: string;

  // Content
  challenge_pt: string;
  challenge_en: string;
  solution_pt: string;
  solution_en: string;

  // Results
  metrics: CaseMetric[];

  // Learnings
  key_learnings_pt: string[];
  key_learnings_en: string[];

  // Capabilities
  capabilities_pt: string[];
  capabilities_en: string[];

  // Tags
  tags: string[];

  // Media
  playlist_url: string;
  thumbnail: string;
  hero_type: "video" | "image";
  hero_placeholder: string;

  // SEO
  meta_title_pt: string;
  meta_title_en: string;
  meta_description_pt: string;
  meta_description_en: string;
  og_image: string;
}
