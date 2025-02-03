import styled from "styled-components"

import { FlexContainer } from "@components/FlexContainer/FlexContainer.styled"
import { Icon } from "@components/Icon/Icon"
import { ModalOverlay } from "@components/Modal/Modal.styled"
import { Breakpoints } from "@enums/breakpoints.enum"

interface WrapperProps {
  $bgGradient: string
}

export const Wrapper = styled(FlexContainer)<WrapperProps>`
  position: relative;
  cursor: pointer;

  margin-bottom: 24px;
  padding: 14px 22px 22px;
  border-radius: 16px;
  background: ${({ theme, $bgGradient }) => ($bgGradient ? $bgGradient : theme.backgroundGradient)};
  background-origin: border-box;
  border-bottom: 3px solid transparent;
  box-shadow: ${({ theme }) => theme.boxShadow};
  transition: all 0.2s ease-out;

  will-change: transform;

  @media ${Breakpoints.SMALL} {
    padding: 18px 32px;
  }

  &:hover {
    transform: scale(1.01);
    border-bottom: 3px solid ${({ theme }) => theme.secondary};
  }
`

export const HeaderWrapper = styled(FlexContainer)`
  margin-bottom: 6px;
`
export const Heading = styled.h3`
  font-size: 14px;
  font-weight: 600;
`
export const StyledInteractiveIcon = styled(Icon)`
  cursor: pointer;
  padding: 6px;
  fill: ${({ theme }) => theme.primaryMedium};
  border-radius: 9px;
  transition: all 0.3s;

  &:hover {
    background-color: ${({ theme }) => theme.secondaryOpacity};
  }
`

export const ExertionRatingContainer = styled(FlexContainer)`
  align-self: flex-end;

  @media ${Breakpoints.SMALL} {
    svg {
      width: 28px;
      height: 28px;
    }
  }
`

export const PopoverOptions = styled.div`
  background-color: ${({ theme }) => theme.popoverBackgroundColor};
  border-radius: 9px;
  overflow: hidden;
`
export const PopoverOption = styled.div`
  cursor: pointer;
  color: ${({ theme }) => theme.primary};
  font-size: 14px;
  font-weight: 600;
  padding: 12px 12px;

  &:not(:last-of-type) {
    border-bottom: 1px solid ${({ theme }) => theme.selectBackgroundColor};
  }

  &:hover {
    background-color: ${({ theme }) => theme.secondaryOpacity};
  }
`

export const LoaderOverlay = styled(ModalOverlay)`
  z-index: 8;
  border-radius: 16px;
`
