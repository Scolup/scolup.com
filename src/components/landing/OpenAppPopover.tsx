import { GithubIcon, Globe02Icon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import type { MouseEventHandler } from "react"

import { PopoverContent, PopoverTitle } from "@/components/ui/popover"
import { APP_URL } from "@/lib/go-app"
import { MenuHoverList } from "./MenuHoverList"

export function OpenAppPopover({
  onBrowserOpen,
}: {
  onBrowserOpen: MouseEventHandler<HTMLAnchorElement>
}) {
  return (
    <PopoverContent
      align="end"
      side="bottom"
      sideOffset={6}
      className="landing-launcher-menu"
    >
      <PopoverTitle className="sr-only">
        Options d’ouverture de Scolup
      </PopoverTitle>
      <MenuHoverList>
        <a href={APP_URL} onClick={onBrowserOpen}>
          <HugeiconsIcon icon={Globe02Icon} size={16} aria-hidden="true" />
          Ouvrir
        </a>
        <a href="/github">
          <HugeiconsIcon icon={GithubIcon} size={16} aria-hidden="true" />
          GitHub
        </a>
      </MenuHoverList>
    </PopoverContent>
  )
}
