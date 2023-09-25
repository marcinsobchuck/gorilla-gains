import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect } from "react"
import { useForm, useWatch } from "react-hook-form"

import {
  InputStatusIcon,
  InputWrapper,
  StyledError,
  StyledInput,
  StyledLabel,
  SubmitButton,
} from "./AuthForm.styled"
import { AuthFormProps, LoginFormValues, RegisterFormValues } from "./AuthForm.types"
import { loginSchema, registerSchema } from "./config"
import errorIcon from "../../assets/error.svg"
import successIcon from "../../assets/success.svg"

const registerInputsData: {
  id: keyof RegisterFormValues
  label: string
  type: "text" | "email" | "password"
}[] = [
  {
    id: "name",
    label: "Name",
    type: "text",
  },
  {
    id: "email",
    label: "Email",
    type: "email",
  },
  {
    id: "password",
    label: "Password",
    type: "password",
  },
  {
    id: "passwordConfirmation",
    label: "Confirm password",
    type: "password",
  },
]

const loginInputsData: {
  id: keyof LoginFormValues
  label: string
  type: "email" | "password"
}[] = [
  {
    id: "email",
    label: "Email",
    type: "email",
  },
  {
    id: "password",
    label: "Password",
    type: "password",
  },
]

export const AuthForm: React.FC<AuthFormProps> = ({ onSubmit, isRegister }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setFocus,
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      passwordConfirmation: "",
    },

    mode: "all",
    resolver: zodResolver(isRegister ? registerSchema : loginSchema),
  })

  const formValues = useWatch({ control })
  const data = isRegister ? registerInputsData : loginInputsData
  const focusedInput = isRegister ? "name" : "email"

  useEffect(() => {
    setFocus(focusedInput)
  }, [focusedInput, setFocus])

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {data.map((input) => {
        const { id, label, type } = input
        const isError = Boolean(errors[id])
        const isNotEmpty = formValues[id] !== ""

        return (
          <InputWrapper key={id} $shouldTransition={isNotEmpty}>
            <StyledInput id={id} type={type} {...register(id)} />
            <StyledLabel htmlFor={id}>{label}</StyledLabel>
            <InputStatusIcon
              $isVisible={isError || isNotEmpty}
              $isValid={!errors[id]}
              src={errors[id] ? errorIcon : successIcon}
            />
            <StyledError $isVisible={isError}>{errors[id]?.message}</StyledError>
          </InputWrapper>
        )
      })}
      <SubmitButton
        text={isRegister ? "Register" : "Login"}
        variant='primary'
        width={200}
        type='submit'
      />
    </form>
  )
}
