import { Dialog } from "@base-ui/react/dialog"
import { ArrowDown01Icon, Cancel01Icon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { useRef, useState, type MouseEvent } from "react"

import { buttonVariants } from "@/components/ui/button"
import { Popover, PopoverTrigger } from "@/components/ui/popover"
import {
  APP_URL,
  getGoAppPreference,
  incrementOpenCount,
  setGoAppPreference,
} from "@/lib/go-app"

import { OpenAppPopover } from "./OpenAppPopover"

export function OpenAppButton() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [promptOpen, setPromptOpen] = useState(false)
  const optionsRef = useRef<HTMLButtonElement>(null)
  const onceRef = useRef<HTMLAnchorElement>(null)

  const handleBrowserOpen = (event: MouseEvent<HTMLAnchorElement>) => {
    if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return

    const count = incrementOpenCount()
    if (getGoAppPreference() || count !== 3) return

    event.preventDefault()
    setMenuOpen(false)
    setPromptOpen(true)
  }

  return (
    <div className="landing-launcher">
      <Popover open={menuOpen} onOpenChange={setMenuOpen}>
        <a
          className={buttonVariants({ className: "landing-launcher__link" })}
          href={APP_URL}
        >
          <img
            src="/logos/logo.svg"
            width={16}
            height={16}
            alt=""
            data-icon="inline-start"
          />
          Ouvrir Scolup
        </a>
        <PopoverTrigger
          ref={optionsRef}
          type="button"
          className={buttonVariants({
            size: "icon",
            className: "landing-launcher__options",
          })}
          aria-label="Options d’ouverture de Scolup"
        >
          <HugeiconsIcon
            className="landing-launcher__chevron"
            icon={ArrowDown01Icon}
            size={16}
            aria-hidden="true"
          />
        </PopoverTrigger>
        <OpenAppPopover onBrowserOpen={handleBrowserOpen} />
      </Popover>
      <Dialog.Root open={promptOpen} onOpenChange={setPromptOpen}>
        <Dialog.Portal>
          <Dialog.Backdrop className="landing-open-prompt__backdrop" />
          <Dialog.Popup
            className="landing-open-prompt"
            initialFocus={onceRef}
            finalFocus={optionsRef}
          >
            <Dialog.Close
              className="landing-open-prompt__close"
              aria-label="Fermer"
            >
              <HugeiconsIcon icon={Cancel01Icon} size={20} aria-hidden="true" />
            </Dialog.Close>
            <img src="/logos/logo.svg" alt="" width={34} height={34} />
            <Dialog.Title>Tu ouvres souvent Scolup par ici</Dialog.Title>
            <Dialog.Description>
              Tu veux ouvrir l’app automatiquement quand tu visites scolup.com ?
            </Dialog.Description>
            <div className="landing-open-prompt__actions">
              <a href={APP_URL} ref={onceRef}>
                Ouvrir une fois
              </a>
              <a href={APP_URL} onClick={() => setGoAppPreference(true)}>
                Toujours ouvrir automatiquement
              </a>
            </div>
          </Dialog.Popup>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  )
}
