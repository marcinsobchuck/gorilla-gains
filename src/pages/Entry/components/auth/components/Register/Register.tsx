import { useEffect } from "react"
import { SubmitHandler } from "react-hook-form"
import { useNavigate } from "react-router-dom"

import { useAppDispatch, useAppSelector } from "@app/hooks"
import authGorilla from "@assets/authGorilla.png"
import { Routes } from "@enums/routes.enum"
import { registerUserAction } from "@features/auth/authActions"
import { resetAuthFormError } from "@features/auth/authSlice"

import { RegisterForm } from "./components/RegisterForm"
import { RegisterFormValues } from "./RegisterForm.types"
import { AuthError, ContentWrapper, StyledImage, Wrapper } from "../../shared.styled"
import { AuthFormHeader } from "../AuthFormHeader/AuthFormHeader"

export const Register = () => {
  const auth = useAppSelector((state) => state.auth)
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const { error, status } = auth

  const handleRegister: SubmitHandler<RegisterFormValues> = async ({ email, name, password }) => {
    try {
      await dispatch(registerUserAction({ name, email, password })).unwrap()
      navigate(Routes.USER_DETAILS)
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
          heading='Register'
          title='Create an account'
          subtitle='Become Gorilla'
          actionText='Already a member?'
          buttonText='Log in'
          to={Routes.LOGIN}
        />
        <AuthError $isVisible={Boolean(error)}>
          {error ? <p>{error}</p> : <p>error space</p>}
        </AuthError>
        <RegisterForm onSubmit={handleRegister} />
      </ContentWrapper>
      <StyledImage src={authGorilla} />
    </Wrapper>
  )
}
