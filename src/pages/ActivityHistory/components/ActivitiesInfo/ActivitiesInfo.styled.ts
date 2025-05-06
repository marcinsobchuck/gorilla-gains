import styled from "styled-components"

import { FlexContainer } from "@components/FlexContainer/FlexContainer.styled"
import { Breakpoints } from "@enums/breakpoints.enum"

interface WrapperProps {
  $shouldDisplay: boolean
}

export const Wrapper = styled(FlexContainer)<WrapperProps>`
  display: ${({ $shouldDisplay }) => ($shouldDisplay ? "block" : "none")};
  position: relative;
  z-index: 10;

  @media ${Breakpoints.MEDIUM} {
    display: flex;
    min-height: auto;
    height: calc(100% - var(--activity-list-container-height));
  }
`
