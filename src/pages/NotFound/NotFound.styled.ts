import { styled } from "styled-components"

export const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.backgroundColor};
`

export const ContentWrapper = styled.div`
  display: flex;
  align-items: center;

  h1 {
    color: ${({ theme }) => theme.primary};
  }
`

export const NotFoundImage = styled.img`
  width: 420px;
  height: 420px;
`
