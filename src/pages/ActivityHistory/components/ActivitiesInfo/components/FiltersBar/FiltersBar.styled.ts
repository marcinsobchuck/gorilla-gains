import styled from "styled-components"

import { FlexContainer } from "@components/FlexContainer/FlexContainer.styled"
import { Select } from "@components/Select/Select"
import { Breakpoints } from "@enums/breakpoints.enum"

interface FilterTabProps {
  $isActive: boolean
}

export const Wrapper = styled(FlexContainer)`
  background-color: ${({ theme }) => theme.navBackgroundColor};
  box-shadow: ${({ theme }) => theme.elevationBoxShadow};
  width: 100%;

  @media ${Breakpoints.MEDIUM} {
    flex-direction: row;
  }
`

export const FilterTab = styled(FlexContainer)<FilterTabProps>`
  cursor: pointer;
  padding: 0 18px;
  height: 60px;
  flex-grow: 1;
  border-bottom: 3px solid
    ${({ theme, $isActive }) => ($isActive ? theme.secondary : "transparent")};
  transition: all 0.2s;
  background-color: ${({ theme }) => theme.backgroundColor};

  p {
    font-size: 14px;
    font-weight: 500;
    color: ${({ theme }) => theme.primary};
  }

  &:hover {
    border-bottom: 3px solid ${({ theme }) => theme.secondary};
    color: ${({ theme }) => theme.secondary};
  }

  @media ${Breakpoints.MEDIUM} {
    background-color: ${({ theme }) => theme.navBackgroundColor};
  }
`

export const SkeletonWrapper = styled.div`
  flex: 1;
`

export const StyledSelect = styled(Select)`
  margin-bottom: 0;
  width: 100%;
  cursor: pointer;
  padding: 24px 12px;

  @media ${Breakpoints.MEDIUM} {
    width: 220px;
    margin-left: auto;
    padding: 0;
  }

  div[class*="control"] {
    height: 100%;
    background-color: ${({ theme }) => theme.backgroundColor};
    font-size: 14px;
    font-weight: 500;
    border: none !important;
    box-shadow: none !important;

    @media ${Breakpoints.MEDIUM} {
      background-color: transparent;
    }
  }
`
