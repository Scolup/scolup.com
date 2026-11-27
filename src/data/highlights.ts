import {
  Calendar03Icon,
  ChartIncreaseIcon,
  LibraryIcon,
} from "@hugeicons/core-free-icons"

export const HIGHLIGHTS = [
  {
    id: "notes",
    label: "Comprends tes notes",
    icon: ChartIncreaseIcon,
    description: "Suis tes moyennes et vois l’effet de chaque nouvelle note.",
  },
  {
    id: "agenda",
    label: "Organise ta journée",
    icon: Calendar03Icon,
    description: "Retrouve tes horaires et les salles de tes prochains cours.",
  },
  {
    id: "devoirs",
    label: "Retrouve tes devoirs",
    icon: LibraryIcon,
    description:
      "Vois ce qu’il te reste à rendre et coche les devoirs terminés.",
  },
] as const
