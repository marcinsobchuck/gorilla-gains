import { Outlet } from "react-router-dom"
import styled from "styled-components"

import { useAppDispatch } from "../app/hooks.ts"
import { setCurrentTheme } from "../features/theme/themeSlice.ts"
import { useLocalStorage } from "../hooks/useLocalStorage.ts"
import { ThemedButton } from "../styles/Button.styled.ts"

const Wrapper = styled.div`
  background-color: ${({ theme }) => theme.backgroundColor};
  height: 100vh;
  transition: all 0.3s;
`
const darkThemeMql = window.matchMedia("(prefers-color-scheme: dark)")

export const RootLayout = () => {
  const [theme, setTheme] = useLocalStorage("theme", darkThemeMql.matches ? "dark" : "light")
  const dispatch = useAppDispatch()

  const resultTheme = theme === "dark" ? "light" : "dark"

  const toggleTheme = () => {
    setTheme(resultTheme)
    dispatch(setCurrentTheme(resultTheme))
  }

  return (
    <>
      <Wrapper>
        <div>Root layout</div>
        <ThemedButton onClick={toggleTheme}>Change theme to {resultTheme}</ThemedButton>
        <Outlet />
      </Wrapper>
    </>
  )
}
