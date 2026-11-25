import { ArrowUpRight01Icon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"

import { TEAM } from "@/data/team"
import { TEAM_PATH } from "@/lib/links"
import { TeamAvatar } from "./TeamAvatar"

export function AboutSection() {
  return (
    <section className="landing-vision" aria-labelledby="vision-title">
      <div>
        <h2 id="vision-title">L'outil scolaire qui en vaut la peine.</h2>
        <p>
          Scolup a été créé par des étudiants pour des étudiants. Nous avons conçu cet outil afin d'apporter une solution simple et efficace aux problèmes rencontrés dans le quotidien scolaire.
        </p>
      </div>
      <div>
        <h3>Derrière Scolup</h3>
        <ul className="landing-vision__team" aria-label="L’équipe Scolup">
          {TEAM.map(({ name }) => (
            <li key={name}>
              <a href={`https://github.com/${name}`}>
                <TeamAvatar name={name} />
                {name}
              </a>
            </li>
          ))}
        </ul>
        <a href={TEAM_PATH}>
          Qui sommes-nous ?
          <HugeiconsIcon
            icon={ArrowUpRight01Icon}
            size={15}
            aria-hidden="true"
          />
        </a>
      </div>
    </section>
  )
}
