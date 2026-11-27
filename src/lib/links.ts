export const APP_URL = "https://app.scolup.com"
export const GITHUB_URL = "https://github.com/Scolup/Scolup"
export const GITHUB_ORG_URL = "https://github.com/Scolup"
export const APP_TUTORIAL_PATH = "/tuto"
export const TEAM_PATH = "/who"
export const OPEN_SOURCE_PATH = "/osi"
export const PAGE_TITLES = {
  tutorial: "Scolup – Ajouter l’app à l’écran d’accueil",
  team: "Scolup – Qui sommes-nous ?",
  source: "Scolup – Open source",
} as const

export const PAGE_DESCRIPTIONS = {
  tutorial:
    "Installe Scolup sur l’écran d’accueil de ton téléphone en quelques étapes simples.",
  team: "Découvre les étudiants qui créent Scolup, un client alternatif gratuit et open source pour EcoleDirecte.",
  source:
    "Le code de Scolup est public sous licence GNU AGPL v3. Découvre le projet et contribue sur GitHub.",
} as const
export const CONTRIBUTING_URL = GITHUB_URL + "/blob/main/CONTRIBUTING.md"
export const WHATSAPP_URL =
  "https://whatsapp.com/channel/0029VbEIpTSBPzjPi38tyD46"
export const CONTACT_URL = "mailto:hi@scolup.com"
export const LEGAL_LINKS = [
  { href: APP_URL + "/mentions", label: "Mentions légales" },
  { href: APP_URL + "/terms", label: "Conditions d’utilisation" },
  { href: APP_URL + "/privacy", label: "Politique de confidentialité" },
  { href: APP_URL + "/security", label: "Sécurité" },
] as const
