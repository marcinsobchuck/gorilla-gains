import { SubmitHandler } from "react-hook-form"

export interface RegisterFormValues {
  name: string
  email: string
  password: string
  passwordConfirmation?: string
}

export interface RegisterFormProps {
  onSubmit: SubmitHandler<RegisterFormValues>
}
