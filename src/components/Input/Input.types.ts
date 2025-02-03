import React, { InputHTMLAttributes } from "react"

export interface Props {
  id: string
  type: "text" | "number" | "email" | "password"
  label: string
  withIcon?: boolean
  withError?: boolean
  unitSymbol?: string
  className?: string
  triggerValidationFor?: string[]
  onChange?: () => void
  isDisabled?: boolean
  children?: React.ReactNode
}

export type InputProps = Props & InputHTMLAttributes<HTMLInputElement>
