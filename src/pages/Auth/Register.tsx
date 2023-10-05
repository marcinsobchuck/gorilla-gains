import { useEffect } from "react"
import { SubmitHandler } from "react-hook-form"
import { useNavigate } from "react-router-dom"

import { FormHeader } from "./components/FormHeader"
import { RegisterForm } from "./components/RegisterForm"
import { ContentWrapper, StyledImage, Wrapper } from "./shared.styled"
import { RegisterFormValues } from "./types/RegisterForm.types"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import authGorilla from "../../assets/authGorilla.png"
import { registerUserAction } from "../../features/auth/authActions"

export const Register = () => {
  const isSuccess = useAppSelector((state) => state.auth.success)
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const handleRegister: SubmitHandler<RegisterFormValues> = ({ email, name, password }) => {
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
        <FormHeader
          heading='Register'
          title='Create an account'
          subtitle='Become Gorilla'
          actionText='Already a member?'
          buttonText='Log in'
          to='/auth/login'
        />
        <RegisterForm onSubmit={handleRegister} />
      </ContentWrapper>
      <StyledImage src={authGorilla} />
    </Wrapper>
  )
}
