import {
  ArrowUpRight01Icon,
  Calendar02Icon,
  Chair02Icon,
  Comment03Icon,
  Home01Icon,
  LibraryIcon,
  Mortarboard01Icon,
  StickyNote02Icon,
} from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"

import { APP_URL } from "@/lib/links"

const leftIcons = {
  agenda: Calendar02Icon,
  homework: LibraryIcon,
  grades: Mortarboard01Icon,
  absences: Chair02Icon,
}
const rightIcons = {
  messages: Comment03Icon,
  home: Home01Icon,
  "post-its": StickyNote02Icon,
}

export function HeroSection() {
  return (
    <section className="landing-hero" aria-labelledby="hero-title">
      <div className="landing-hero__backdrop" aria-hidden="true" />
      <div className="landing-hero__art">
        <div className="landing-hero__scene">
          <div className="landing-hero__device">
            <img
              className="landing-hero__image"
              src="/screenshots/scolup-iphone.png"
              alt="L'accueil de Scolup sur iPhone, avec les objectifs, les devoirs et les prochains cours"
              width={861}
              height={1827}
              fetchPriority="high"
            />
          </div>
          <div
            className="landing-hero__symbols"
            data-side="left"
            aria-hidden="true"
          >
            {Object.entries(leftIcons).map(([name, icon]) => (
              <HugeiconsIcon
                key={name}
                icon={icon}
                className="landing-hero__symbol"
                data-symbol={name}
                strokeWidth={2}
              />
            ))}
          </div>
          <div
            className="landing-hero__symbols"
            data-side="right"
            aria-hidden="true"
          >
            {Object.entries(rightIcons).map(([name, icon]) => (
              <HugeiconsIcon
                key={name}
                icon={icon}
                className="landing-hero__symbol"
                data-symbol={name}
                strokeWidth={2}
              />
            ))}
            <img
              className="landing-hero__symbol"
              data-symbol="ruby"
              src="/logos/ruby-outlined.svg"
              alt=""
              width={24}
              height={24}
            />
          </div>
        </div>
      </div>
      <div className="landing-hero__copy landing-container">
        <h1 id="hero-title">
          Gamifie ta <em>vie scolaire.</em>
        </h1>
        <p>
          Retrouve tes notes, tes cours et tes devoirs, relève des quêtes et
          gagne des rubis au fil de ta journée.
        </p>
        <div className="landing-hero__actions">
          <a className="landing-hero__cta" href={APP_URL}>
            Ouvrir Scolup
            <HugeiconsIcon
              icon={ArrowUpRight01Icon}
              size={17}
              aria-hidden="true"
            />
          </a>
          <a
            className="landing-hero__cta landing-hero__cta--secondary"
            href="#apercu"
          >
            Voir un aperçu
          </a>
        </div>
      </div>
    </section>
  )
}
