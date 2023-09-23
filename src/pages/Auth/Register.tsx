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

export const Register = () => {
  const handleRegister: SubmitHandler<FormValues> = (values) => {
    console.log(values)
  }

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
          <AuthActionText>
            Already a member? <StyledLink to='/auth'>Log in</StyledLink>
          </AuthActionText>
        </FormHeaderWrapper>

        <AuthForm onSubmit={handleRegister} isRegister />
      </ContentWrapper>

      <StyledImage src={authGorilla} />
    </Wrapper>
  )
}
