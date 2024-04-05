import styled from "styled-components"

import { FlexContainer } from "@components/FlexContainer/FlexContainer.styled"
import { Icon } from "@components/Icon/Icon"
import { Breakpoints } from "@enums/breakpoints.enum"

export const Wrapper = styled.div`
  cursor: pointer;
  margin-top: 24px;
  padding: 14px 22px 22px;
  border-radius: 16px;
  background: linear-gradient(to right, #000000, #051201);
  background-origin: border-box;
  box-shadow: ${({ theme }) => theme.boxShadow};
  border: 2px solid transparent;
  transition: all 0.3s;

  @media ${Breakpoints.SMALL} {
    padding: 18px 32px;
  }

  &:hover {
    border-color: ${({ theme }) => theme.secondaryHover};
    box-shadow: 0px 0px 0px 4px ${({ theme }) => theme.secondaryOpacity};
  }
`

export const HeaderWrapper = styled(FlexContainer)`
  margin-bottom: 6px;
`
export const Heading = styled.h2`
  font-size: 16px;
  font-weight: 700;
  color: ${({ theme }) => theme.secondary};
`
export const StyledInteractiveIcon = styled(Icon)`
  cursor: pointer;
  padding: 6px;
  fill: ${({ theme }) => theme.secondary};
  border-radius: 9px;
  transition: all 0.3s;

  &:hover {
    background-color: ${({ theme }) => theme.secondaryOpacity};
  }
`

export const IconContainer = styled(FlexContainer)`
  min-width: 48px;
  height: 48px;
  background-color: ${({ theme }) => theme.secondaryOpacity};
  border-radius: 16px;
  @media ${Breakpoints.SMALL} {
    width: 64px;
    height: 64px;

    svg {
      width: 32px;
      height: 32px;
    }
  }
`

export const ExertionRatingContainer = styled(FlexContainer)`
  align-self: flex-end;
  margin-left: auto;

  @media ${Breakpoints.SMALL} {
    svg {
      width: 28px;
      height: 28px;
    }
  }
`

export const TextContentWrapper = styled.div`
  margin-left: 9px;
  @media ${Breakpoints.SMALL} {
    margin-left: 24px;
  }
`

export const MainText = styled.p`
  font-weight: 500;
  font-size: 14px;
  text-align: left;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  max-width: 180px;
  color: ${({ theme }) => theme.primaryMedium};
  span {
    color: ${({ theme }) => theme.secondary};
    font-size: 22px;
  }

  @media ${Breakpoints.SMALL} {
    font-size: 16px;
    max-width: none;
    text-overflow: clip;
    overflow: auto;
    white-space: normal;
  }
`

export const SecondaryText = styled.p`
  font-size: 10px;
  color: ${({ theme }) => theme.primaryDisabled};
  text-align: left;

  @media ${Breakpoints.SMALL} {
    font-size: 12px;
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
