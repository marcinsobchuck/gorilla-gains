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

  const { register, handleSubmit, setFocus } = methods

  const focusedInput = "name"

  useEffect(() => {
    setFocus(focusedInput)
  }, [focusedInput, setFocus])

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        {registerInputsData.map((input) => {
          const { id, label, type } = input

          return <Input key={id} id={id} label={label} type={type} {...register(id)} />
        })}
        <SubmitButton buttonType='button' width={200} type='submit'>
          Register
        </SubmitButton>
      </form>
    </FormProvider>
  )
}
