import { getScopedI18n } from "@/locales/server"
import configPromise from "@payload-config"
import Link from "next/link"
import { notFound } from "next/navigation"
import { getPayload } from "payload"
import { Post } from "../_components/Post"

export default async function Page({ params }: { params: { slug: string } }) {
	const t = await getScopedI18n("Blog")
	const payload = await getPayload({ config: configPromise })
	const post = await payload.find({ collection: "posts", where: { slug: { equals: params.slug } } })

	if (post.totalDocs === 0) return notFound()

	return (
		<div className="flex flex-col gap-4 max-w-4xl w-full md:w-max mt-12 px-8 mx-auto">
			<Link href="/blog" className="text-blue-600 hover:text-blue-400 hover:underline">« {t("back")}</Link>
			<main className="md:min-w-[36rem] md:max-w-full">
				<Post post={post.docs[0]} />
			</main>
		</div>
	)
}
