import styled from "styled-components"

import { FlexContainer } from "@components/FlexContainer/FlexContainer.styled"
import { ActivityCard } from "@layouts/RootLayout/components/AddActivityForm/components/ActivityCard/ActivityCard"

export const StyledActivityCard = styled(ActivityCard)`
  margin: 0;
`

export const LastActivityWrapper = styled(FlexContainer)`
  h2 {
    font-size: 14px;
    font-weight: 500;
    color: ${({ theme }) => theme.primaryDisabled};
    padding-left: 24px;
    margin-bottom: 3px;
  }
`

export const CardsWrapper = styled(FlexContainer)`
  flex-grow: 1;
`
