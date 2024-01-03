import { styled } from "styled-components"

import { FlexContainerProps } from "./FlexContainer.types"

export const FlexContainer = styled.div<FlexContainerProps>`
  display: flex;
  flex-direction: ${({ direction }) => (direction ? direction : "row")};
  justify-content: ${({ justify }) => (justify ? justify : "flex-start")};
  align-items: ${({ align }) => (align ? align : "stretch")};
`
