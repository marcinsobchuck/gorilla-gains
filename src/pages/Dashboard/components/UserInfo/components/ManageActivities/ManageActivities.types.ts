import { Activity } from "@api/types/activitiesService.types"

export interface ManageActivitiesProps {
  isOpen: boolean
  title: string
  activities: Activity[]
  onBack: () => void
}
