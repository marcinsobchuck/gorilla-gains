import { createSlice } from "@reduxjs/toolkit"

import { loginUserAction, registerUserAction } from "./authActions"
import { InitialState } from "./authSlice.types"

const initialState: InitialState = {
  accessToken: window.localStorage.getItem("accessToken"),
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
    builder.addCase(registerUserAction.pending, (state) => {
      state.loading = true
      state.success = false
    })
    builder.addCase(registerUserAction.fulfilled, (state, action) => {
      state.loading = false
      state.success = true
      state.accessToken = action.payload
      state.error = ""
    })
    builder.addCase(registerUserAction.rejected, (state, action) => {
      state.loading = false
      state.success = false
      state.error = action.payload
    })
    builder.addCase(loginUserAction.pending, (state) => {
      state.loading = true
      state.success = false
    })
    builder.addCase(loginUserAction.fulfilled, (state, action) => {
      state.loading = false
      state.success = true
      state.accessToken = action.payload
      state.error = ""
    })
    builder.addCase(loginUserAction.rejected, (state, action) => {
      state.loading = false
      state.success = false
      state.error = action.payload
    })
  },
})

export default authSlice.reducer
export const { resetAuthFormError } = authSlice.actions
