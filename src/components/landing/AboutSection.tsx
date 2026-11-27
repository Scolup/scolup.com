import { ArrowUpRight01Icon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"

import { useState } from "react"

import { getShuffledTeam } from "@/data/team"
import { TEAM_PATH } from "@/lib/links"
import { TeamAvatar } from "./TeamAvatar"

export function AboutSection() {
  const [team] = useState(getShuffledTeam)

  return (
    <section
      className="landing-vision"
      data-reveal="footer-intro"
      aria-labelledby="vision-title"
    >
      <div className="landing-vision__intro">
        <h2 id="vision-title">Par des étudiants, pour des étudiants.</h2>
        <p>
          On a créé Scolup pour simplifier notre propre quotidien scolaire.
          Aujourd’hui, on continue de l’améliorer à partir des besoins qu’on
          rencontre en classe et à la maison.
        </p>
        <a className="landing-vision__about-link" href={TEAM_PATH}>
          Rencontrer l’équipe
          <HugeiconsIcon
            icon={ArrowUpRight01Icon}
            size={15}
            aria-hidden="true"
          />
        </a>
      </div>
      <ul className="landing-vision__team" aria-label="L’équipe Scolup">
        {team.map(({ name }) => (
          <li key={name}>
            <a
              href={`https://github.com/${name}`}
              aria-label={`GitHub de ${name}`}
            >
              <TeamAvatar name={name} />
              <span>{name}</span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  )
}
