onst { withPayload } = require("@payloadcms/next/withPayload")
const path = require("path")

/** @type {import("next").NextConfig}  */
const nextConfig = {
	eslint: {
		ignoreDuringBuilds: true,
	},
	reactStrictMode: false,
	images: {
		remotePatterns: [
			{
				protocol: "http",
				hostname: "localhost",
			},
			{
				protocol: "https",
				hostname: "facerea.ro",
			},
		],
	}
}

module.exports = withPayload(nextConfig, { configPath: path.resolve(__dirname, "payload", "payload.config.ts") })
