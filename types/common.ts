// types/common.ts
/**
 * Common types shared across the application
 */

export type Locale = 'pt' | 'en' | 'es';

export interface LocalizedFields {
  title_pt?: string;
  title_en?: string;
  title_es?: string;
  role_pt?: string;
  role_en?: string;
  role_es?: string;
  challenge_pt?: string;
  challenge_en?: string;
  challenge_es?: string;
  solution_pt?: string;
  solution_en?: string;
  solution_es?: string;
  tags_pt?: string[];
  tags_en?: string[];
  tags_es?: string[];
}

export interface Brand {
  name: string;
  logo: string;
}

export interface Company {
  name: string;
  logo: string;
}
