import {
  ArrowDown01Icon,
  ArrowLeft01Icon,
  ArrowRight01Icon,
} from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { useEffect, useRef, useState } from "react"

import { APP_URL } from "@/lib/go-app"

import { Header } from "./Header"
import "./app-tutorial.css"

const steps = [
  {
    title: "Touche Partager",
    description:
      "Ouvre app.scolup.com dans Safari, puis touche l’icône de partage. Selon ta version de Safari, elle se trouve dans le menu « … ».",
  },
  {
    title: "Ajoute Scolup à l’écran d’accueil",
    description:
      "Dans le menu de partage, fais défiler les actions et choisis « Sur l’écran d’accueil ».",
  },
  {
    title: "Confirme l’ajout",
    description:
      "Si Safari propose « Ouvrir comme app web », active l’option. Touche ensuite « Ajouter » en haut à droite.",
  },
  {
    title: "Retrouve Scolup sur ton iPhone",
    description:
      "L’icône Scolup apparaît sur ton écran d’accueil. Touche-la pour retrouver l’app.",
  },
]

const safariSymbols = {
  share:
    "M12 15.5V2m-4 4 4-4 4 4m-.3 3H18a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-9a2 2 0 0 1 2-2h2.3",
  back: "m15 5-7 7 7 7",
  forward: "m9 5 7 7-7 7",
  reload: "M20 5v6h-6m6 0a8 8 0 1 0-2.2 6.5",
  book: "M12 5v15M12 5C9 3 5 3 2.5 4.5v14C5 17 9 17 12 20c3-3 7-3 9.5-1.5v-14C19 3 15 3 12 5Z",
  tabs: "M8 6V4.5A1.5 1.5 0 0 1 9.5 3h10A1.5 1.5 0 0 1 21 4.5v10a1.5 1.5 0 0 1-1.5 1.5H18M6 7h10a1 1 0 0 1 1 1v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2Z",
  add: "M7 3h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4Zm1 9h8m-4-4v8",
  copy: "M9 3h8l4 4v11h-3M6 7h8l3 3v11H6a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2Z",
}

function SafariSymbol({ name }: { name: keyof typeof safariSymbols }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.65"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d={safariSymbols[name]} />
    </svg>
  )
}

const APP_ICON = "/logos/safari-app-icon.png"

function TutorialPhone({ step }: { step: number }) {
  return (
    <div className="app-tutorial-phone" data-step={step} aria-hidden="true">
      <img
        className="app-tutorial-phone__frame"
        src="/screenshots/scolup-iphone.png"
        width={861}
        height={1827}
        alt=""
        fetchPriority="high"
      />
      <div className="app-tutorial-phone__screen">
        <div className="tutorial-safari">
          <div className="tutorial-safari__address">
            <span className="tutorial-safari__reader">aA</span>
            <span>app.scolup.com</span>
            <SafariSymbol name="reload" />
          </div>
          <div className="tutorial-safari__toolbar">
            <SafariSymbol name="back" />
            <span className="tutorial-safari__inactive">
              <SafariSymbol name="forward" />
            </span>
            <span className="tutorial-tap" data-tap="share">
              <SafariSymbol name="share" />
            </span>
            <SafariSymbol name="book" />
            <SafariSymbol name="tabs" />
          </div>
        </div>

        <div className="tutorial-sheet tutorial-sheet--share">
          <div className="tutorial-sheet__grabber" />
          <div className="tutorial-sheet__site">
            <img src={APP_ICON} alt="" />
            <div>
              <b>Scolup</b>
              <small>app.scolup.com</small>
            </div>
          </div>
          <div className="tutorial-sheet__actions">
            <div className="tutorial-sheet__action">
              Copier
              <SafariSymbol name="copy" />
            </div>
            <div
              className="tutorial-sheet__action tutorial-tap"
              data-tap="action"
            >
              Sur l’écran d’accueil
              <SafariSymbol name="add" />
            </div>
          </div>
        </div>

        <div className="tutorial-sheet tutorial-sheet--confirm">
          <div className="tutorial-sheet__grabber" />
          <div className="tutorial-sheet__heading">
            <span className="tutorial-sheet__cancel">Annuler</span>
            <b>Sur l’écran d’accueil</b>
            <span className="tutorial-tap" data-tap="add">
              Ajouter
            </span>
          </div>
          <div className="tutorial-sheet__site">
            <img src={APP_ICON} alt="" />
            <div>
              <b>Scolup</b>
              <small>app.scolup.com</small>
            </div>
          </div>
          <div className="tutorial-sheet__action">
            Ouvrir comme app web
            <span className="tutorial-sheet__switch" />
          </div>
        </div>

        <div className="tutorial-home">
          <div className="tutorial-home__app">
            <span className="tutorial-tap" data-tap="home">
              <img src={APP_ICON} alt="" />
            </span>
            <b>Scolup</b>
          </div>
          <div className="tutorial-home__dock">
            <span>
              <SafariSymbol name="book" />
            </span>
            <span>
              <SafariSymbol name="tabs" />
            </span>
            <span>
              <SafariSymbol name="share" />
            </span>
          </div>
        </div>
        <div className="tutorial-home-indicator" />
      </div>
    </div>
  )
}

