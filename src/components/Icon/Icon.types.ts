import { SVGProps } from "react"

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
  | "menu"
  | "add"
  | "close"
  | "remove"
  | "checkmark"
  | "minus"
  | "fire"
  | "leftArrow"
  | "threeDots"
  | "strength"
  | "endurance"
  | "flexibility"
  | "balance"
  | "account"
  | "privacy"
  | "logout"

export interface IconProps extends SVGProps<SVGElement> {
  name?: IconName
  width?: number
  height?: number
  color?: string
}
