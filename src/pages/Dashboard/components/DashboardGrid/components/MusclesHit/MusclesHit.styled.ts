import styled from "styled-components"

import { FlexContainer } from "@components/FlexContainer/FlexContainer.styled"
import { HumanSilhouette } from "@components/HumanSilhouette/HumanSilhouette"

export const Wrapper = styled(FlexContainer)`
  padding: 14px;
  background-color: ${({ theme }) => theme.navBackgroundColor};
  box-shadow: ${({ theme }) => theme.elevationBoxShadow};
  border-radius: 9px;
`

export const StyledHumanSilhouette = styled(HumanSilhouette)`
  svg {
    height: 320px;
  }
`
