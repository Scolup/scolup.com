import { HugeiconsIcon } from "@hugeicons/react"
import {
  Cancel01Icon,
  MinusSignIcon,
  Tick02Icon,
} from "@hugeicons/core-free-icons"

import type { Availability } from "@/types/landing"
import { AVAILABILITY_META } from "@/data/comparison"

export function AvailabilityIcon({ value }: { value: Availability }) {
  const meta = AVAILABILITY_META[value]
  const icon =
    value === "yes"
      ? Tick02Icon
      : value === "partial"
        ? MinusSignIcon
        : Cancel01Icon

  return (
    <HugeiconsIcon
      icon={icon}
      size={18}
      strokeWidth={2.25}
      role="img"
      aria-label={meta.label}
      className={`${meta.className} mx-auto transition-transform duration-150 group-hover:scale-125`}
    />
  )
}
