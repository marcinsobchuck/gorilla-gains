import { SubmitHandler } from "react-hook-form"

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
import authGorilla from "../../assets/authGorilla.png"
import { AuthForm } from "../../components/AuthForm/AuthForm"
import { FormValues } from "../../components/AuthForm/AuthForm.types"
import { Button } from "../../components/Button/Button"

export const Login = () => {
  const handleLogin: SubmitHandler<FormValues> = (values) => {
    console.log(values)
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
