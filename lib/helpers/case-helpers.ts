// /lib/case-helpers.ts
// Funções compartilhadas entre performance e production cases

/**
 * Navegação circular genérica
 * Funciona com qualquer array de items com slug
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

/**
 * Mapeia ícones baseado no label da métrica
 * Versão melhorada com mapeamento completo
 */
export function getMetricIcon(label: string) {
  // Importações dentro da função para evitar problemas de bundling
  const {
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
  } = require("lucide-react");

  if (!label) return Users;

  const lowerLabel = label.toLowerCase();

  // Mapeamento direto por keywords (prioridade)
  const keywordMap: Record<string, any> = {
    'reach': Users,
    'alcance': Users,
    'revenue': DollarSign,
    'receita': DollarSign,
    'booking': TrendingUp,
    'reserva': TrendingUp,
    'engagement': Heart,
    'engajamento': Heart,
    'creators': Star,
    'criadores': Star,
    'views': Play,
    'visualizações': Play,
    'impressions': Eye,
    'impressões': Eye,
    'interactions': MessageCircle,
    'interações': MessageCircle,
    'sentiment': Sparkles,
    'sentimento': Sparkles,
    'ctr': Target,
    'cliques': MousePointerClick,
    'watchtime': Play,
    'tempo': Play,
    'growth': TrendingUp,
    'crescimento': TrendingUp,
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

/**
 * Mapeamento de logos de empresas
 */
export const companyLogos: Record<string, string> = {
  "Octagon": "octagon.avif",
  "A+E Networks": "aenetworks.avif",
  "Jellysmack": "jellysmack.avif",
  "Playground": "playground.avif",
  "Portal R7": "portalr7.avif",
  "Rede Boa Nova": "redeboanova.avif",
  "TV Cultura": "tvcultura.avif",
  "TV Mundo Maior": "tvmundomaior.avif",
};

/**
 * Mapeamento de logos de brands
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
