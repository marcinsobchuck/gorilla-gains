import styled from "styled-components"

import { Button } from "@components/Button/Button"
import { FlexContainer } from "@components/FlexContainer/FlexContainer.styled"
import { HumanSilhouette } from "@components/HumanSilhouette/HumanSilhouette"
import { Breakpoints } from "@enums/breakpoints.enum"

export const InfoItemWrapper = styled.div`
  height: 100%;
  background-color: ${({ theme }) => theme.navBackgroundColor};
  overflow: auto;
  box-shadow: ${({ theme }) => theme.boxShadow};

  -ms-overflow-style: none; /* Internet Explorer 10+ */
  scrollbar-width: none; /* Firefox */

  &::-webkit-scrollbar {
    display: none; /* Safari and Chrome */
  }

  @media ${Breakpoints.MEDIUM} {
    border-radius: 9px;

    &::-webkit-scrollbar {
      width: 18px;
    }
    &::-webkit-scrollbar-track {
      background: ${({ theme }) => theme.navBackgroundColor};
    }
    &::-webkit-scrollbar-thumb {
      border-radius: 9px;
      border: ${({ theme }) => `6px solid ${theme.backgroundColor}`};
      background-clip: content-box;
      background: ${({ theme }) => theme.secondary};
    }
    &::-webkit-scrollbar-thumb:hover {
      background: ${({ theme }) => theme.secondaryActive};
    }
  }
`

export const HeadingWrapper = styled(FlexContainer)`
  padding: 9px 24px 24px 24px;

  flex-direction: column;
  align-items: flex-start;

  @media ${Breakpoints.SMALL} {
    flex-direction: row;
  }
`

export const FavouritesButtonWrapper = styled(FlexContainer)`
  align-self: flex-end;
`

export const BackButton = styled(Button)`
  margin-top: 9px;
  margin-left: 24px;
`

export const StyledSection = styled.section`
  padding: 24px;
  &:nth-of-type(odd) {
    background-color: ${({ theme }) => theme.backgroundColor};
  }

  h3 {
    font-size: 18px;
    font-weight: 600;
    margin-bottom: 12px;
  }

  p {
    text-align: left;
    font-size: 14px;
    max-width: 840px;
  }
`

export const MusclesGroupWrapper = styled.div`
  margin-bottom: 12px;
`

export const PrimaryMusclesText = styled.p`
  color: ${({ theme }) => theme.primaryMusclesColorText};
  font-weight: 500;
`
export const SecondaryMusclesText = styled.p`
  color: ${({ theme }) => theme.secondaryMusclesColorText};
  font-weight: 500;
`

export const FavouriteExerciseInfo = styled.p`
  font-size: 11px;
  color: ${({ theme }) => theme.primaryMedium};
  max-width: 180px;
`

export const StyledHumanSilhouette = styled(HumanSilhouette)`
  width: 280px;
  height: 280px;
`
