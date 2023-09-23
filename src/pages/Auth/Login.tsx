import { SubmitHandler } from "react-hook-form"

import {
  Accent,
  AuthActionText,
  ContentWrapper,
  FormHeaderWrapper,
  StyledImage,
  StyledLink,
  Subtitle,
  Title,
  ViewInfoHeading,
  Wrapper,
} from "./shared.styled"
import authGorilla from "../../assets/authGorilla.png"
import { AuthForm } from "../../components/AuthForm/AuthForm"
import { FormValues } from "../../components/AuthForm/AuthForm.types"

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
          <AuthActionText>
            Not a member? <StyledLink to='/auth/register'>Sign up</StyledLink>
          </AuthActionText>
        </FormHeaderWrapper>
        <AuthForm onSubmit={handleLogin} />
      </ContentWrapper>
      <StyledImage src={authGorilla} />
    </Wrapper>
  )
}
