import { HugeiconsIcon } from "@hugeicons/react"

import { HIGHLIGHTS } from "@/data/highlights"

export function FeaturesSection() {
  return (
    <section
      id="fonctionnalites"
      tabIndex={-1}
      className="landing-container landing-section"
      aria-labelledby="features-title"
    >
      <div className="landing-section-heading landing-section-heading--center">
        <h2 id="features-title">Tout ton quotidien scolaire.</h2>
        <p>
          De ton premier cours au dernier devoir, tout est à portée de main.
        </p>
      </div>
      <ul className="landing-features">
        {HIGHLIGHTS.map(({ id, label, description, icon }) => (
          <li key={id} id={id} data-reveal="feature">
            <HugeiconsIcon icon={icon} size={28} aria-hidden="true" />
            <div>
              <h3>{label}</h3>
              <p>{description}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}
