import styled from "styled-components"

import { RadioButtonGroup } from "@components/RadioButtonGroup/RadioButtonGroup"

export const Wrapper = styled.div`
  margin-top: 24px;
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
