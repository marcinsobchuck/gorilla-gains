import { InputHTMLAttributes } from "react"

export interface Props {
  id: string
  type: "text" | "number" | "email" | "password"
  label: string
  withIcon?: boolean
  withError?: boolean
  unitSymbol?: string
  className?: string
  triggerValidationFor?: string[]
}

export type InputProps = Props & InputHTMLAttributes<HTMLInputElement>
