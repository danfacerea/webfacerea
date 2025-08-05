import { PostSkeleton, Skeleton } from "../_components/Post"

const Loading = () => {
	return (
		<div className="flex flex-col gap-4 max-w-4xl w-full md:w-full mt-12 px-8 mx-auto">
			<Skeleton className="w-24 h-6 bg-blue-600/50" />
			<main className="md:min-w-[36rem] md:max-w-full">
				<PostSkeleton />
			</main>
		</div>
	)
}

export default Loading
