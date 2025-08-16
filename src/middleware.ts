import { NextRequest, NextResponse } from "next/server";
import { createI18nMiddleware } from "next-international/middleware";
import { locales } from "./i18n";

const I18nMiddleware = createI18nMiddleware({
  locales,
  defaultLocale: "en",
  urlMappingStrategy: "rewrite",
});

function pickLocale(req: NextRequest): "ro" | "en" {
  const country =
    req.headers.get("x-vercel-ip-country") || (req as any).geo?.country || "";

  if (country === "RO" || country === "MD") return "ro";

  // Fallback: Accept-Language header (ex: "ro-RO,ro;q=0.9,en;q=0.8")
  const al = req.headers.get("accept-language") || "";
  if (/(^|,)\s*ro(?:-|;|,|$)/i.test(al)) return "ro";

  return "en";
}

export function middleware(req: NextRequest) {
  const cookie = req.cookies.get("NEXT_LOCALE")?.value;
  if (cookie === "ro" || cookie === "en") {
    // deja avem preferință -> rulează i18n ca de obicei
    return I18nMiddleware(req);
  }

  // Prima vizită: alegem limba și setăm cookie + redirect 307
  const initial = pickLocale(req);
  const res = NextResponse.redirect(req.nextUrl, { status: 307 });
  res.cookies.set("NEXT_LOCALE", initial, {
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
    sameSite: "lax",
  });
  return res;
}

export const config = {
  matcher: ["/((?!admin|api|_next|_vercel|.*\\..*).*)"],
};
