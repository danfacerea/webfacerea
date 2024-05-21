"use client"

import { useScopedI18n } from "@/locales/client"
import { redirect } from "next/navigation"
import { useEffect, useState } from "react"

const Order = () => {
	const t = useScopedI18n("Order")
	const [go, setGo] = useState(false)

	//useEffect(() => {
	//	if (go) return redirect("https://amazon.com/")
	//	setTimeout(() => setGo(true), 2000)
	//}, [go])


	// Get the popup window and OK button
const popup = document.getElementById("popup")
const okBtn = document.getElementById("ok-btn")

// Get the open popup button
const openPopupBtn = document.getElementById("open-popup")

// Open the popup window when the button is clicked
openPopupBtn.addEventListener("click", () => {
  popup.style.display = "block"
})

// Close the popup window when the OK button is clicked
okBtn.addEventListener("click", () => {
  popup.style.display = "none"
});

	return (
		<div className="flex flex-1 justify-center items-center">
			<p className="text-2xl">{t("message")}</p>
		</div>
	)
}
export default Order
