import { useNavigate } from "react-router-dom"

import { LogoSVG, LogoText, LogoWrapper } from "./Logo.styled"

export const Logo = () => {
  const navigate = useNavigate()

  const handleLogoClick = () => navigate("/")

  return (
    <LogoWrapper onClick={handleLogoClick}>
      <LogoSVG name='gorilla' width={32} height={32} />
      <LogoText>Gorilla Gains</LogoText>
    </LogoWrapper>
  )
}
