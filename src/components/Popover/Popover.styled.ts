import styled from "styled-components"

export const PopoverContainer = styled.div`
  z-index: 10;
  box-shadow: ${({ theme }) => theme.popperBoxShadow};
`
