import { useEffect } from "react"
import { SubmitHandler } from "react-hook-form"
import { useNavigate } from "react-router-dom"

import { useAppDispatch, useAppSelector } from "@app/hooks"
import authGorilla from "@assets/authGorilla.png"
import { Routes } from "@enums/routes.enum"
import { loginUserAction } from "@features/auth/authActions"
import { resetAuthFormError } from "@features/auth/authSlice"

import { LoginForm } from "./components/LoginForm"
import { LoginFormValues } from "./LoginForm.types"
import { AuthError, ContentWrapper, StyledImage, Wrapper } from "../../shared.styled"
import { AuthFormHeader } from "../AuthFormHeader/AuthFormHeader"

export const Login = () => {
  const auth = useAppSelector((state) => state.auth)
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const { error, status } = auth

  const handleLogin: SubmitHandler<LoginFormValues> = async ({ email, password }) => {
    try {
      await dispatch(loginUserAction({ email, password })).unwrap()
      navigate(Routes.DASHBOARD)
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    return () => {
      if (error !== "") {
        dispatch(resetAuthFormError())
      }
    }
  }, [navigate, dispatch, error, status])

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
