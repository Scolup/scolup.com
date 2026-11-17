import { useEffect, useState } from "react"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel"
import { SCREENSHOTS } from "@/data/screenshots"
import { cn } from "@/lib/utils"

export function ScreenshotsSection() {
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    if (!api) return

    const onSelect = () => setCurrent(api.selectedScrollSnap())
    onSelect()
    api.on("select", onSelect)

    return () => {
      api.off("select", onSelect)
    }
  }, [api])

  return (
    <section
      className="animate-rise flex flex-col gap-6"
      style={{ animationDelay: "315ms" }}
      aria-label="Aperçus de Scolup"
    >
      <h2 className="text-center font-heading text-xl font-semibold tracking-tight">
        Scolup en images
      </h2>
      <Carousel
        setApi={setApi}
        opts={{ align: "center", loop: true }}
        className="mx-auto w-full max-w-xs"
      >
        <CarouselContent>
          {SCREENSHOTS.map((screenshot) => (
            <CarouselItem key={screenshot.src}>
              <figure className="flex flex-col items-center gap-3 px-2">
                <img
                  src={screenshot.src}
                  alt={screenshot.alt}
                  width={1206}
                  height={2622}
                  loading="lazy"
                  decoding="async"
                  className="h-auto w-full rounded-lg border bg-card object-cover shadow-sm"
                />
                <figcaption className="text-center text-sm font-medium text-muted-foreground">
                  {screenshot.label}
                </figcaption>
              </figure>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious
          aria-label="Capture précédente"
          className="hidden sm:inline-flex"
        />
        <CarouselNext
          aria-label="Capture suivante"
          className="hidden sm:inline-flex"
        />
      </Carousel>
      <div className="flex items-center justify-center gap-2">
        {SCREENSHOTS.map((screenshot, index) => (
          <button
            key={screenshot.src}
            type="button"
            aria-label={`Voir la capture ${screenshot.label}`}
            aria-current={index === current}
            onClick={() => api?.scrollTo(index)}
            className={cn(
              "size-2 rounded-full bg-muted-foreground/30 transition-colors",
              index === current && "bg-foreground"
            )}
          />
        ))}
      </div>
    </section>
  )
}
