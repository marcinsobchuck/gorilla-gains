import styled from "styled-components"

import { Button } from "../../components/Button/Button"

interface AuthErrorProps {
  $isVisible: boolean
}

export const SubmitButton = styled(Button)`
  margin: 0 auto;
  margin-top: 18px;
`

export const StyledImage = styled.img`
  display: none;

  @media (min-width: 1024px) {
    display: block;
    margin-left: auto;
    width: 520px;
    height: 520px;
    border-radius: 9px;
    box-shadow: ${({ theme }) => theme.boxShadow};
  }
`

export const Wrapper = styled.div`
  position: relative;
  @media (min-width: 1024px) {
    margin: 0 auto;
    max-width: 1024px;
    display: flex;
  }
`

export const FormHeaderWrapper = styled.div`
  /* margin-bottom: 46px; */
`

export const ContentWrapper = styled.div`
  @media (min-width: 1024px) {
    width: 100%;
    padding-right: 64px;
  }
`

export const ViewInfoHeading = styled.h2`
  margin-bottom: 10px;
  text-transform: uppercase;
  font-size: 14px;
  font-weight: 600;
  color: ${({ theme }) => theme.primaryMedium};
`

export const Title = styled.h1`
  font-size: 28px;

  color: ${({ theme }) => theme.primary};
`

export const Subtitle = styled.h3`
  font-size: 18px;
  margin-bottom: 12px;
`

export const Accent = styled.span`
  color: ${({ theme }) => theme.secondary};
`
export const AuthActionContainer = styled.div`
  span {
    font-size: 14px;
    color: ${({ theme }) => theme.primaryMedium};
    font-weight: 500;
    margin-right: 3px;
  }
`

export const AuthError = styled.div<AuthErrorProps>`
  border-radius: 9px;
  background-color: ${({ theme }) => theme.errorBackgroundColor};
  padding: 9px 12px;
  margin: 9px 0px;
  opacity: ${({ $isVisible }) => ($isVisible ? 1 : 0)};

  transition: 0.3s;

  p {
    font-size: 14px;
    color: ${({ theme }) => theme.errorColor};
  }
`
