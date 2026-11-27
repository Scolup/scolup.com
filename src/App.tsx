import { useEffect, useRef, useState } from "react"

import {
  buildAppUrl,
  getGoAppPreference,
  setGoAppPreference,
  shouldRedirectToApp,
  isLandingBypass,
} from "@/lib/go-app"

import {
  FAQSection,
  FeaturesSection,
  Footer,
  Header,
  HeroSection,
  HowItWorksSection,
  RedirectAlert,
  ScreenshotsSection,
} from "@/components/landing"
import { AppTutorial } from "@/components/landing/AppTutorial"
import { ProjectPage } from "@/components/landing/ProjectPage"
import {
  APP_TUTORIAL_PATH,
  GITHUB_ORG_URL,
  OPEN_SOURCE_PATH,
  TEAM_PATH,
} from "@/lib/links"

import "./landing.css"

function LandingPage() {
  const landing = useRef<HTMLDivElement>(null)
  const [goAppDirect, setGoAppDirect] = useState(false)
  const [isBypass] = useState(() =>
    typeof window === "undefined"
      ? false
      : isLandingBypass(window.location.search)
  )

  useEffect(() => {
    setGoAppDirect(getGoAppPreference())
    const url = new URL(window.location.href)
    const section = url.searchParams.get("section")
    const target = document.getElementById(section ?? url.hash.slice(1))
    if (target) {
      target.scrollIntoView()
    } else if (shouldRedirectToApp(window.location.search)) {
      window.location.replace(buildAppUrl(window.location.search))
    }
    if (section) {
      url.searchParams.delete("section")
      history.replaceState(history.state, "", url)
    }
  }, [])

  useEffect(() => {
    const container = landing.current
    if (
      !container ||
      !("IntersectionObserver" in window) ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return
    }

    const elements = Array.from(
      container.querySelectorAll<HTMLElement>("[data-reveal]")
    ).filter(
      (element) => element.getBoundingClientRect().top >= window.innerHeight
    )

    const reveal: IntersectionObserverCallback = (entries, observer) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue
        const element = entry.target as HTMLElement
        if (element.dataset.revealState === "pending") {
          element.dataset.revealState = "shown"
        }
        observer.unobserve(element)
      }
    }

    const revealInset = Math.min(176, Math.round(window.innerHeight * 0.23))
    const observer = new IntersectionObserver(reveal, {
      rootMargin: `0px 0px -${revealInset}px`,
    })
    const footerObserver = new IntersectionObserver(reveal, {
      rootMargin: "0px 0px -12px",
    })

    function revealFocusedElement(event: FocusEvent) {
      if (!(event.target instanceof HTMLElement)) return
      const element = event.target.closest<HTMLElement>("[data-reveal-state]")
      if (!element) return
      delete element.dataset.revealState
      observer.unobserve(element)
      footerObserver.unobserve(element)
    }

    for (const element of elements) {
      element.dataset.revealState = "pending"
      if (element.dataset.reveal === "brand") {
        footerObserver.observe(element)
      } else {
        observer.observe(element)
      }
    }
    container.addEventListener("focusin", revealFocusedElement)

    return () => {
      observer.disconnect()
      footerObserver.disconnect()
      container.removeEventListener("focusin", revealFocusedElement)
      for (const element of elements) delete element.dataset.revealState
    }
  }, [])

  return (
    <div ref={landing} id="top" className="landing landing-home antialiased">
      <a className="landing-skip" href="#contenu">
        Aller au contenu
      </a>
      {isBypass && goAppDirect && (
        <RedirectAlert
          onDisableDirect={() => {
            setGoAppDirect(false)
            setGoAppPreference(false)
          }}
        />
      )}
      <Header />
      <main id="contenu" tabIndex={-1}>
        <HeroSection />
        <FeaturesSection />
        <ScreenshotsSection />
        <HowItWorksSection />
        <FAQSection />
      </main>
      <Footer />
    </div>
  )
}

function RouteRedirect({ href, label }: { href: string; label: string }) {
  useEffect(() => {
    window.location.replace(href)
  }, [href])

  return <a href={href}>{label}</a>
}

export function App() {
  const pathname = window.location.pathname.replace(/\/$/, "")
  if (pathname === APP_TUTORIAL_PATH + "/app") {
    return <RouteRedirect href={APP_TUTORIAL_PATH} label="Ouvrir le tuto" />
  }
  if (pathname === APP_TUTORIAL_PATH) return <AppTutorial />
  if (pathname.toLowerCase() === TEAM_PATH) return <ProjectPage page="team" />
  if (pathname.toLowerCase() === OPEN_SOURCE_PATH)
    return <ProjectPage page="source" />
  if (pathname === "/github")
    return <RouteRedirect href={GITHUB_ORG_URL} label="Ouvrir GitHub" />
  return <LandingPage />
}

export default App
