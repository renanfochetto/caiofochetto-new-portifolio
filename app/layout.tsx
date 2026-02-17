import type { Metadata } from "next";
import { Fraunces, Space_Grotesk, Manrope } from "next/font/google";
import "./globals.css";
import { I18nProvider } from "@/lib/i18n";
import { ThemeProvider } from "@/components/theme-provider";

// Fonts
const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Caio Fochetto - Creator Economy & Marketing de Influência",
  description:
    "VP de Marketing de Influência e Conteúdo. Especialista em estratégias de creator economy e influencer marketing com foco em performance.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="pt"
      suppressHydrationWarning
      className={`${fraunces.variable} ${spaceGrotesk.variable} ${manrope.variable}`}
    >
      <body className="font-sans antialiased">
        <I18nProvider locale="pt">
          <ThemeProvider>{children}</ThemeProvider>
        </I18nProvider>
      </body>
    </html>
  );
}