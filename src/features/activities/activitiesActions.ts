import { isAxiosError } from "axios"

import { createActivity } from "@api/activitiesService"
import { CreateActivityData } from "@api/types/activitiesService.types"
import { createAppAsyncThunk } from "@app/hooks"

export const createActivityAction = createAppAsyncThunk(
  "createActivity",
  async (data: CreateActivityData, { rejectWithValue }) => {
    try {
      const response = await createActivity(data)
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
