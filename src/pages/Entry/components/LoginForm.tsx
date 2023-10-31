import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect } from "react"
import { FormProvider, useForm } from "react-hook-form"

import { Input } from "@components/Input/Input"

import { loginInputsData, loginSchema, loginValues } from "./config"
import { SubmitButton } from "../shared.styled"
import { LoginFormProps } from "../types/LoginForm.types"

export const LoginForm: React.FC<LoginFormProps> = ({ onSubmit }) => {
  const methods = useForm({
    defaultValues: loginValues,
    mode: "all",
    resolver: zodResolver(loginSchema),
  })

  const { handleSubmit, setFocus } = methods

  const focusedInput = "email"

  useEffect(() => {
    setFocus(focusedInput)
  }, [focusedInput, setFocus])

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        {loginInputsData.map((input) => {
          const { id, label, type } = input

          return <Input key={id} id={id} label={label} type={type} />
        })}
        <SubmitButton buttonType='button' width={200} type='submit'>
          Login
        </SubmitButton>
      </form>
    </FormProvider>
  )
}
