"use client"

import "./globals.css"
import { Locale } from "@/i18n"
import { I18nProviderClient } from "@/locales/client"
import { Lora } from "next/font/google"
import NavBar from "@/app/_components/NavBar"
import { useEffect } from "react"
import ReactGA from "react-ga"


const font = Lora({ subsets: ["latin"] })
const TRACKING_ID = "G-YRVLSBHNZ5" // Replace with your tracking ID

const Layout = ({ children, params }: { children: React.ReactNode; params: { locale: Locale } }) => {
	useEffect(() => {
		ReactGA.initialize(TRACKING_ID)
		ReactGA.pageview(window.location.pathname + window.location.search)
	}, [])

	return (
		<html lang={params.locale}>
			<head>
				<script async src={`https://www.googletagmanager.com/gtag/js?id=${TRACKING_ID}`}></script>
				<script
					dangerouslySetInnerHTML={{
						__html: `
							window.dataLayer = window.dataLayer || [];
							function gtag(){dataLayer.push(arguments);}
							gtag('js', new Date());
							gtag('config', '${TRACKING_ID}');
						`,
					}}
				></script>
			</head>
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
