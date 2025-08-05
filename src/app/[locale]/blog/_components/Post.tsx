import { getCurrentLocale, getScopedI18n } from "@/locales/server"
import { Post as PostProps } from "@payload-types"

const keyMap = {
	en: {
		title: "titleEnglish",
		content: "htmlEnglish",
	},
	ro: {
		title: "titleRomanian",
		content: "htmlRomanian",
	},
} as const

export const Post = async ({ post, isBlogList }: { post: PostProps; isBlogList?: boolean }) => {
	const currentLocale = getCurrentLocale()
	const t = await getScopedI18n("Blog")

	return (
		<>
			<h1 className="text-4xl mb-2 font-bold">{post[keyMap[currentLocale].title] ?? post.titleEnglish ?? post.titleRomanian}</h1>
			<span className="text-lg text-gray-700">{post.publishedDate}</span>
			<hr className="after:border after:border-gray-300 mt-2 mb-6 cursor-default" />
			<article
				className={`mt-2 prose max-w-4xl ${isBlogList ? "max-h-40 overflow-hidden" : ""}`}
				dangerouslySetInnerHTML={{
					__html: post[keyMap[currentLocale].content] ?? post.contentRomanian ?? post.contentEnglish ?? t("fail"),
				}}
			/>
		</>
	)
}

export const Skeleton = ({ className }: { className?: string }) => <div className={`animate-pulse rounded-md bg-gray-300 ${className}`} />

export const PostSkeleton = () => (
	<>
		<Skeleton className="h-10 w-60 mb-2" />
		<Skeleton className="w-20 h-6" />
		<hr className="after:border after:border-gray-300 mt-2 mb-6 cursor-default" />
		{[96, 64, 80, 72, 56].map(w => <Skeleton key={w} className={`h-6 w-${w} mb-1`} />)}
	</>
)
