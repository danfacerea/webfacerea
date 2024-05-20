import { createI18nMiddleware } from "next-international/middleware"
import { NextRequest } from "next/server"
import { locales } from "./i18n"

const I18nMiddleware = createI18nMiddleware({
	locales,
	defaultLocale: "en",
	urlMappingStrategy: "rewrite",
})

export function middleware(request: NextRequest) {
	return I18nMiddleware(request)
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
