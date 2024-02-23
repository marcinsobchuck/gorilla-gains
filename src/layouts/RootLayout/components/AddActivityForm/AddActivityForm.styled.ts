import styled from "styled-components"

import { Button } from "@components/Button/Button"
import { Checkbox } from "@components/Checkbox/Checkbox"
import { FlexContainer } from "@components/FlexContainer/FlexContainer.styled"
import { Icon } from "@components/Icon/Icon"
import { Input } from "@components/Input/Input"
import { RadioButtonGroup } from "@components/RadioButtonGroup/RadioButtonGroup"
import { SelectAsync } from "@components/SelectAsync/SelectAsync"
import { TileInputButtonWrapper } from "@components/TileInputButton/TileInputButton.styled"
import { Breakpoints } from "@enums/breakpoints.enum"

interface CustomBreakInputProps {
  $isActive: boolean
}

export const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
`

export const FieldsWrapper = styled.div`
  margin-bottom: 36px;
`

export const StyledSelect = styled(SelectAsync)`
  position: relative;
  margin-bottom: 24px;
`

export const StyledCheckbox = styled(Checkbox)`
  margin-bottom: 36px;
`

export const StyledRemoveIcon = styled(Icon)`
  fill: ${({ theme }) => theme.secondary};
  cursor: pointer;
`

export const AddExerciseWrapper = styled(FlexContainer)`
  position: relative;
  margin: 24px auto 36px auto;
`

export const AddExerciseButton = styled(Button)`
  position: relative;
  padding: 0;
  scroll-margin-bottom: 60px;
  margin-bottom: 12px;

  svg {
    width: 56px;
    height: 56px;
    fill: ${({ theme }) => theme.backgroundColor};
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

export const SetWrapper = styled(FlexContainer)`
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

export const OthersWrapper = styled(FlexContainer)`
  margin-bottom: 36px;
`

export const OthersInput = styled(Input)`
  width: 46%;
`

export const X = styled.span`
  font-size: 12px;
  color: ${({ theme }) => theme.primaryDisabled};
`

export const SubmitButton = styled(Button)`
  align-self: center;
`

export const InputWarning = styled(FlexContainer)`
  padding: 9px 24px;
  margin-bottom: 24px;
  border: 1px solid pink;
  background-color: ${({ theme }) => theme.errorBackgroundColor};
  border-radius: 9px;

  p {
    font-size: 14px;
    text-align: left;
  }
`

export const BreaksButton = styled(Button)`
  font-size: 12px;
  padding: 6px;
`

export const BreaksWrapper = styled(FlexContainer)`
  display: flex;
  gap: 12px;
  margin-bottom: 24px;
`

export const StyledRadioButtonGroup = styled(RadioButtonGroup)`
  background-color: transparent;
  padding: 0;
  ${TileInputButtonWrapper} {
    label {
      font-size: 12px;
      padding: 9px;
    }
  }
`

export const CustomBreakInput = styled.input<CustomBreakInputProps>`
  text-align: center;
  font-size: 12px;
  font-weight: 500;
  padding: 9px;
  width: 82px;
  background-color: ${({ $isActive, theme }) =>
    $isActive ? theme.secondaryOpacity : "transparent"};
  border: 2px solid ${({ theme }) => theme.secondary};
  border-radius: 9px;

  transition: 0.3s;

  &::placeholder {
    font-size: 12px;
    font-weight: 500;
    color: ${({ theme }) => theme.primary};
    text-align: center;
  }

  &:focus::placeholder {
    color: transparent;
  }

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }

  &[type="number"] {
    appearance: textfield;
    -moz-appearance: textfield;
  }
`
