import { MusclesHit } from "@features/activitiesSummary/activitiesSummary.types"

export interface HumanSilhouetteProps {
  musclesHit: MusclesHit | null
  withLegend?: boolean
  className?: string
}
