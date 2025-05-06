import styled, { keyframes } from "styled-components"
import { DefaultTheme } from "styled-components/dist/types"

import { Button } from "@components/Button/Button"
import { FlexContainer } from "@components/FlexContainer/FlexContainer.styled"

interface WrapperProps {
  $isActive?: boolean
  $isLoading?: boolean
  $buttonState: boolean | "planned"
}

interface ButtonsWrapperProps {
  $status: boolean
  $isHovering: boolean
  $isLoading?: boolean
}

const breatheAnimation = (color: string) => keyframes`
  0%     {background-color: transparent;}
  50%    {background-color: ${color};}
  100%   {background-color: transparent;}
`

export const StatusButton = styled(Button)`
  height: 50%;
  justify-content: center;
  align-items: center;
  border-radius: 0;
  background-color: transparent;

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
  transform: ${({ $status }) => ($status ? "translateY(-50%)" : "translateY(0%)")};

  animation: ${({ theme, $isLoading }) => $isLoading && breatheAnimation(theme.secondaryOpacity)};
  animation-duration: 1.3s;
  animation-iteration-count: infinite;

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

const getWrapperBackgroundColor = (theme: DefaultTheme, buttonState: boolean | "planned") => {
  if (buttonState === "planned") {
    return theme.plannedBackgroundGradient
  } else if (buttonState) {
    return theme.backgroundGradient
  } else {
    return theme.notDoneGradient
  }
}

export const Wrapper = styled(FlexContainer)<WrapperProps>`
  position: relative;
  padding-left: 24px;
  overflow: hidden;

  background: ${({ theme, $isActive, $buttonState }) =>
    $isActive ? theme.activeBackgroundColor : getWrapperBackgroundColor(theme, $buttonState)};
  border-radius: 9px;
  border-bottom: 2px solid
    ${({ $isActive, theme }) => ($isActive ? theme.secondary : "transparent")};
  height: 60px;
  box-shadow: ${({ theme }) => theme.boxShadow};
  pointer-events: ${({ $isLoading }) => ($isLoading ? "none" : "auto")};
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

export const IconTextContainer = styled(FlexContainer)`
  overflow: hidden;
`

export const ActivityName = styled.p`
  font-size: 14px;
  font-weight: 500;
  text-transform: capitalize;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`

export const PlannedIdicator = styled(FlexContainer)`
  min-width: 60px;
  font-weight: 700;
  font-size: 20px;
  color: ${({ theme }) => theme.plannedColor};
`

export const StackedCard = styled.div`
  position: absolute;
  z-index: -1;
  top: -5px;
  left: 6px;
  width: 100%;
  height: 60px;
  background-image: ${({ theme }) => theme.notDoneGradient};
  border-radius: 9px;
  box-shadow: ${({ theme }) => theme.stackedCardBoxShadow};

  &:nth-of-type(2) {
    z-index: -2;
    left: 12px;
    top: -11px;
  }
`
