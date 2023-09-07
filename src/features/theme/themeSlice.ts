import { createSlice } from "@reduxjs/toolkit"

import { InitialState } from "./themeSlice.types"

const darkThemeMql = window.matchMedia("(prefers-color-scheme: dark)")

const initialState: InitialState = {
  currentTheme: darkThemeMql.matches ? "dark" : "light",
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
