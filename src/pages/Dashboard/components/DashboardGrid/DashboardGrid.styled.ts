import styled from "styled-components"

import { Breakpoints } from "@enums/breakpoints.enum"

export const Wrapper = styled.div`
  height: 100%;
  display: grid;
  grid-template-columns: 1fr;

  grid-gap: 12px;
  padding: 12px;

  @media ${Breakpoints.SMALL} {
    grid-template-columns: 40% 1fr;
    grid-template-rows: 140px 280px 1fr;
  }
`
