import styled from "styled-components"

import { Button } from "@components/Button/Button"
import { FlexContainer } from "@components/FlexContainer/FlexContainer.styled"

interface WrapperProps {
  $isActive: boolean
}

interface ButtonsWrapperProps {
  $status: "done" | "not-done"
  $isHovering: boolean
}

export const StatusButton = styled(Button)`
  height: 50%;
  justify-content: center;
  align-items: center;
  border-radius: 0;

  &:hover:not(:disabled):not(:active) {
    background-color: transparent;
  }
`

export const ButtonsWrapper = styled.div<ButtonsWrapperProps>`
  height: 120px;

  border-top-right-radius: 9px;
  border-bottom-right-radius: 9px;
  border-left: 2px solid transparent;
  transition: 0.1s ease-in-out;
  align-self: flex-start;
  transform: ${({ $status }) => ($status === "done" ? "translateY(-50%)" : "translateY(0%)")};

  cursor: pointer;
  transition: 0.3s ease-in-out;

  &:hover {
    background-color: ${({ theme }) => theme.secondaryOpacity};
  }

  ${StatusButton} {
    svg {
      fill: ${({ $isHovering, theme }) => $isHovering && theme.primaryDisabled};
      width: 16px;
      height: 16px;
    }
  }
`

export const Wrapper = styled(FlexContainer)<WrapperProps>`
  position: relative;
  padding-left: 24px;
  overflow: hidden;
  background: ${({ theme, $isActive }) =>
    $isActive ? theme.activeBackgroundColor : theme.backgroundGradient};
  border-radius: 9px;
  border-bottom: 2px solid
    ${({ $isActive, theme }) => ($isActive ? theme.secondary : "transparent")};
  height: 60px;
  box-shadow: ${({ theme }) => theme.elevationBoxShadow};
  transition: 0.3s ease-in-out;
  cursor: pointer;

  &:hover {
    border-bottom: 2px solid ${({ theme }) => theme.secondary};

    ${ButtonsWrapper} {
      border-left: 2px solid ${({ theme }) => theme.secondary};
    }
  }

  &:not(:last-of-type) {
    margin-bottom: 9px;
  }
`

export const ActivityName = styled.p`
  font-size: 14px;
  font-weight: 500;
  text-transform: capitalize;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`
