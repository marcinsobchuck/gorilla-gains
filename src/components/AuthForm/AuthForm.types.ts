import { SubmitHandler } from "react-hook-form"

export interface LoginFormValues {
  email: string
  password: string
}

export interface RegisterFormValues {
  name: string
  email: string
  password: string
  passwordConfirmation: string
}

export type FormValues = LoginFormValues | RegisterFormValues

export interface AuthFormProps {
  onSubmit: SubmitHandler<FormValues>
  isRegister?: boolean
}
