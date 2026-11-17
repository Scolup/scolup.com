import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { FEATURES } from "@/data/comparison"

import { AvailabilityIcon } from "./AvailabilityIcon"

export function ComparisonSection() {
  return (
    <section
      className="animate-rise flex flex-col gap-6"
      style={{ animationDelay: "260ms" }}
      aria-label="Comparatif Scolup et EcoleDirecte"
    >
      <h2 className="text-center font-heading text-xl font-semibold tracking-tight">
        Scolup 🗿 vs EcoleDirecte 😬
      </h2>
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead>Fonctionnalité</TableHead>
            <TableHead className="w-24 text-center sm:w-32">
              EcoleDirecte
            </TableHead>
            <TableHead className="w-24 text-center sm:w-32">Scolup</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {FEATURES.map((feature) => (
            <TableRow key={feature.label} className="group">
              <TableCell className="whitespace-normal">
                {feature.label}
              </TableCell>
              <TableCell className="text-center">
                <AvailabilityIcon value={feature.ecoledirecte} />
              </TableCell>
              <TableCell className="text-center">
                <AvailabilityIcon value={feature.scolup} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </section>
  )
}
