import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { locales } from "./i18n" // aici ai definit ["en", "ro"]

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Ignoră redirectul dacă deja există prefix de limbă
  const hasLocale = locales.some((locale) => pathname.startsWith(`/${locale}`))
  if (hasLocale) {
    return NextResponse.next()
  }

  // Verifică dacă utilizatorul a ales deja limba (cookie setat de LanguagePicker)
  const langSet = request.cookies.get("langSet")?.value
  if (langSet === "true") {
    return NextResponse.next()
  }

  // Setează limba implicită în funcție de IP (doar prima dată)
  const locale = request.geo?.country === "RO" ? "ro" : "en"
  const url = request.nextUrl.clone()
  url.pathname = `/${locale}${pathname}`

  const response = NextResponse.redirect(url)
  response.cookies.set("langSet", "true") // marcăm că s-a făcut redirect o dată
  return response
}

// Activează middleware-ul doar pentru rutele fără extensie
export const config = {
  matcher: ["/((?!_next|favicon.ico|.*\\..*).*)"],
}
