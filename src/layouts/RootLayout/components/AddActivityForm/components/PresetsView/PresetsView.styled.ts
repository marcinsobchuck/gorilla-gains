import styled from "styled-components"

import { Icon } from "@components/Icon/Icon"
import { Breakpoints } from "@enums/breakpoints.enum"

export const Wrapper = styled.div`
  padding: 18px;
  position: absolute;
  z-index: 100;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: ${({ theme }) => theme.backgroundColor};

  @media ${Breakpoints.SMALL} {
    padding: 24px;
  }
`
export const StyledIcon = styled(Icon)`
  cursor: pointer;
  margin-bottom: 24px;
`
