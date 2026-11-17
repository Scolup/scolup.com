import { Alert, AlertAction, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"

type RedirectAlertProps = {
  onDisableDirect: () => void
}

export function RedirectAlert({ onDisableDirect }: RedirectAlertProps) {
  return (
    <div className="mx-auto w-full max-w-3xl px-6 pt-6">
      <Alert>
        <AlertDescription>
          Si tu veux
          <br /> désactiver la redirection automatique, clique sur le bouton
          ci-dessous.
        </AlertDescription>
        <AlertAction>
          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={onDisableDirect}
          >
            Ne plus rediriger
          </Button>
        </AlertAction>
      </Alert>
    </div>
  )
}
