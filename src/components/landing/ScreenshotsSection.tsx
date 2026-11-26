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

export function ScreenshotsSection() {
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    if (!api) return
    const updateCurrent = () => setCurrent(api.selectedScrollSnap())
    updateCurrent()
    api.on("select", updateCurrent)
    api.on("reInit", updateCurrent)
    return () => {
      api.off("select", updateCurrent)
      api.off("reInit", updateCurrent)
    }
  }, [api])

  return (
    <section
      id="apercu"
      tabIndex={-1}
      className="landing-container landing-section landing-preview"
      aria-labelledby="preview-title"
    >
      <header className="landing-section-heading">
        <h2 id="preview-title">Un coup d’œil dans l’app.</h2>
        <p>Explore quelques écrans de Scolup avant de te lancer.</p>
      </header>
      <Carousel
        className="landing-preview__carousel"
        aria-labelledby="preview-title"
        setApi={setApi}
        opts={{
          align: "start",
          loop: true,
          breakpoints: { "(prefers-reduced-motion: reduce)": { duration: 0 } },
        }}
      >
        <CarouselPrevious
          className="landing-preview__arrow"
          variant="ghost"
          aria-label="Capture précédente"
        />
        <CarouselContent className="ml-0">
          {SCREENSHOTS.map((screenshot, index) => (
            <CarouselItem
              key={screenshot.src}
              className="pl-0"
              aria-hidden={current !== index}
              aria-label={screenshot.label}
            >
              <div className="landing-preview__panel">
                <div className="landing-preview__copy">
                  <h3>{screenshot.title}</h3>
                  <p>{screenshot.description}</p>
                </div>
                <img
                  className="landing-preview__media"
                  src={screenshot.src}
                  alt={screenshot.alt}
                  width={1206}
                  height={2622}
                  loading="lazy"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselNext
          className="landing-preview__arrow"
          variant="ghost"
          aria-label="Capture suivante"
        />
        <span className="sr-only" aria-live="polite">
          {SCREENSHOTS[current].label} · {current + 1} sur {SCREENSHOTS.length}
        </span>
      </Carousel>
    </section>
  )
}
