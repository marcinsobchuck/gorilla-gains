import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

import { useAppDispatch, useAppSelector } from "@app/hooks"
import { RequestStatuses } from "@enums/requestStatuses.enum"
import { Routes } from "@enums/routes.enum"
import { resetVerifyPasswordResetTokenError } from "@features/auth/authSlice"

import { ChangePasswordForm } from "./components/ChangePasswordForm"
import { useCountdown, useIsPasswordResetTokenValid } from "./hooks"
import { FormWrapper } from "../FormWrapper/FormWrapper"

export const ChangePassword = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const passwordChangeStatus = useAppSelector((state) => state.user.changePasswordStatus)
  const passwordSuccessfullyChanged = passwordChangeStatus === RequestStatuses.SUCCESS
  const passwordResetMessage = useAppSelector((state) => state.user.changePasswordMessage)

  const { isTokenValid, error } = useIsPasswordResetTokenValid()
  const count = useCountdown(!isTokenValid || passwordSuccessfullyChanged, 5, () => {
    navigate(Routes.LOGIN)
  })

  useEffect(() => {
    return () => {
      if (error) {
        dispatch(resetVerifyPasswordResetTokenError())
      }
    }
  }, [dispatch, error])

  if (!isTokenValid || error || passwordResetMessage) {
    return (
      <FormWrapper formTitle={error || passwordResetMessage || "Error"}>
        <p>
          Redirecting to login page in <span>{count}</span>
        </p>
      </FormWrapper>
    )
  }

  return (
    <FormWrapper formTitle='Change password'>
      <ChangePasswordForm />
    </FormWrapper>
  )
}
