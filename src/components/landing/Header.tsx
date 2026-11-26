import {
  ArrowDown01Icon,
  BookOpen01Icon,
  GithubIcon,
  InformationCircleIcon,
  Mail01Icon,
  Menu01Icon,
  ScreenAddToHomeIcon,
  SmartPhone01Icon,
  SparklesIcon,
  SourceCodeIcon,
  UserGroupIcon,
  WhatsappIcon,
} from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { useEffect, useRef, useState, type MouseEvent } from "react"

import {
  APP_TUTORIAL_PATH,
  CONTACT_URL,
  CONTRIBUTING_URL,
  OPEN_SOURCE_PATH,
  TEAM_PATH,
  WHATSAPP_URL,
} from "@/lib/links"
import { OpenAppButton } from "./OpenAppButton"
import { MenuHoverList } from "./MenuHoverList"

const groups = [
  {
    id: "overview",
    label: "Qu’est-ce que c’est ?",
    icon: InformationCircleIcon,
  },
  { id: "about", label: "À propos", icon: UserGroupIcon },
  { id: "source", label: "Open source", icon: SourceCodeIcon },
] as const

type GroupId = (typeof groups)[number]["id"]

const overviewLinks = [
  {
    id: "fonctionnalites",
    label: "Ton quotidien scolaire",
    icon: BookOpen01Icon,
  },
  { id: "apercu", label: "Un coup d’œil dans l’app", icon: SmartPhone01Icon },
  { id: "comment-ca-marche", label: "Tes premiers pas", icon: SparklesIcon },
]

