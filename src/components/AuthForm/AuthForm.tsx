import { zodResolver } from "@hookform/resolvers/zod"
import React, { useEffect } from "react"
import { FormProvider, useForm } from "react-hook-form"

import { SubmitButton } from "./AuthForm.styled"
import { AuthFormProps, FormValues } from "./AuthForm.types"
import {
  loginInputsData,
  loginSchema,
  loginValues,
  registerInputsData,
  registerSchema,
  registerValues,
} from "./config"
import { Input } from "../Input/Input"

export const AuthForm: React.FC<AuthFormProps> = ({ onSubmit, isRegister }) => {
  const methods = useForm<FormValues>({
    defaultValues: isRegister ? registerValues : loginValues,
    mode: "all",
    resolver: zodResolver(isRegister ? registerSchema : loginSchema),
  })

  const { register, handleSubmit, setFocus } = methods

  const data = isRegister ? registerInputsData : loginInputsData
  const focusedInput = isRegister ? "name" : "email"

  useEffect(() => {
    setFocus(focusedInput)
  }, [focusedInput, setFocus])

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        {data.map((input) => {
          const { id, label, type } = input

          return <Input key={id} id={id} label={label} type={type} {...register(id)} />
        })}
        <SubmitButton buttonType='button' width={200} type='submit'>
          {isRegister ? "Register" : "Login"}
        </SubmitButton>
      </form>
    </FormProvider>
  )
}
