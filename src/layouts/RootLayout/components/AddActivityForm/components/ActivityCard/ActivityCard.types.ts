import { Activity } from "@api/types/activitiesService.types"
import { ActivityPreset } from "@api/types/activityPresets.types"
import { IconName } from "@components/Icon/Icon.types"

export type PopoverOption = {
  label: string
  action: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
  icon: IconName
}

export interface ActivityCardProps extends React.HTMLAttributes<HTMLDivElement> {
  data: Activity | ActivityPreset
  popoverOptions?: PopoverOption[]
  hasAdditionalActions?: boolean
}
