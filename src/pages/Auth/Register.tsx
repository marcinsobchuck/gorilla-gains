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
