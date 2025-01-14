import { useEffect } from "react"

import { useAppDispatch, useAppSelector } from "@app/hooks"
import { resetForgotPasswordError } from "@features/auth/authSlice"

import { ForgotPasswordForm } from "./components/ForgotPasswordForm"
import { AuthError, AuthSuccess } from "../auth/shared.styled"
import { FormWrapper } from "../FormWrapper/FormWrapper"

export const ForgotPassword = () => {
  const dispatch = useAppDispatch()
  const errorMessage = useAppSelector((state) => state.auth.forgotPasswordError)
  const successMessage = useAppSelector((state) => state.auth.forgotPasswordSuccessMessage)

  useEffect(() => {
    return () => {
      if (errorMessage) {
        dispatch(resetForgotPasswordError())
      }
    }
  }, [dispatch, errorMessage])

  return (
    <FormWrapper formTitle='Forgot password'>
      <ForgotPasswordForm />
      {!!errorMessage && <AuthError>{errorMessage}</AuthError>}
      {!!successMessage && <AuthSuccess>{successMessage}</AuthSuccess>}
    </FormWrapper>
  )
}
