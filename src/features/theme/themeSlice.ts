import { createSlice } from "@reduxjs/toolkit"

import { InitialState } from "./themeSlice.types"
import { LocalStorageKeys } from "../../enums/localStorageKeys.enum"

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
    setCurrentTheme: (state, action) => {
      state.currentTheme = action.payload
    },
  },
})

export default themeSlice.reducer
export const { setCurrentTheme } = themeSlice.actions
