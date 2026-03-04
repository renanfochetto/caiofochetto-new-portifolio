import { MetadataRoute } from 'next'
import { locales } from '@/lib/i18n/dictionaries'
import { performanceCases } from '@/lib/data/performance-cases' // ✅ Importar o que existe
import { productionCases } from '@/lib/data/production-cases'   // ✅ Importar o que existe

const SITE_URL = 'https://caiofochetto.com'

export default function sitemap(): MetadataRoute.Sitemap {
  const currentDate = new Date()

  // ========================================
  // PÁGINAS ESTÁTICAS (alta prioridade)
  // ========================================
  const staticPages: MetadataRoute.Sitemap = locales.flatMap((locale) => [
    {
      url: `${SITE_URL}/${locale}`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 1.0,
      alternates: {
        languages: Object.fromEntries(
          locales.map(loc => [loc, `${SITE_URL}/${loc}`])
        ),
      },
    },
  ])

  // ========================================
  // PERFORMANCE CASES
  // ========================================
  const performanceCasePages: MetadataRoute.Sitemap = locales.flatMap((locale) =>
    performanceCases.map((caseItem) => ({
      url: `${SITE_URL}/${locale}/performance-case/${caseItem.slug}`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.9,
      alternates: {
        languages: Object.fromEntries(
          locales.map(loc => [
            loc,
            `${SITE_URL}/${loc}/performance-case/${caseItem.slug}`
          ])
        ),
      },
    }))
  )

  // ========================================
  // PRODUCTION CASES
  // ========================================
  const productionCasePages: MetadataRoute.Sitemap = locales.flatMap((locale) =>
    productionCases.map((caseItem) => ({
      url: `${SITE_URL}/${locale}/production-case/${caseItem.slug}`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.9,
      alternates: {
        languages: Object.fromEntries(
          locales.map(loc => [
            loc,
            `${SITE_URL}/${loc}/production-case/${caseItem.slug}`
          ])
        ),
      },
    }))
  )

  // ========================================
  // COMBINAR TUDO
  // ========================================
  return [
    ...staticPages,
    ...performanceCasePages,
    ...productionCasePages,
  ]
}
