import styled from "styled-components"

import { Breakpoints } from "@enums/breakpoints.enum"
import { MainContentWrapper, Sidebar } from "@layouts/RootLayout/RootLayout.styled"

export const StyledSidebar = styled(Sidebar)`
  padding: 24px 12px;

  @media ${Breakpoints.MEDIUM} {
    padding: 24px;
  }
`

export const StyledMainContentWrapper = styled(MainContentWrapper)`
  padding-bottom: 64px;
  @media ${Breakpoints.MEDIUM} {
    padding-bottom: 0;
  }
`
