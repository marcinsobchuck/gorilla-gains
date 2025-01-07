import styled from "styled-components"

import { FormError } from "@components/FormError/FormError"
import { Input } from "@components/Input/Input"

export const Wrapper = styled.div`
  position: relative;
  border-radius: 9px;
  background-color: ${({ theme }) => theme.nestedInputBackgroundColor};
  margin-bottom: 28px;
`

export const Label = styled.label`
  font-size: 12px;
  font-weight: 500;
  padding-top: 6px;
  padding-left: 24px;
  color: ${({ theme }) => theme.primaryDisabled};
  margin-bottom: 9px;
  text-transform: uppercase;
  text-align: left;
`

export const StyledInput = styled(Input)`
  position: relative;

  margin-bottom: 0;

  input {
    background-color: transparent;
    padding-right: 9px;
  }

  &:not(:last-of-type):after {
    content: "";
    display: block;
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 2px;
    height: 50%;
    background-color: ${({ theme }) => theme.secondaryOpacity};
  }
`

export const DurationError = styled(FormError)`
  top: -18px;
  left: 24px;
  bottom: auto;
`
