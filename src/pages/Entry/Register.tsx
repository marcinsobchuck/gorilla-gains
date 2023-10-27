import { useEffect } from "react"
import { SubmitHandler } from "react-hook-form"
import { useNavigate } from "react-router-dom"

import { AuthFormHeader } from "./components/AuthFormHeader"
import { RegisterForm } from "./components/RegisterForm"
import { AuthError, ContentWrapper, StyledImage, Wrapper } from "./shared.styled"
import { RegisterFormValues } from "./types/RegisterForm.types"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import authGorilla from "../../assets/authGorilla.png"
import { Routes } from "../../enums/routes.enum"
import { registerUserAction } from "../../features/auth/authActions"
import { resetAuthFormError } from "../../features/auth/authSlice"

export const Register = () => {
  const auth = useAppSelector((state) => state.auth)
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const { error, success } = auth

  const handleRegister: SubmitHandler<RegisterFormValues> = ({ email, name, password }) => {
    dispatch(registerUserAction({ name, email, password }))
  }

  useEffect(() => {
    if (success) {
      navigate(Routes.USER_DETAILS)
    }

    return () => {
      if (error !== "") {
        dispatch(resetAuthFormError())
      }
    }
  }, [success, navigate, dispatch, error])

  return (
    <Wrapper>
      <ContentWrapper>
        <AuthFormHeader
          heading='Register'
          title='Create an account'
          subtitle='Become Gorilla'
          actionText='Already a member?'
          buttonText='Log in'
          to={Routes.LOGIN}
        />
        <AuthError $isVisible={Boolean(error)}>
          {typeof error === "string" && Boolean(error) ? <p>{error}</p> : <p>error space</p>}
        </AuthError>
        <RegisterForm onSubmit={handleRegister} />
      </ContentWrapper>
      <StyledImage src={authGorilla} />
    </Wrapper>
  )
}
