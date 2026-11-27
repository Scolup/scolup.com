import { APP_URL } from "./links"

export { APP_URL }

const COOKIE_NAME = "scolup_go_app"
const STORAGE_KEY = "scolup:go-app"
const OPEN_COUNT_COOKIE = "scolup_browser_open_count"
const OPEN_COUNT_STORAGE_KEY = "scolup:browser-open-count"
const COOKIE_DOMAIN = ".scolup.com"
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365 // 1 year

function canUseDOM(): boolean {
  return typeof window !== "undefined" && typeof document !== "undefined"
}

export function getGoAppPreference(): boolean {
  if (!canUseDOM()) return false

  const cookie = getCookie(COOKIE_NAME)
  if (cookie === "1") return true
  if (cookie === "0") return false

  // Fallback for localhost / previews where the shared-domain cookie can't be set
  try {
    return window.localStorage.getItem(STORAGE_KEY) === "1"
  } catch {
    return false
  }
}

export function setGoAppPreference(enabled: boolean): void {
  if (!canUseDOM()) return

  const value = enabled ? "1" : "0"

  try {
    window.localStorage.setItem(STORAGE_KEY, value)
  } catch {
    // ignore (private mode, etc.)
  }

  const hostname = window.location.hostname
  const sharedDomainApplies =
    hostname === "scolup.com" || hostname.endsWith(".scolup.com")

  setCookie(COOKIE_NAME, value, sharedDomainApplies)
}

function setCookie(name: string, value: string, sharedDomain: boolean): void {
  const parts = [
    `${name}=${encodeURIComponent(value)}`,
    "Path=/",
    `Max-Age=${COOKIE_MAX_AGE}`,
    "SameSite=Lax",
  ]
  if (sharedDomain) parts.push(`Domain=${COOKIE_DOMAIN}`)
  if (window.location.protocol === "https:") parts.push("Secure")
  document.cookie = parts.join("; ")
}

function sharedDomainApplies(): boolean {
  if (!canUseDOM()) return false
  const hostname = window.location.hostname
  return hostname === "scolup.com" || hostname.endsWith(".scolup.com")
}

export function getOpenCount(): number {
  if (!canUseDOM()) return 0

  const cookie = getCookie(OPEN_COUNT_COOKIE)
  const parsedCookie = cookie === null ? NaN : Number.parseInt(cookie, 10)
  if (Number.isFinite(parsedCookie) && (parsedCookie as number) >= 0) {
    return parsedCookie as number
  }

  // Fallback for localhost / previews where the shared-domain cookie can't be set
  try {
    const stored = window.localStorage.getItem(OPEN_COUNT_STORAGE_KEY)
    const parsed = stored === null ? NaN : Number.parseInt(stored, 10)
    if (Number.isFinite(parsed) && (parsed as number) >= 0) {
      return parsed as number
    }
  } catch {
    // ignore
  }

  return 0
}

/** Increment the open counter, persist it, return the new value. */
export function incrementOpenCount(): number {
  const next = getOpenCount() + 1
  const value = String(next)

  try {
    window.localStorage.setItem(OPEN_COUNT_STORAGE_KEY, value)
  } catch {
    // ignore (private mode, etc.)
  }

  try {
    setCookie(OPEN_COUNT_COOKIE, value, sharedDomainApplies())
  } catch {
    // ignore
  }

  return next
}

function getCookie(name: string): string | null {
  const cookies = document.cookie ? document.cookie.split("; ") : []
  for (const cookie of cookies) {
    const index = cookie.indexOf("=")
    if (index === -1) continue
    if (cookie.slice(0, index) === name) {
      return decodeURIComponent(cookie.slice(index + 1))
    }
  }
  return null
}

const BOT_PATTERN =
  /bot|crawl|spider|slurp|mediapartners|baidu|yandex|duckduck|sogou|exabot|facebot|ia_archiver|ahrefs|semsrush|mj12bot|dotbot|petalbot|ccbot|gptbot|claudebot|bytespider|facebookexternalhit|linkedinbot|embedly|quora|pinterest|slackbot|discordbot|telegrambot|whatsapp|preview/i

export function isBot(): boolean {
  if (!canUseDOM()) return false
  try {
    if (navigator.webdriver) return true
    return BOT_PATTERN.test(navigator.userAgent || "")
  } catch {
    return false
  }
}

function hasOptOutParam(search: string): boolean {
  try {
    const params = new URLSearchParams(search)
    return params.has("landing") || params.has("noredirect")
  } catch {
    return false
  }
}

/** True when the URL forces the landing to show once (?landing=1 / ?noredirect). */
export function isLandingBypass(search: string): boolean {
  return hasOptOutParam(search)
}

/** Forward UTM / other params to the app, minus the landing escape hatches. */
export function buildAppUrl(search: string): string {
  try {
    const params = new URLSearchParams(search)
    params.delete("landing")
    params.delete("noredirect")
    const query = params.toString()
    return query ? `${APP_URL}?${query}` : APP_URL
  } catch {
    return APP_URL
  }
}

export function shouldRedirectToApp(search: string): boolean {
  if (!canUseDOM()) return false
  if (hasOptOutParam(search)) return false
  if (isBot()) return false
  return getGoAppPreference()
}
