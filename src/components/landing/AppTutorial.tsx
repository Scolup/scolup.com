import { ArrowLeft01Icon, ArrowRight01Icon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { useEffect, useState } from "react"

import { PAGE_TITLES } from "@/lib/links"

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

const COMMONS_ASSETS = "https://upload.wikimedia.org/wikipedia/commons"
const homeDock = [
  { app: "messages", file: "8/85/IMessage_icon.png" },
  { app: "music", file: "5/59/Apple_Music_Icon.svg" },
  { app: "phone", file: "7/7e/Phone_iOS.png" },
  { app: "contacts", file: "d/d5/Contacts_%28iOS%29.png" },
]

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
        data-startup-image=""
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
          <img
            className="tutorial-home__status"
            src="/screenshots/iphone-status.png"
            width={777}
            height={108}
            alt=""
          />
          <div className="tutorial-home__app">
            <span className="tutorial-tap" data-tap="home">
              <img src={APP_ICON} alt="" />
            </span>
            <b>Scolup</b>
          </div>
          <div className="tutorial-home__dock">
            {homeDock.map(({ app, file }) => (
              <img
                key={app}
                data-app={app}
                src={`${COMMONS_ASSETS}/${file}`}
                width={64}
                height={64}
                alt=""
                referrerPolicy="no-referrer"
              />
            ))}
          </div>
        </div>
        <div className="tutorial-home-indicator" />
      </div>
    </div>
  )
}

export function AppTutorial() {
  const [activeStep, setActiveStep] = useState(0)
  const lastStep = steps.length - 1

  useEffect(() => {
    document.title = PAGE_TITLES.tutorial
  }, [])

  const changeStep = (direction: number) => {
    setActiveStep((step) => Math.max(0, Math.min(lastStep, step + direction)))
  }

  return (
    <div className="landing app-tutorial antialiased">
      <a className="landing-skip" href="#contenu">
        Aller au tuto
      </a>
      <Header homeHref="/?landing=1" variant="project" />
      <main id="contenu" tabIndex={-1}>
        <section
          className="app-tutorial__stage"
          aria-labelledby="app-tutorial-title"
        >
          <button
            className="app-tutorial__arrow app-tutorial__arrow--previous"
            type="button"
            aria-label="Étape précédente"
            aria-disabled={activeStep === 0}
            onClick={() => changeStep(-1)}
          >
            <HugeiconsIcon
              icon={ArrowLeft01Icon}
              size={30}
              aria-hidden="true"
            />
          </button>
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
            </div>
          </div>
          <button
            className="app-tutorial__arrow app-tutorial__arrow--next"
            type="button"
            aria-label="Étape suivante"
            aria-disabled={activeStep === lastStep}
            onClick={() => changeStep(1)}
          >
            <HugeiconsIcon
              icon={ArrowRight01Icon}
              size={30}
              aria-hidden="true"
            />
          </button>
        </section>
      </main>
    </div>
  )
}
