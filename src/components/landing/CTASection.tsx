import { useState } from "react"
import { HugeiconsIcon } from "@hugeicons/react"
import { ArrowRight01Icon, Mail01Icon } from "@hugeicons/core-free-icons"

import { Button } from "@/components/ui/button"
import { Popover, PopoverTrigger } from "@/components/ui/popover"
import { APP_URL, incrementOpenCount, shouldShowAppPopover } from "@/lib/go-app"

import { OpenAppPopover } from "./OpenAppPopover"

type CTASectionProps = {
  goAppDirect: boolean
  onEnableDirect: () => void
  onDisableDirect: () => void
}

export function CTASection({
  goAppDirect,
  onEnableDirect,
  onDisableDirect,
}: CTASectionProps) {
  const [bottomOpen, setBottomOpen] = useState(false)

  const handleOpenOnce = () => {
    incrementOpenCount()
  }

  const makeOpenChangeHandler =
    (setOpen: (open: boolean) => void) => (nextOpen: boolean) => {
      if (nextOpen && !shouldShowAppPopover()) {
        incrementOpenCount()
        window.location.href = APP_URL
        return
      }
      setOpen(nextOpen)
    }

  return (
    <section
      id="ouvrir"
      className="animate-rise flex scroll-mt-24 flex-col items-center gap-6 text-center"
      style={{ animationDelay: "340ms" }}
      aria-label="Ouvrir Scolup"
    >
      <div className="flex flex-col gap-2.5">
        <h2 className="font-heading text-xl font-semibold tracking-tight">
          Prêt à passer à Scolup ?
        </h2>
        <p className="text-sm text-muted-foreground">
          Connecte-toi avec ton compte EcoleDirecte, c&apos;est parti.
        </p>
      </div>
      <div className="flex flex-col items-center gap-3 sm:flex-row">
        <Popover
          open={bottomOpen}
          onOpenChange={makeOpenChangeHandler(setBottomOpen)}
        >
          <PopoverTrigger render={<Button type="button" size="lg" />}>
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
          render={
            <a
              href="mailto:hi@scolup.com"
              aria-label="Poser une question à l'équipe Scolup"
            />
          }
        >
          <HugeiconsIcon icon={Mail01Icon} data-icon="inline-start" />
          Une question ?
        </Button>
      </div>
    </section>
  )
}
