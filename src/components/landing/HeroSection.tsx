import { useState } from "react"
import { HugeiconsIcon } from "@hugeicons/react"
import { ArrowRight01Icon } from "@hugeicons/core-free-icons"

import { Button } from "@/components/ui/button"
import { Popover, PopoverTrigger } from "@/components/ui/popover"
import { APP_URL, incrementOpenCount, shouldShowAppPopover } from "@/lib/go-app"

import { OpenAppPopover } from "./OpenAppPopover"

type HeroSectionProps = {
  goAppDirect: boolean
  onEnableDirect: () => void
  onDisableDirect: () => void
}

export function HeroSection({
  goAppDirect,
  onEnableDirect,
  onDisableDirect,
}: HeroSectionProps) {
  const [heroOpen, setHeroOpen] = useState(false)

  const handleOpenOnce = () => {
    incrementOpenCount()
  }

  const makeOpenChangeHandler =
    (setOpen: (open: boolean) => void) => (nextOpen: boolean) => {
      // First 2 opens go straight to the app, no popover.
      if (nextOpen && !shouldShowAppPopover()) {
        incrementOpenCount()
        window.location.href = APP_URL
        return
      }
      setOpen(nextOpen)
    }

  return (
    <section className="flex flex-col items-center gap-5 text-center">
      <h1
        className="animate-rise font-heading text-5xl font-semibold tracking-tight text-balance sm:text-6xl"
        style={{ animationDelay: "60ms" }}
      >
        👾 Scolup : gamifie ta scolarité.
      </h1>
      <p
        className="animate-rise text-base text-balance text-muted-foreground sm:text-lg"
        style={{ animationDelay: "140ms" }}
      >
        Un compagnon scolaire qui transforme ta vie scolaire en jeu.
      </p>
      <div
        className="animate-rise flex flex-col items-center gap-3 sm:flex-row"
        style={{ animationDelay: "220ms" }}
      >
        <Popover
          open={heroOpen}
          onOpenChange={makeOpenChangeHandler(setHeroOpen)}
        >
          <PopoverTrigger
            render={
              <Button
                type="button"
                size="lg"
                aria-label="Ouvrir Scolup maintenant"
              />
            }
          >
            Ouvrir Scolup
            <HugeiconsIcon
              icon={ArrowRight01Icon}
              data-icon="inline-end"
              className="transition-transform duration-150 group-hover/button:translate-x-1"
            />
          </PopoverTrigger>
          <OpenAppPopover
            goAppDirect={goAppDirect}
            onOpenOnce={handleOpenOnce}
            onEnableDirect={onEnableDirect}
            onDisableDirect={onDisableDirect}
          />
        </Popover>
        <Button
          type="button"
          size="lg"
          variant="outline"
          render={<a href="#comment-ca-marche" />}
        >
          Comment ça marche
        </Button>
      </div>
    </section>
  )
}
