import styled from "styled-components"

import { RadioButtonGroup } from "@components/RadioButtonGroup/RadioButtonGroup"
import { Breakpoints } from "@enums/breakpoints.enum"

interface WrapperProps {
  $shouldDisplay: boolean
}

export const Wrapper = styled.div<WrapperProps>`
  margin-top: 24px;
  background-color: ${({ theme }) => theme.backgroundColor};
  padding: 18px 12px;
  border-radius: 9px;

  display: ${({ $shouldDisplay }) => ($shouldDisplay ? "block" : "none")};

  @media ${Breakpoints.MEDIUM} {
    padding: 0;
    display: block;
    background-color: transparent;
  }
`

export const StyledRadioButtonGroup = styled(RadioButtonGroup)`
  max-height: 320px;
  background-color: transparent;
  padding: 0;
  padding-left: 10px;
  overflow: auto;

  &::-webkit-scrollbar {
    width: 18px;
  }
  &::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.navBackgroundColor};
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 9px;
    border: ${({ theme }) => `6px solid ${theme.backgroundColor}`};
    background-clip: content-box;
    background: ${({ theme }) => theme.secondary};
  }
  &::-webkit-scrollbar-thumb:hover {
    background: ${({ theme }) => theme.secondaryActive};
  }
`
