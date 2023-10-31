import { useAppDispatch } from "@app/hooks"
import { LocalStorageKeys } from "@enums/localStorageKeys.enum"
import { setCurrentTheme } from "@features/theme/themeSlice"
import { useLocalStorage } from "@hooks/useLocalStorage"

import { StyledIcon, SwitchWrapper } from "./Switch.styled"

const darkThemeMql = window.matchMedia("(prefers-color-scheme: dark)")

export const Switch = () => {
  const [theme, setTheme] = useLocalStorage(
    LocalStorageKeys.THEME,
    darkThemeMql.matches ? "dark" : "light"
  )

  const dispatch = useAppDispatch()

  const resultTheme = theme === "dark" ? "light" : "dark"

  const toggleTheme = () => {
    setTheme(resultTheme)
    dispatch(setCurrentTheme(resultTheme))
  }

  return (
    <SwitchWrapper onClick={toggleTheme} $currentTheme={theme}>
      <StyledIcon name='sun' width={18} height={18} />
      <StyledIcon name='moon' width={18} height={18} />
    </SwitchWrapper>
  )
}
