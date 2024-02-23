import styled from "styled-components"

import { Button } from "@components/Button/Button"

export const Wrapper = styled.div`
  margin-bottom: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const CounterWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 6px;
`

export const CountInput = styled.input`
  font-size: 14px;
  font-weight: 500;
  text-align: center;
  color: ${({ theme }) => theme.primary};
  background-color: ${({ theme }) => theme.inputBackgroundColor};
  border: 0;
  border-radius: 9px;
  padding: 9px;
  width: 42px;
  height: 42px;

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }

  &[type="number"] {
    appearance: textfield;
    -moz-appearance: textfield;
  }
`

export const StyledButton = styled(Button)`
  width: 42px;
  height: 42px;
  color: ${({ theme }) => theme.secondary};
  font-size: 24px;
  justify-content: center;
`

export const StyledLabel = styled.label`
  color: ${({ theme }) => theme.primaryMedium};
  margin-bottom: 9px;
  text-transform: uppercase;
  font-size: 14px;
  font-weight: 500;
`
