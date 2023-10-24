import { createSlice, isAnyOf } from "@reduxjs/toolkit"

import { loginUserAction, registerUserAction } from "./authActions"
import { InitialState } from "./authSlice.types"
import { LocalStorageKeys } from "../../enums/localStorageKeys.enum"

const initialState: InitialState = {
  accessToken: window.localStorage.getItem(LocalStorageKeys.ACCESS_TOKEN),
  loading: false,
  success: false,
  userInfo: null,
  error: "",
}

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetAuthFormError: (state) => {
      state.error = ""
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(isAnyOf(registerUserAction.pending, loginUserAction.pending), (state) => {
      state.loading = true
      state.success = false
    })
    builder.addMatcher(
      isAnyOf(registerUserAction.fulfilled, loginUserAction.fulfilled),
      (state, action) => {
        state.loading = false
        state.success = true
        state.accessToken = action.payload
        state.error = ""
      }
    )
    builder.addMatcher(
      isAnyOf(registerUserAction.rejected, loginUserAction.rejected),
      (state, action) => {
        state.loading = false
        state.success = false
        if (action.payload) {
          state.error = action.payload
        }
      }
    )
  },
})

export default authSlice.reducer
export const { resetAuthFormError } = authSlice.actions
