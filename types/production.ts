export interface ProductionCaseMedia {
  thumbnail: string;
  hero: {
    type: "video" | "playlist" | "multiple"; // ✅ 3 tipos agora
    videoId?: string;      // ✅ Para playlist OU video único
    videoIds?: string[];   // ✅ Para múltiplos vídeos
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
  metaTitle: string;
  metaDescription: string;
  ogImage: string;
}

export interface ProductionCase {
  // Identificação
  id: string;
  slug: string;

  // Informações básicas
  title: string;
  brand: string;
  company: string;        // ✅ ADICIONADO - Empresa onde trabalhava (Playground)
  year: string;
  type: string;

  // Conteúdo principal
  role: string;
  description: string;    // ✅ ADICIONADO - Descrição breve para cards
  what: string;
  myRole: string;

  // Categorização
  tags: string[];

  // Media
  media: ProductionCaseMedia;

  // SEO
  seo: ProductionCaseSEO;
}