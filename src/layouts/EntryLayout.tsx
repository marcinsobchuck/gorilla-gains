import svg from "react-inlinesvg"
import { Outlet } from "react-router-dom"
import styled from "styled-components"

import github from "@assets/github.svg"
import linkedin from "@assets/linkedin.svg"
import { Logo } from "@components/Logo/Logo"
import { Switch } from "@components/Switch/Switch"
import { Breakpoints } from "@enums/breakpoints.enum"
import { Background } from "@styles/GlobalStyle"

const SocialIconsWrapper = styled.div`
  position: absolute;
  right: 24px;
  bottom: 24px;
  display: flex;
  gap: 3px;
`

const SocialIcon = styled(svg)`
  fill: ${({ theme }) => theme.primary};
  width: 28px;
  height: 28px;
  cursor: pointer;
  transition: fill 0.3s;

  &:hover {
    fill: ${({ theme }) => theme.secondary};
  }
`

const Wrapper = styled.div`
  position: relative;

  background-color: ${({ theme }) => theme.backgroundColor};
  min-height: 100vh;
  max-width: 1320px;
  margin: 0 auto;
  padding: 24px;
  transition: all 0.3s;

  &:after {
    content: "";
    position: absolute;
    z-index: 1;
    display: block;
    left: 24px;
    bottom: 24px;
    height: 22px;
    width: 3px;
    background-color: ${({ theme }) => theme.secondary};
  }
  &:before {
    content: "";
    position: absolute;
    display: block;
    left: 24px;
    bottom: 24px;
    height: 3px;
    width: 22px;
    background-color: ${({ theme }) => theme.secondary};
  }

  @media ${Breakpoints.MEDIUM_LARGE} {
    &:before,
    &:after,
    ${SocialIconsWrapper} {
      bottom: 54px;
    }
  }
`

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 86px;
`

export const EntryLayout = () => {
  return (
    <Background>
      <Wrapper>
        <Header>
          <Logo />
          <Switch />
        </Header>
        <Outlet />
        <SocialIconsWrapper>
          <SocialIcon src={linkedin} />
          <SocialIcon src={github} />
        </SocialIconsWrapper>
      </Wrapper>
    </Background>
  )
}
