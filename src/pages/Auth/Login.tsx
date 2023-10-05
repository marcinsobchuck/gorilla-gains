import { useEffect } from "react"
import { SubmitHandler } from "react-hook-form"
import { useNavigate } from "react-router-dom"

import { FormHeader } from "./components/FormHeader"
import { LoginForm } from "./components/LoginForm"
import { ContentWrapper, StyledImage, Wrapper } from "./shared.styled"
import { LoginFormValues } from "./types/LoginForm.types"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import authGorilla from "../../assets/authGorilla.png"
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

  const handleLogin: SubmitHandler<LoginFormValues> = ({ email, password }) => {
    dispatch(loginUserAction({ email, password }))
  }

  return (
    <Wrapper>
      <ContentWrapper>
        <FormHeader
          heading='Login'
          title='Sign in Gorilla'
          subtitle='Time to train'
          actionText='Not a member?'
          buttonText='Sign up'
          to='/auth/register'
        />
        <LoginForm onSubmit={handleLogin} />
      </ContentWrapper>
      <StyledImage src={authGorilla} />
    </Wrapper>
  )
}
