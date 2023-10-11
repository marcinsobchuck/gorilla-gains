import { createAsyncThunk } from "@reduxjs/toolkit"
import { isAxiosError } from "axios"

import { LoginUserData, RegisterUserData } from "./authSlice.types"
import * as authService from "../../api/authService"
import { LocalStorageKeys } from "../../enums/localStorageKeys.enum"

const saveToLocalStorage = (key: string, value: string) => {
  window.localStorage.setItem(key, value)
}

export const registerUserAction = createAsyncThunk(
  "auth/register",
  async (data: RegisterUserData, { rejectWithValue }) => {
    try {
      const response = await authService.registerUser(data)
      const accessToken = response.data
      saveToLocalStorage(LocalStorageKeys.ACCESS_TOKEN, accessToken)

      return accessToken
    } catch (error) {
      if (isAxiosError(error)) {
        return rejectWithValue(error.response?.data)
      } else if (error instanceof Error) {
        return rejectWithValue(error.message)
      } else {
        return rejectWithValue(error)
      }
    }
  }
)

export const loginUserAction = createAsyncThunk(
  "auth/login",
  async (data: LoginUserData, { rejectWithValue }) => {
    try {
      const response = await authService.loginUser(data)
      const accessToken = response.data
      saveToLocalStorage(LocalStorageKeys.ACCESS_TOKEN, accessToken)

      return accessToken
    } catch (error) {
      if (isAxiosError(error)) {
        return rejectWithValue(error.response?.data)
      } else if (error instanceof Error) {
        return rejectWithValue(error.message)
      } else {
        return rejectWithValue(error)
      }
    }
  }
)
