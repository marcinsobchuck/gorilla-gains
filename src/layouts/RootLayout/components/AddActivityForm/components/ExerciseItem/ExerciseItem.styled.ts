import styled from "styled-components"

import { Button } from "@components/Button/Button"
import { Checkbox } from "@components/Checkbox/Checkbox"
import { FormError } from "@components/FormError/FormError"
import { Breakpoints } from "@enums/breakpoints.enum"

export const ExerciseWrapper = styled.div`
  background-color: ${({ theme }) => theme.inputBackgroundColor};
  margin-bottom: 12px;
  border-radius: 9px;
  padding: 12px 12px 24px 12px;

  @media ${Breakpoints.SMALL} {
    padding: 24px;
  }
`

export const ExerciseHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 16px;
  padding-bottom: 12px;
  padding-left: 12px;

  svg {
    cursor: pointer;
  }

  @media ${Breakpoints.SMALL} {
    padding-left: 0;
  }
`

export const ExerciseIndex = styled.p`
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.secondary};
`

export const SetsHeading = styled.div`
  position: relative;
  padding-bottom: 6px;
  padding-left: 12px;
  margin: 24px 0;
  border-bottom: 1px solid ${({ theme }) => theme.primaryDisabled};
`

export const SetsText = styled.p`
  position: relative;
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.primaryMedium};
`

export const AddSetButton = styled(Button)`
  display: block;
  scroll-margin-bottom: 120px;
  margin: 0 auto;

  svg {
    margin: 0;
    width: 34px;
    height: 34px;
    fill: ${({ theme }) => theme.primaryMedium};
  }
`

export const SetsError = styled(FormError)`
  left: 50px;
  bottom: 7px;
`

export const StyledCheckbox = styled(Checkbox)`
  font-size: 12px;
  max-width: initial;
`
