// /types/production.ts
export interface ProductionCaseMedia {
  thumbnail: string;
  hero: {
    type: "video" | "playlist" | "multiple";
    videoId?: string;      // Para playlist OU video único
    videoIds?: string[];   // Para múltiplos vídeos
    placeholder?: string;
    alt: string;
  };
  gallery?: Array<{
    type: "image" | "video";
    url: string;
    alt?: string;
    caption?: string;
  }>;
}

export interface ProductionCaseSEO {
  metaTitle_pt: string;
  metaTitle_en: string;
  metaTitle_es: string;
  metaDescription_pt: string;
  metaDescription_en: string;
  metaDescription_es: string;
  ogImage: string;
}

export interface ProductionCase {
  // Identificação
  id: string;
  slug: string;

  // Informações básicas (traduzidas)
  title_pt: string;
  title_en: string;
  title_es: string;
  brand: string;
  company: string;
  year: string;
  type: string;

  // Conteúdo principal (traduzido)
  role_pt: string;
  role_en: string;
  role_es: string;

  description_pt: string;
  description_en: string;
  description_es: string;

  what_pt: string;
  what_en: string;
  what_es: string;

  myRole_pt: string;
  myRole_en: string;
  myRole_es: string;

  // Categorização (traduzida)
  tags_pt: string[];
  tags_en: string[];
  tags_es: string[];

  // Media
  media: ProductionCaseMedia;

  // SEO
  seo: ProductionCaseSEO;
}
