import styled from "styled-components"

import { FlexContainer } from "@components/FlexContainer/FlexContainer.styled"
import { Breakpoints } from "@enums/breakpoints.enum"

export const LastActivityCard = styled(FlexContainer)`
  padding: 14px;
  border-radius: 9px;
  flex-grow: 1;
  background-image: ${({ theme }) => theme.backgroundGradient};
  box-shadow: ${({ theme }) => theme.boxShadow};
  border-bottom: 2px solid transparent;

  transition: all 0.2s ease-out;
  will-change: transform;
  cursor: pointer;

  &:hover {
    transform: scale(1.01);
    border-bottom: 2px solid ${({ theme }) => theme.secondary};
  }
`

export const LastActivityWrapper = styled(FlexContainer)`
  background-color: ${({ theme }) => theme.navBackgroundColor};
  border-radius: 9px;
  box-shadow: ${({ theme }) => theme.elevationBoxShadow};
  padding: 14px;
`

export const CardHeading = styled.h2`
  text-align: center;
  color: ${({ theme }) => theme.primaryDisabled};
  font-weight: 500;
  font-size: 14px;
  margin-bottom: 9px;
`

export const ActivityTitle = styled.h3`
  font-weight: 500;
  font-size: 14px;
  color: ${({ theme }) => theme.primaryMedium};
  margin-bottom: 6px;
  text-transform: capitalize;
`

export const MainContentWrapper = styled(FlexContainer)`
  position: relative;
  flex-grow: 1;

  span {
    position: absolute;
    bottom: 0;
    right: 0;
    font-size: 12px;
    color: ${({ theme }) => theme.primaryMedium};
  }
`

export const IconWrapper = styled(FlexContainer)`
  background-color: ${({ theme }) => theme.secondaryOpacity};
  padding: 16px;
  border-radius: 9px;
  margin-right: 9px;

  svg {
    min-width: 22px;
    min-height: 22px;
  }
`

export const MainText = styled.p`
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  max-width: 124px;
  font-size: 14px;
  font-weight: 600;
  color: ${({ theme }) => theme.secondaryText};

  @media ${Breakpoints.LARGE} {
    max-width: 220px;
  }
`
