import styled from "styled-components"

import { FlexContainer } from "@components/FlexContainer/FlexContainer.styled"

interface LastActivityCardProps {
  $bgColor: string
}

export const LastActivityCard = styled(FlexContainer)<LastActivityCardProps>`
  padding: 14px;
  border-radius: 9px;
  flex-grow: 1;
  background-image: ${({ theme, $bgColor }) => ($bgColor ? $bgColor : theme.backgroundGradient)};
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
  overflow: hidden;
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
