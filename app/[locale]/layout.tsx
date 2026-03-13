import type {Metadata, Viewport} from "next";
import {Analytics} from "@vercel/analytics/next";
import {notFound} from "next/navigation";
import {I18nProvider} from "@/components/providers/i18n-provider";
import {ThemeProvider} from "@/components/providers/theme-provider";
import {DynamicFavicon} from "@/components/layout/dynamic-favicon";
import {PageTransition} from "@/components/layout/page-transition";
import {getDictionary} from "@/lib/i18n/dictionaries";
import {locales} from "@/lib/i18n/dictionaries";
import type {Locale} from "@/lib/i18n/dictionaries";
import {SkipLink} from "@/components/layout/skip-link";
import {PersonSchema, PortfolioWebsiteSchema} from "@/components/seo/structured-data";
import Script from "next/script";
import {UMAMI_CONFIG} from "@/lib/analytics/umami-config";
import {ScrollDepthTracker} from "@/components/analytics/scroll-depth-tracker";
import {LazyMotion, domAnimation} from "framer-motion";
import "../fonts.css";
import "../globals.css";

const SITE_URL = "https://www.caiofochetto.com";

type Props = { params: Promise<{ locale: string }> };

export async function generateStaticParams() {
  return locales.map((locale) => ({locale}));
}

export async function generateMetadata({params}: Props): Promise<Metadata> {
  const {locale} = await params;
  const dictionary = await getDictionary(locale as Locale);

  const {title, description, siteName} = dictionary.metadata;

  return {
    metadataBase: new URL(SITE_URL),

    icons: {
      icon: [
        {url: '/favicon.ico', sizes: '32x32'},
      ],
      apple: '/apple-touch-icon.png',
    },

    alternates: {
      canonical: `/${locale}`,
      languages: {"pt-BR": "/pt", "en-US": "/en", "es-ES": "/es"},
    },

    title: {
      default: title,
      template: `%s | ${siteName}`
    },

    description,

    openGraph: {
      title,
      description,
      url: `${SITE_URL}/${locale}`,
      siteName,
      type: "website",
      locale: locale === "pt" ? "pt_BR" : locale === "es" ? "es_ES" : "en_US",
    },

    twitter: {
      card: "summary_large_image",
      title,
      description,
    },

    robots: {index: true, follow: true},
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
    const theme = saved || 'dark';
    
    // Aplicar classe
    if (theme === 'light') {
      document.documentElement.classList.add('light');
    } else {
      document.documentElement.classList.remove('light');
    }
    
    // Atualizar favicon aqui (antes do React carregar)
    const oldFavicon = document.querySelector("link[rel='icon']");
    if (oldFavicon) {
      document.head.removeChild(oldFavicon);
    }
    
    const newFavicon = document.createElement('link');
    newFavicon.rel = 'icon';
    newFavicon.type = 'image/svg+xml';
    
    const svg = theme === 'dark'
      ? '<svg width="32" height="32" viewBox="0 0 480 480" xmlns="http://www.w3.org/2000/svg"><rect fill="black" width="480" height="480" rx="100"/><path fill="#CAFF00" d="M160.24 367.48C132.507 367.48 110.533 359.8 94.32 344.44C78.1067 328.867 70 306.68 70 277.88V224.12C70 195.32 78.1067 173.24 94.32 157.88C110.533 142.307 132.507 134.52 160.24 134.52C187.76 134.52 208.987 142.093 223.92 157.24C239.067 172.173 246.64 192.76 246.64 219V220.92H205.04V217.72C205.04 204.493 201.307 193.613 193.84 185.08C186.587 176.547 175.387 172.28 160.24 172.28C145.307 172.28 133.573 176.867 125.04 186.04C116.507 195.213 112.24 207.693 112.24 223.48V278.52C112.24 294.093 116.507 306.573 125.04 315.96C133.573 325.133 145.307 329.72 160.24 329.72C175.387 329.72 186.587 325.453 193.84 316.92C201.307 308.173 205.04 297.293 205.04 284.28V278.52H246.64V283C246.64 309.24 239.067 329.933 223.92 345.08C208.987 360.013 187.76 367.48 160.24 367.48ZM281.057 363V139H421.858V177.4H323.298V231.48H414.178V269.88H323.298V363H281.057Z"/></svg>'
      : '<svg width="32" height="32" viewBox="0 0 480 480" xmlns="http://www.w3.org/2000/svg"><rect fill="white" width="480" height="480" rx="100"/><path fill="#FF0077" d="M160.24 367.48C132.507 367.48 110.533 359.8 94.32 344.44C78.1067 328.867 70 306.68 70 277.88V224.12C70 195.32 78.1067 173.24 94.32 157.88C110.533 142.307 132.507 134.52 160.24 134.52C187.76 134.52 208.987 142.093 223.92 157.24C239.067 172.173 246.64 192.76 246.64 219V220.92H205.04V217.72C205.04 204.493 201.307 193.613 193.84 185.08C186.587 176.547 175.387 172.28 160.24 172.28C145.307 172.28 133.573 176.867 125.04 186.04C116.507 195.213 112.24 207.693 112.24 223.48V278.52C112.24 294.093 116.507 306.573 125.04 315.96C133.573 325.133 145.307 329.72 160.24 329.72C175.387 329.72 186.587 325.453 193.84 316.92C201.307 308.173 205.04 297.293 205.04 284.28V278.52H246.64V283C246.64 309.24 239.067 329.933 223.92 345.08C208.987 360.013 187.76 367.48 160.24 367.48ZM281.057 363V139H421.858V177.4H323.298V231.48H414.178V269.88H323.298V363H281.057Z"/></svg>';
    
    const blob = new Blob([svg], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    newFavicon.href = url;
    document.head.appendChild(newFavicon);
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
    <html lang={locale} suppressHydrationWarning>
      <head>
        <PersonSchema />
        <PortfolioWebsiteSchema />
        <link rel="preconnect" href="https://analytics.renanfochetto.dev" />
        <link rel="preload" href="/fonts/fraunces/fraunces-700.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/space-grotesk/space-grotesk-700.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/manrope/manrope-600.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
      </head>
      <body className="font-sans antialiased">
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <LazyMotion features={domAnimation} strict>
          <I18nProvider locale={locale as Locale}>
            <ThemeProvider>
              <SkipLink />
              <DynamicFavicon />
              <ScrollDepthTracker />
              <PageTransition>{children}</PageTransition>
            </ThemeProvider>
          </I18nProvider>
        </LazyMotion>
        <Analytics />
        <Script
          defer
          src={UMAMI_CONFIG.src}
          data-website-id={UMAMI_CONFIG.websiteId}
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
