import { yupResolver } from "@hookform/resolvers/yup"
import { useEffect } from "react"
import { FormProvider, useForm } from "react-hook-form"

import { Input } from "@components/Input/Input"

import { loginInputsData, loginSchema, loginValues } from "../../../config"
import { SubmitButton } from "../../../shared.styled"
import { LoginFormProps } from "../LoginForm.types"

export const LoginForm: React.FC<LoginFormProps> = ({ onSubmit }) => {
  const methods = useForm({
    defaultValues: loginValues,
    mode: "all",
    resolver: yupResolver(loginSchema),
  })
  const {
    handleSubmit,
    setFocus,
    formState: { isSubmitting },
  } = methods

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
        <SubmitButton buttonType='button' width={200} type='submit' disabled={isSubmitting}>
          Login
        </SubmitButton>
      </form>
    </FormProvider>
  )
}
