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
        <strong>client alternatif pour EcoleDirecte</strong> : un meilleur
        moyen de gérer ta vie scolaire.
        <br />
        On a pris EcoleDirecte, on l&apos;a rendu plus beau, et on a ajouté de
        nouvelles fonctionnalités. C&apos;est un client alternatif : il va
        demander tes données à EcoleDirecte, et les afficher dans une interface
        plus moderne.
        <br />
        C&apos;est <strong>sécurisé</strong> et <strong>open-source</strong>{" "}
        selon la définition de l&apos;
        <abbr title="Open Source Initiative">OSI</abbr>.
      </p>
    </section>
  )
}
