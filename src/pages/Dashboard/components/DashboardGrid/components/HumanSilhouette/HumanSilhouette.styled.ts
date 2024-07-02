import svg from "react-inlinesvg"
import styled from "styled-components"

export const HumanModelSVG = styled(svg)`
  width: 100%;
  height: 326px;
`

export const Title = styled.h2`
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.primaryDisabled};
  text-align: center;
`
