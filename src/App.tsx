import { useEffect, useState } from "react"

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
import { LegalPage } from "@/components/landing/LegalPage"
import { ProjectPage } from "@/components/landing/ProjectPage"
import {
  APP_TUTORIAL_PATH,
  GITHUB_ORG_URL,
  LEGAL_LINKS,
  OPEN_SOURCE_PATH,
  TEAM_PATH,
} from "@/lib/links"

import "./landing.css"

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

function GitHubRedirect() {
  useEffect(() => {
    window.location.replace(GITHUB_ORG_URL)
  }, [])

  return <a href={GITHUB_ORG_URL}>Ouvrir GitHub</a>
}

export function App() {
  const pathname = window.location.pathname.replace(/\/$/, "")

  if (pathname === APP_TUTORIAL_PATH) return <AppTutorial />
  if (pathname.toLowerCase() === TEAM_PATH) return <ProjectPage page="team" />
  if (pathname.toLowerCase() === OPEN_SOURCE_PATH)
    return <ProjectPage page="source" />
  if (pathname === "/github") return <GitHubRedirect />
  const legal = LEGAL_LINKS.find(({ href }) => href === pathname)
  if (legal) return <LegalPage document={legal} />

  return <LandingPage />
}

export default App
