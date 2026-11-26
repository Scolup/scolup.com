import path from "path"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import {
  APP_TUTORIAL_PATH,
  OPEN_SOURCE_PATH,
  PAGE_TITLES,
  TEAM_PATH,
} from "./src/lib/links.ts"

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    {
      name: "scolup-page-entries",
      apply: "build",
      generateBundle: {
        order: "post",
        handler(_options, bundle) {
          const index = bundle["index.html"]
          if (index?.type !== "asset" || typeof index.source !== "string") {
            this.error("The landing page HTML was not generated")
          }

          const pages = [
            [TEAM_PATH, PAGE_TITLES.team],
            [OPEN_SOURCE_PATH, PAGE_TITLES.source],
            [APP_TUTORIAL_PATH, PAGE_TITLES.tutorial],
          ]

          for (const [route, title] of pages) {
            const url = `https://scolup.com${route}`
            this.emitFile({
              type: "asset",
              fileName: `${route.slice(1)}.html`,
              source: index.source
                .replace(/<title>.*?<\/title>/, `<title>${title}</title>`)
                .replace(
                  'rel="canonical" href="https://scolup.com/"',
                  `rel="canonical" href="${url}"`
                )
                .replace(
                  'property="og:url" content="https://scolup.com/"',
                  `property="og:url" content="${url}"`
                ),
            })
          }
        },
      },
    },
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "./src"),
    },
  },
})
