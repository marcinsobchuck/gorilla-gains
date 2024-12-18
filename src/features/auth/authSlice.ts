import { createSlice, isAnyOf } from "@reduxjs/toolkit"

import { LocalStorageKeys } from "@enums/localStorageKeys.enum"
import { RequestStatuses } from "@enums/requestStatuses.enum"

import { loginUserAction, registerUserAction } from "./authActions"
import { InitialState } from "./authSlice.types"

const initialState: InitialState = {
  accessToken: window.localStorage.getItem(LocalStorageKeys.ACCESS_TOKEN),
  status: RequestStatuses.IDLE,
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
    logout: (state) => {
      state.accessToken = ""
      state.userInfo = null
      state.status = RequestStatuses.IDLE

      window.localStorage.removeItem(LocalStorageKeys.ACCESS_TOKEN)
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(isAnyOf(registerUserAction.pending, loginUserAction.pending), (state) => {
      state.status = RequestStatuses.LOADING
    })
    builder.addMatcher(
      isAnyOf(registerUserAction.fulfilled, loginUserAction.fulfilled),
      (state, action) => {
        state.status = RequestStatuses.SUCCESS
        state.accessToken = action.payload
      }
    )
    builder.addMatcher(
      isAnyOf(registerUserAction.rejected, loginUserAction.rejected),
      (state, action) => {
        state.status = RequestStatuses.FAILED
        if (action.payload) {
          state.error = action.payload
        }
      }
    )
  },
})

export default authSlice.reducer
export const { resetAuthFormError, logout } = authSlice.actions
