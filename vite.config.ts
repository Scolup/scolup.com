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
  build: {
    cssCodeSplit: false,
    rolldownOptions: {
      output: { codeSplitting: false },
    },
  },
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

          // Serve the app with the HTML so a wrong MIME type on assets
          // cannot prevent Cloudflare Pages from loading the interface.
          const scriptTag =
            /<script type="module"[^>]* src="\/([^"]+)"[^>]*><\/script>/
          const styleTag = /<link rel="stylesheet"[^>]* href="\/([^"]+)"[^>]*>/
          const scriptFile = index.source.match(scriptTag)?.[1]
          const styleFile = index.source.match(styleTag)?.[1]
          const script = scriptFile ? bundle[scriptFile] : undefined
          const style = styleFile ? bundle[styleFile] : undefined

          if (
            script?.type !== "chunk" ||
            script.imports.length ||
            script.dynamicImports.length
          ) {
            this.error("Expected one JavaScript bundle without external imports")
          }
          if (style?.type !== "asset") {
            this.error("Expected a single generated stylesheet")
          }

          const inlineScript = script.code.replace(/<\/(script)/gi, "<\\/$1")
          const css =
            typeof style.source === "string"
              ? style.source
              : new TextDecoder().decode(style.source)
          const inlineStyle = css.replace(/<\/(style)/gi, "\\3C /$1")
          index.source = index.source
            .replace(
              scriptTag,
              () => `<script type="module">${inlineScript}</script>`
            )
            .replace(styleTag, () => `<style>${inlineStyle}</style>`)
          delete bundle[script.fileName]
          delete bundle[style.fileName]

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
