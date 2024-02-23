import styled from "styled-components"

export const GoalsWrapper = styled.div`
  position: relative;
`

export const TilesWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 12px;
  border-top: 1px solid ${({ theme }) => theme.primaryDisabled};
  border-bottom: 1px solid ${({ theme }) => theme.primaryDisabled};
  padding: 24px 0;
`

export const GoalsTitle = styled.p`
  font-size: 14px;
  font-weight: 500;
  text-transform: uppercase;
  color: ${({ theme }) => theme.primary};
  margin-bottom: 6px;
  padding-left: 24px;
`
