import { ImageResponse } from 'next/og'
import { performanceCases } from '@/lib/data/performance-cases'

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
  const caseData = performanceCases.find((c) => c.slug === slug)

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
    ? caseData.brand.join(' • ')
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
          fontFamily: 'sans-serif',
        }}
      >
        {/* Content */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Brand */}
          <div
            style={{
              fontSize: '28px',
              color: '#CAFF00',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              fontWeight: 700,
            }}
          >
            {brand}
          </div>

          {/* Title */}
          <div
            style={{
              fontSize: '52px',
              fontWeight: 900,
              color: '#fafafa',
              lineHeight: 1.2,
              maxWidth: '900px',
            }}
          >
            {title}
          </div>
        </div>

        {/* Footer */}
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
              fontSize: '32px',
              fontWeight: 900,
              color: '#CAFF00',
            }}
          >
            CAIO FOCHETTO
          </div>
          <div
            style={{
              fontSize: '20px',
              color: '#a3a3a3',
            }}
          >
            {caseData.company} • {caseData.period}
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  )
}
