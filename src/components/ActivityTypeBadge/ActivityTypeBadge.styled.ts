import styled from "styled-components"

import { FlexContainer } from "@components/FlexContainer/FlexContainer.styled"

interface IconWrapperProps {
  $padding: number
  $bgColor: string
}

interface TitleProps {
  $titleSize: number
}

export const IconWrapper = styled(FlexContainer)<IconWrapperProps>`
  background-color: ${({ theme, $bgColor }) => ($bgColor ? $bgColor : theme.secondaryOpacity)};
  padding: ${({ $padding }) => $padding && `${$padding}px`};
  border-radius: 9px;
`

export const Title = styled.h2<TitleProps>`
  font-size: ${({ $titleSize }) => $titleSize && `${$titleSize}px`};
  font-weight: 500;
  text-align: left;
`

export const Subtitle = styled.p`
  font-size: 12px;
  font-weight: 400;
  color: ${({ theme }) => theme.primaryMedium};
  text-align: left;
  text-transform: capitalize;
`
