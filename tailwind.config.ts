import typography from "@tailwindcss/typography" 
import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      animation: {
        "pulse-fast": "pulse 1s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      maxHeight: {
        book: "calc(100vh - 4rem)",
        bookMobile: "calc(100vh - 13rem)",
      },
    },
  },
  plugins: [typography()],
}

export default config

