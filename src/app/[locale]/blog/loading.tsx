import { PostSkeleton, Skeleton } from "./_components/Post"

const Loading = () => {
	return (
		<div className="flex flex-col gap-6 max-w-4xl w-full justify-center items-center my-6 px-4 mx-auto">
			<h1 className="text-5xl font-bold mt-4">Blog</h1>
			{[1, 2, 3].map(i => (
				<div key={i} className="w-full pb-4 px-6 border rounded-lg bg-gray-100 hover:bg-gray-200 group">
					<div className="w-full py-4" style={{ WebkitMaskImage: "linear-gradient(180deg, #000 60%, transparent)" }}>
						<PostSkeleton/>
					</div>
					<Skeleton className="bg-blue-600 h-5 w-24" />
				</div>
			))}
		</div>
	)
}

export default Loading
