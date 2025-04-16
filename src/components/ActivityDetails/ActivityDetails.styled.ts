import styled from "styled-components"

import { FlexContainer } from "@components/FlexContainer/FlexContainer.styled"
import { Breakpoints } from "@enums/breakpoints.enum"

export const HeadingContainer = styled(FlexContainer)`
  margin-bottom: 12px;
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
  margin-top: 16px;
  margin-bottom: 32px;
`

export const ExercisesSectionHeading = styled.h2`
  font-size: 22px;
  font-weight: 500;
  color: ${({ theme }) => theme.primaryMedium};
  padding-bottom: 12px;
  margin-bottom: 24px;
  border-bottom: 1px solid ${({ theme }) => theme.primaryDisabled};
`

export const ExerciseName = styled.h3`
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 9px;
  span {
    color: ${({ theme }) => theme.primaryMedium};
    font-size: 12px;
  }
`

export const ExercisesContainer = styled.div`
  display: grid;
  row-gap: 30px;
`

export const SetsTable = styled.table`
  background: ${({ theme }) => theme.backgroundColor};
  box-shadow: ${({ theme }) => theme.elevationBoxShadow};
  border-radius: 9px;
  border-spacing: 16px;
  table-layout: fixed;
  width: 100%;

  th,
  td {
    text-align: center;
    padding: 18px;
  }

  th {
    text-transform: uppercase;
    font-size: 12px;
    color: ${({ theme }) => theme.primaryDisabled};
  }

  td {
    font-size: 14px;
    font-weight: 500;
  }

  td:not(:first-of-type) {
    background-color: ${({ theme }) => theme.secondaryOpacity};
    border-radius: 9px;
  }

  thead tr th:first-child,
  tbody tr td:first-child {
    width: 10%;
    word-break: break-all;
  }
`
