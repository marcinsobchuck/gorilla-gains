import styled from "styled-components"

import { Button } from "@components/Button/Button"
import { FlexContainer } from "@components/FlexContainer/FlexContainer.styled"

interface WrapperProps {
  $isOpen: boolean
}

export const Wrapper = styled.div<WrapperProps>`
  position: absolute;
  z-index: 1;
  right: 0;
  top: 0;
  height: 100%;
  width: 100%;
  padding: 24px;
  transition: 0.3s ease-in-out;
  transform: ${({ $isOpen }) => ($isOpen ? "translateX(0)" : "translateX(100%)")};
  background-color: ${({ theme }) => theme.navBackgroundColor};
  box-shadow: ${({ theme }) => theme.elevationBoxShadow};
  overflow: auto;

  &::-webkit-scrollbar {
    width: 18px;
  }
  &::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.navBackgroundColor};
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 9px;
    border: ${({ theme }) => `6px solid ${theme.backgroundColor}`};
    background-clip: content-box;
    background: ${({ theme }) => theme.secondary};
  }
  &::-webkit-scrollbar-thumb:hover {
    background: ${({ theme }) => theme.secondaryActive};
  }
`

export const ButtonsWrapper = styled(FlexContainer)`
  margin-bottom: 9px;
`

export const StyledButton = styled(Button)`
  margin-bottom: 6px;

  svg {
    fill: ${({ theme }) => theme.secondary};
    cursor: pointer;
  }
`
