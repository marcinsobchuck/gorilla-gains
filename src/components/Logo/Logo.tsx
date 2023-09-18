import { useNavigate } from "react-router-dom"

import { LogoSVG, LogoText, LogoWrapper } from "./Logo.styled"
import gorilla from "../../assets/gorilla.svg"

export const Logo = () => {
  const navigate = useNavigate()

  const handleLogoClick = () => navigate("/")

  return (
    <LogoWrapper onClick={handleLogoClick}>
      <LogoSVG src={gorilla} />
      <LogoText>Gorilla Gains</LogoText>
    </LogoWrapper>
  )
}
