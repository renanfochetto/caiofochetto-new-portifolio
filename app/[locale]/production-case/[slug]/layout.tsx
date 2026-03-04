import type { Metadata } from 'next'
import { productionCases } from '@/lib/data/production-cases'
import { notFound } from 'next/navigation'

type Props = {
  params: Promise<{ locale: string; slug: string }>
  children: React.ReactNode
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params
  const caseData = productionCases.find((c) => c.slug === slug)

  if (!caseData) {
    return { title: 'Case Not Found' }
  }

  const title =
    locale === 'pt'
      ? caseData.title_pt
      : locale === 'en'
        ? caseData.title_en
        : caseData.title_es || caseData.title_en

  const description =
    locale === 'pt'
      ? caseData.description_pt
      : locale === 'en'
        ? caseData.description_en
        : caseData.description_es || caseData.description_en

  const brand = Array.isArray(caseData.brand)
    ? caseData.brand.join(', ')
    : caseData.brand

  const metaDescription = description
    ? description.substring(0, 160) + '...'
    : `Production case: ${title} - ${brand}`

  const url = `https://caiofochetto.com/${locale}/production-case/${slug}`

  return {
    title,
    description: metaDescription,

    alternates: {
      canonical: url,
      languages: {
        'pt-BR': `/pt/production-case/${slug}`,
        'en-US': `/en/production-case/${slug}`,
        'es-ES': `/es/production-case/${slug}`,
      },
    },

    openGraph: {
      title: `${title} | Caio Fochetto`,
      description: metaDescription,
      url,
      siteName: 'Caio Fochetto Portfolio',
      type: 'article',
      publishedTime: caseData.year,
      authors: ['Caio Fochetto'],
      tags: locale === 'pt'
        ? caseData.tags_pt
        : locale === 'en'
          ? caseData.tags_en
          : caseData.tags_es,
    },

    twitter: {
      card: 'summary_large_image',
      title: `${title} | Caio Fochetto`,
      description: metaDescription,
    },

    keywords: [
      'Content Production',
      'Video Production',
      'Creator Economy',
      'Digital Content',
      brand,
      caseData.company,
      ...(locale === 'pt'
        ? caseData.tags_pt
        : locale === 'en'
          ? caseData.tags_en
          : caseData.tags_es),
    ],
  }
}

export default function ProductionCaseLayout({ children }: Props) {
  return <>{children}</>
}
