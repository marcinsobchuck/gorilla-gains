import { SubmitHandler } from "react-hook-form"

export interface RegisterFormValues {
  name: string
  email: string
  password: string
  passwordConfirmation: string
}

export type LoginFormValues = Pick<RegisterFormValues, "email" | "password">

export type FormValues = LoginFormValues | RegisterFormValues

export interface AuthFormProps {
  onSubmit: SubmitHandler<FormValues>
  isRegister?: boolean
}
