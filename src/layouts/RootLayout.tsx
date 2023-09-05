import { Outlet } from "react-router-dom"
import styled from "styled-components"

const Wrapper = styled.div`
  background-color: ${({ theme }) => theme.backgroundColor};
  transition: all 0.3s;
`

export const RootLayout = () => {
  return (
    <>
      <Wrapper>
        <div>Root layout</div>

        <Outlet />
      </Wrapper>
    </>
  )
}
