import { Activity } from "@api/types/activitiesService.types"

export interface ActivityCardProps extends React.HTMLAttributes<HTMLDivElement> {
  data: Activity
}
