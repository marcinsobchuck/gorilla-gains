import styled from "styled-components"

import { FlexContainer } from "@components/FlexContainer/FlexContainer.styled"

import { BasicCard } from "../BasicCard/BasicCard"

export const ActivitiesStatisticsWrapper = styled(FlexContainer)`
  background-color: ${({ theme }) => theme.navBackgroundColor};
  border-radius: 9px;
`

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

export const MessageText = styled.p`
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.primaryDisabled};
  text-align: center;
`
