import styled from "styled-components"

export const RadioButtonGroupWrapper = styled.div`
  padding: 6px 24px 16px 24px;

  background-color: ${({ theme }) => theme.inputBackgroundColor};
  border-radius: 9px;
`

export const GroupTitle = styled.p`
  font-size: 14px;
  text-transform: uppercase;
  font-weight: 500;
  margin-bottom: 14px;
  color: ${({ theme }) => theme.primaryMedium};
`

export const RadiosWrapper = styled.div`
  display: flex;

  align-items: center;
  gap: 14px;

  border-radius: 9px;
`
