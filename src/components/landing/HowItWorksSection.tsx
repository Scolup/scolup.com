import {
  Calendar03Icon,
  Login01Icon,
  SmartPhone01Icon,
} from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"

import { STEPS } from "@/data/steps"

const stepIcons = [SmartPhone01Icon, Login01Icon, Calendar03Icon]

export function HowItWorksSection() {
  return (
    <section
      id="comment-ca-marche"
      tabIndex={-1}
      className="landing-container landing-section"
      aria-labelledby="steps-title"
    >
      <div className="landing-section-heading">
        <h2 id="steps-title">Tes premiers pas.</h2>
        <p>Retrouve ton espace scolaire en trois étapes.</p>
      </div>
      <ol className="landing-steps">
        {STEPS.map(({ title, description }, index) => (
          <li key={title} data-reveal="step">
            <div className="landing-step-icon" aria-hidden="true">
              <HugeiconsIcon icon={stepIcons[index]} size={25} />
            </div>
            <h3>{title}</h3>
            <p>{description}</p>
          </li>
        ))}
      </ol>
    </section>
  )
}
