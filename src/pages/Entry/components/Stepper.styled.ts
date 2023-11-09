import styled, { css } from "styled-components"

interface StepProps {
  $isActive: boolean
}

export const Wrapper = styled.div`
  margin-bottom: 16px;
`

export const StepsWrapper = styled.div`
  padding: 12px 0px;
  display: flex;
  justify-content: space-between;
`

export const StepNumber = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  height: 38px;
  width: 38px;
  font-weight: 600;
  font-size: 14px;
  border: 1px solid ${({ theme }) => theme.secondaryOpacity};

  transition: 0.3s ease-in-out;
`

export const StepName = styled.p`
  color: ${({ theme }) => theme.primary};
  font-size: 14px;
  font-weight: 500;

  transition: 0.3s ease-in-out;
`

export const Step = styled.div<StepProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 9px;
  gap: 6px;
  cursor: pointer;

  &:hover {
    ${StepNumber} {
      background-color: ${({ theme }) => theme.secondaryOpacity};
    }
  }

  ${({ $isActive }) =>
    $isActive &&
    css`
      pointer-events: none;

      ${StepNumber} {
        border-color: ${({ theme }) => theme.secondary};
        background-color: ${({ theme }) => theme.secondary};
        color: ${({ theme }) => theme.primaryButtonColor};
      }

      ${StepName} {
        color: ${({ theme }) => theme.secondary};
      }
    `}
`
