import styled from "styled-components"

export const TileInputButtonWrapper = styled.div`
  display: flex;
  transition: 0.3s;

  &:hover :not(input:focus) ~ label {
    background-color: ${({ theme }) => theme.secondaryOpacity};
    box-shadow: 0px 0px 0px 4px ${({ theme }) => theme.secondaryOpacity};
  }
  input:focus ~ label {
    box-shadow: 0px 0px 0px 6px ${({ theme }) => theme.secondaryOpacity};
  }
  input:checked ~ label {
    background-color: ${({ theme }) => theme.secondaryOpacity};
  }
`

export const TileInputButtonLabel = styled.label`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  padding: 12px 14px;
  border: 2px solid ${({ theme }) => theme.secondary};
  border-radius: 9px;
  background-color: transparent;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.3s;

  cursor: pointer;
`
export const TileInputButtonInput = styled.input`
  appearance: none;
  -webkit-appearance: none;
`
