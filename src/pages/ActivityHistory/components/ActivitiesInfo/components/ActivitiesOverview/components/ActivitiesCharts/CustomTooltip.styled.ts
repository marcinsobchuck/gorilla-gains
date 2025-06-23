import styled from "styled-components"

import { FlexContainer } from "@components/FlexContainer/FlexContainer.styled"

export const TooltipWrapper = styled(FlexContainer)`
  width: 240px;
  min-height: 120px;
  padding: 12px;
  border-radius: 9px;
  box-shadow: ${({ theme }) => theme.popperBoxShadow};
  background-color: ${({ theme }) => theme.navBackgroundColor};
`

export const ValuesWrapper = styled(FlexContainer)`
  padding: 6px;
`

export const ValueDescriptor = styled.p`
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.primaryMedium};
`

export const ValueText = styled.p`
  font-size: 24px;
  color: ${({ theme }) => theme.primary};

  span {
    font-size: 14px;
    margin-left: 2px;
    color: ${({ theme }) => theme.secondary};
  }
`

export const DateWrapper = styled(FlexContainer)`
  padding: 9px;
  border-radius: 6px;
  background-color: ${({ theme }) => theme.backgroundColor};
  font-size: 12px;
  margin-top: 18px;

  p {
    color: ${({ theme }) => theme.primary};
    font-weight: 500;
  }

  span {
    display: block;
    color: ${({ theme }) => theme.primaryMedium};
  }
`
