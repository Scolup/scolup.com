import {
  ArrowUpRight01Icon,
  GithubIcon,
  Globe02Icon,
  SmartPhone01Icon,
} from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import type { MouseEventHandler } from "react"

import { PopoverContent, PopoverTitle } from "@/components/ui/popover"
import { APP_URL } from "@/lib/go-app"
import { APP_TUTORIAL_PATH } from "@/lib/links"

export function OpenAppPopover({
  onBrowserOpen,
}: {
  onBrowserOpen: MouseEventHandler<HTMLAnchorElement>
}) {
  return (
    <PopoverContent
      align="end"
      side="bottom"
      sideOffset={10}
      className="landing-launcher-menu"
    >
      <PopoverTitle className="sr-only">
        Options d’ouverture de Scolup
      </PopoverTitle>
      <div className="landing-launcher-menu__choices">
        <a href={APP_URL} onClick={onBrowserOpen}>
          <HugeiconsIcon icon={Globe02Icon} size={19} aria-hidden="true" />
          Ouvrir sur le navigateur
          <HugeiconsIcon
            icon={ArrowUpRight01Icon}
            size={16}
            aria-hidden="true"
          />
        </a>
        <a href="/github">
          <HugeiconsIcon icon={GithubIcon} size={19} aria-hidden="true" />
          GitHub
          <HugeiconsIcon
            icon={ArrowUpRight01Icon}
            size={16}
            aria-hidden="true"
          />
        </a>
        <a href={APP_TUTORIAL_PATH} className="landing-launcher-menu__tutorial">
          <HugeiconsIcon icon={SmartPhone01Icon} size={19} aria-hidden="true" />
          Ajouter à l’écran d’accueil
        </a>
      </div>
    </PopoverContent>
  )
}
