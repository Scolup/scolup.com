import type { Availability, Feature } from "@/types/landing"

export const FEATURES: Feature[] = [
  {
    label: "Mode sombre",
    ecoledirecte: "no",
    scolup: "yes",
  },
  {
    label: "Beauté",
    ecoledirecte: "no",
    scolup: "yes",
  },
  {
    label: "Facilité d'utilisation",
    ecoledirecte: "no",
    scolup: "yes",
  },
  {
    label: "Moyennes",
    ecoledirecte: "partial",
    scolup: "yes",
  },
  {
    label: "Sécurisé",
    ecoledirecte: "yes",
    scolup: "yes",
  },
]

export const AVAILABILITY_META: Record<
  Availability,
  { label: string; className: string }
> = {
  yes: { label: "Inclus", className: "text-emerald-600 dark:text-emerald-400" },
  partial: {
    label: "Partiel",
    className: "text-amber-500 dark:text-amber-400",
  },
  no: { label: "Non inclus", className: "text-destructive" },
}
