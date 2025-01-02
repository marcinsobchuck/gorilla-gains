import styled from "styled-components"

import { Breakpoints } from "@enums/breakpoints.enum"

export const Wrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  margin: 0 auto;
  width: 320px;

  p {
    text-align: center;

    span {
      color: ${({ theme }) => theme.secondary};
    }
  }

  @media ${Breakpoints.SMALL} {
    width: 420px;
  }
`

export const FormTitle = styled.h1`
  font-size: 22px;
  text-align: center;
  margin-bottom: 24px;
`
