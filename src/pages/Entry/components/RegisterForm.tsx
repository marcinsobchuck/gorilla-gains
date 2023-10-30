import { zodResolver } from "@hookform/resolvers/zod"
import React, { useEffect } from "react"
import { FormProvider, useForm } from "react-hook-form"

import { registerInputsData, registerSchema, registerValues } from "./config"
import { Input } from "../../../components/Input/Input"
import { SubmitButton } from "../shared.styled"
import { RegisterFormProps } from "../types/RegisterForm.types"

export const RegisterForm: React.FC<RegisterFormProps> = ({ onSubmit }) => {
  const methods = useForm({
    defaultValues: registerValues,
    mode: "all",
    resolver: zodResolver(registerSchema),
  })

  const { handleSubmit, setFocus, watch, trigger } = methods

  const focusedInput = "name"

  const password = watch("password")
  const passwordConfirmation = watch("passwordConfirmation")

  useEffect(() => {
    setFocus(focusedInput)
  }, [focusedInput, setFocus])

  useEffect(() => {
    trigger("passwordConfirmation")
  }, [password, passwordConfirmation, trigger])

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        {registerInputsData.map((input) => {
          const { id, label, type } = input

          return <Input key={id} id={id} label={label} type={type} />
        })}
        <SubmitButton buttonType='button' width={200} type='submit'>
          Register
        </SubmitButton>
      </form>
    </FormProvider>
  )
}
