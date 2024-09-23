import styled from "styled-components"

import { Button } from "@components/Button/Button"
import { FlexContainer } from "@components/FlexContainer/FlexContainer.styled"

export const Wrapper = styled.div`
  background: ${({ theme }) => theme.secondaryOpacity};
  height: 100%;
  border-radius: 12px;
  padding: 24px;
  padding-top: 36px;
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

export const DayIndicator = styled(FlexContainer)`
  margin-bottom: 54px;
`

export const DayNumber = styled.p`
  font-size: 96px;
  line-height: 76px;
  font-weight: 700;
  color: ${({ theme }) => theme.primaryMedium};
`

export const DayName = styled.p`
  font-size: 20px;
  font-weight: 600;
  text-transform: uppercase;
  color: ${({ theme }) => theme.primaryMedium};
`

export const MonthName = styled.p`
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.primaryMedium};
`

export const EventsLits = styled.div`
  margin-bottom: 24px;
`

export const ListTitle = styled.p`
  font-size: 14px;
  font-weight: 600;
  padding-bottom: 16px;
`
export const ActivityEventCard = styled(FlexContainer)<{ $isActive: boolean }>`
  padding: 12px 24px;
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
export const StyledButton = styled(Button)`
  width: 100%;
  svg {
    fill: ${({ theme }) => theme.primaryMedium};
  }
`
