import type { Metadata, Viewport } from "next";
import { Fraunces, Space_Grotesk, Manrope } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { notFound } from "next/navigation";
import { I18nProvider } from "@/context/i18n-provider";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { PageTransition } from "@/components/layout/page-transition";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { locales } from "@/lib/i18n/dictionaries";
import type { Locale } from "@/lib/i18n/dictionaries";
import "../globals.css";

const fraunces = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const SITE_URL = "https://www.caiofochetto.com";

type Props = { params: Promise<{ locale: string }> };

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  getDictionary(locale as Locale);

  const title =
    locale === "pt"
      ? "Caio Fochetto | Líder em Marketing de Influência & Performance Digital"
      : locale === "es"
        ? "Caio Fochetto | Líder en Marketing de Influencers & Performance Digital"
        : "Caio Fochetto | Influencer Marketing & Digital Performance Leader";

  const description =
    locale === "pt"
      ? "15+ anos conectando marca, cultura e performance através de creators e dados."
      : locale === "es"
        ? "15+ años conectando marca, cultura y performance a través de creators y datos."
        : "15+ years connecting brand, culture, and performance through creators and data.";

  return {
    metadataBase: new URL(SITE_URL),

    // ✅ FAVICONS
    icons: {
      icon: [
        { url: '/favicon.svg', type: 'image/svg+xml' },
        { url: '/favicon.ico', sizes: '32x32' },
      ],
      apple: '/apple-touch-icon.png',
    },

    alternates: {
      canonical: `/${locale}`,
      languages: { "pt-BR": "/pt", "en-US": "/en", "es-ES": "/es" },
    },
    title: { default: title, template: `%s | Caio Fochetto` },
    description,
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/${locale}`,
      siteName: "Caio Fochetto",
      type: "website",
      locale: locale === "pt" ? "pt_BR" : locale === "es" ? "es_ES" : "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    robots: { index: true, follow: true },
  };
}

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
  width: "device-width",
  initialScale: 1,
};

const themeScript = `(function() {
  try {
    const saved = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const theme = saved || (prefersDark ? 'dark' : 'light');
    if (theme === 'light') {
      document.documentElement.classList.add('light');
    }
  } catch (e) {}
})()`;

export default async function LocaleLayout({
                                             children,
                                             params,
                                           }: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  return (
    <html
      lang={locale}
      className={`${fraunces.variable} ${spaceGrotesk.variable} ${manrope.variable}`}
      suppressHydrationWarning
    >
    <body className="font-sans antialiased">
    <script dangerouslySetInnerHTML={{ __html: themeScript }} />
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          name: "Caio Fochetto",
          url: SITE_URL,
          jobTitle: "Influencer Marketing & Digital Performance Leader",
          knowsAbout: [
            "Creator Economy",
            "Influencer Marketing",
            "Performance Marketing",
            "Digital Strategy",
          ],
          sameAs: ["https://www.linkedin.com/in/caiofochetto/"],
        }),
      }}
    />
    <I18nProvider locale={locale as Locale}>
      <ThemeProvider>
        <PageTransition>{children}</PageTransition>
      </ThemeProvider>
    </I18nProvider>
    <Analytics />
    </body>
    </html>
  );
}
