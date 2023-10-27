import styled from "styled-components"

export const Wrapper = styled.div`
  padding: 12px 3px;
  display: flex;
  justify-content: space-between;
`

export const Step = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3px;
`

export const StepNumber = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  height: 46px;
  width: 46px;
  border: 1px solid ${({ theme }) => theme.borderColor};
`

export const StepName = styled.p`
  color: ${({ theme }) => theme.primary};
  font-size: 14px;
  font-weight: 500;
`
