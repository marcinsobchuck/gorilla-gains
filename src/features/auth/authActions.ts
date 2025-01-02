import { isAxiosError } from "axios"

import * as authService from "@api/authService"
import { createAppAsyncThunk } from "@app/hooks"
import { LocalStorageKeys } from "@enums/localStorageKeys.enum"

import { LoginUserData, RegisterUserData } from "./authSlice.types"

const saveToLocalStorage = (key: string, value: string) => {
  window.localStorage.setItem(key, value)
}

export const registerUserAction = createAppAsyncThunk(
  "auth/register",
  async (data: RegisterUserData, { rejectWithValue }) => {
    try {
      const response = await authService.registerUser(data)
      const accessToken = response.data
      saveToLocalStorage(LocalStorageKeys.ACCESS_TOKEN, accessToken)

      return accessToken
    } catch (error) {
      if (isAxiosError(error)) {
        if (error.response?.status === 409) {
          return rejectWithValue(error.response?.data)
        } else {
          return rejectWithValue("Something went wrong")
        }
      } else {
        return rejectWithValue("Something went really wrong")
      }
    }
  }
)

export const loginUserAction = createAppAsyncThunk(
  "auth/login",
  async (data: LoginUserData, { rejectWithValue }) => {
    try {
      const response = await authService.loginUser(data)

      const accessToken = response.data
      saveToLocalStorage(LocalStorageKeys.ACCESS_TOKEN, accessToken)

      return accessToken
    } catch (error) {
      if (isAxiosError(error)) {
        if (error.response?.status === 401) {
          return rejectWithValue(error.response?.data)
        } else {
          return rejectWithValue("Something went wrong")
        }
      } else {
        return rejectWithValue("Something went really wrong")
      }
    }
  }
)

export const forgotPasswordAction = createAppAsyncThunk(
  "auth/forgotPassword",
  async (email: string, { rejectWithValue }) => {
    try {
      const response = await authService.forgotPassword(email)

      return response.data
    } catch (error) {
      if (isAxiosError(error)) {
        if (error.response?.status === 401) {
          return rejectWithValue(error.response?.data)
        } else {
          return rejectWithValue("Something went wrong")
        }
      } else {
        return rejectWithValue("Something went really wrong")
      }
    }
  }
)

export const verifyPasswordResetTokenAction = createAppAsyncThunk(
  "auth/verifyPasswordResetToken",
  async (token: string, { rejectWithValue }) => {
    try {
      const response = await authService.verifyPasswordResetToken(token)

      return response.data
    } catch (error) {
      if (isAxiosError(error)) {
        if (error.response?.status === 401) {
          return rejectWithValue(error.response?.data)
        } else {
          return rejectWithValue("Something went wrong")
        }
      } else {
        return rejectWithValue("Something went really wrong")
      }
    }
  }
)
