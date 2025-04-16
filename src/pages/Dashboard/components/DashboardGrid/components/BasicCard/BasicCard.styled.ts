import styled from "styled-components"

import { FlexContainer } from "@components/FlexContainer/FlexContainer.styled"
import { Breakpoints } from "@enums/breakpoints.enum"

export const Wrapper = styled(FlexContainer)`
  background-color: ${({ theme }) => theme.navBackgroundColor};
  width: calc(50% - 6px);
  border-radius: 9px;
  box-shadow: ${({ theme }) => theme.elevationBoxShadow};
  min-height: 100px;

  @media ${Breakpoints.MEDIUM} {
    width: 25%;
    min-height: 60px;
  }
`

export const ValueText = styled.p<{ $isNegative?: boolean }>`
  font-size: 14px;
  font-weight: 600;
  color: ${({ theme, $isNegative }) => ($isNegative ? theme.errorColor : theme.secondaryText)};
  margin-bottom: 3px;
`

export const LabelText = styled.p`
  font-size: 12px;
  font-weight: 500;
  color: ${({ theme }) => theme.primaryMedium};
  margin-bottom: 3px;
`

export const TooltipContainer = styled.div`
  padding: 16px;
  width: 300px;
  background-color: ${({ theme }) => theme.popoverBackgroundColor};

  h3 {
    color: ${({ theme }) => theme.secondary};
    font-size: 16px;
    font-weight: 600;
    padding-bottom: 6px;
    margin-bottom: 24px;
    border-bottom: 1px solid ${({ theme }) => theme.primaryDisabled};
  }

  p {
    font-size: 14px;
    color: ${({ theme }) => theme.primary};
    margin-bottom: 6px;
  }

  a {
    color: ${({ theme }) => theme.secondaryDisabled};
    font-size: 12px;
  }
`
