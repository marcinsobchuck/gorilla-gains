import { useNavigate } from "react-router-dom"

import { Routes } from "@enums/routes.enum"

import { LogoSVG, LogoText, LogoWrapper } from "./Logo.styled"

export const Logo = () => {
  const navigate = useNavigate()

  const handleLogoClick = () => navigate(Routes.DASHBOARD)

  return (
    <LogoWrapper onClick={handleLogoClick}>
      <LogoSVG name='gorilla' width={32} height={32} />
      <LogoText>Gorilla Gains</LogoText>
    </LogoWrapper>
  )
}
