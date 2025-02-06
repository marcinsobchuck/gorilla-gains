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
  flex-grow: 1;
  background-color: ${({ theme }) => theme.backgroundColor};
  border-radius: 9px;
  box-shadow: ${({ theme }) => theme.boxShadow};

  svg {
    width: 80%;
    height: 80%;
  }
`

export const Title = styled.h2`
  margin-bottom: 14px;
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.primaryDisabled};
  text-align: center;
`
