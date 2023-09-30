import { useEffect } from "react"
import { SubmitHandler } from "react-hook-form"
import { useNavigate } from "react-router-dom"

import {
  Accent,
  AuthActionContainer,
  ContentWrapper,
  FormHeaderWrapper,
  StyledImage,
  Subtitle,
  Title,
  ViewInfoHeading,
  Wrapper,
} from "./shared.styled"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import authGorilla from "../../assets/authGorilla.png"
import { AuthForm } from "../../components/AuthForm/AuthForm"
import { FormValues } from "../../components/AuthForm/AuthForm.types"
import { Button } from "../../components/Button/Button"
import { registerUserAction } from "../../features/auth/authActions"

export const Register = () => {
  const isSuccess = useAppSelector((state) => state.auth.success)
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const handleRegister: SubmitHandler<FormValues> = ({ email, name, password }) => {
    dispatch(registerUserAction({ name, email, password }))
  }

  useEffect(() => {
    if (isSuccess) {
      navigate("/")
    }
  }, [isSuccess, navigate])

  return (
    <Wrapper>
      <ContentWrapper>
        <FormHeaderWrapper>
          <ViewInfoHeading>Register</ViewInfoHeading>
          <Title>
            Create an account<Accent>.</Accent>
          </Title>
          <Subtitle>
            Become Gorilla<Accent>.</Accent>
          </Subtitle>
          <AuthActionContainer>
            <span>Already a member?</span>
            <Button text='Log in' buttonType='link' to='/auth/login' variant='secondary' />
          </AuthActionContainer>
        </FormHeaderWrapper>
        <AuthForm onSubmit={handleRegister} isRegister />
      </ContentWrapper>
      <StyledImage src={authGorilla} />
    </Wrapper>
  )
}
