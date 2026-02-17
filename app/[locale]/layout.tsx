import type { Metadata, Viewport } from "next";
import { Fraunces, Space_Grotesk, Manrope } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { notFound } from "next/navigation";
import { I18nProvider } from "@/lib/i18n";
import { ThemeProvider } from "@/components/theme-provider";
import { PageTransition } from "@/components/page-transition"; // ✅ IMPORT ADICIONADO
import { getDictionary } from "@/lib/dictionaries";
import { locales } from "@/lib/dictionaries";
import type { Locale } from "@/lib/dictionaries";
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
  variable: "--font-body",
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
      ? "Caio Fochetto | Creator Economy & Marketing"
      : "Caio Fochetto | Creator Economy & Marketing";

  const description =
    locale === "pt"
      ? "15+ anos conectando marca, cultura e performance atraves de creators e dados."
      : "15+ years connecting brand, culture, and performance through creators and data.";

  return {
    metadataBase: new URL(SITE_URL),
    alternates: {
      canonical: `/${locale}`,
      languages: { "pt-BR": "/pt", "en-US": "/en" },
    },
    title: { default: title, template: `%s | Caio Fochetto` },
    description,
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/${locale}`,
      siteName: "Caio Fochetto",
      type: "website",
      locale: locale === "pt" ? "pt_BR" : "en_US",
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
              jobTitle: "Creator Economy & Performance Marketing Leader",
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
            {/* ✅ PAGETRANSITION wrapper adicionado */}
            <PageTransition>{children}</PageTransition>
          </ThemeProvider>
        </I18nProvider>
        <Analytics />
      </body>
    </html>
  );
}
