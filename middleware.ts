import * as NextServer from "next/server";
import type { NextRequest } from "next/server";
import { locales } from "./src/i18n"; // ajustează dacă e în alt loc

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Verifică dacă URL-ul are deja un prefix de limbă (/ro, /en)
  const hasLocale = locales.some((locale) => pathname.startsWith(`/${locale}`));
  if (hasLocale) {
    return NextServer.NextResponse.next();
  }

  // Verifică dacă utilizatorul a ales deja o limbă (cookie "langSet" e setat)
  const langSet = request.cookies.get("langSet")?.value;
  if (langSet === "true") {
    return NextServer.NextResponse.next();
  }

  // Detectează IP-ul și alege limba implicită
  const locale = request.geo?.country === "RO" ? "ro" : "en";
  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname}`;

  // Redirecționează și setează cookie pentru a nu mai forța pe viitor
  const response = NextServer.NextResponse.redirect(url);
  response.cookies.set("langSet", "true", { path: "/" });
  return response;
}

// Middleware-ul se aplică doar pe rutele care nu sunt fișiere statice sau din /_next
export const config = {
  matcher: ["/((?!_next|favicon.ico|.*\\..*).*)"],
};