export function Header({
  homeHref = "#top",
  variant = "main",
}: {
  homeHref?: string
  variant?: "main" | "project"
}) {
  const headerRef = useRef<HTMLElement>(null)
  const [light, setLight] = useState(false)
  const [menu, setMenu] = useState<GroupId | null>(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const closeTimer = useRef<number>(undefined)
  const sectionHref = (id: string) => `/?landing=1&section=${id}`

  useEffect(() => {
    const header = headerRef.current
    const hero = document.querySelector(".landing-hero")
    if (!header || !hero) return

    let boundary = 0
    const updateTone = () => {
      setLight(hero.getBoundingClientRect().bottom <= boundary)
    }
    const measureBoundary = () => {
      const curve = Number.parseFloat(getComputedStyle(hero, "::before").height)
      boundary = header.offsetHeight + (curve || 0)
      updateTone()
    }

    measureBoundary()
    const observer = new ResizeObserver(measureBoundary)
    observer.observe(header)
    observer.observe(hero)
    window.addEventListener("scroll", updateTone, { passive: true })
    return () => {
      observer.disconnect()
      window.removeEventListener("scroll", updateTone)
    }
  }, [])

  useEffect(() => {
    if (!menu && !mobileOpen) return
    const closeOutside = (event: PointerEvent) => {
      if (
        event.target instanceof Node &&
        !headerRef.current?.contains(event.target)
      ) {
        setMenu(null)
        setMobileOpen(false)
      }
    }
    document.addEventListener("pointerdown", closeOutside)
    return () => document.removeEventListener("pointerdown", closeOutside)
  }, [menu, mobileOpen])

  useEffect(() => () => window.clearTimeout(closeTimer.current), [])

  const closeMenu = () => {
    window.clearTimeout(closeTimer.current)
    setMenu(null)
    setMobileOpen(false)
  }

  const openSection = (event: MouseEvent<HTMLAnchorElement>, id: string) => {
    if (
      variant !== "main" ||
      event.altKey ||
      event.ctrlKey ||
      event.metaKey ||
      event.shiftKey
    )
      return
    const section = document.getElementById(id)
    if (!section) return

    event.preventDefault()
    closeMenu()
    if (location.hash)
      history.replaceState(
        history.state,
        "",
        location.pathname + location.search
      )
    section.focus({ preventScroll: true })
    section.scrollIntoView()
  }

  return (
    <header
      ref={headerRef}
      className="landing-header"
      data-light={light || undefined}
      data-variant={variant}
      onKeyDown={(event) => {
        if (event.key !== "Escape" || (!menu && !mobileOpen)) return
        const trigger = headerRef.current?.querySelector<HTMLElement>(
          mobileOpen ? ".site-nav-toggle" : `[aria-controls="nav-${menu}"]`
        )
        closeMenu()
        trigger?.focus()
      }}
    >
      <div className="landing-header__inner landing-container">
        <a
          href={homeHref}
          className="landing-brand"
          aria-label="Accueil Scolup"
        >
          <img src="/logos/logo.svg" alt="" width={28} height={28} />
          Scolup
        </a>
        <div className="landing-header__actions">
          <button
            type="button"
            className="site-nav-toggle"
            aria-label="Menu de navigation"
            aria-expanded={mobileOpen}
            aria-controls="site-nav"
            onClick={() => {
              setMenu(null)
              setMobileOpen(!mobileOpen)
            }}
          >
            <HugeiconsIcon icon={Menu01Icon} size={23} aria-hidden="true" />
          </button>
          <nav
            className="site-nav"
            id="site-nav"
            data-mobile-open={mobileOpen || undefined}
            aria-label="Navigation principale"
          >
            {groups.map(({ id, label, icon }) => (
              <div
                className="site-nav__group"
                data-group={id}
                key={id}
                onPointerEnter={(event) => {
                  if (event.pointerType === "mouse" && !mobileOpen) {
                    window.clearTimeout(closeTimer.current)
                    setMenu(id)
                  }
                }}
                onPointerLeave={(event) => {
                  if (
                    event.pointerType === "mouse" &&
                    !mobileOpen &&
                    !event.currentTarget.contains(document.activeElement)
                  ) {
                    window.clearTimeout(closeTimer.current)
                    closeTimer.current = window.setTimeout(
                      () =>
                        setMenu((current) => (current === id ? null : current)),
                      110
                    )
                  }
                }}
                onBlur={(event) => {
                  if (!event.currentTarget.contains(event.relatedTarget))
                    setMenu((current) => (current === id ? null : current))
                }}
              >
                <div className="site-nav__trigger">
                  {id === "overview" ? (
                    <a
                      href={sectionHref("fonctionnalites")}
                      onClick={(event) => openSection(event, "fonctionnalites")}
                    >
                      <HugeiconsIcon icon={icon} size={18} aria-hidden="true" />
                      {label}
                    </a>
                  ) : null}
                  <button
                    type="button"
                    aria-label={
                      id === "overview"
                        ? "Afficher les sections de présentation"
                        : undefined
                    }
                    aria-expanded={menu === id}
                    aria-controls={`nav-${id}`}
                    onClick={() =>
                      setMenu((current) => (current === id ? null : id))
                    }
                  >
                    {id !== "overview" && (
                      <>
                        <HugeiconsIcon
                          icon={icon}
                          size={18}
                          aria-hidden="true"
                        />
                        {label}
                      </>
                    )}
                    <HugeiconsIcon
                      className="site-nav__chevron"
                      icon={ArrowDown01Icon}
                      size={15}
                      aria-hidden="true"
                    />
                  </button>
                </div>
                <div
                  className="site-nav__dropdown"
                  id={`nav-${id}`}
                  data-open={menu === id || undefined}
                  inert={menu !== id}
                  onClick={(event) => {
                    if (
                      event.target instanceof Element &&
                      event.target.closest("a")
                    )
                      closeMenu()
                  }}
                >
                  <MenuHoverList open={menu === id}>
                    {id === "overview" && (
                      <>
                        {overviewLinks.map(
                          ({
                            id: section,
                            label: title,
                            icon: sectionIcon,
                          }) => (
                            <a
                              key={section}
                              href={sectionHref(section)}
                              onClick={(event) => openSection(event, section)}
                            >
                              <HugeiconsIcon
                                icon={sectionIcon}
                                size={18}
                                aria-hidden="true"
                              />
                              {title}
                            </a>
                          )
                        )}
                        <hr />
                        <a href={APP_TUTORIAL_PATH}>
                          <HugeiconsIcon
                            icon={ScreenAddToHomeIcon}
                            size={18}
                            aria-hidden="true"
                          />
                          Ajouter à l’écran d’accueil
                        </a>
                      </>
                    )}
                    {id === "about" && (
                      <>
                        <a href={TEAM_PATH}>
                          <HugeiconsIcon
                            icon={UserGroupIcon}
                            size={18}
                            aria-hidden="true"
                          />{" "}
                          Qui sommes-nous ?
                        </a>
                        <hr />
                        <a href={WHATSAPP_URL}>
                          <HugeiconsIcon
                            icon={WhatsappIcon}
                            size={18}
                            aria-hidden="true"
                          />{" "}
                          Actualités sur WhatsApp
                        </a>
                        <a href={CONTACT_URL}>
                          <HugeiconsIcon
                            icon={Mail01Icon}
                            size={18}
                            aria-hidden="true"
                          />{" "}
                          Contact
                        </a>
                      </>
                    )}
                    {id === "source" && (
                      <>
                        <a href={OPEN_SOURCE_PATH}>
                          <HugeiconsIcon
                            icon={InformationCircleIcon}
                            size={18}
                            aria-hidden="true"
                          />{" "}
                          Open Source Initiative (OSI)
                        </a>
                        <hr />
                        <p className="site-nav__label">Contribuer</p>
                        <a href={CONTRIBUTING_URL}>
                          <HugeiconsIcon
                            icon={GithubIcon}
                            size={18}
                            aria-hidden="true"
                          />{" "}
                          Contribuer sur GitHub
                        </a>
                        <div
                          className="site-nav__disabled"
                          aria-disabled="true"
                        >
                          <HugeiconsIcon
                            icon={BookOpen01Icon}
                            size={18}
                            aria-hidden="true"
                          />
                          <span>
                            Documentation{" "}
                            <small>
                              À venir avec DocsDirecte et Scolup Docs
                            </small>
                          </span>
                        </div>
                      </>
                    )}
                  </MenuHoverList>
                </div>
              </div>
            ))}
          </nav>
          <OpenAppButton />
        </div>
      </div>
    </header>
  )
}
