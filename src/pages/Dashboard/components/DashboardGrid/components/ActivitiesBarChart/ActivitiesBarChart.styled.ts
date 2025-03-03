import styled from "styled-components"

import { FlexContainer } from "@components/FlexContainer/FlexContainer.styled"

export const Wrapper = styled(FlexContainer)`
  padding: 12px;
  background-color: ${({ theme }) => theme.navBackgroundColor};
  box-shadow: ${({ theme }) => theme.elevationBoxShadow};
  border-radius: 9px;
`

export const Title = styled.h2`
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.primaryDisabled};
  text-align: center;
  margin-bottom: 12px;
`

export const BarChartTooltipWrapper = styled(FlexContainer)`
  width: 220px;
  padding: 16px;
  border-radius: 9px;
  box-shadow: ${({ theme }) => theme.popperBoxShadow};
  background-color: ${({ theme }) => theme.navBackgroundColor};
`

export const MonthWrapper = styled(FlexContainer)`
  padding: 9px;
  border-radius: 6px;
  background-color: ${({ theme }) => theme.selectBackgroundColor};
  font-size: 12px;
  font-weight: 500;
  margin-top: 18px;
`

export const ValueItem = styled(FlexContainer)`
  font-weight: 600;
  p {
    text-transform: capitalize;
    font-size: 12px;
  }

  span {
    font-size: 12px;
    color: ${({ theme }) => theme.secondary};
  }
`
