import styled from "styled-components"

import { Button } from "@components/Button/Button"
import { FlexContainer } from "@components/FlexContainer/FlexContainer.styled"
import { Breakpoints } from "@enums/breakpoints.enum"

export const Wrapper = styled.div`
  background: ${({ theme }) => theme.secondaryOpacity};
  height: 100%;
  border-bottom-right-radius: 18px;
  border-bottom-left-radius: 18px;
  padding: 24px;
  padding-top: 36px;
  box-shadow: ${({ theme }) => theme.elevationBoxShadow};

  overflow: auto;

  @media ${Breakpoints.MEDIUM} {
    border-radius: 12px;
  }

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
export const StyledButton = styled(Button)`
  width: 100%;
  font-size: 12px;
  svg {
    fill: ${({ theme }) => theme.primaryMedium};
  }
`
