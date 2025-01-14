import styled from "styled-components"

export const PopoverWrapper = styled.div`
  z-index: 1;
`

export const PopoverContainer = styled.div`
  border-radius: 9px;
  box-shadow: ${({ theme }) => theme.popperBoxShadow};
`

export const PopoverArrow = styled.div`
  height: 14px;
  width: 100%;
`
