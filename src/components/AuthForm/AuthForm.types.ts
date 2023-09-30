import { SubmitHandler } from "react-hook-form"

export interface FormValues {
  name: string
  email: string
  password: string
  passwordConfirmation: string
}

export type AuthFormProps = {
  onSubmit: SubmitHandler<FormValues>
  isRegister?: boolean
}
