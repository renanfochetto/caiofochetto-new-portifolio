// Umami Analytics Configuration
export const UMAMI_CONFIG = {
  websiteId: '8050b651-c9bb-4e2b-9bb7-9a809f4fe044',
  src: 'https://analytics.renanfochetto.dev/script.js',

  // Event names (consistência)
  events: {
    // Page views (automático via Umami)

    // Case interactions
    CASE_CARD_CLICK: 'case_card_click',
    CASE_VIEW: 'case_view',
    CASE_VIDEO_PLAY: 'case_video_play',

    // CTAs
    CTA_CLICK: 'cta_click',
    LINKEDIN_CLICK: 'linkedin_click',
    EMAIL_CLICK: 'email_click',

    // Navigation
    LANGUAGE_SWITCH: 'language_switch',
    THEME_TOGGLE: 'theme_toggle',

    // Engagement
    SCROLL_DEPTH: 'scroll_depth',
    TIME_ON_PAGE: 'time_on_page',

    // Events
    WORK_TOGGLE: 'work_toggle'
  },

  // Event properties (padronização)
  properties: {
    caseId: 'case_id',
    caseTitle: 'case_title',
    caseType: 'case_type', // 'performance' | 'production'
    videoType: 'video_type', // 'playlist' | 'single' | 'carousel'
    ctaType: 'cta_type', // 'linkedin' | 'email' | 'view_case'
    ctaLocation: 'cta_location', // 'hero' | 'footer' | 'case_card'
    language: 'language', // 'pt' | 'en' | 'es'
    theme: 'theme', // 'light' | 'dark'
    scrollDepth: 'scroll_depth', // '25%' | '50%' | '75%' | '100%'
    workView: 'work_view', // 'performance | 'production'
  }
} as const
