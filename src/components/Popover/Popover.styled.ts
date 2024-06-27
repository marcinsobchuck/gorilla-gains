import styled from "styled-components"

export const PopoverContainer = styled.div`
  z-index: 10;
  border-radius: 9px;
  box-shadow: ${({ theme }) => theme.popperBoxShadow};
`

export const PopoverArrow = styled.div`
  height: 14px;
  width: 100%;
`
