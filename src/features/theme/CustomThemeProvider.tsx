import React from "react"
import { ThemeProvider } from "styled-components"

import { useAppSelector } from "../../app/hooks"
import { darkTheme, lightTheme } from "../../styles/themes"

interface Props {
  children: React.ReactNode
}

export const CustomThemeProvider: React.FC<Props> = ({ children }) => {
  const theme = useAppSelector((state) => state.theme.currentTheme)

  return <ThemeProvider theme={theme === "dark" ? darkTheme : lightTheme}>{children}</ThemeProvider>
}
