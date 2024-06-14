import { isAxiosError } from "axios"

import { getActivityTypes } from "@api/activityTypesService"
import { createAppAsyncThunk } from "@app/hooks"
import { setActiveFilterTab } from "@features/activitiesOverview/activitiesOverviewSlice"

export const getActivityTypesAction = createAppAsyncThunk(
  "getActivityTypes",
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const response = await getActivityTypes()
      dispatch(setActiveFilterTab(response.data[0]._id))
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
