import styled from "styled-components"

import { ActivityEventCard } from "@components/ActivityEventCard/ActivityEventCard"
import { Button } from "@components/Button/Button"
import { FlexContainer } from "@components/FlexContainer/FlexContainer.styled"
import { Breakpoints } from "@enums/breakpoints.enum"

export const Wrapper = styled(FlexContainer)`
  height: 100%;
  border-radius: 9px;
`
export const UserInfoSection = styled.section`
  margin-bottom: 12px;
  padding: 26px 18px;
  border-radius: 9px;
  background-color: ${({ theme }) => theme.backgroundColor};

  @media ${Breakpoints.MEDIUM} {
    pading: 18px;
  }
`

export const UserInfoTitle = styled.p`
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 24px;

  @media ${Breakpoints.MEDIUM} {
    margin-bottom: 0;
  }
`
export const UserInfoItems = styled.div`
  margin-top: 9px;
`

export const GoalsWrapper = styled(FlexContainer)`
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 9px;
`

export const GoalTile = styled.div`
  background: ${({ theme }) => theme.secondaryOpacity};
  text-align: center;
  border-radius: 9px;
  font-size: 12px;
  font-weight: 500;
  padding: 9px;
`

export const ManageButton = styled(Button)`
  align-self: center;
`

export const StyledEventCard = styled(ActivityEventCard)`
  pointer-events: none;
  overflow: visible;
`

export const CardStackingContext = styled(FlexContainer)`
  position: relative;
  z-index: 0;
`
