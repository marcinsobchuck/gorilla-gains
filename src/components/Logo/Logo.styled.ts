import styled from "styled-components"

import { Icon } from "../Icon/Icon"

export const LogoWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  justify-content: center;
  cursor: pointer;
`
export const LogoSVG = styled(Icon)`
  fill: ${({ theme }) => theme.primary};

  @media (min-width: 1024px) {
    width: 52px;
    height: 52px;
  }
`

export const LogoText = styled.p`
  color: ${({ theme }) => theme.primary};
  font-size: 16px;
  font-weight: 600;
  letter-spacing: -1px;
  text-transform: uppercase;

  @media (min-width: 1024px) {
    font-size: 18px;
  }
`
