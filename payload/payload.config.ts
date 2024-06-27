import { mongooseAdapter } from "@payloadcms/db-mongodb"
import { lexicalEditor } from "@payloadcms/richtext-lexical"
import { buildConfig } from "payload/config"
import Posts from "./collections/Posts"

import { Config } from './payload-types'

declare module 'payload' {
  export interface LocalGeneratedTypes extends Config {}
}

const secret = process.env.PAYLOAD_SECRET
if (!secret) {
	throw new Error("No PAYLOAD_SECRET provided")
}



export default buildConfig({
	collections: [
		Posts,
	],
	db: mongooseAdapter({ url: process.env.MONGODB_URI || false }),
	editor: lexicalEditor({}),
	secret,
	typescript: {
   		declare: false,
	},
	
})


