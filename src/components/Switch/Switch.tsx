import { useTheme } from "styled-components"

import { useAppDispatch, useAppSelector } from "@app/hooks"
import { toggleTheme } from "@features/theme/themeSlice"

import { StyledIcon, SwitchWrapper } from "./Switch.styled"

export const Switch = () => {
  const currentTheme = useTheme()
  const theme = useAppSelector((state) => state.theme.currentTheme)

  const dispatch = useAppDispatch()

  return (
    <SwitchWrapper onClick={() => dispatch(toggleTheme())} $currentTheme={theme}>
      <StyledIcon
        color={theme === "light" ? currentTheme.primary : currentTheme.primaryDisabled}
        name='sun'
        width={18}
        height={18}
        isInteractive
      />
      <StyledIcon
        color={theme === "dark" ? currentTheme.primary : currentTheme.primaryDisabled}
        name='moon'
        width={18}
        height={18}
        isInteractive
      />
    </SwitchWrapper>
  )
}
