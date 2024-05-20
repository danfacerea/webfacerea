"use client"

import { useScopedI18n } from "@/locales/client"
import { Disclosure } from "@headlessui/react"
import { Menu, X } from "lucide-react"
import Link from "next/link"
import { usePathname, useSearchParams } from "next/navigation"
import { LanguagePicker } from "./LanguagePicker"

const navigation = ["home", "order", "contact", "blog"] as const

function classNames(...classes: string[]) {
	return classes.filter(Boolean).join(" ")
}

export default function NavBar() {
	const pathname = usePathname()
	const searchParams = useSearchParams()
	const t = useScopedI18n("Navbar")

	return (
		<Disclosure as="nav" className="bg-gray-800 sticky top-0 z-10">
			{({ open }) => (
				<>
					<div className="mx-auto max-w-7xl px-2 md:px-6 lg:px-8">
						<div className="flex h-16 items-center justify-between">
							<Disclosure.Button className="md:hidden rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
								<span className="sr-only">Open main menu</span>
								{open ? <X className="h-6 w-6" aria-hidden="true" /> : <Menu className="h-6 w-6" aria-hidden="true" />}
							</Disclosure.Button>
							<Link
								href="/"
								className="flex-1 md:flex-none text-center text-white text-2xl"
							>
								{t("icon")}
							</Link>
							<div className="hidden md:flex gap-2">
								{navigation.map(item => (
									<Link
										key={item}
										href={"/" + (item === "home" ? "" : item)}
										className={classNames(
											pathname === "/" + (item === "home" ? "" : item)
												? "bg-gray-900 text-white"
												: "text-gray-300 hover:bg-gray-700 hover:text-white",
											"rounded-md text-center font-medium py-2 px-3",
										)}
									>
										{t(item)}
									</Link>
								))}
								<LanguagePicker
									className="hidden md:inline"
									currentLanguage={(searchParams?.get("lang") as "en" | "ro") ?? "en"}
								/>
							</div>
						</div>
					</div>

					<Disclosure.Panel className="absolute h-max w-full md:hidden bg-gray-800 flex flex-col p-2 gap-2">
						{navigation.map(item => (
							<Disclosure.Button
								key={item}
								href={"/" + (item === "home" ? "" : item)}
								as="a"
								className={classNames(
									pathname === "/" + item
										? "bg-gray-900 text-white"
										: "text-gray-300 hover:bg-gray-700 hover:text-white",
									"block rounded-md px-3 py-2 text-base font-medium",
								)}
							>
								{t(item)}
							</Disclosure.Button>
						))}
						<LanguagePicker
							className="w-full"
							currentLanguage={(searchParams?.get("lang") as "en" | "ro") ?? "en"}
						/>
					</Disclosure.Panel>
				</>
			)}
		</Disclosure>
	)
}