export function AppTutorial() {
  const trackRef = useRef<HTMLElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const [activeStep, setActiveStep] = useState(0)

  useEffect(() => {
    document.title = "Ajouter Scolup à l’écran d’accueil · Scolup"
    const track = trackRef.current
    const stage = stageRef.current
    if (!track || !stage) return

    const updateStep = () => {
      const distance = track.offsetHeight - stage.offsetHeight
      const pinTop = Number.parseFloat(getComputedStyle(stage).top)
      const progress = (pinTop - track.getBoundingClientRect().top) / distance
      const index = Math.round(progress * (steps.length - 1))
      setActiveStep(Math.min(steps.length - 1, Math.max(0, index)))
    }

    const observer = new ResizeObserver(updateStep)
    observer.observe(track)
    observer.observe(stage)
    window.addEventListener("scroll", updateStep, { passive: true })
    updateStep()

    return () => {
      observer.disconnect()
      window.removeEventListener("scroll", updateStep)
    }
  }, [])

  const goToStep = (index: number) => {
    const track = trackRef.current
    const stage = stageRef.current
    if (!track || !stage) return

    const pinTop = Number.parseFloat(getComputedStyle(stage).top)
    const start = window.scrollY + track.getBoundingClientRect().top - pinTop
    const distance = track.offsetHeight - stage.offsetHeight
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches

    window.scrollTo({
      top: start + (distance * index) / (steps.length - 1),
      behavior: reducedMotion ? "instant" : "smooth",
    })
    if (reducedMotion) setActiveStep(index)
  }

  return (
    <div className="landing app-tutorial antialiased">
      <a className="landing-skip" href="#contenu">
        Aller au tuto
      </a>
      <Header homeHref="/?landing=1" variant="tutorial" />
      <main id="contenu" tabIndex={-1}>
        <section
          className="app-tutorial__track"
          ref={trackRef}
          aria-labelledby="app-tutorial-title"
        >
          <div className="app-tutorial__stage" ref={stageRef}>
            <div className="app-tutorial__layout landing-container">
              <h1 id="app-tutorial-title">
                Scolup sur ton <em>écran d’accueil.</em>
              </h1>
              <TutorialPhone step={activeStep} />
              <div className="app-tutorial__instructions">
                <div className="app-tutorial__steps" aria-live="polite">
                  {steps.map((step, index) => (
                    <div
                      className="app-tutorial__step"
                      key={step.title}
                      data-current={index === activeStep || undefined}
                      aria-hidden={index !== activeStep}
                    >
                      <p className="app-tutorial__position">
                        Étape {index + 1} sur {steps.length}
                      </p>
                      <h2>{step.title}</h2>
                      <p>{step.description}</p>
                    </div>
                  ))}
                </div>
                <div
                  className="app-tutorial__controls"
                  role="group"
                  aria-label="Navigation du tutoriel"
                >
                  <button
                    type="button"
                    onClick={() => goToStep(activeStep - 1)}
                    disabled={activeStep === 0}
                    aria-label="Étape précédente"
                  >
                    <HugeiconsIcon
                      icon={ArrowLeft01Icon}
                      size={19}
                      aria-hidden="true"
                    />
                  </button>
                  <button
                    type="button"
                    onClick={() => goToStep(activeStep + 1)}
                    disabled={activeStep === steps.length - 1}
                  >
                    Étape suivante
                    <HugeiconsIcon
                      icon={ArrowRight01Icon}
                      size={17}
                      aria-hidden="true"
                    />
                  </button>
                </div>
                {activeStep < steps.length - 1 ? (
                  <p className="app-tutorial__hint">
                    <HugeiconsIcon
                      icon={ArrowDown01Icon}
                      size={16}
                      aria-hidden="true"
                    />
                    Défile pour suivre le tuto
                  </p>
                ) : (
                  <a className="app-tutorial__open" href={APP_URL}>
                    Ouvrir Scolup
                  </a>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
