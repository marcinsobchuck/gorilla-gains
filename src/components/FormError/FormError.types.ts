import { FieldErrors, FieldValues } from "react-hook-form"

export interface FormErrorProps {
  errors: FieldErrors<FieldValues>
  name: string
  className?: string
}
