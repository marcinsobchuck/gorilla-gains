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
import { loginUserAction } from "../../features/auth/authActions"

export const Login = () => {
  const isSuccess = useAppSelector((state) => state.auth.success)
  const navigate = useNavigate()

  const dispatch = useAppDispatch()

  useEffect(() => {
    if (isSuccess) {
      navigate("/")
    }
  }, [isSuccess, navigate])

  const handleLogin: SubmitHandler<FormValues> = ({ email, password }) => {
    dispatch(loginUserAction({ email, password }))
  }

  return (
    <Wrapper>
      <ContentWrapper>
        <FormHeaderWrapper>
          <ViewInfoHeading>Login</ViewInfoHeading>
          <Title>
            Sign in Gorilla<Accent>.</Accent>
          </Title>
          <Subtitle>
            Time to train<Accent>.</Accent>
          </Subtitle>
          <AuthActionContainer>
            <span>Not a member?</span>
            <Button text='Sign up' buttonType='link' to='/auth/register' variant='secondary' />
          </AuthActionContainer>
        </FormHeaderWrapper>
        <AuthForm onSubmit={handleLogin} />
      </ContentWrapper>
      <StyledImage src={authGorilla} />
    </Wrapper>
  )
}
