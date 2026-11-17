export function Header() {
  return (
    <header className="animate-rise mx-auto flex w-full max-w-3xl items-center px-6 pt-10 sm:pt-14">
      <a
        href="#top"
        aria-label="Scolup — retour en haut"
        className="flex items-center gap-2.5"
      >
        <img
          src="/logos/logo.svg"
          alt="Logo Scolup"
          className="size-7 dark:invert"
        />
        <span className="font-heading text-lg font-semibold tracking-tight">
          Scolup
        </span>
      </a>
    </header>
  )
}
