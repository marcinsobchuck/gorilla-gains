import styled from "styled-components"

import { FlexContainer } from "@components/FlexContainer/FlexContainer.styled"

export const Wrapper = styled.div`
  background: ${({ theme }) => theme.secondaryOpacity};
  height: 100%;
  border-radius: 12px;
  padding: 12px;
  padding-top: 36px;
  box-shadow: ${({ theme }) => theme.elevationBoxShadow};
`

export const DayIndicator = styled(FlexContainer)``

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
