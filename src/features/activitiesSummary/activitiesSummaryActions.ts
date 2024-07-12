import { isAxiosError } from "axios"

import { getActivitiesSummary } from "@api/activitiesSummaryService"
import { createAppAsyncThunk } from "@app/hooks"

export const getActivitiesSummaryAction = createAppAsyncThunk(
  "getActivitiesSummary",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getActivitiesSummary()
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
