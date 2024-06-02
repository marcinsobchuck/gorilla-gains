import styled from "styled-components"

import { FlexContainer } from "@components/FlexContainer/FlexContainer.styled"

interface FilterTabProps {
  $isActive: boolean
}

export const Wrapper = styled(FlexContainer)`
  background-color: ${({ theme }) => theme.navBackgroundColor};
  box-shadow: ${({ theme }) => theme.elevationBoxShadow};
  height: 60px;
  width: 100%;
`

export const FilterTab = styled(FlexContainer)<FilterTabProps>`
  cursor: pointer;
  padding: 0 18px;
  height: 100%;
  border-bottom: 3px solid
    ${({ theme, $isActive }) => ($isActive ? theme.secondary : "transparent")};
  transition: all 0.2s;

  p {
    font-size: 14px;
    font-weight: 500;
    color: ${({ theme }) => theme.primary};
  }

  &:hover {
    border-bottom: 3px solid ${({ theme }) => theme.secondary};
    color: ${({ theme }) => theme.secondary};
  }
`

export const SkeletonWrapper = styled.div`
  flex: 1;
`
