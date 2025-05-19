import styled from "styled-components"

import { FlexContainer } from "@components/FlexContainer/FlexContainer.styled"

export const ItemWrapper = styled(FlexContainer)`
  border-radius: 9px;
  padding: 6px 0;
`

export const ItemLabel = styled.div`
  font-size: 14px;
  margin-bottom: 3px;
  font-weight: 500;

  color: ${({ theme }) => theme.primaryMedium};
`

export const ItemText = styled.p`
  font-weight: 600;
  font-size: 14px;
  color: ${({ theme }) => theme.secondaryText};
`
