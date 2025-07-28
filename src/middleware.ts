import { createI18nMiddleware } from "next-international/middleware"
import { NextRequest } from "next/server"
import { locales } from "./i18n"

// Funcție pentru detectarea limbii în funcție de IP
function getLocaleFromIP(request: NextRequest): "ro" | "en" {
	// Obține IP-ul din header-ul CF-IPCountry (Cloudflare) sau din geoip
	const country = request.headers.get('CF-IPCountry') || 
				   request.headers.get('X-Vercel-IP-Country') ||
				   request.geo?.country

	// România și Moldova → română, restul → engleză
	if (country === 'RO' || country === 'MD') {
		return 'ro'
	}
	
	return 'en'
}

const I18nMiddleware = createI18nMiddleware({
	locales,
	defaultLocale: "en",
	urlMappingStrategy: "rewrite",
})

export function middleware(request: NextRequest) {
	// Detectează limba în funcție de IP
	const detectedLocale = getLocaleFromIP(request)
	
	// Creează middleware-ul cu limba detectată
	const middleware = createI18nMiddleware({
		locales,
		defaultLocale: detectedLocale,
		urlMappingStrategy: "rewrite",
	})
	
	return middleware(request)
}

export const config = {
	// Matcher entries are linked with a logical "or", therefore
	// if one of them matches, the middleware will be invoked.
	matcher: [
		// Match all pathnames except for
		// - … if they start with `/admin`, `/api`, `/_next` or `/_vercel`
		// - … the ones containing a dot (e.g. `favicon.ico`)
		"/((?!admin|api|_next|_vercel|.*\\..*).*)",
	],
}
