import styled from "styled-components"

import { Breakpoints } from "@enums/breakpoints.enum"
import { Sidebar } from "@layouts/RootLayout/RootLayout.styled"

export const StyledSidebar = styled(Sidebar)`
  padding: 9px 9px 24px;

  @media ${Breakpoints.MEDIUM} {
    padding: 12px;
  }
`
