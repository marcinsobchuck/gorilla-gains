import styled from "styled-components"

export const ThemedButton = styled.button`
  position: absolute;
  right: 24px;
  top: 24px;
  padding: 12px 24px;
  color: ${({ theme }) => theme.button.color};
  background-color: ${({ theme }) => theme.button.backgroundColor};
  border: 2px solid ${({ theme }) => theme.button.borderColor};
  border-radius: 9px;
`
