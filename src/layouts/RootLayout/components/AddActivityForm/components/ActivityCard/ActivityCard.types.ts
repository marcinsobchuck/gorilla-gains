import { Activity } from "@api/types/activitiesService.types"

type PopoverOption = {
  label: string
  action: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
}

export interface ActivityCardProps extends React.HTMLAttributes<HTMLDivElement> {
  data: Activity
  popoverOptions: PopoverOption[]
}
