import path from "path"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import {
  APP_TUTORIAL_PATH,
  OPEN_SOURCE_PATH,
  PAGE_DESCRIPTIONS,
  PAGE_TITLES,
  TEAM_PATH,
} from "./src/lib/links.ts"

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
}

function replaceMeta(
  html: string,
  attribute: "name" | "property",
  key: string,
  content: string
): string {
  const pattern = new RegExp(
    `(<meta\\s+${attribute}="${key}"\\s+content=")[^"]*(")`,
    "i"
  )
  return html.replace(
    pattern,
    (_match, prefix: string) => `${prefix}${escapeHtml(content)}"`
  )
}

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
            [TEAM_PATH, PAGE_TITLES.team, PAGE_DESCRIPTIONS.team],
            [OPEN_SOURCE_PATH, PAGE_TITLES.source, PAGE_DESCRIPTIONS.source],
            [
              APP_TUTORIAL_PATH,
              PAGE_TITLES.tutorial,
              PAGE_DESCRIPTIONS.tutorial,
            ],
          ] as const

          for (const [route, title, description] of pages) {
            const url = `https://scolup.com${route}`
            let source = index.source
              .replace(
                /<title>.*?<\/title>/,
                `<title>${escapeHtml(title)}</title>`
              )
              .replace(
                'rel="canonical" href="https://scolup.com/"',
                `rel="canonical" href="${url}"`
              )
              .replace(
                'property="og:url" content="https://scolup.com/"',
                `property="og:url" content="${url}"`
              )

            source = replaceMeta(source, "name", "description", description)
            source = replaceMeta(source, "property", "og:title", title)
            source = replaceMeta(
              source,
              "property",
              "og:description",
              description
            )
            source = replaceMeta(source, "name", "twitter:title", title)
            source = replaceMeta(
              source,
              "name",
              "twitter:description",
              description
            )

            this.emitFile({
              type: "asset",
              fileName: `${route.slice(1)}.html`,
              source,
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
