/* eslint-disable @next/next/no-img-element */
"use client"

import { useCurrentLocale, useScopedI18n } from "@/locales/client"
import { useCallback, useEffect, useRef, useState } from "react"

const ReadBookPage = () => {
	const t = useScopedI18n("ReadBook")
	const currentLocale = useCurrentLocale()
	const hasWindow = typeof window !== "undefined"
	const offset = 7
	const maxPage = currentLocale === "en" ? 359 : 350
	const collapseWidth = 1280
	const bookViewer = useRef<HTMLDivElement>(null)

/*	
 const checkOnePage  = useCallback(() => {
const width = hasWindow ? window.innerWidth : null;
 const height = hasWindow ? window.innerHeight : null;
return { width, height };
  }, [hasWindow]);
*/

	const checkOnePage = useCallback(() => {
		const width = hasWindow ? window.innerWidth : 0
		return width < collapseWidth
	}, [hasWindow])

	const [page, setPage] = useState(1)
	const [loadedL, setLoadedL] = useState(true)
	const [loadedR, setLoadedR] = useState(true)
	const [fullscreen, setFullscreen] = useState(false)
	const [isOnePage, setOnePage] = useState(checkOnePage())
	
	const [touchStartX, setTouchStartX] = useState(0) //Dan
	
	const prevPage = useCallback(
		() => {
			if (page > 1 + (isOnePage ? 0 : 1)) {
				setLoadedL(false)
				setLoadedR(false)
			}
			if (!isOnePage && page % 2 === 0) setPage(page - 1)
			else setPage(Math.max(page - (isOnePage ? 1 : 2), 1))
		},
		[isOnePage, page],
	)

	const nextPage = useCallback(
		() => {
			if (page < maxPage - (isOnePage ? 0 : 1) + offset) {
				setLoadedL(false)
				setLoadedR(false)
			}
			if (!isOnePage && page >= maxPage + offset - 2) setPage(maxPage + offset - 1)
			else setPage(Math.min(page + (isOnePage ? 1 : 2), maxPage + offset))
		},
		[isOnePage, maxPage, page],
	)



//Dan

	const handleTouchStart = (e: TouchEvent) => {
		setTouchStartX(e.touches[0].clientX)
	}
	const handleTouchMove = (e: TouchEvent) => {
		if (touchStartX === 0) return
		const touchEndX = e.touches[0].clientX
		const touchDiff = touchEndX - touchStartX

		if (touchDiff > 50) {
			prevPage()
			setTouchStartX(0)
		} else if (touchDiff < -50) {
			nextPage()
			setTouchStartX(0)
		}
	}
	
    useEffect(() => {
    const viewer = bookViewer.current
    if (!viewer) return

    viewer.addEventListener("touchstart", handleTouchStart)
    viewer.addEventListener("touchmove", handleTouchMove)

    return () => {
      viewer.removeEventListener("touchstart", handleTouchStart)
      viewer.removeEventListener("touchmove", handleTouchMove)
    }
  }, [handleTouchStart, handleTouchMove])
//Dan END





	

	useEffect(() => {
		const handleKeyDown = (event: WindowEventMap["keydown"]) => {
			if (event.target instanceof HTMLInputElement) return
			if (event.key === "ArrowLeft") prevPage()
			else if (event.key === "ArrowRight") nextPage()
			else if (event.key === "Escape" && document.fullscreenElement) {
				setFullscreen(false)
				document.exitFullscreen()
			}
		}

		window.addEventListener("keydown", handleKeyDown)
		return () => window.removeEventListener("keydown", handleKeyDown)
	}, [nextPage, prevPage])

	useEffect(() => {
		if (!hasWindow) return
		const handleResize = () => {
			const onePage = checkOnePage()
			setOnePage(onePage)
			if (page % 2 === 0 && page > 1 && !onePage) setPage(page - 1)
		}
		window.addEventListener("resize", handleResize)
		return () => window.removeEventListener("resize", handleResize)
	}, [checkOnePage, hasWindow, isOnePage, page])

	const goFullscreen = () => {
		if (!hasWindow) return
		setFullscreen(true)
		bookViewer.current?.requestFullscreen()
	}

	return (
		<div className="flex flex-col md:flex-row gap-2 justify-center items-center">
			<div
				className="flex flex-row items-center justify-center"
				ref={bookViewer}
			>
				<div id="lpage" className={`${fullscreen ? "" : "flex-1"}`}>
					<img
						width={720 * 1.2} //DAN multiply with 1.3
						height={1024}
						src={`https://facerea.ro/img${currentLocale}/${page}.jpg`}
						alt={`${t("page")} ${page - offset}`}
						className={`max-h-bookMobile md:max-h-book w-100% aspect-auto ${loadedL ? "" : "animate-pulse-fast"}`}
						onLoad={() => setLoadedL(true)}
						onError={() => setLoadedL(true)}
					/>
				</div>
				<div id="rpage"
					className={`${fullscreen ? "" : "flex-1"} ${
						page === maxPage + offset && maxPage + offset % 2 === 1 ? "hidden" : "hidden xl:block"
					}`}
				>
					<img
						width={720 *1.2} //Dan
						height={1440}
						src={`https://facerea.ro/img${currentLocale}/${page + 1}.jpg`}
						alt={`${t("page")} ${page - offset}`}
						className={`max-h-bookMobile md:max-h-book w-100% aspect-auto ${loadedR ? "" : "animate-pulse-fast"}`}
						onLoad={() => setLoadedR(true)}
						onError={() => setLoadedR(true)}
					/>
				</div>
			</div>

			<div className="flex flex-col order-last md:order-first px-4 pb-4 justify-between content-center gap-2 w-full md:w-max">
				<button className="px-3 py-2 flex-1 rounded bg-gray-300 hover:bg-gray-400" type="button" onClick={() => nextPage()}>
					{t("next")}
				</button>
				
				<input
					placeholder={t("jump")}
					className="px-3 py-1 flex-1 bg-white rounded border-2 border-gray-300 text-center"
					onKeyDown={event => {
						if (event.key === "Enter") {
							const value = parseInt(event.currentTarget.value)
							const newPage = value + offset
							if (value >= 1 && value <= maxPage) {
								setPage(newPage - (!isOnePage && newPage % 2 === 0 ? 1 : 0) - (value === maxPage ? newPage % 2 : 0))
							}
							event.currentTarget.value = ""
							
    							event.currentTarget.blur(); // Dan  Call blur() method on the text box
  
						}
					}}
				/>

				<button className="px-3 py-2 flex-1 rounded bg-gray-300 hover:bg-gray-400" type="button" onClick={() => prevPage()}>
					{t("previous")}
				</button>


				<button
					className="hidden md:block px-3 py-2 flex-1 rounded bg-gray-300 hover:bg-gray-400"
					type="button"
					onClick={goFullscreen}
				>
					{t("fullscreen")}
				</button>
			</div>
		</div>
	)
}

export default ReadBookPage
