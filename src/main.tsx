import { StrictMode, useEffect } from "react"
import { createRoot } from "react-dom/client"

import "./index.css"
import App from "./App.tsx"
import { ThemeProvider } from "@/components/theme-provider.tsx"

const rootElement = document.getElementById("root")!
const startup = document.getElementById("scolup-startup")!

function Startup() {
  useEffect(() => {
    const images = rootElement.querySelectorAll<HTMLImageElement>(
      "[data-startup-image]"
    )
    let pending = true

    function revealPage() {
      if (!pending) return
      pending = false
      window.clearTimeout(timeout)
      startup.dataset.ready = ""
      startup.inert = true
      rootElement.inert = false
    }

    const timeout = window.setTimeout(revealPage, 15_000)
    void Promise.allSettled(Array.from(images, (image) => image.decode())).then(
      revealPage
    )

    return () => {
      pending = false
      window.clearTimeout(timeout)
    }
  }, [])

  return null
}

createRoot(rootElement).render(
  <StrictMode>
    <ThemeProvider>
      <App />
      <Startup />
    </ThemeProvider>
  </StrictMode>
)
