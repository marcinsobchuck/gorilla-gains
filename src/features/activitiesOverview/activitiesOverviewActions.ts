import { isAxiosError } from "axios"

import { getActivitiesForCurrentUser } from "@api/activitiesService"
import { GetActivitiesForCurrentUserParams } from "@api/types/activitiesService.types"
import { createAppAsyncThunk } from "@app/hooks"

export const getActivitiesForActivityTypeAction = createAppAsyncThunk(
  "getActivitiesForActivityType",
  async (data: GetActivitiesForCurrentUserParams, { rejectWithValue }) => {
    try {
      const { type } = data
      const response = await getActivitiesForCurrentUser({
        type,
        pastOnly: true,
      })

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
