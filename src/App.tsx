import { RouterProvider } from "react-router-dom"
import { ThemeProvider } from "styled-components"

import { useLocalStorage } from "./hooks/useLocalStorage.ts"
import { router } from "./routing/router.tsx"
import { ThemedButton } from "./styles/Button.styled.ts"
import { GlobalStyle } from "./styles/GlobalStyle"
import { darkTheme, lightTheme } from "./styles/themes"

const darkThemeMql = window.matchMedia("(prefers-color-scheme: dark)")

export const App = () => {
  const [theme, setTheme] = useLocalStorage("theme", darkThemeMql.matches ? "dark" : "light")

  const isDarkTheme = theme === "dark"

  const toggleTheme = () => {
    setTheme(isDarkTheme ? "light" : "dark")
  }
  return (
    <ThemeProvider theme={isDarkTheme ? darkTheme : lightTheme}>
      <ThemedButton onClick={toggleTheme}>
        Change theme to {isDarkTheme ? "light" : "dark"}
      </ThemedButton>
      <RouterProvider router={router} />
      <div>THEME IN APP: </div>
      <GlobalStyle />
    </ThemeProvider>
  )
}
