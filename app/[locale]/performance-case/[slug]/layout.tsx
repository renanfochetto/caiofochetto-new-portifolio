import type { Metadata } from 'next'
import { performanceCases } from '@/lib/data/performance-cases'
import { notFound } from 'next/navigation'

type Props = {
  params: Promise<{ locale: string; slug: string }>
  children: React.ReactNode
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params
  const caseData = performanceCases.find((c) => c.slug === slug)

  if (!caseData) {
    return { title: 'Case Not Found' }
  }

  const title =
    locale === 'pt'
      ? caseData.title_pt
      : locale === 'en'
        ? caseData.title_en
        : caseData.title_es || caseData.title_en

  const challenge =
    locale === 'pt'
      ? caseData.challenge_pt
      : locale === 'en'
        ? caseData.challenge_en
        : caseData.challenge_es || caseData.challenge_en

  const brand = Array.isArray(caseData.brand)
    ? caseData.brand.join(', ')
    : caseData.brand

  const description = challenge
    ? challenge.substring(0, 160) + '...'
    : `Case study: ${title} - ${brand}`

  const url = `https://caiofochetto.com/${locale}/performance-case/${slug}`

  return {
    metadataBase: new URL('https://caiofochetto.com'),
    title,
    description,

    alternates: {
      canonical: url,
      languages: {
        'pt-BR': `/pt/performance-case/${slug}`,
        'en-US': `/en/performance-case/${slug}`,
        'es-ES': `/es/performance-case/${slug}`,
      },
    },

    openGraph: {
      title: `${title} | Caio Fochetto`,
      description,
      url,
      siteName: 'Caio Fochetto Portfolio',
      type: 'article',
      publishedTime: caseData.period,
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
      description,
    },

    keywords: [
      'Influencer Marketing',
      'Performance Marketing',
      'Creator Economy',
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

export default function PerformanceCaseLayout({ children }: Props) {
  return <>{children}</>
}
