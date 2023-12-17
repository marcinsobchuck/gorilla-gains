import styled from "styled-components"

export const TextareaWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 6px 24px 16px 24px;
  background-color: ${({ theme }) => theme.inputBackgroundColor};
  border-radius: 9px;
  border: 2px solid transparent;

  transition: all 0.3s;
  transition-delay: 0.1s;

  &:focus-within {
    border-color: ${({ theme }) => theme.secondary};
    box-shadow: 0px 0px 0px 4px ${({ theme }) => theme.secondaryOpacity};
  }
`

export const TextareaLabel = styled.label`
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.primaryMedium};
  margin-bottom: 14px;
  text-transform: uppercase;
`

export const TextareaInput = styled.textarea`
  resize: none;
  border: none;
  background-color: transparent;
  height: 180px;
  font-weight: 500;

  &::placeholder {
    color: ${({ theme }) => theme.primaryDisabled};
  }
`
