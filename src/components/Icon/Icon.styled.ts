import { SVGProps } from "react"
import svg from "react-inlinesvg"
import styled from "styled-components"

interface StyledIconProps extends SVGProps<SVGElement> {
  width?: number
  height?: number
  color?: string
  $isInteractive?: boolean
}

export const StyledIcon = styled(svg)<StyledIconProps>`
  width: ${({ width }) => (width ? `${width}px` : "22px")};
  height: ${({ height }) => (height ? `${height}px` : "22px")};
  fill: ${({ theme, color }) => (color ? color : theme.primaryDisabled)};
  cursor: ${({ $isInteractive }) => ($isInteractive ? "pointer" : "auto")};
`
