// /lib/helpers/case-helpers.ts
// Funções compartilhadas entre performance e production cases
import {
  Users,
  Eye,
  Heart,
  MessageCircle,
  TrendingUp,
  DollarSign,
  MousePointerClick,
  Play,
  BarChart3,
  Star,
  Target,
  Sparkles
} from "@/lib/icons";

// ============================================================================
// FUNÇÕES GENÉRICAS DE CASES
// ============================================================================

/**
 * Busca case por slug (genérico)
 * @param cases - Array de cases (performance ou production)
 * @param slug - Slug do case a buscar
 * @returns Case encontrado ou undefined
 */
export function getCaseBySlug<T extends { slug: string }>(
  cases: T[],
  slug: string
): T | undefined {
  return cases.find((c) => c.slug === slug);
}

/**
 * Retorna todos os slugs de um array de cases
 * @param cases - Array de cases (performance ou production)
 * @returns Array de strings com os slugs
 */
export function getAllSlugs<T extends { slug: string }>(
  cases: T[]
): string[] {
  return cases.map((c) => c.slug);
}

/**
 * Navegação circular entre cases
 * Retorna o case anterior e próximo de forma circular
 * @param items - Array de cases
 * @param currentSlug - Slug do case atual
 * @returns Objeto com prev e next (null se não encontrado)
 */
export function getCircularNavigation<T extends { slug: string }>(
  items: T[],
  currentSlug: string
): { prev: T | null; next: T | null } {
  const currentIndex = items.findIndex((item) => item.slug === currentSlug);

  if (currentIndex === -1) {
    return { prev: null, next: null };
  }

  // Navegação circular
  const prevIndex = currentIndex === 0
    ? items.length - 1
    : currentIndex - 1;

  const nextIndex = currentIndex === items.length - 1
    ? 0
    : currentIndex + 1;

  return {
    prev: items[prevIndex],
    next: items[nextIndex],
  };
}

// ============================================================================
// MAPEAMENTO DE ÍCONES
// ============================================================================

/**
 * Mapeia ícones baseado no label da métrica
 * Suporta PT, EN e ES
 * @param label - Label da métrica (ex: "Alcance", "Reach", "Engagement")
 * @returns Componente de ícone do Lucide React
 */
export function getMetricIcon(label: string) {
  if (!label) return Users;

  const lowerLabel = label.toLowerCase();

  // Mapeamento direto por keywords (prioridade)
  const keywordMap: Record<string, typeof Users> = {
    // Alcance / Reach
    'reach': Users,
    'alcance': Users,

    // Receita / Revenue
    'revenue': DollarSign,
    'receita': DollarSign,

    // Reservas / Booking
    'booking': TrendingUp,
    'reserva': TrendingUp,

    // Engajamento / Engagement
    'engagement': Heart,
    'engajamento': Heart,

    // Criadores / Creators
    'creators': Star,
    'criadores': Star,

    // Visualizações / Views
    'views': Play,
    'visualizações': Play,

    // Impressões / Impressions
    'impressions': Eye,
    'impressões': Eye,

    // Interações / Interactions
    'interactions': MessageCircle,
    'interações': MessageCircle,

    // Sentimento / Sentiment
    'sentiment': Sparkles,
    'sentimento': Sparkles,

    // CTR
    'ctr': Target,
    'cliques': MousePointerClick,

    // Tempo / Watch Time
    'watchtime': Play,
    'tempo': Play,

    // Crescimento / Growth
    'growth': TrendingUp,
    'crescimento': TrendingUp,

    // Orgânico / Organic
    'organic': TrendingUp,
    'orgânico': TrendingUp,
  };

  // Busca exata por keyword
  for (const [keyword, icon] of Object.entries(keywordMap)) {
    if (lowerLabel.includes(keyword)) {
      return icon;
    }
  }

  // Fallback: BarChart3
  return BarChart3;
}

// ============================================================================
// MAPEAMENTO DE LOGOS
// ============================================================================

/**
 * Mapeamento de logos de empresas
 * Path: /public/companies/{logo}
 */
export const companyLogos: Record<string, string> = {
  "Octagon": "octagon.webp",
  "A+E Networks": "aenetworks.webp",
  "Jellysmack": "jellysmack.webp",
  "Playground": "playground.webp",
  "Portal R7": "portalr7.webp",
  "Rede Boa Nova": "redeboanova.webp",
  "TV Cultura": "tvcultura.webp",
  "TV Mundo Maior": "tvmundomaior.webp",
};

/**
 * Mapeamento de logos de brands
 * Path: /public/logos/{theme}/{logo}.svg
 * Theme: "white" ou "black"
 */
export const brandLogos: Record<string, string> = {
  "Betfair": "betfair",
  "Budweiser": "budweiser",
  "Formula E": "formulae",
  "HISTORY": "history",
  "A&E": "ae",
  "Lifetime": "lifetime",
  "Netflix": "netflix",
  "Natura": "natura",
  "Havaianas": "havaianas",
  "Bohemia": "bohemia",
  "Nestlé": "nestle",
  "Playground": "playground",
};
