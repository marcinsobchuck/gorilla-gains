import { useState } from "react"
import styled, { ThemeProvider } from "styled-components"

import { useLocalStorage } from "./hooks/useLocalStorage"
import { ThemedButton } from "./styles/Button.styled"
import { GlobalStyle } from "./styles/GlobalStyle"
import { darkTheme, lightTheme } from "./styles/themes"

const Wrapper = styled.div`
  background-color: ${({ theme }) => theme.backgroundColor};
  transition: 0.3s;
`
const darkThemeMql = window.matchMedia("(prefers-color-scheme: dark)")

export const App = () => {
  const [theme, setTheme] = useLocalStorage("theme", darkThemeMql.matches ? "dark" : "light")
  const [count, setCount] = useState(0)

  const isDarkTheme = theme === "dark"

  const toggleTheme = () => {
    setTheme(isDarkTheme ? "light" : "dark")
  }

  return (
    <ThemeProvider theme={isDarkTheme ? darkTheme : lightTheme}>
      <GlobalStyle />
      <Wrapper>
        <h1>test</h1>
        <div>
          <button onClick={() => setCount((count) => count + 1)}>
            count is {count} {import.meta.env.VITE_APP_TITLE}
          </button>
        </div>
        <div>
          <ThemedButton onClick={toggleTheme}>
            Change theme to {isDarkTheme ? "light" : "dark"}
          </ThemedButton>
          <p>current theme: {theme}</p>
        </div>
      </Wrapper>
    </ThemeProvider>
  )
}
