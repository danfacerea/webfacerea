import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { locales } from "./src/i18n"; // corect: i18n e în /src

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Dacă URL-ul are deja limbă în el, continuă normal
  const hasLocale = locales.some((locale) => pathname.startsWith(`/${locale}`));
  if (hasLocale) {
    return NextResponse.next();
  }

  // Dacă utilizatorul a ales deja limba (cookie setat de LanguagePicker), nu forța redirect
  const langSet = request.cookies.get("langSet")?.value;
  if (langSet === "true") {
    return NextResponse.next();
  }

  // Alege limba implicită pe baza locației (RO → ro, altfel en)
  const locale = request.geo?.country === "RO" ? "ro" : "en";
  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname}`;

  // Marchează că redirectul s-a făcut o dată
  const response = NextResponse.redirect(url);
  response.cookies.set("langSet", "true", { path: "/" });
  return response;
}

// Middleware activ doar pentru paginile reale, nu pentru /_next sau fișiere statice
export const config = {
  matcher: ["/((?!_next|favicon.ico|.*\\..*).*)"],
};
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { locales } from "./src/i18n"; // corect: i18n e în /src

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Dacă URL-ul are deja limbă în el, continuă normal
  const hasLocale = locales.some((locale) => pathname.startsWith(`/${locale}`));
  if (hasLocale) {
    return NextResponse.next();
  }

  // Dacă utilizatorul a ales deja limba (cookie setat de LanguagePicker), nu forța redirect
  const langSet = request.cookies.get("langSet")?.value;
  if (langSet === "true") {
    return NextResponse.next();
  }

  // Alege limba implicită pe baza locației (RO → ro, altfel en)
  const locale = request.geo?.country === "RO" ? "ro" : "en";
  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname}`;

  // Marchează că redirectul s-a făcut o dată
  const response = NextResponse.redirect(url);
  response.cookies.set("langSet", "true", { path: "/" });
  return response;
}

// Middleware activ doar pentru paginile reale, nu pentru /_next sau fișiere statice
export const config = {
  matcher: ["/((?!_next|favicon.ico|.*\\..*).*)"],
};
