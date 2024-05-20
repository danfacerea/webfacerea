"use client"

import { useScopedI18n } from "@/locales/client"
import { redirect } from "next/navigation"
import { useEffect, useState } from "react"

const Order = () => {
	const t = useScopedI18n("Order")
	const [go, setGo] = useState(false)

	useEffect(() => {
		if (go) return redirect("https://amazon.com/")
		setTimeout(() => setGo(true), 2000)
	}, [go])

	return (
		<div className="flex flex-1 justify-center items-center">
			<p className="text-2xl">{t("message")}</p>
		</div>
	)
}
export default Order
