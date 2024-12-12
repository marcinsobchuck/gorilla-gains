import svg from "react-inlinesvg"
import styled, { css } from "styled-components"

import { LoaderSpinner } from "@components/LoaderSpinner/LoaderSpinner"

interface InputWrapperProps {
  $shouldTransition?: boolean
  $withError?: boolean
  $isDisabled?: boolean
}

interface InputStatusIconProps {
  $isVisible: boolean
  $isValid: boolean
}

export const InputWrapper = styled.div<InputWrapperProps>`
  position: relative;
  margin-bottom: ${({ $withError = true }) => $withError && "28px"};
  opacity: ${({ $isDisabled }) => $isDisabled && "0.3"};
  transition: opacity 0.3s ease-in-out;

  ${({ $shouldTransition }) =>
    $shouldTransition &&
    css`
      label {
        top: 6px;
        font-size: 12px;
        color: ${({ theme }) => theme.primaryDisabled};
      }
    `}

  input:focus + label {
    top: 6px;
    font-size: 12px;
    color: ${({ theme }) => theme.primaryDisabled};
  }
`

export const StyledInput = styled.input`
  font-weight: 500;
  height: 64px;
  padding: 24px 24px 12px 24px;
  width: 100%;
  border: 2px solid transparent;
  border-radius: 9px;
  background-color: ${({ theme }) => theme.inputBackgroundColor};
  outline: ${({ theme }) => theme.secondaryOpacity};
  transition: all 0.3s;

  transition-delay: 0.1s;

  &:focus {
    border-color: ${({ theme }) => theme.secondary};
    box-shadow: 0px 0px 0px 4px ${({ theme }) => theme.secondaryOpacity};
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

export const StyledLabel = styled.label`
  font-size: 14px;
  font-weight: 500;
  text-transform: uppercase;
  color: ${({ theme }) => theme.primaryMedium};
  transition: all 0.3s;
  position: absolute;
  left: 26px;
  top: 23px;
  transition: all 0.2s ease-out;
`

export const UnitSymbol = styled.div`
  position: absolute;
  right: 24px;
  bottom: 8px;
  transform: translateY(-50%);
  color: ${({ theme }) => theme.primary};
  font-weight: 500;
  font-size: 14px;
`

export const InputStatusIcon = styled(svg)<InputStatusIconProps>`
  position: absolute;
  right: 24px;
  top: 23px;
  fill: ${({ $isValid, theme }) => ($isValid ? theme.successColor : theme.errorColor)};
  opacity: ${({ $isVisible }) => ($isVisible ? 1 : 0)};
  width: 24px;
  height: 24px;
`

export const ValidationSpinner = styled(LoaderSpinner)`
  position: absolute;
  right: 24px;
  top: 23px;
`
