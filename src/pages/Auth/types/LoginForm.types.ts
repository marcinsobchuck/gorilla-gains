import { SubmitHandler } from "react-hook-form"

export interface LoginFormValues {
  email: string
  password: string
}

export interface LoginFormProps {
  onSubmit: SubmitHandler<LoginFormValues>
}
