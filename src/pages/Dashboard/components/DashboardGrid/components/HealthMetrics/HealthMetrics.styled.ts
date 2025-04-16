import styled from "styled-components"

import { FlexContainer } from "@components/FlexContainer/FlexContainer.styled"
import { Breakpoints } from "@enums/breakpoints.enum"

export const Wrapper = styled(FlexContainer)`
  flex-wrap: wrap;

  @media ${Breakpoints.MEDIUM} {
    flex-wrap: nowrap;
  }
`

export const NoDataWrapper = styled(FlexContainer)`
  background-color: ${({ theme }) => theme.navBackgroundColor};
  border-radius: 9px;
`
