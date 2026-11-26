import { useEffect, useRef, type ReactNode } from "react"

export function MenuHoverList({
  children,
  open = true,
}: {
  children: ReactNode
  open?: boolean
}) {
  const highlightRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (!open) highlightRef.current?.removeAttribute("data-visible")
  }, [open])

  const moveHighlight = (target: EventTarget, list: HTMLDivElement) => {
    const link = target instanceof Element ? target.closest("a") : null
    const highlight = highlightRef.current
    if (!highlight || !link || !list.contains(link)) return

    highlight.toggleAttribute(
      "data-moving",
      highlight.hasAttribute("data-visible")
    )
    highlight.style.transform = `translateY(${link.offsetTop}px)`
    highlight.style.height = `${link.offsetHeight}px`
    highlight.dataset.visible = ""
  }

  const hideHighlight = () =>
    highlightRef.current?.removeAttribute("data-visible")

  return (
    <div
      className="landing-menu-items"
      onPointerOver={(event) => {
        if (event.pointerType === "mouse")
          moveHighlight(event.target, event.currentTarget)
      }}
      onPointerLeave={hideHighlight}
      onFocus={(event) => {
        if (event.target.matches(":focus-visible"))
          moveHighlight(event.target, event.currentTarget)
      }}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) hideHighlight()
      }}
    >
      <span
        ref={highlightRef}
        className="landing-menu-items__highlight"
        aria-hidden="true"
      />
      {children}
    </div>
  )
}
