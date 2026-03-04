import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',      // Se tiver APIs privadas
          '/_next/',    // Assets do Next.js (já público, mas boas práticas)
        ],
      },
      // ✅ GOOGLE BOT - Acesso total
      {
        userAgent: 'Googlebot',
        allow: '/',
      },
      // ✅ BING BOT - Acesso total
      {
        userAgent: 'Bingbot',
        allow: '/',
      },
    ],
    sitemap: 'https://caiofochetto.com/sitemap.xml',
    host: 'https://caiofochetto.com',
  }
}
