import svg from "react-inlinesvg"
import styled from "styled-components"

export const LogoWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  justify-content: center;
  cursor: pointer;

  img {
    width: 320px;
    height: 320px;
  }
`
export const LogoSVG = styled(svg)`
  width: 32px;
  height: 32px;
  fill: ${({ theme }) => theme.primary};
`

export const LogoText = styled.p`
  color: ${({ theme }) => theme.primary};
  font-size: 16px;
  font-weight: 600;
  letter-spacing: -1px;
  text-transform: uppercase;
`
