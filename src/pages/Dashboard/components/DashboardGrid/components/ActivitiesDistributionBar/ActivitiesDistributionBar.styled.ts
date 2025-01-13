import styled from "styled-components"

import { FlexContainer } from "@components/FlexContainer/FlexContainer.styled"

interface ActivityTypeBarProps {
  $width: number
  $left: number
  $color: string
}

interface ActivityTypeTextProps {
  $secondaryColor?: string
}

export const ActivitiesDistributionWrapper = styled(FlexContainer)`
  grid-column: 1 / 3;
`

export const HeadingWrapper = styled(FlexContainer)`
  margin-bottom: 6px;
  padding: 0 6px;

  p {
    color: ${({ theme }) => theme.primaryDisabled};
    font-weight: 500;
    font-size: 14px;
  }

  span {
    margin-left: 6px;
    color: ${({ theme }) => theme.secondaryText};
  }
`

export const BarWrapper = styled.div`
  overflow: hidden;
  position: relative;
  height: 100%;
  width: 100%;
  background-color: ${({ theme }) => theme.secondaryOpacity};
  border-radius: 9px;
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
