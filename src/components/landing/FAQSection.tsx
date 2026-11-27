import {
  CheckmarkCircle02Icon,
  HelpCircleIcon,
  Login01Icon,
  Shield01Icon,
  SmartPhone01Icon,
} from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { FAQS } from "@/data/faqs"

const icons = [
  HelpCircleIcon,
  Shield01Icon,
  SmartPhone01Icon,
  CheckmarkCircle02Icon,
  Login01Icon,
  Shield01Icon,
]

export function FAQSection() {
  return (
    <section
      id="faq"
      className="landing-container landing-section landing-faq"
      aria-labelledby="faq-title"
    >
      <header className="landing-section-heading">
        <h2 id="faq-title">Questions fréquentes.</h2>
      </header>
      <Accordion className="landing-faq__list">
        {FAQS.map(({ question, answer }, index) => (
          <AccordionItem key={question} value={question} data-reveal="faq-row">
            <AccordionTrigger>
              <span className="landing-faq__question">
                <HugeiconsIcon
                  icon={icons[index]}
                  size={20}
                  aria-hidden="true"
                />
                {question}
              </span>
            </AccordionTrigger>
            <AccordionContent>{answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  )
}
