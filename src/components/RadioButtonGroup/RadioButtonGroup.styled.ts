import styled from "styled-components"

import { FlexContainer } from "@components/FlexContainer/FlexContainer.styled"

export const RadioButtonGroupWrapper = styled.div`
  position: relative;
  padding: 6px 24px 16px 24px;

  background-color: ${({ theme }) => theme.inputBackgroundColor};
  border-radius: 9px;

  transition: all 0.3s;
  transition-delay: 0.1s;
`

export const GroupTitle = styled.p`
  font-size: 14px;
  text-transform: uppercase;
  font-weight: 500;
  margin-bottom: 14px;
  color: ${({ theme }) => theme.primaryMedium};
`

export const RadiosWrapper = styled(FlexContainer)`
  border-radius: 9px;
`
