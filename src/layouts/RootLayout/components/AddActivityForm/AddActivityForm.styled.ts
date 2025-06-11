import styled from "styled-components"

import { Button } from "@components/Button/Button"
import { Checkbox } from "@components/Checkbox/Checkbox"
import { FlexContainer } from "@components/FlexContainer/FlexContainer.styled"
import { LoaderSpinner } from "@components/LoaderSpinner/LoaderSpinner"
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
  position: relative;
  margin-bottom: 24px;

  .nested__control {
    background-color: ${({ theme }) => theme.nestedInputBackgroundColor};
  }
`

export const StyledCheckbox = styled(Checkbox)`
  margin-bottom: 36px;
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

export const SubmitButtonsWrapper = styled(FlexContainer)`
  position: relative;
  width: 100%;
  gap: 12px;
  padding-top: 24px;
  margin-bottom: 24px;

  border-top: 1px solid ${({ theme }) => theme.primaryDisabled};
`

export const StyledLoader = styled(LoaderSpinner)`
  position: absolute;
  bottom: -30px;
  right: calc(50% - 13px);

  @media ${Breakpoints.SMALL} {
    bottom: -36px;
    right: 0;
    left: auto;
  }
`

export const SubmitButton = styled(Button)`
  font-size: 14px;
  padding: 9px 24px;

  @media ${Breakpoints.SMALL} {
    font-size: 16px;
    padding: 16px 24px;
    flex-basis: auto;
  }
`

export const PresetsButton = styled(Button)`
  font-size: 14px;
  align-self: center;
  margin-bottom: 32px;

  @media ${Breakpoints.SMALL} {
    font-size: 16px;
  }
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
