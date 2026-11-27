import {
  CONTACT_URL,
  CONTRIBUTING_URL,
  GITHUB_URL,
  LEGAL_LINKS,
  WHATSAPP_URL,
} from "@/lib/links"

import { AboutSection } from "./AboutSection"

const columns = [
  {
    label: "Le projet",
    links: [
      { href: GITHUB_URL, label: "GitHub" },
      { href: CONTRIBUTING_URL, label: "Contribuer" },
    ],
  },
  {
    label: "La communauté",
    links: [
      { href: WHATSAPP_URL, label: "Chaîne WhatsApp" },
      { href: GITHUB_URL + "/issues", label: "Signaler un problème" },
      { href: CONTACT_URL, label: "Nous écrire" },
    ],
  },
]

export function Footer() {
  return (
    <footer className="landing-footer">
      <div className="landing-container">
        <AboutSection />
        <div className="landing-footer__directory">
          <p>Scolup est gratuit et open source, non affilié à Aplim.</p>
          {columns.map(({ label, links }) => (
            <nav key={label} aria-label={label}>
              <h3>{label}</h3>
              <ul>
                {links.map((link) => (
                  <li key={link.href}>
                    <a href={link.href}>{link.label}</a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
          <div className="landing-footer__legal">
            <h3>Informations légales</h3>
            <p>Disponibles à la réouverture de l’app.</p>
            <ul>
              {LEGAL_LINKS.map(({ href, label }) => (
                <li key={href}>
                  <span role="link" aria-disabled="true">
                    {label}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <a
          className="landing-footer__brand"
          href="#top"
          aria-label="Scolup, retour en haut"
        >
          <picture>
            <source
              media="(prefers-reduced-motion: reduce)"
              srcSet="/logos/logo.svg"
            />
            <img src="/logos/loader.svg" width={180} height={180} alt="" />
          </picture>
          <span>Scolup</span>
        </a>
      </div>
    </footer>
  )
}
