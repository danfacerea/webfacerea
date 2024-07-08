const { withPayload } = require("@payloadcms/next/withPayload");
const path = require("path");

/** @type {import("next").NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  reactStrictMode: true, // Set to true for stricter React mode
  images: {
    domains: ["localhost", "facerea.ro"], // Add domains for Image component
  },
  webpack(config) {
    return config;
  },
};

module.exports = withPayload(nextConfig, {
  configPath: path.resolve(__dirname, "payload", "payload.config.ts"),
});
