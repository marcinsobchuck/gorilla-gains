import { Activity } from "@api/types/activitiesService.types"
import { ActivityEvent } from "@features/types/types"

export interface ActivityEventCardProps {
  activity: ActivityEvent | Activity
  isActive: boolean
  onCardClick: () => void
  onCardStatusChange: () => void
}
