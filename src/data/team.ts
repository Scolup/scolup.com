export const TEAM = [
  {
    name: "0010227",
    description:
      "Co-fondateur, CM et développeur au sein de Scolup. Sans lui, aucun problème, mais aucun domaine.",
  },
  {
    name: "Adouchee",
    description:
      "Co-fondateur et développeur au sein de Scolup. Il a conçu l’architecture de l’application. Bro is a genius.",
  },
] as const

/** Fisher–Yates shuffle: every team member has an equal chance of being first. */
export function getShuffledTeam() {
  const shuffled = [...TEAM]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    const current = shuffled[i]
    shuffled[i] = shuffled[j]
    shuffled[j] = current
  }
  return shuffled
}
