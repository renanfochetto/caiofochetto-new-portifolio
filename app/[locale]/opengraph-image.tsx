import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Caio Fochetto - Portfolio'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

type Props = { params: Promise<{ locale: string }> }

export default async function Image({ params }: Props) {
  const { locale } = await params

  const translations = {
    pt: {
      tagline: 'Líder em Marketing de Influência & Performance Digital',
      metrics: ['Crescimento', 'Alcance', 'Engajamento'],
    },
    en: {
      tagline: 'Influencer Marketing & Digital Performance Leader',
      metrics: ['Growth', 'Reach', 'Engagement'],
    },
    es: {
      tagline: 'Líder en Marketing de Influencers & Performance Digital',
      metrics: ['Crecimiento', 'Alcance', 'Engagement'],
    },
  }

  const t = translations[locale as keyof typeof translations] || translations.en

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#0a0a0a',
          padding: '80px',
        }}
      >
        <div
          style={{
            fontSize: 80,
            fontWeight: 900,
            color: '#CAFF00',
            marginBottom: 20,
            letterSpacing: '-0.02em',
          }}
        >
          CAIO FOCHETTO
        </div>

        <div
          style={{
            fontSize: 32,
            color: '#fafafa',
            textAlign: 'center',
            maxWidth: 900,
            lineHeight: 1.4,
          }}
        >
          {t.tagline}
        </div>

        <div
          style={{
            display: 'flex',
            gap: 60,
            marginTop: 60,
            fontSize: 24,
            color: '#a3a3a3',
          }}
        >
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 48, fontWeight: 'bold', color: '#CAFF00' }}>
              +634%
            </div>
            <div>{t.metrics[0]}</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 48, fontWeight: 'bold', color: '#CAFF00' }}>
              75M+
            </div>
            <div>{t.metrics[1]}</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 48, fontWeight: 'bold', color: '#CAFF00' }}>
              7.5%
            </div>
            <div>{t.metrics[2]}</div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
