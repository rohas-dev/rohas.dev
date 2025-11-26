import { getRequestConfig } from 'next-intl/server';
import { headers } from 'next/headers';

export const locales = ['en', 'km', 'ja'] as const;
export type Locale = (typeof locales)[number];

export default getRequestConfig(async ({ requestLocale }) => {
  // Try to get locale from requestLocale (provided by next-intl from URL pathname)
  let locale = await requestLocale;

  // If not available, extract from URL pathname via headers
  if (!locale) {
    try {
      const headersList = await headers();
      // Try to get from x-pathname header (set by proxy) or referer
      const pathnameHeader = headersList.get('x-pathname');
      let pathname = pathnameHeader;
      
      if (!pathname) {
        // Fallback to referer header
        const referer = headersList.get('referer');
        if (referer) {
          const url = new URL(referer);
          pathname = url.pathname;
        }
      }
      
      // Extract locale from pathname (e.g., /ja/docs -> ja)
      if (pathname) {
        const pathMatch = pathname.match(/^\/(en|km|ja)(\/|$)/);
        if (pathMatch) {
          locale = pathMatch[1] as Locale;
        }
      }
    } catch {
      // Fallback to default
    }
  }

  // Validate locale and default to 'en' if invalid
  if (!locale || !locales.includes(locale as Locale)) {
    locale = 'en';
  }

  return {
    locale,
    messages: (await import(`./messages/${locale}.json`)).default
  };
});

