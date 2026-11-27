import { lazy, Suspense, useEffect, useState, type ReactNode } from "react"

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
import {
  APP_TUTORIAL_PATH,
  GITHUB_ORG_URL,
  OPEN_SOURCE_PATH,
  TEAM_PATH,
} from "@/lib/links"

import "./landing.css"

const AppTutorial = lazy(() =>
  import("@/components/landing/AppTutorial").then((module) => ({
    default: module.AppTutorial,
  }))
)
const ProjectPage = lazy(() =>
  import("@/components/landing/ProjectPage").then((module) => ({
    default: module.ProjectPage,
  }))
)

function LandingPage() {
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

  return (
    <div id="top" className="landing landing-home antialiased">
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

function RouteFallback() {
  return (
    <div className="landing-route-fallback" role="status">
      Chargement…
    </div>
  )
}

export function App() {
  const pathname = window.location.pathname.replace(/\/$/, "")
  let page: ReactNode

  if (pathname === APP_TUTORIAL_PATH + "/app") {
    page = <RouteRedirect href={APP_TUTORIAL_PATH} label="Ouvrir le tuto" />
  } else if (pathname === APP_TUTORIAL_PATH) {
    page = <AppTutorial />
  } else if (pathname.toLowerCase() === TEAM_PATH) {
    page = <ProjectPage page="team" />
  } else if (pathname.toLowerCase() === OPEN_SOURCE_PATH) {
    page = <ProjectPage page="source" />
  } else if (pathname === "/github") {
    page = <RouteRedirect href={GITHUB_ORG_URL} label="Ouvrir GitHub" />
  } else {
    page = <LandingPage />
  }

  return <Suspense fallback={<RouteFallback />}>{page}</Suspense>
}

export default App
