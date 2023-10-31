import { useEffect } from "react"
import { SubmitHandler } from "react-hook-form"
import { useNavigate } from "react-router-dom"

import { useAppDispatch, useAppSelector } from "@app/hooks"
import authGorilla from "@assets/authGorilla.png"
import { Routes } from "@enums/routes.enum"
import { loginUserAction } from "@features/auth/authActions"
import { resetAuthFormError } from "@features/auth/authSlice"

import { AuthFormHeader } from "./components/AuthFormHeader"
import { LoginForm } from "./components/LoginForm"
import { AuthError, ContentWrapper, StyledImage, Wrapper } from "./shared.styled"
import { LoginFormValues } from "./types/LoginForm.types"

export const Login = () => {
  const auth = useAppSelector((state) => state.auth)
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const { error, success } = auth

  const handleLogin: SubmitHandler<LoginFormValues> = ({ email, password }) => {
    dispatch(loginUserAction({ email, password }))
  }

  useEffect(() => {
    if (success) {
      navigate(Routes.DASHBOARD)
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
          heading='Login'
          title='Sign in Gorilla'
          subtitle='Time to train'
          actionText='Not a member?'
          buttonText='Sign up'
          to={Routes.REGISTER}
        />
        <AuthError $isVisible={Boolean(error)}>
          {error ? <p>{error}</p> : <p>error space</p>}
        </AuthError>
        <LoginForm onSubmit={handleLogin} />
      </ContentWrapper>
      <StyledImage src={authGorilla} />
    </Wrapper>
  )
}
