"use client"

import { useScopedI18n } from "@/locales/client"

const NotFoundPage = () => {
	const t = useScopedI18n("NotFound")

	return (
		<div className="h-screen w-screen flex flex-col items-center justify-center">
			<h1 className="text-3xl font-bold">{t("title")}</h1>
			<p>{t("content")}</p>
		</div>
	)
}

export default NotFoundPage
