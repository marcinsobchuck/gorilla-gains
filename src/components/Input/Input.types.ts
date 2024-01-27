import { InputHTMLAttributes } from "react"

export interface Props {
  id: string
  type: "text" | "number" | "email" | "password"
  label: string
  withIcon?: boolean
  withError?: boolean
  className?: string
}

export type InputProps = Props & InputHTMLAttributes<HTMLInputElement>
