import { isAxiosError } from "axios"

import { getActivityTypes } from "@api/activityTypesService"
import { createAppAsyncThunk } from "@app/hooks"

export const getActivityTypesAction = createAppAsyncThunk(
  "getActivityTypes",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getActivityTypes()
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
