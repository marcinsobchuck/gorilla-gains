export type IconName =
  | "calendar"
  | "dashboard"
  | "error"
  | "github"
  | "gorilla"
  | "history"
  | "linkedin"
  | "moon"
  | "settings"
  | "success"
  | "sun"

export interface IconProps {
  name?: IconName
  width?: number
  height?: number
}
