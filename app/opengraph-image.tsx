import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Caio Fochetto - Líder em Marketing de Influência & Performance Digital'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
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
          Líder em Marketing de Influência & Performance Digital
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
          15+ anos conectando marca, cultura e performance através de estratégias de conteúdo e influência
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  )
}
