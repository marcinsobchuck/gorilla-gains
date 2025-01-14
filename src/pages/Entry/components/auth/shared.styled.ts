import styled, { css, keyframes } from "styled-components"

import { Button } from "@components/Button/Button"
import { Breakpoints } from "@enums/breakpoints.enum"

export const SubmitButton = styled(Button)`
  margin: 0 auto;
  margin-top: 18px;
`

export const ForgotPasswordButton = styled(Button)`
  display: block;
  width: fit-content;
  font-weight: 500;
  margin: 16px auto;
  color: ${({ theme }) => theme.primary};

  &:hover {
    text-decoration: underline;
  }
`

export const StyledImage = styled.img`
  display: none;

  @media ${Breakpoints.MEDIUM_LARGE} {
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
  @media ${Breakpoints.MEDIUM_LARGE} {
    margin: 0 auto;
    max-width: 1024px;
    display: flex;
  }
`

export const ContentWrapper = styled.div`
  @media ${Breakpoints.MEDIUM_LARGE} {
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

export const fadeIn = (color: string) => keyframes`
  0% {opacity: 0; background-color: transparent}
  100% {opacity: 1; background-color: ${color}}
`

const sharedAuthMessageStyles = css`
  font-size: 12px;
  border-radius: 9px;
  padding: 6px 12px;
  margin: 14px 0px;
  text-align: center;

  animation-duration: 0.3s;
  animation-timing-function: ease;
  animation-fill-mode: forwards;
`

export const AuthError = styled.div`
  color: ${({ theme }) => theme.errorColor};
  animation: ${({ theme }) => fadeIn(theme.errorBackgroundColor)};
  ${sharedAuthMessageStyles};
`

export const AuthSuccess = styled.div`
  color: ${({ theme }) => theme.secondary};
  animation: ${({ theme }) => fadeIn(theme.secondaryOpacity)};
  ${sharedAuthMessageStyles};
`
