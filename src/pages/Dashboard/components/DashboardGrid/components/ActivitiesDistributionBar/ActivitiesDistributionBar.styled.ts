import styled from "styled-components"

import { FlexContainer } from "@components/FlexContainer/FlexContainer.styled"
import { Breakpoints } from "@enums/breakpoints.enum"

interface ActivityTypeBarProps {
  $width: number
  $left: number
  $color: string
}

interface ActivityTypeTextProps {
  $secondaryColor?: string
}

export const ActivitiesDistributionWrapper = styled(FlexContainer)`
  @media ${Breakpoints.MEDIUM} {
    grid-column: 1 / 3;
  }
`

export const HeadingWrapper = styled(FlexContainer)`
  margin-bottom: 6px;
  padding: 0 6px;

  span {
    margin-left: 6px;
    color: ${({ theme }) => theme.secondaryText};
  }
`

export const HeadingText = styled.p`
  color: ${({ theme }) => theme.primaryDisabled};
  font-weight: 500;
  font-size: 14px;
`

export const BarWrapper = styled(FlexContainer)`
  overflow: hidden;
  position: relative;
  height: 42px;
  width: 100%;
  background-color: ${({ theme }) => theme.secondaryOpacity};
  border-radius: 9px;

  @media ${Breakpoints.MEDIUM} {
    height: 100%;
  }
`

export const ActivityTypeBar = styled(FlexContainer)<ActivityTypeBarProps>`
  position: absolute;
  height: 100%;
  width: ${({ $width }) => `${$width}%`};
  left: ${({ $left }) => `${$left}%`};
  background-color: ${({ $color }) => $color};
`

export const ActivityTypeText = styled.p<ActivityTypeTextProps>`
  font-size: 12px;
  color: ${({ $secondaryColor, theme }) => ($secondaryColor ? $secondaryColor : theme.primary)};
  text-transform: capitalize;
  font-weight: 600;
`
