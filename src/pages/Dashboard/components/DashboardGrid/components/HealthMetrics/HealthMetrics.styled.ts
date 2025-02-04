import styled from "styled-components"

import { FlexContainer } from "@components/FlexContainer/FlexContainer.styled"

export const Wrapper = styled(FlexContainer)`
  gap: 12px;
`

export const NoDataWrapper = styled(FlexContainer)`
  background-color: ${({ theme }) => theme.navBackgroundColor};
  border-radius: 9px;

  p {
    font-size: 14px;
    font-weight: 500;
    color: ${({ theme }) => theme.primaryDisabled};
    text-align: center;
  }
`
