import styled from "styled-components"

import { FlexContainer } from "@components/FlexContainer/FlexContainer.styled"

export const Wrapper = styled.div`
  border-radius: 9px;
  padding: 18px;
`
export const UserInfoSection = styled.section`
  &:not(:last-of-type) {
    margin-bottom: 12px;
  }
`

export const UserInfoTitle = styled.p`
  font-size: 18px;
  font-weight: 600;
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
