import styled from "styled-components"

import { FlexContainer } from "@components/FlexContainer/FlexContainer.styled"
import { Breakpoints } from "@enums/breakpoints.enum"

export const TitleDateContainer = styled.div`
  margin-left: 12px;
`

export const Title = styled.h1`
  color: ${({ theme }) => theme.secondary};
  font-size: 22px;
  font-weight: 500;
`

export const ActivityDate = styled.p`
  text-align: left;
  color: ${({ theme }) => theme.primaryMedium};
  font-size: 12px;
`

export const ExertionRatingContainer = styled(FlexContainer)`
  margin-left: auto;

  @media ${Breakpoints.SMALL} {
    svg {
      width: 28px;
      height: 28px;
    }
  }
`

export const DescriptionText = styled.p`
  font-size: 12px;
  font-weight: 500;
  color: ${({ theme }) => theme.primaryDisabled};
  text-transform: uppercase;
`

export const Notes = styled.p`
  max-width: 600px;
  font-size: 14px;
  margin-top: 12px;
  margin-bottom: 12px;
`

export const ExercisesSectionHeading = styled.h2`
  font-size: 22px;
  font-weight: 500;
  color: ${({ theme }) => theme.primaryMedium};
  padding-bottom: 12px;
  margin-bottom: 24px;
  border-bottom: 1px solid ${({ theme }) => theme.borderColor};
`

export const ExerciseName = styled.h3`
  font-size: 16px;
  font-weight: 500;
  color: ${({ theme }) => theme.secondary};
  margin-bottom: 6px;
  span {
    color: ${({ theme }) => theme.primaryMedium};
    font-size: 12px;
  }
`

export const ExercisesContainer = styled(FlexContainer)`
  flex-wrap: wrap;
`

export const ExerciseContainer = styled.div`
  flex-grow: 1;
  max-width: 60%;
  margin-bottom: 24px;
  margin-right: 60px;

  @media ${Breakpoints.MEDIUM_LARGE} {
    margin-right: 90px;
  }
`

export const SetsTable = styled.table`
  border-collapse: collapse;
  width: 100%;

  th,
  td {
    text-align: left;
    padding: 9px 18px;
  }

  th {
    text-transform: uppercase;
    font-size: 14px;
    color: ${({ theme }) => theme.primaryDisabled};
  }

  td {
    font-size: 16px;
    font-weight: 500;
  }
`
