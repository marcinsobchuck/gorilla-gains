import styled from "styled-components"

import { Icon } from "@components/Icon/Icon"
import { Breakpoints } from "@enums/breakpoints.enum"
import { ZIndex } from "@enums/zIndex.enum"

interface ModalWrapperProps {
  $lockScroll: boolean
}

export const ModalOverlay = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: ${ZIndex.MODAL};
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.modalOverlayBackgroundColo};
  backdrop-filter: blur(3px);
`
export const ModalWrapper = styled.div<ModalWrapperProps>`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 12px;

  border-radius: 9px;
  background-color: ${({ theme }) => theme.backgroundColor};
  box-shadow: ${({ theme }) => theme.popperBoxShadow};
  overflow: ${({ $lockScroll }) => ($lockScroll ? "hidden" : "auto")};
  -ms-overflow-style: none; /* Internet Explorer 10+ */
  scrollbar-width: none; /* Firefox */

  &::-webkit-scrollbar {
    display: none; /* Safari and Chrome */
  }

  @media ${Breakpoints.SMALL} {
    padding: 24px;
    height: 94vh;
    width: 640px;
  }

  @media ${Breakpoints.MEDIUM} {
    width: 720px;
  }
`

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 9px;
  margin-bottom: 32px;

  @media ${Breakpoints.SMALL} {
    padding: 0px;
  }
`

export const Heading = styled.h1`
  font-size: 20px;
  font-weight: 600;
  color: ${({ theme }) => theme.primary};
  margin-bottom: 12px;

  @media ${Breakpoints.SMALL} {
    font-size: 24px;
  }
`

export const CloseIcon = styled(Icon)`
  fill: ${({ theme }) => theme.secondary};
  transition: 0.3s;
  cursor: pointer;

  &:hover {
    fill: ${({ theme }) => theme.secondaryHover};
  }
  &:active {
    fill: ${({ theme }) => theme.secondaryActive};
  }
`

export const ContentWrapper = styled.div``
