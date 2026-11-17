export function OpenSourceSection() {
  return (
    <section
      className="animate-rise flex flex-col gap-4"
      style={{ animationDelay: "350ms" }}
      aria-label="Open-source"
    >
      <h2 className="text-center font-heading text-xl font-semibold tracking-tight">
        Open-source, vraiment
      </h2>
      <p className="text-center text-sm text-balance text-muted-foreground">
        Chaque fonctionnalité est vérifiable. Tu peux lire le code, signaler un
        bug, proposer une amélioration... C&apos;est open-source selon la
        définition de l&apos;
        <abbr title="Open Source Initiative">OSI</abbr>.
      </p>
    </section>
  )
}
