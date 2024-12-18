import { createSlice } from "@reduxjs/toolkit"

import { LocalStorageKeys } from "@enums/localStorageKeys.enum"

import { InitialState } from "./themeSlice.types"

const getTheme = () => {
  const darkThemeMql = window.matchMedia("(prefers-color-scheme: dark)")
  const theme = window.localStorage.getItem(LocalStorageKeys.THEME)
  if (theme) {
    return JSON.parse(theme)
  }
  return darkThemeMql.matches ? "dark" : "light"
}

const initialState: InitialState = {
  currentTheme: getTheme(),
}

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme: (state) => {
      const theme = state.currentTheme === "dark" ? "light" : "dark"

      window.localStorage.setItem(LocalStorageKeys.THEME, JSON.stringify(theme))
      state.currentTheme = theme
    },
  },
})

export default themeSlice.reducer
export const { toggleTheme } = themeSlice.actions
