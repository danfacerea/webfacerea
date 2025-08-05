import { getScopedI18n } from "@/locales/server"
import configPromise from "@payload-config"
import { getPayload } from "payload"
import React from "react"
import { Post } from "./_components/Post"


const Blog = async () => {
	const t = await getScopedI18n("Blog")
	const payload = await getPayload({ config: configPromise })
	const posts = await payload.find({ collection: "posts" })
	
	return (
		<div className="flex flex-col gap-6 max-w-4xl w-full justify-center items-center my-6 px-4 mx-auto">
			<h1 className="text-5xl font-bold mt-4">Blog</h1>

			
			{posts.docs.map(post => (
				<a
					key={post.id}
					href={"/blog/" + post.slug ?? ""}
					className="w-full pb-4 px-6 border rounded-lg bg-gray-100 hover:bg-gray-200 group"
				>
					<div
						className="w-full py-4"
						style={{ WebkitMaskImage: "linear-gradient(180deg, #000 60%, transparent)" }}
					>
						<Post post={post} isBlogList />
					</div>
					<span className="text-blue-600 group-hover:text-blue-500 group-hover:underline">{t("read")} »</span>
	
				
				</a>
			))}
		</div>
	)
}

export default Blog
