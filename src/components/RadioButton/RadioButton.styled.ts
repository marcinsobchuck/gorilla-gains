import styled from "styled-components"

export const RadioButtonWrapper = styled.div`
  display: flex;
  align-items: center;
`

export const RadioButtonLabel = styled.label`
  font-size: 14px;
  font-weight: 500;
  padding-left: 6px;

  cursor: pointer;
`

export const HiddenRadioInput = styled.input`
  appearance: none;
  position: relative;

  cursor: pointer;

  border: ${({ theme }) => `2px solid ${theme.primaryMedium}`};
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background-color: transparent;

  transition: 0.2s ease-in-out;
  transition-delay: 0.2s;

  &:checked {
    border-color: ${({ theme }) => theme.secondary};
  }

  &:after {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: block;
    border-radius: 50%;
    width: 10px;
    height: 10px;
    transition: 0.2s ease-in-out;
  }

  &:hover:after {
    background-color: ${({ theme }) => theme.primaryDisabled};
  }
  &:active:after {
    background-color: ${({ theme }) => theme.secondary};
  }
  &:checked:after {
    background-color: ${({ theme }) => theme.secondary};
  }
`
