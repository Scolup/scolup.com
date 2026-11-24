import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { HIGHLIGHTS } from "@/data/highlights"

export function FeaturesSection() {
  return (
    <section
      id="fonctionnalites"
      className="animate-rise flex scroll-mt-24 flex-col gap-6"
      style={{ animationDelay: "310ms" }}
      aria-label="Fonctionnalités"
    >
      <h2 className="text-center font-heading text-xl font-semibold tracking-tight">
        Scolup en fonctionnalités
      </h2>
      <div className="grid gap-4 sm:grid-cols-2">
        {HIGHLIGHTS.map((highlight) => (
          <Card key={highlight.title}>
            <CardHeader>
              <CardTitle>{highlight.title}</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground">
              {highlight.description}
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
