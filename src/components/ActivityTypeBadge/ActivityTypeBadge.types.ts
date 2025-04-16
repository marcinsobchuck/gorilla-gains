import { ActivityTypes } from "@enums/activityTypes.enum"

export interface ActivityTypeBadgeProps {
  activityType: ActivityTypes
  gap?: number
  iconPadding?: number
  iconSize?: number
  title?: string | React.ReactNode
  titleSize?: number
  subtitle?: string
}
