import { useId, useRef, useState } from "react"
import { Tabs } from "@base-ui/react/tabs"
import { Cancel01Icon, Maximize01Icon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"

import { SCREENSHOTS } from "@/data/screenshots"

type Screenshot = (typeof SCREENSHOTS)[number]

export function ScreenshotsSection() {
  const dialog = useRef<HTMLDialogElement>(null)
  const dialogTitle = useId()
  const [expanded, setExpanded] = useState<Screenshot>(SCREENSHOTS[0])

  const openScreenshot = (screenshot: Screenshot) => {
    setExpanded(screenshot)
    dialog.current?.showModal()
  }

  return (
    <section
      id="apercu"
      tabIndex={-1}
      className="landing-container landing-section landing-preview"
      aria-labelledby="preview-title"
    >
      <header className="landing-section-heading">
        <h2 id="preview-title">Un coup d’œil dans l’app.</h2>
      </header>
      <Tabs.Root defaultValue={SCREENSHOTS[0].src}>
        <Tabs.List
          className="landing-preview__tabs"
          aria-label="Écrans de Scolup"
        >
          {SCREENSHOTS.map(({ src, label }) => (
            <Tabs.Tab key={src} value={src}>
              {label}
            </Tabs.Tab>
          ))}
        </Tabs.List>
        {SCREENSHOTS.map((screenshot) => (
          <Tabs.Panel
            key={screenshot.src}
            value={screenshot.src}
            className="landing-preview__panel"
          >
            <div className="landing-preview__copy">
              <h3>{screenshot.title}</h3>
              <p>{screenshot.description}</p>
            </div>
            <button
              type="button"
              className="landing-preview__media"
              aria-haspopup="dialog"
              aria-label={`Agrandir la capture ${screenshot.label}`}
              onClick={() => openScreenshot(screenshot)}
            >
              <img
                src={screenshot.src}
                alt=""
                width={1206}
                height={2622}
                loading="lazy"
              />
              <span className="landing-preview__zoom" aria-hidden="true">
                <HugeiconsIcon icon={Maximize01Icon} size={18} />
              </span>
            </button>
          </Tabs.Panel>
        ))}
      </Tabs.Root>
      <dialog
        ref={dialog}
        className="landing-lightbox"
        aria-labelledby={dialogTitle}
      >
        <h3 id={dialogTitle}>{expanded.label} dans Scolup</h3>
        <form method="dialog">
          <button type="submit" aria-label="Fermer l’aperçu">
            <HugeiconsIcon icon={Cancel01Icon} size={22} aria-hidden="true" />
          </button>
        </form>
        <img
          src={expanded.src}
          alt={expanded.alt}
          width={1206}
          height={2622}
          loading="lazy"
        />
      </dialog>
    </section>
  )
}
