// src/middleware.ts
import { NextRequest, NextResponse } from "next/server";
import { createI18nMiddleware } from "next-international/middleware";
import { locales } from "./i18n";

// next-international – păstrăm setarea existentă
const I18nMiddleware = createI18nMiddleware({
  locales,
  defaultLocale: "en",
  urlMappingStrategy: "rewrite",
});

export function middleware(req: NextRequest) {
  const hasCookie = req.cookies.get("NEXT_LOCALE")?.value === "ro" || req.cookies.get("NEXT_LOCALE")?.value === "en";

  if (!hasCookie) {
    // Detectăm țara DOAR la prima vizită (fără cookie)
    const country = req.headers.get("x-vercel-ip-country") || (req as any).geo?.country || "";
    const initialLocale = country === "RO" || country === "MD" ? "ro" : "en";

    // Setăm cookie-ul și facem o redirecționare 307 către aceeași adresă,
    // ca următoarea cerere să „vadă” preferința încă din primul răspuns.
    const res = NextResponse.redirect(req.nextUrl, { status: 307 });
    res.cookies.set("NEXT_LOCALE", initialLocale, {
      path: "/",
      maxAge: 60 * 60 * 24 * 365, // 1 an
      sameSite: "lax",
    });
    return res;
  }

  // Cookie deja prezent -> lăsăm next-international să-și facă treaba
  return I18nMiddleware(req);
}

export const config = {
  matcher: [
    // ca la tine: totul, mai puțin admin/api/_next/_vercel și fișierele statice
    "/((?!admin|api|_next|_vercel|.*\\..*).*)",
  ],
};
