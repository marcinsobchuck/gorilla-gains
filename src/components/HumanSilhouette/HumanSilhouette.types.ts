import { MusclesHit } from "@features/activitiesSummary/activitiesSummary.types"

export interface HumanSilhouetteProps {
  musclesHit: MusclesHit | null
  title?: string
  withLegend?: boolean
  isLoading?: boolean
  className?: string
}
