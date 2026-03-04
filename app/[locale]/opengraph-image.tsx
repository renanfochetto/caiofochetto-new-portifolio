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
      title: 'Líder em Marketing de Influência & Performance Digital',
      tagline: '15+ anos conectando marca, cultura e performance através de estratégias de conteúdo e influência',
    },
    en: {
      title: 'Influencer Marketing & Digital Performance Leader',
      tagline: '15+ years connecting brand, culture, and performance through content and influence strategies',
    },
    es: {
      title: 'Líder en Marketing de Influencers & Performance Digital',
      tagline: '15+ años conectando marca, cultura y performance a través de estrategias de contenido e influencia',
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
          fontFamily: 'sans-serif',
        }}
      >
        {/* Nome */}
        <div
          style={{
            fontSize: '80px',
            fontWeight: 900,
            color: '#CAFF00',
            marginBottom: '40px',
            letterSpacing: '-0.02em',
          }}
        >
          CAIO FOCHETTO
        </div>

        {/* Título Principal */}
        <div
          style={{
            fontSize: '36px',
            fontWeight: 700,
            color: '#fafafa',
            textAlign: 'center',
            marginBottom: '24px',
            lineHeight: 1.3,
          }}
        >
          {t.title}
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: '24px',
            color: '#a3a3a3',
            textAlign: 'center',
            maxWidth: '900px',
            lineHeight: 1.5,
          }}
        >
          {t.tagline}
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  )
}
