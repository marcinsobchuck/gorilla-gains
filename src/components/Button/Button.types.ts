import { LinkProps } from "react-router-dom"

import { IconName } from "../Icon/Icon.types"

export type Variant = "primary" | "secondary" | "tertiary"

interface SharedProps {
  variant?: Variant
  width?: number
  icon?: IconName
  textColor?: string
}

type RegularButtonProps = {
  buttonType: "button"
} & React.ButtonHTMLAttributes<HTMLButtonElement>

type RouterLinkProps = {
  buttonType: "link" | "navLink"
} & (LinkProps & React.AnchorHTMLAttributes<HTMLAnchorElement>)

export type ButtonProps = SharedProps & (RegularButtonProps | RouterLinkProps)
