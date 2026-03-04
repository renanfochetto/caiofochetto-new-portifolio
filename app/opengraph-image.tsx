import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Caio Fochetto - Creator Economy & Performance Marketing'
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
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#0a0a0a',
          padding: '80px',
        }}
      >
        {/* Nome */}
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

        {/* Tagline */}
        <div
          style={{
            fontSize: 32,
            color: '#fafafa',
            textAlign: 'center',
            maxWidth: 900,
            lineHeight: 1.4,
          }}
        >
          Líder em Marketing de Influência & Performance Digital
        </div>

        {/* Métricas */}
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
            <div>Revenue Growth</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 48, fontWeight: 'bold', color: '#CAFF00' }}>
              75M+
            </div>
            <div>Reach</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 48, fontWeight: 'bold', color: '#CAFF00' }}>
              7.5%
            </div>
            <div>Engagement</div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
