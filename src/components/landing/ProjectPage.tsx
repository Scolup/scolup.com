import {
  ArrowUpRight01Icon,
  BookOpen01Icon,
  CodeIcon,
  GitPullRequestIcon,
  GithubIcon,
} from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { useEffect } from "react"

import { CONTRIBUTING_URL, GITHUB_URL } from "@/lib/links"
import { TEAM } from "@/data/team"
import { Header } from "./Header"
import { TeamAvatar } from "./TeamAvatar"
import "./project-page.css"

function TeamContent() {
  return (
    <ul className="project-team landing-container" aria-label="L’équipe Scolup">
      {TEAM.map(({ name, description }) => (
        <li key={name}>
          <TeamAvatar name={name} />
          <div>
            <h2>{name}</h2>
            <p>{description}</p>
            <a
              className="project-page__text-link"
              href={`https://github.com/${name}`}
              aria-label={`GitHub de ${name}`}
            >
              <HugeiconsIcon icon={GithubIcon} size={19} aria-hidden="true" />
              GitHub
              <HugeiconsIcon
                icon={ArrowUpRight01Icon}
                size={15}
                aria-hidden="true"
              />
            </a>
          </div>
        </li>
      ))}
    </ul>
  )
}

function SourceContent() {
  return (
    <>
      <div className="project-source landing-container">
        <section>
          <HugeiconsIcon icon={BookOpen01Icon} size={25} aria-hidden="true" />
          <h2>Qu’est-ce que l’OSI ?</h2>
          <p>
            L’Open Source Initiative définit les critères d’une licence open
            source. Ils couvrent notamment l’accès au code, le droit de le
            modifier et celui de le redistribuer.
          </p>
          <a
            className="project-page__text-link"
            href="https://opensource.org/osd"
          >
            Lire la définition
            <HugeiconsIcon
              icon={ArrowUpRight01Icon}
              size={16}
              aria-hidden="true"
            />
          </a>
        </section>
        <section>
          <HugeiconsIcon icon={CodeIcon} size={25} aria-hidden="true" />
          <h2>Ce que l’AGPL permet</h2>
          <p>
            Tu peux utiliser, étudier, modifier et partager Scolup selon les
            conditions de la licence. Si tu proposes une version modifiée sur un
            réseau, les personnes qui l’utilisent doivent pouvoir obtenir son
            code source correspondant.
          </p>
          <a
            className="project-page__text-link"
            href="https://opensource.org/license/agpl-3.0"
          >
            Lire la licence AGPL v3
            <HugeiconsIcon
              icon={ArrowUpRight01Icon}
              size={16}
              aria-hidden="true"
            />
          </a>
        </section>
      </div>
      <section className="project-contribute landing-container">
        <div>
          <HugeiconsIcon
            icon={GitPullRequestIcon}
            size={25}
            aria-hidden="true"
          />
          <h2>Contribuer à Scolup</h2>
          <p>
            Propose une amélioration, signale un bug ou envoie une modification
            sur GitHub.
          </p>
        </div>
        <a className="project-page__button" href={CONTRIBUTING_URL}>
          <HugeiconsIcon icon={GithubIcon} size={19} aria-hidden="true" />
          Guide de contribution
        </a>
      </section>
    </>
  )
}

export function ProjectPage({ page }: { page: "team" | "source" }) {
  const isTeam = page === "team"
  const title = isTeam ? "Qui sommes-nous ?" : "Scolup est open source."

  useEffect(() => {
    document.title = `${title} · Scolup`
  }, [title])

  return (
    <div className="landing project-page antialiased" data-page={page}>
      <a className="landing-skip" href="#contenu">
        Aller au contenu
      </a>
      <Header homeHref="/?landing=1" variant="project" />
      <main id="contenu" tabIndex={-1}>
        <div className="project-page__hero landing-container">
          <div>
            <h1>
              {isTeam ? (
                <>
                  Qui <span>sommes-nous&nbsp;?</span>
                </>
              ) : (
                title
              )}
            </h1>
            <p className="project-page__intro">
              {isTeam
                ? "On construit Scolup pour rendre le quotidien scolaire plus simple, avec un peu de jeu."
                : "Le code de l’app est public et publié sous licence GNU AGPL v3, reconnue par l’Open Source Initiative (OSI)."}
            </p>
            {!isTeam && (
              <a className="project-page__button" href={GITHUB_URL}>
                <HugeiconsIcon icon={GithubIcon} size={19} aria-hidden="true" />
                Voir le code source
              </a>
            )}
          </div>
          {isTeam ? (
            <div
              className="project-page__art project-page__art--team"
              aria-hidden="true"
            >
              <img src="/logos/logo.svg" width={144} height={144} alt="" />
            </div>
          ) : (
            <div
              className="project-page__art project-page__art--source"
              aria-hidden="true"
            >
              <div>
                <HugeiconsIcon icon={CodeIcon} size={42} />
                <span>AGPL v3</span>
              </div>
            </div>
          )}
        </div>
        {isTeam ? <TeamContent /> : <SourceContent />}
      </main>
    </div>
  )
}
