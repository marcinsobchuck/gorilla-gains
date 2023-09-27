import { LinkProps } from "react-router-dom"

interface SharedProps {
  variant?: "primary" | "secondary"
  width?: number
  text: string
}

type RegularButtonProps = {
  buttonType: "button"
} & React.ButtonHTMLAttributes<HTMLButtonElement>

type RouterLinkProps = {
  buttonType: "link"
} & (LinkProps & React.RefAttributes<HTMLAnchorElement>)

export type ButtonProps = SharedProps & (RegularButtonProps | RouterLinkProps)
