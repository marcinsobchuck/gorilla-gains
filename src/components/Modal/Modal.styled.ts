import styled from "styled-components"

import { Icon } from "@components/Icon/Icon"
import { Breakpoints } from "@enums/breakpoints.enum"
import { ZIndex } from "@enums/zIndex.enum"

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
`
export const ModalWrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 24px;
  border-radius: 9px;
  background-color: ${({ theme }) => theme.backgroundColor};
  box-shadow: ${({ theme }) => theme.popperBoxShadow};
  @media ${Breakpoints.SMALL} {
    height: 90vh;

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

  margin-bottom: 32px;
`

export const Heading = styled.h1`
  font-size: 24px;
  font-weight: 600;
  color: ${({ theme }) => theme.primary};
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
