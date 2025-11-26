import { NextRequest, NextResponse } from 'next/server';
import { locales } from './i18n';

const PUBLIC_FILE = /\.(.*)$/;

// Get the preferred locale from cookie or Accept-Language header
function getLocale(request: NextRequest): string {
  // First, try to get locale from cookie (user preference)
  const cookieLocale = request.cookies.get('NEXT_LOCALE')?.value;
  if (cookieLocale && locales.includes(cookieLocale as typeof locales[number])) {
    return cookieLocale;
  }

  // Fallback to Accept-Language header
  const acceptLanguage = request.headers.get('accept-language') || 'en';
  for (const locale of locales) {
    if (acceptLanguage.includes(locale)) {
      return locale;
    }
  }
  
  // Default to 'en'
  return 'en';
}

export async function proxy(req: NextRequest) {
  // Skip internal Next.js files, API routes, and public files
  if (
    req.nextUrl.pathname.startsWith('/_next') ||
    req.nextUrl.pathname.includes('/api/') ||
    PUBLIC_FILE.test(req.nextUrl.pathname)
  ) {
    return;
  }

  const { pathname, search } = req.nextUrl;
  
  // Check if pathname already has a locale
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) {
    // Extract locale from pathname and set cookie
    const locale = pathname.split('/')[1] as typeof locales[number];
    const response = NextResponse.next();
    // Set cookie to remember user's locale preference
    response.cookies.set('NEXT_LOCALE', locale, {
      path: '/',
      maxAge: 60 * 60 * 24 * 365, // 1 year
    });
    response.headers.set('x-pathname', pathname);
    return response;
  }

  // No locale in pathname - redirect to add locale
  const locale = getLocale(req);
  const newUrl = new URL(`/${locale}${pathname}${search}`, req.url);
  
  const redirectResponse = NextResponse.redirect(newUrl);
  // Set cookie to remember user's locale preference
  redirectResponse.cookies.set('NEXT_LOCALE', locale, {
    path: '/',
    maxAge: 60 * 60 * 24 * 365, // 1 year
  });
  redirectResponse.headers.set('x-pathname', newUrl.pathname);
  return redirectResponse;
}

export const config = {
  matcher: [
    // Skip all internal paths (_next)
    '/((?!_next).*)',
    // Optional: only run on root (/) URL
    // '/'
  ],
};
