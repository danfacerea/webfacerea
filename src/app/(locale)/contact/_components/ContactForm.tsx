"use client"

import { useScopedI18n } from "@/locales/client"
import { LoaderCircle, Mail, Send, UserRound } from "lucide-react"
import { FormEvent, useState } from "react"
import { send } from "./email"
import { useRouter } from "next/navigation"

export const ContactForm = () => {
	const router = useRouter()
	const t = useScopedI18n("Contact")
	const [sending, setSending] = useState(false)

	const sendEmail = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		setSending(true)
		console.log("Sending")

		const formData = new FormData(event.currentTarget)

		const name = formData.get("name") as string | null
		const email = formData.get("email") as string | null
		const message = formData.get("message") as string | null

		if (!name || !email || !message) return alert(t("fill"))

		const success = await send({ name, email, message })
		alert(t(success ? "success" : "fail"))
		setSending(false)

		if (success) router.push("/")
	}

	return (
		<div className="max-w-5xl bg-gray-800 text-white m-4 p-6 md:p-8 rounded-xl flex flex-col gap-8">
			<div className="flex flex-col gap-1.5">
				<h1 className="text-4xl font-bold">{t("title")}</h1>
				<p className="text-lg font-medium">{t("subtitle")}</p>
			</div>
			<form className="flex flex-col gap-5" onSubmit={sendEmail}>
				<div className="flex flex-col gap-1">
					<label
						className="relative text-lg w-max after:content-['*'] after:absolute after:-right-3 after:top-0 after:text-sm after:text-red-500"
						htmlFor="name"
					>
						{t("name")}
					</label>
					<div className="flex items-center rounded-md border border-gray-500 bg-gray-700 has-[:focus]:border-gray-300 transition">
						<UserRound className="w-6 h-6 mx-2" />
						<input
							type="text"
							name="name"
							className="h-10 flex-1 rounded-s-none rounded-e-md px-3 bg-gray-900 outline-none"
						>
						</input>
					</div>
				</div>
				<div className="flex flex-col gap-1">
					<label
						className="relative text-lg w-max after:content-['*'] after:absolute after:-right-3 after:top-0 after:text-sm after:text-red-500"
						htmlFor="email"
					>
						{t("email")}
					</label>
					<div className="flex items-center rounded-md border border-gray-500 bg-gray-700 has-[:focus]:border-gray-300 transition">
						<Mail className="w-6 h-6 mx-2" />
						<input
							type="text"
							name="email"
							className="h-10 flex-1 rounded-s-none rounded-e-md px-3 bg-gray-900 outline-none"
						>
						</input>
					</div>
				</div>
				<div className="flex flex-col gap-1">
					<label
						className="relative text-lg w-max after:content-['*'] after:absolute after:-right-3 after:top-0 after:text-sm after:text-red-500"
						htmlFor="message"
					>
						{t("message")}
					</label>
					<textarea
						name="message"
						className="rounded-md py-2 px-2.5 bg-gray-900 border border-gray-500 focus:border-gray-300 outline-none transition"
					>
					</textarea>
				</div>
				<div>
					<button
						className={[
							"w-full h-12 p-2 text-xl font-semibold flex gap-2 justify-center items-center rounded",
							"bg-gray-100 text-black hover:bg-gray-300 focus:bg-gray-300 disabled:bg-gray-500 outline-none transition",
						].join(" ")}
						type="submit"
						disabled={sending}
					>
						{t("send")} {sending ? <LoaderCircle className="h-5 animate-spin" /> : <Send className="h-5" strokeWidth={2.5} />}
					</button>
				</div>
			</form>
		</div>
	)
}
