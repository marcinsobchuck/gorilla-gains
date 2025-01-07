import styled from "styled-components"

import { FlexContainer } from "@components/FlexContainer/FlexContainer.styled"

export const ItemWrapper = styled(FlexContainer)`
  border-radius: 9px;
  padding: 6px 0;
  margin-bottom: 6px;
`

export const ItemLabel = styled.div`
  font-size: 14px;
  color: ${({ theme }) => theme.secondary};
  margin-bottom: 3px;
`

export const ItemText = styled.p`
  font-weight: 500;
  color: ${({ theme }) => theme.primary};
`
