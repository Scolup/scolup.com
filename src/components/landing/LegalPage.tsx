import { useEffect } from "react"

import { APP_URL } from "@/lib/go-app"
import { CONTACT_URL, GITHUB_URL, LEGAL_LINKS } from "@/lib/links"
import { Header } from "./Header"
import "./project-page.css"

type LegalDocument = (typeof LEGAL_LINKS)[number]

const content = {
  "/mentions": [
    {
      title: "Éditeur",
      text: "Le site scolup.com est édité par le studio typeof. Pour toute question concernant le site, écris à hi@scolup.com.",
    },
    {
      title: "Hébergement",
      text: "Le site est hébergé sur Cloudflare Pages par Cloudflare, Inc., 101 Townsend Street, San Francisco, CA 94107, États-Unis.",
    },
  ],
  "/terms": [
    {
      title: "Site de présentation",
      text: "Scolup.com présente le projet, donne accès à des tutoriels et permet de rejoindre l’application. Les liens vers des services tiers sont soumis aux règles de ces services.",
    },
    {
      title: "Utilisation de l’application",
      text: "Les conditions de l’application Scolup sont consultables depuis le lien ci-dessous.",
    },
  ],
  "/privacy": [
    {
      title: "Préférences dans ton navigateur",
      text: "Le site conserve localement ton choix de thème, le nombre d’ouvertures depuis le menu et ton choix d’ouvrir l’application automatiquement. Le nombre d’ouvertures et le choix de redirection peuvent aussi être conservés dans des cookies scolup.com pendant un an. Tu peux supprimer ces informations dans les réglages de ton navigateur.",
    },
    {
      title: "Ressources externes",
      text: "Le navigateur peut contacter GitHub pour charger les photos de profil et Google Fonts pour charger la police du site.",
    },
  ],
  "/security": [
    {
      title: "Signaler une faille",
      text: "Si tu découvres une faille sur le site ou dans l’application, signale-la en privé à security@scolup.com. Évite de joindre des identifiants ou des données scolaires.",
    },
  ],
}

export function LegalPage({ document: page }: { document: LegalDocument }) {
  const contact =
    page.href === "/security" ? "mailto:security@scolup.com" : CONTACT_URL

  useEffect(() => {
    document.title = `${page.label} · Scolup`
  }, [page.label])

  return (
    <div className="landing project-page antialiased">
      <a className="landing-skip" href="#contenu">
        Aller au contenu
      </a>
      <Header homeHref="/?landing=1" variant="project" />
      <main id="contenu" tabIndex={-1}>
        <article className="landing-container project-legal">
          <h1>{page.label}</h1>
          {content[page.href].map(({ title, text }) => (
            <section key={title}>
              <h2>{title}</h2>
              <p>{text}</p>
            </section>
          ))}
          <div className="project-legal__links">
            <a className="project-page__text-link" href={APP_URL + page.href}>
              {page.label} de l’application
            </a>
            {page.href === "/security" && (
              <a
                className="project-page__text-link"
                href={GITHUB_URL + "/blob/main/SECURITY.md"}
              >
                Procédure de signalement sur GitHub
              </a>
            )}
            <a className="project-page__text-link" href={contact}>
              {contact.slice(7)}
            </a>
          </div>
        </article>
      </main>
    </div>
  )
}
