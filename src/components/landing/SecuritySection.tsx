export function SecuritySection() {
  return (
    <section
      className="animate-rise flex flex-col gap-4"
      style={{ animationDelay: "340ms" }}
      aria-label="Sécurité et confidentialité"
    >
      <h2 className="text-center font-heading text-xl font-semibold tracking-tight">
        Sécurisé par design
      </h2>
      <p className="text-center text-sm text-balance text-muted-foreground">
        Tes données restent tes données. Scolup lit tes données EcoleDirecte
        pour les afficher. Pas de revente, pas de publicité, pas de traqueur. Le
        code est open-source et tout le monde peut vérifier.
      </p>
    </section>
  )
}
