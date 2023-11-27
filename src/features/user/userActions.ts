import { isAxiosError } from "axios"

import { ChangeUserInfoData } from "@api/types/userService.types"
import { changeUserInfo, getCurrentUserInfo } from "@api/userService"
import { createAppAsyncThunk } from "@app/hooks"

export const changeUserInfoAction = createAppAsyncThunk(
  "users/changeUserInfo",
  async (data: ChangeUserInfoData, { rejectWithValue }) => {
    try {
      const response = await changeUserInfo(data)
      return response.data
    } catch (error) {
      if (isAxiosError(error)) {
        return rejectWithValue(error.response?.data)
      } else {
        return rejectWithValue("Something went wrong")
      }
    }
  }
)

export const getCurrentUserInfoAction = createAppAsyncThunk(
  "users/getCurrentUserUserInfo",
  async (_, { rejectWithValue, signal }) => {
    try {
      const response = await getCurrentUserInfo(signal)
      return response.data
    } catch (error) {
      if (isAxiosError(error)) {
        return rejectWithValue(error.response?.data)
      } else {
        return rejectWithValue("Something went wrong")
      }
    }
  }
)
