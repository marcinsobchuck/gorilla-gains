import { Outlet } from "react-router-dom"
import styled from "styled-components"

import { Switch } from "../components/Switch/Switch.tsx"

const Wrapper = styled.div`
  background-color: ${({ theme }) => theme.backgroundColor};
  height: 100vh;
  transition: all 0.3s;
`

export const RootLayout = () => {
  return (
    <>
      <Wrapper>
        <Switch />
        <div>Root layout</div>
        <Outlet />
      </Wrapper>
    </>
  )
}
