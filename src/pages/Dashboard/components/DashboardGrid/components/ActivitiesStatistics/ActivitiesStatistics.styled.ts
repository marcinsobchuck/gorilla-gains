import styled from "styled-components"

import { FlexContainer } from "@components/FlexContainer/FlexContainer.styled"

import { BasicCard } from "../BasicCard/BasicCard"

export const ActivitiesStatisticsWrapper = styled(FlexContainer)``

export const CardsWrapper = styled(FlexContainer)`
  flex-wrap: wrap;
  flex-grow: 1;
`

export const StyledBasicCard = styled(BasicCard)`
  padding: 6px;
  flex-grow: 1;
  &:last-of-type {
    width: 100%;
  }
`
