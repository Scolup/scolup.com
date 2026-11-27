import {
  Calendar02Icon,
  Chair02Icon,
  Comment03Icon,
  Home01Icon,
  LibraryIcon,
  Mortarboard01Icon,
  Search01Icon,
  StickyNote02Icon,
} from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"

import { Button } from "@/components/ui/button"
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
      <img
        className="landing-hero__backdrop"
        src="/screenshots/Homepage.png"
        alt=""
        data-startup-image=""
      />
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
              data-startup-image=""
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
              data-startup-image=""
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
          <Button size="lg" nativeButton={false} render={<a href={APP_URL} />}>
            <img
              src="/logos/logo.svg"
              width={16}
              height={16}
              alt=""
              data-icon="inline-start"
            />
            Ouvrir Scolup
          </Button>
          <Button
            variant="secondary"
            size="lg"
            nativeButton={false}
            render={<a href="#apercu" />}
          >
            <HugeiconsIcon
              icon={Search01Icon}
              data-icon="inline-start"
              aria-hidden="true"
            />
            Voir un aperçu
          </Button>
        </div>
        <div className="landing-hero__compatibility">
          Compatible avec
          <img
            src="/logos/ecoledirecte.svg"
            alt="ÉcoleDirecte"
            width={22}
            height={22}
          />
        </div>
      </div>
    </section>
  )
}
