import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { FAQS } from "@/data/faqs"

export function FAQSection() {
  return (
    <section
      className="animate-rise flex flex-col gap-6"
      style={{ animationDelay: "360ms" }}
      aria-label="Questions fréquentes"
    >
      <h2 className="text-center font-heading text-xl font-semibold tracking-tight">
        Questions fréquentes
      </h2>
      <Accordion>
        {FAQS.map((faq) => (
          <AccordionItem key={faq.question} value={faq.question}>
            <AccordionTrigger>{faq.question}</AccordionTrigger>
            <AccordionContent>{faq.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  )
}
