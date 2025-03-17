import { Activity } from "@api/types/activitiesService.types"
import { ActivityPreset } from "@api/types/activityPresets.types"

type PopoverOption = {
  label: string
  action: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
}

export interface ActivityCardProps extends React.HTMLAttributes<HTMLDivElement> {
  data: Activity | ActivityPreset
  popoverOptions?: PopoverOption[]
  hasAdditionalActions?: boolean
}
