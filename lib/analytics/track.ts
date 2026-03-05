import { UMAMI_CONFIG } from './umami-config'

declare global {
  interface Window {
    umami?: {
      track: (eventName: string, eventData?: Record<string, string | number>) => void
    }
  }
}

/**
 * Track custom event to Umami
 * @param eventName - Nome do evento (use UMAMI_CONFIG.events)
 * @param eventData - Dados do evento (use UMAMI_CONFIG.properties)
 */
export const trackEvent = (
  eventName: string,
  eventData?: Record<string, string | number>
) => {
  if (typeof window === 'undefined') return

  try {
    if (window.umami) {
      window.umami.track(eventName, eventData)
    } else {
      // Fallback: log no console em dev
      if (process.env.NODE_ENV === 'development') {
        console.log('[Analytics]', eventName, eventData)
      }
    }
  } catch (error) {
    console.error('[Analytics Error]', error)
  }
}

/**
 * Track case card click
 */
export const trackCaseCardClick = (
  slug: string,
  title: string,
  type: 'performance' | 'production'
) => {
  trackEvent(UMAMI_CONFIG.events.CASE_CARD_CLICK, {
    [UMAMI_CONFIG.properties.caseId]: slug,
    [UMAMI_CONFIG.properties.caseTitle]: title,
    [UMAMI_CONFIG.properties.caseType]: type,
  })
}

/**
 * Track case view
 */
export const trackCaseView = (caseId: string, caseTitle: string, caseType: 'performance' | 'production') => {
  trackEvent(UMAMI_CONFIG.events.CASE_VIEW, {
    [UMAMI_CONFIG.properties.caseId]: caseId,
    [UMAMI_CONFIG.properties.caseTitle]: caseTitle,
    [UMAMI_CONFIG.properties.caseType]: caseType,
  })
}

/**
 * Track case video play
 */
export const trackCaseVideoPlay = (caseId: string, videoType: 'playlist' | 'single' | 'carousel') => {
  trackEvent(UMAMI_CONFIG.events.CASE_VIDEO_PLAY, {
    [UMAMI_CONFIG.properties.caseId]: caseId,
    [UMAMI_CONFIG.properties.videoType]: videoType,
  })
}

/**
 * Track CTA click
 */
export const trackCTAClick = (
  ctaType: 'linkedin' | 'email' | 'view_case',
  ctaLocation: string
) => {
  trackEvent(UMAMI_CONFIG.events.CTA_CLICK, {
    [UMAMI_CONFIG.properties.ctaType]: ctaType,
    [UMAMI_CONFIG.properties.ctaLocation]: ctaLocation,
  })
}

/**
 * Track LinkedIn click
 */
export const trackLinkedInClick = (location: string) => {
  trackEvent(UMAMI_CONFIG.events.LINKEDIN_CLICK, {
    [UMAMI_CONFIG.properties.ctaLocation]: location,
  })
}

/**
 * Track email click
 */
export const trackEmailClick = (location: string) => {
  trackEvent(UMAMI_CONFIG.events.EMAIL_CLICK, {
    [UMAMI_CONFIG.properties.ctaLocation]: location,
  })
}

/**
 * Track language switch
 */
export const trackLanguageSwitch = (fromLang: string, toLang: string) => {
  trackEvent(UMAMI_CONFIG.events.LANGUAGE_SWITCH, {
    from_language: fromLang,
    to_language: toLang,
  })
}

/**
 * Track theme toggle
 */
export const trackThemeToggle = (newTheme: 'light' | 'dark') => {
  trackEvent(UMAMI_CONFIG.events.THEME_TOGGLE, {
    [UMAMI_CONFIG.properties.theme]: newTheme,
  })
}

/**
 * Track scroll depth
 */
export const trackScrollDepth = (depth: 25 | 50 | 75 | 100) => {
  trackEvent(UMAMI_CONFIG.events.SCROLL_DEPTH, {
    [UMAMI_CONFIG.properties.scrollDepth]: `${depth}%`,
  })
}

/**
 * Track work toggle
 */
export const trackWorkToggle = (view: 'performance' | 'production') => {
  trackEvent(UMAMI_CONFIG.events.WORK_TOGGLE, {
    [UMAMI_CONFIG.properties.workView]: view,
  })
}
