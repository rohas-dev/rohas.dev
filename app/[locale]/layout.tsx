import type { Metadata } from "next";
import { Noto_Sans, Noto_Sans_Mono, Noto_Sans_JP, Noto_Sans_Khmer } from "next/font/google";
import "../globals.css";
import Navigation from "../components/Navigation";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { locales, type Locale } from '../../i18n';
import { ChakraProvider } from '../components/ChakraProvider';
import { ThemeProvider } from '../components/ThemeProvider';

const notoSans = Noto_Sans({
  variable: "--font-sans",
  subsets: ["latin", "latin-ext", "cyrillic", "cyrillic-ext", "greek", "greek-ext", "vietnamese"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const notoSansJP = Noto_Sans_JP({
  variable: "--font-sans-jp",
  weight: ["400", "500", "600", "700"],
  display: "swap",
  preload: false,
});

const notoSansKhmer = Noto_Sans_Khmer({
  variable: "--font-sans-khmer",
  weight: ["400", "500", "600", "700"],
  display: "swap",
  preload: false,
});

const notoSansMono = Noto_Sans_Mono({
  variable: "--font-mono",
  subsets: ["latin", "latin-ext", "cyrillic", "cyrillic-ext", "greek", "greek-ext", "vietnamese"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Rohas - Event-Driven Application Framework",
  description: "Build scalable event-driven applications with schema-driven development. Support for Python, TypeScript, and Rust runtimes, multiple event adapters, and powerful code generation.",
  keywords: ["event-driven", "orchestration", "schema-driven", "microservices", "rust", "typescript", "python"],
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  const messages = await getMessages({ locale });

  // Determine which font to use based on locale
  const getFontClass = () => {
    const baseFonts = `${notoSans.variable} ${notoSansMono.variable}`;
    if (locale === 'ja') {
      return `${baseFonts} ${notoSansJP.variable}`;
    } else if (locale === 'km') {
      return `${baseFonts} ${notoSansKhmer.variable}`;
    }
    return baseFonts;
  };

  return (
    <html lang={locale} suppressHydrationWarning>
      <body
        className={`${getFontClass()} antialiased`}
      >
        <ThemeProvider>
          <ChakraProvider>
            <NextIntlClientProvider messages={messages}>
              <Navigation />
              {children}
            </NextIntlClientProvider>
          </ChakraProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

