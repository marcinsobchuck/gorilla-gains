import React from "react"

import { LogoSVG, LogoText, LogoWrapper } from "./Logo.styled"
import { LogoProps } from "./Logo.types"

export const Logo: React.FC<LogoProps> = ({ onClick }) => {
  return (
    <LogoWrapper onClick={onClick}>
      <LogoSVG name='gorilla' width={32} height={32} />
      <LogoText>Gorilla Gains</LogoText>
    </LogoWrapper>
  )
}
