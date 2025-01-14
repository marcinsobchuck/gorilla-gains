import styled from "styled-components"

interface StyledErrorProps {
  $isVisible: boolean
}

export const StyledError = styled.div<StyledErrorProps>`
  position: absolute;
  bottom: -18px;
  left: 24px;
  color: ${({ theme }) => theme.errorColor};
  font-weight: 500;
  font-size: 12px;
  border-radius: 9px;
  opacity: ${({ $isVisible }) => ($isVisible ? 1 : 0)};
  transition: opacity 0.3s ease-in-out;
  will-change: opacity;
  white-space: nowrap;
`
