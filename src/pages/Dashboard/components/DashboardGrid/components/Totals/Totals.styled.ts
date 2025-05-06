import styled from "styled-components"

import { FlexContainer } from "@components/FlexContainer/FlexContainer.styled"
import { Breakpoints } from "@enums/breakpoints.enum"

import { BasicCard } from "../BasicCard/BasicCard"

export const Wrapper = styled(FlexContainer)`
  flex-wrap: wrap;

  @media ${Breakpoints.MEDIUM} {
    flex-wrap: nowrap;
  }
`

export const TotalsWrapper = styled(FlexContainer)`
  padding: 16px 36px 16px 24px;
  border-radius: 9px;
  width: 100%;
  background-color: ${({ theme }) => theme.navBackgroundColor};
  box-shadow: ${({ theme }) => theme.elevationBoxShadow};
  gap: 12px;

  @media ${Breakpoints.MEDIUM} {
    gap: 0;
  }

  @media ${Breakpoints.LARGE_XXL} {
    justify-content: space-around;
  }
`

export const StyledBasicCard = styled(BasicCard)`
  width: 100%;

  @media ${Breakpoints.MEDIUM} {
    padding: 0 24px;
    width: 25%;
  }
`
