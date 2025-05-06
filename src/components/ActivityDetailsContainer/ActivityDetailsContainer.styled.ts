import styled from "styled-components"

import { Button } from "@components/Button/Button"
import { FlexContainer } from "@components/FlexContainer/FlexContainer.styled"
import { Breakpoints } from "@enums/breakpoints.enum"

interface WrapperProps {
  $isOpen: boolean
}

export const Wrapper = styled.div<WrapperProps>`
  position: fixed;
  top: var(--header-height);
  z-index: 11;
  padding: 24px 14px;
  height: calc(100vh - var(--header-height));
  width: 100%;
  transition: 0.3s ease-in-out;
  transform: ${({ $isOpen }) => ($isOpen ? "translateX(0)" : "translateX(100%)")};
  background-color: ${({ theme }) => theme.navBackgroundColor};
  box-shadow: ${({ theme }) => theme.elevationBoxShadow};
  overflow: auto;

  -ms-overflow-style: none; /* Internet Explorer 10+ */
  scrollbar-width: none; /* Firefox */

  &::-webkit-scrollbar {
    display: none; /* Safari and Chrome */
  }

  @media ${Breakpoints.MEDIUM} {
    position: absolute;
    right: 0;
    top: 0;
    height: 100%;
    flex-grow: 0;
    width: calc(100% - var(--sidebar-width-m) - var(--menu-width-m));
    padding: 24px;

    -ms-overflow-style: auto;
    scrollbar-width: auto;

    &::-webkit-scrollbar {
      width: 18px;
      display: block;
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
  }
  @media ${Breakpoints.LARGE} {
    width: calc(100% - var(--sidebar-width-l) - var(--menu-width-l));
  }
`

export const ButtonsWrapper = styled(FlexContainer)`
  margin-bottom: 16px;
`

export const StyledButton = styled(Button)`
  margin-bottom: 6px;

  svg {
    fill: ${({ theme }) => theme.secondary};
    cursor: pointer;
  }
`
export const MoreOptionsAnchor = styled(FlexContainer)`
  padding-right: 6px;
  position: relative;
`

export const MoreText = styled.p`
  position: absolute;
  bottom: -6px;
  font-size: 12px;
`
