import styled from "styled-components"

import { Button } from "@components/Button/Button"
import { Counter } from "@components/Counter/Counter"
import { CounterWrapper } from "@components/Counter/Counter.styled"
import { FlexContainer } from "@components/FlexContainer/FlexContainer.styled"
import { StyledError } from "@components/FormError/FormError.styled"
import { Icon } from "@components/Icon/Icon"
import { Input } from "@components/Input/Input"
import { RadioButtonGroup } from "@components/RadioButtonGroup/RadioButtonGroup"
import { TileInputButtonWrapper } from "@components/TileInputButton/TileInputButton.styled"
import { Breakpoints } from "@enums/breakpoints.enum"

import { DurationInput } from "../DurationInput/DurationInput"
import { Wrapper } from "../DurationInput/DurationInput.styled"
interface CustomBreakInputProps {
  $isActive: boolean
}
export const SetWrapper = styled(FlexContainer)`
  position: relative;
  margin-bottom: 40px;
  padding-top: 40px;

  &:after,
  &:before {
    content: "";
    position: absolute;
    z-index: 1;
    display: block;
    left: 0px;
    bottom: 0px;
    height: 16px;
    width: 2px;
    background-color: ${({ theme }) => theme.secondary};
  }
  &:before {
    width: 16px;
    height: 2px;
  }
`

export const SetIndex = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  font-size: 20px;
  font-weight: 500;
  color: ${({ theme }) => theme.primaryDisabled};
`

export const NestedInput = styled(Input)`
  margin: 0;

  input {
    background-color: ${({ theme }) => theme.nestedInputBackgroundColor};
  }
`

export const X = styled(Icon)`
  align-self: center;
  margin: 16px 0;
  transform: scaleY(0.8);
`

export const StyledDurationInput = styled(DurationInput)`
  margin: 0;

  ${Wrapper} {
    margin: 0;
  }
`

export const Divider = styled.div`
  margin: 12px;
  width: 50%;
  height: 1px;
  background-color: ${({ theme }) => theme.primaryDisabled};
`

export const StyledRemoveIcon = styled(Icon)`
  align-self: center;
  fill: ${({ theme }) => theme.secondary};
  cursor: pointer;
`

export const StyledCounter = styled(Counter)`
  ${CounterWrapper} {
    gap: 0;

    button {
      padding: 0;
      height: 28px;
      background-color: transparent;
    }

    input {
      padding: 0;
      width: 28px;
      height: 28px;
      background-color: ${({ theme }) => theme.nestedInputBackgroundColor};
    }

    @media ${Breakpoints.SMALL} {
      gap: 6px;

      button,
      input {
        width: 42px;
        height: 42px;
      }
    }
  }
`
export const SetActions = styled(FlexContainer)`
  width: 36%;
  padding-bottom: 40px;
`

export const SetFieldsWrapper = styled(FlexContainer)`
  width: 64%;
  padding-bottom: 40px;

  border-bottom: 1px solid ${({ theme }) => theme.primaryDisabled};
`

export const BreaksButton = styled(Button)`
  font-size: 12px;
  padding: 6px;
`

export const BreaksWrapper = styled(FlexContainer)`
  gap: 9px;
  padding-top: 40px;
`

export const StyledRadioButtonGroup = styled(RadioButtonGroup)`
  background-color: transparent;
  padding: 0;
  ${TileInputButtonWrapper} {
    label {
      font-size: 12px;
      padding: 6px;
    }
  }

  ${StyledError} {
    left: calc(50% + 41px);
    width: 100%;
    transform: translateX(-50%);
  }
`

export const CustomBreakInput = styled.input<CustomBreakInputProps>`
  text-align: center;
  font-size: 12px;
  font-weight: 500;
  padding: 6px;
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
