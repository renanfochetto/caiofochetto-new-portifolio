// types/navigation.ts
/**
 * Navigation types for case studies
 */

export interface CaseNavigation {
  prev: CaseNavigationItem | null;
  next: CaseNavigationItem | null;
}

export interface CaseNavigationItem {
  slug: string;
  title_pt?: string;
  title_en?: string;
  title_es?: string;
  brand: string | string[];
}
