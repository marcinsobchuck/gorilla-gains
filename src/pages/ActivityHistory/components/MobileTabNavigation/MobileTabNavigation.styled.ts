import styled from "styled-components"

import { FlexContainer } from "@components/FlexContainer/FlexContainer.styled"

export const Wrapper = styled(FlexContainer)`
  position: fixed;
  z-index: 10;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 64px;
  background-color: ${({ theme }) => theme.mobileNav};
  box-shadow: ${({ theme }) => theme.boxShadow};
  backdrop-filter: blur(3px);
  border-top: 2px solid ${({ theme }) => theme.secondaryOpacity};

  :active {
    background-color: ${({ theme }) => theme.backgroundColor};
  }
`

export const Tab = styled(FlexContainer)<{ $isActive: boolean }>`
  flex-grow: 1;
  font-weight: 500;
  color: ${({ $isActive, theme }) => ($isActive ? theme.secondary : theme.primary)};
`
