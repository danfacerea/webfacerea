"use client"

import "./globals.css"
import { Locale } from "@/i18n"
import { I18nProviderClient } from "@/locales/client"
import { Lora } from "next/font/google"
import NavBar from "@/app/_components/NavBar"

const font = Lora({ subsets: ["latin"] })

const Layout = ({ children, params }: { children: React.ReactNode; params: { locale: Locale } }) => {
	return (
		<html lang={params.locale}>
			<body className={`${font.className} min-h-screen flex flex-col`}>
				<I18nProviderClient locale={params.locale}>
					<NavBar />
					{children}
				</I18nProviderClient>
			</body>
		</html>
	)
}
export default Layout
