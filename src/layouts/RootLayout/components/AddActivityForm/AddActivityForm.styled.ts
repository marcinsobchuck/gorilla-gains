import styled from "styled-components"

import { Button } from "@components/Button/Button"
import { Icon } from "@components/Icon/Icon"
import { Input } from "@components/Input/Input"
import { SelectAsync } from "@components/SelectAsync/SelectAsync"
import { Breakpoints } from "@enums/breakpoints.enum"

export const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
`

export const FieldsWrapper = styled.div`
  margin-bottom: 36px;
`

export const StyledSelect = styled(SelectAsync)`
  margin-bottom: 24px;
`

export const StyledRemoveIcon = styled(Icon)`
  fill: ${({ theme }) => theme.secondary};
  cursor: pointer;
`

export const AddExerciseButton = styled(Button)`
  padding: 0;
  scroll-margin-bottom: 60px;
  margin: 24px auto 24px auto;

  svg {
    width: 56px;
    height: 56px;
    fill: ${({ theme }) => theme.backgroundColor};
  }
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

export const ExerciseWrapper = styled.div`
  background-color: ${({ theme }) => theme.inputBackgroundColor};
  margin-bottom: 12px;
  border-radius: 9px;
  padding: 12px;

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

export const SetsText = styled.p`
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.primaryMedium};
  padding-bottom: 6px;
  padding-left: 12px;
  margin-bottom: 24px;
  border-bottom: 1px solid ${({ theme }) => theme.primaryDisabled};
`

export const SetWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;

  &:last-of-type {
    margin-bottom: 24px;
  }
`

export const SetIndex = styled.div`
  min-width: 12px;
  font-size: 14px;
  font-weight: 300;
  color: ${({ theme }) => theme.primaryMedium};
`

export const NestedInput = styled(Input)`
  width: 40%;
`

export const X = styled.span`
  font-size: 12px;
  color: ${({ theme }) => theme.primaryDisabled};
`

export const SubmitButton = styled(Button)`
  align-self: center;
`
