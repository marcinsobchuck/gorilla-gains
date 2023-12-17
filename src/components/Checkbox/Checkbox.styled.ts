import styled from "styled-components"

export const CheckmarkWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 32px;
  height: 32px;
  margin-right: 9px;
  background-color: ${({ theme }) => theme.inputBackgroundColor};
  border-radius: 9px;
  border: 2px solid ${({ theme }) => theme.primaryDisabled};
  transition: 0.3s;

  svg {
    opacity: 0;
    transition: 0.3s;
    fill: ${({ theme }) => theme.backgroundColor};
  }
`

export const CheckboxLabel = styled.label`
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.primaryMedium};

  max-width: 180px;
  cursor: pointer;
  display: flex;
  align-items: center;
  transition: 0.3s;

  input:checked ~ ${CheckmarkWrapper} {
    background-color: ${({ theme }) => theme.secondary};

    svg {
      opacity: 1;
    }
  }

  input:focus ~ ${CheckmarkWrapper} {
    box-shadow: 0px 0px 0px 3px ${({ theme }) => theme.secondaryOpacity};
  }

  &:hover ${CheckmarkWrapper} {
    box-shadow: 0px 0px 0px 2px ${({ theme }) => theme.secondaryOpacity};
  }
`

export const CheckboxInput = styled.input`
  appearance: none;
  -webkit-appearance: none;

  height: 0;
  width: 0;
  opacity: 0;
`
