import { HugeiconsIcon } from "@hugeicons/react"
import { Mail01Icon, WhatsappIcon } from "@hugeicons/core-free-icons"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

export function Footer() {
  return (
    <footer
      className="animate-rise mx-auto flex w-full max-w-3xl flex-col gap-8 px-6 pb-12"
      style={{ animationDelay: "380ms" }}
    >
      <Separator />
      <div className="flex flex-col items-center gap-4">
        <div className="flex items-center gap-3">
          <Button
            type="button"
            variant="secondary"
            size="icon"
            render={
              <a
                href="mailto:hi@scolup.com"
                aria-label="Contacter l'équipe Scolup par e-mail"
              />
            }
          >
            <HugeiconsIcon
              icon={Mail01Icon}
              className="transition-transform duration-150 group-hover/button:scale-110"
            />
          </Button>
          <Button
            type="button"
            variant="secondary"
            size="icon"
            render={
              <a
                href="https://whatsapp.com/channel/0029Vb9hIrJ2Jl8Fr6S95E2h"
                aria-label="Suivre Scolup sur WhatsApp"
              />
            }
          >
            <HugeiconsIcon
              icon={WhatsappIcon}
              className="transition-transform duration-150 group-hover/button:scale-110"
            />
          </Button>
        </div>
        <p className="text-center text-xs text-muted-foreground">
          Fait avec 🍪 et 🧋 par <strong>typeof_</strong>
        </p>
      </div>
    </footer>
  )
}
