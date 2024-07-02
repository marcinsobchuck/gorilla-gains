import styled from "styled-components"

import { FlexContainer } from "@components/FlexContainer/FlexContainer.styled"

export const TotalsWrapper = styled(FlexContainer)`
  padding: 16px 36px 16px 24px;
  border-radius: 9px;
  width: 100%;
  background-color: ${({ theme }) => theme.navBackgroundColor};
  box-shadow: ${({ theme }) => theme.elevationBoxShadow};
`
