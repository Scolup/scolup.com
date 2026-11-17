import { HugeiconsIcon } from "@hugeicons/react"
import { ArrowRight01Icon } from "@hugeicons/core-free-icons"

import { Button } from "@/components/ui/button"
import {
  PopoverContent,
  PopoverHeader,
  PopoverTitle,
} from "@/components/ui/popover"
import { APP_URL } from "@/lib/go-app"

type OpenAppPopoverProps = {
  goAppDirect: boolean
  onOpenOnce: () => void
  onEnableDirect: () => void
  onDisableDirect: () => void
}

export function OpenAppPopover({
  goAppDirect,
  onOpenOnce,
  onEnableDirect,
  onDisableDirect,
}: OpenAppPopoverProps) {
  return (
    <PopoverContent align="center" className="w-80">
      <PopoverHeader>
        <PopoverTitle>Marre de cliquer ici à chaque fois ?</PopoverTitle>
      </PopoverHeader>
      <div className="flex flex-col gap-2">
        <Button
          type="button"
          onClick={onOpenOnce}
          size="sm"
          variant="outline"
          render={<a href={APP_URL} aria-label="Ouvrir Scolup maintenant" />}
        >
          Ouvrir une fois
          <HugeiconsIcon
            icon={ArrowRight01Icon}
            data-icon="inline-end"
            className="transition-transform duration-150 group-hover/button:translate-x-1"
          />
        </Button>
        {goAppDirect ? (
          <Button type="button" onClick={onDisableDirect}>
            Ne plus ouvrir automatiquement
          </Button>
        ) : (
          <Button type="button" onClick={onEnableDirect}>
            Toujours ouvrir directement
          </Button>
        )}
      </div>
    </PopoverContent>
  )
}
