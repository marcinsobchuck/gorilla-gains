import { Outlet } from "react-router-dom"
import styled from "styled-components"

import { Logo } from "../components/Logo/Logo"
import { Switch } from "../components/Switch/Switch"

const Wrapper = styled.div`
  background-color: ${({ theme }) => theme.backgroundColor};
  min-height: 100vh;
  max-width: 1400px;
  margin: 0 auto;
  padding: 24px;
  transition: all 0.3s;
`

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 100px;
`

export const AuthLayout = () => {
  return (
    <Wrapper>
      <Header>
        <Logo />
        <Switch />
      </Header>
      <Outlet />
    </Wrapper>
  )
}
