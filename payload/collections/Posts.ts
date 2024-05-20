import type { Post } from "@payload-types"
import { HTMLConverterFeature, lexicalEditor, lexicalHTML } from "@payloadcms/richtext-lexical"
import type { CollectionConfig, FieldHookArgs } from "payload/types"
import { v4 } from "uuid"

const slugify = (...args: (string | number)[]): string => {
	const value = args.join(" ")

	return value
		.normalize("NFD") // split an accented letter in the base letter and the acent
		.replace(/[\u0300-\u036f]/g, "") // remove all previously split accents
		.toLowerCase()
		.trim()
		.replace(/[^a-z0-9 ]/g, "") // remove all chars not letters, numbers and spaces (to be replaced)
		.replace(/\s+/g, "-") // separator
}

const Posts: CollectionConfig = {
	slug: "posts",
	admin: {
		useAsTitle: "titleRomanian",
	},
	fields: [
		{
			name: "titleEnglish",
			type: "text",
			required: true,
		},
		{
			name: "titleRomanian",
			type: "text",
			required: true,
		},
		{
			name: "contentEnglish",
			type: "richText",
			editor: lexicalEditor({
				features: ({ defaultFeatures }) => [...defaultFeatures, HTMLConverterFeature({})],
			}),
			required: true,
		},
		lexicalHTML("contentEnglish", { name: "htmlEnglish" }),
		{
			name: "contentRomanian",
			type: "richText",
			editor: lexicalEditor({
				features: ({ defaultFeatures }) => [...defaultFeatures, HTMLConverterFeature({})],
			}),
			required: true,
		},
		lexicalHTML("contentRomanian", { name: "htmlRomanian" }),
		{
			name: "publishedDate",
			type: "date",
			admin: {
				position: "sidebar",
				readOnly: true,
			},
			hooks: {
				beforeChange: [({ value }: FieldHookArgs<Post, string, Post>) => value ?? new Date().toISOString()],
				afterRead: [({ value }: FieldHookArgs<Post, string, Post>) => new Date(value ?? new Date().getTime()).toLocaleDateString()],
			},
		},
		{
			name: "slug",
			label: "Slug",
			type: "text",
			index: true,
			unique: true,
			admin: {
				position: "sidebar",
				readOnly: true,
			},
			hooks: {
				beforeChange: [async (args: FieldHookArgs<Post, string, Post>) => {
					if (args.value) return args.value
					const slug = slugify(args.siblingData.titleRomanian ?? "")
					let uuid = v4().slice(0, 8)
					while ((await args.req.payload.find({ collection: "posts", where: { slug: { equals: slug + "-" + uuid } } })).totalDocs > 0) {
						uuid = v4().slice(0, 8)
					}
					return slug + "-" + uuid
				}],
			},
		},
	],
}

export default Posts
