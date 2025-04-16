import styled from "styled-components"

import { Breakpoints } from "@enums/breakpoints.enum"

export const Wrapper = styled.div`
  .skeletonWrapper {
    display: block;
    width: 100%;
    height: 100%;
  }

  height: 100%;
  display: grid;
  grid-template-columns: 1fr;
  padding: 38px 9px 9px;

  grid-gap: 14px;

  @media ${Breakpoints.MEDIUM} {
    padding: 14px;

    grid-template-columns: 40% 1fr;
    grid-template-rows: 50px 140px 160px 1fr;
  }
`

export const NoDataMessage = styled.p`
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.primaryDisabled};
  text-align: center;
`
