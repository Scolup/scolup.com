import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { STEPS } from "@/data/steps"

export function HowItWorksSection() {
  return (
    <section
      id="comment-ca-marche"
      className="animate-rise flex scroll-mt-24 flex-col gap-6"
      style={{ animationDelay: "320ms" }}
      aria-label="Comment ça marche"
    >
      <h2 className="text-center font-heading text-xl font-semibold tracking-tight">
        Comment ça marche ?
      </h2>
      <div className="grid gap-4 sm:grid-cols-3">
        {STEPS.map((step) => (
          <Card key={step.index}>
            <CardHeader>
              <CardDescription className="font-mono">
                {step.index}
              </CardDescription>
              <CardTitle>{step.title}</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground">
              {step.description}
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
