import { createAsyncThunk } from "@reduxjs/toolkit"
import { isAxiosError } from "axios"

import * as authService from "../../api/authService"

interface RegisterUserData {
  name: string
  email: string
  password: string
}

interface LoginUserData {
  email: string
  password: string
}

const saveToLocalStorage = (key: string, value: string) => {
  window.localStorage.setItem(key, value)
}

export const registerUserAction = createAsyncThunk(
  "auth/register",
  async (data: RegisterUserData, { rejectWithValue }) => {
    try {
      const response = await authService.registerUser(data)
      const accessToken = response.data
      saveToLocalStorage("accessToken", accessToken)

      return accessToken
    } catch (error) {
      if (isAxiosError(error)) {
        console.log(error)
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
      saveToLocalStorage("accessToken", accessToken)

      return accessToken
    } catch (error) {
      if (isAxiosError(error)) {
        console.log(error)
        return rejectWithValue(error.response?.data)
      } else if (error instanceof Error) {
        return rejectWithValue(error.message)
      } else {
        return rejectWithValue(error)
      }
    }
  }
)
