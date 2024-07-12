import { Totals } from "@api/types/activitiesSummaryService.types"

export const getTotals = (totals: Totals) => {
  return [
    {
      label: "Total weight lifted",
      value: `${totals.weightLifted} kg`,
    },
    {
      label: "Total distance covered",
      value: `${totals.distance} km`,
    },
    {
      label: "Total reps done",
      value: `${totals.reps} reps`,
    },
  ]
}
