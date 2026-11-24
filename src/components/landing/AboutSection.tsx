export function AboutSection() {
  return (
    <section
      className="animate-rise flex flex-col gap-4"
      style={{ animationDelay: "300ms" }}
      aria-label="Qu'est-ce que Scolup ?"
    >
      <h2 className="text-center font-heading text-xl font-semibold tracking-tight">
        Qu&apos;est-ce que Scolup ?
      </h2>
      <p className="text-center text-sm text-balance text-muted-foreground">
        <strong>Scolup</strong> est un{" "}
        <strong>compagnon scolaire</strong> : un meilleur
        moyen de gérer ta vie scolaire.
        <br />
        Il te permet de consulter tes données scolaires comme
        dans un jeu, ce qui t'encourage à plus t'engager.
        <br />
        C&apos;est <strong>sécurisé</strong> et <strong>open-source</strong>{" "}
        selon la définition de l&apos;
        <abbr title="Open Source Initiative">OSI</abbr>.
      </p>
    </section>
  )
}
