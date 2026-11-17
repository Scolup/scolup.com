import { useEffect, useState } from "react"

import {
  APP_URL,
  buildAppUrl,
  getGoAppPreference,
  setGoAppPreference,
  shouldRedirectToApp,
  isLandingBypass,
} from "@/lib/go-app"

import {
  AboutSection,
  ComparisonSection,
  CTASection,
  FAQSection,
  FeaturesSection,
  Footer,
  Header,
  HeroSection,
  HowItWorksSection,
  OpenSourceSection,
  RedirectAlert,
  ScreenshotsSection,
  SecuritySection,
} from "@/components/landing"

export function App() {
  const [goAppDirect, setGoAppDirect] = useState(false)
  const [isBypass] = useState(() =>
    typeof window === "undefined"
      ? false
      : isLandingBypass(window.location.search)
  )

  useEffect(() => {
    setGoAppDirect(getGoAppPreference())
    if (shouldRedirectToApp(window.location.search)) {
      window.location.replace(buildAppUrl(window.location.search))
    }
  }, [])

  const handleEnableDirect = () => {
    setGoAppDirect(true)
    setGoAppPreference(true)
    window.location.href = APP_URL
  }

  const handleDisableDirect = () => {
    setGoAppDirect(false)
    setGoAppPreference(false)
  }

  return (
    <div
      id="top"
      className="flex min-h-svh flex-col bg-background text-foreground antialiased"
    >
      {isBypass && goAppDirect && (
        <RedirectAlert onDisableDirect={handleDisableDirect} />
      )}
      <Header />
      <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-16 px-6 py-20 sm:gap-24 sm:py-28">
        <HeroSection
          goAppDirect={goAppDirect}
          onEnableDirect={handleEnableDirect}
          onDisableDirect={handleDisableDirect}
        />
        <ComparisonSection />
        <AboutSection />
        <FeaturesSection />
        <ScreenshotsSection />
        <HowItWorksSection />
        <SecuritySection />
        <OpenSourceSection />
        <FAQSection />
        <CTASection
          goAppDirect={goAppDirect}
          onEnableDirect={handleEnableDirect}
          onDisableDirect={handleDisableDirect}
        />
      </main>
      <Footer />
    </div>
  )
}

export default App
