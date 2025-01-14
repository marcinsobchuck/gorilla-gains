import { createSlice } from "@reduxjs/toolkit"

import { LocalStorageKeys } from "@enums/localStorageKeys.enum"
import { RequestStatuses } from "@enums/requestStatuses.enum"

import {
  forgotPasswordAction,
  loginUserAction,
  registerUserAction,
  verifyPasswordResetTokenAction,
} from "./authActions"
import { InitialState } from "./authSlice.types"

const initialState: InitialState = {
  accessToken: window.localStorage.getItem(LocalStorageKeys.ACCESS_TOKEN),
  loginStatus: RequestStatuses.IDLE,
  registerStatus: RequestStatuses.IDLE,
  forgotPasswordStatus: RequestStatuses.IDLE,
  verifyPasswordResetTokenStatus: RequestStatuses.IDLE,
  loginError: null,
  registerError: null,
  forgotPasswordError: null,
  verifyPasswordResetTokenError: null,
  isPasswordResetTokenValid: false,
  forgotPasswordSuccessMessage: "",
}

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.accessToken = ""
      window.localStorage.removeItem(LocalStorageKeys.ACCESS_TOKEN)
    },
    resetLoginError: (state) => {
      state.loginError = ""
    },
    resetRegisterError: (state) => {
      state.registerError = ""
    },
    resetForgotPasswordError: (state) => {
      state.forgotPasswordError = ""
    },
    resetVerifyPasswordResetTokenError: (state) => {
      state.verifyPasswordResetTokenError = ""
    },
  },
  extraReducers: (builder) => {
    builder.addCase(verifyPasswordResetTokenAction.pending, (state) => {
      state.verifyPasswordResetTokenStatus = RequestStatuses.LOADING
    })
    builder.addCase(verifyPasswordResetTokenAction.fulfilled, (state, action) => {
      state.verifyPasswordResetTokenStatus = RequestStatuses.SUCCESS
      state.verifyPasswordResetTokenError = ""
      state.isPasswordResetTokenValid = action.payload
    })
    builder.addCase(verifyPasswordResetTokenAction.rejected, (state, action) => {
      state.verifyPasswordResetTokenStatus = RequestStatuses.FAILED
      state.verifyPasswordResetTokenError = action.payload
    })

    builder.addCase(forgotPasswordAction.pending, (state) => {
      state.forgotPasswordStatus = RequestStatuses.LOADING
    })
    builder.addCase(forgotPasswordAction.fulfilled, (state, action) => {
      state.forgotPasswordStatus = RequestStatuses.SUCCESS
      state.forgotPasswordError = ""
      state.forgotPasswordSuccessMessage = action.payload
    })
    builder.addCase(forgotPasswordAction.rejected, (state, action) => {
      state.forgotPasswordStatus = RequestStatuses.FAILED
      state.forgotPasswordError = action.payload
    })

    builder.addCase(loginUserAction.pending, (state) => {
      state.loginStatus = RequestStatuses.LOADING
    })
    builder.addCase(loginUserAction.fulfilled, (state, action) => {
      state.loginStatus = RequestStatuses.SUCCESS
      state.loginError = ""
      state.accessToken = action.payload
    })
    builder.addCase(loginUserAction.rejected, (state, action) => {
      state.loginStatus = RequestStatuses.FAILED
      state.loginError = action.payload
    })

    builder.addCase(registerUserAction.pending, (state) => {
      state.registerStatus = RequestStatuses.LOADING
    })
    builder.addCase(registerUserAction.fulfilled, (state, action) => {
      state.registerStatus = RequestStatuses.SUCCESS
      state.registerError = ""
      state.accessToken = action.payload
    })
    builder.addCase(registerUserAction.rejected, (state, action) => {
      state.registerStatus = RequestStatuses.FAILED
      state.registerError = action.payload
    })
  },
})

export default authSlice.reducer
export const {
  logout,
  resetLoginError,
  resetForgotPasswordError,
  resetRegisterError,
  resetVerifyPasswordResetTokenError,
} = authSlice.actions
