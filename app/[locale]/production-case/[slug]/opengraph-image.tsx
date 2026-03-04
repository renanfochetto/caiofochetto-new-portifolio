import { ImageResponse } from 'next/og'
import { productionCases } from '@/lib/data/production-cases'

export const runtime = 'edge'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

type Props = {
  params: Promise<{ locale: string; slug: string }>
}

export default async function Image({ params }: Props) {
  const { locale, slug } = await params
  const caseData = productionCases.find((c) => c.slug === slug)

  if (!caseData) {
    return new ImageResponse(<div>Not Found</div>)
  }

  const title =
    locale === 'pt'
      ? caseData.title_pt
      : locale === 'en'
        ? caseData.title_en
        : caseData.title_es

  const brand = Array.isArray(caseData.brand)
    ? caseData.brand.join(', ')
    : caseData.brand

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          backgroundColor: '#0a0a0a',
          padding: '80px',
        }}
      >
        <div>
          <div
            style={{
              fontSize: 24,
              color: '#CAFF00',
              marginBottom: 20,
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
            }}
          >
            {brand}
          </div>
          <div
            style={{
              fontSize: 52,
              fontWeight: 900,
              color: '#fafafa',
              lineHeight: 1.2,
              maxWidth: 900,
            }}
          >
            {title}
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            width: '100%',
            alignItems: 'center',
          }}
        >
          <div
            style={{
              fontSize: 32,
              fontWeight: 900,
              color: '#CAFF00',
            }}
          >
            CAIO FOCHETTO
          </div>
          <div
            style={{
              fontSize: 20,
              color: '#a3a3a3',
            }}
          >
            {caseData.company} • {caseData.year}
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
