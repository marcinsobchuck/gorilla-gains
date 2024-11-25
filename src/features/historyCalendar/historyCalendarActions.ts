import { isAxiosError } from "axios"

import { getActivitiesForCurrentUser } from "@api/activitiesService"
import { createAppAsyncThunk } from "@app/hooks"
import { getActivityEvents } from "@features/utils/utils"

import { GetHistoryEventsForCurrentMonthParams } from "./historyCalendar.types"

export const getHistoryEventsForCurrentMonthAction = createAppAsyncThunk(
  "getHistoryEventsForCurrentMonthAction",
  async (data: GetHistoryEventsForCurrentMonthParams, { rejectWithValue }) => {
    const { startDate, endDate, theme } = data
    try {
      const response = await getActivitiesForCurrentUser({
        startDate,
        endDate,
        pastOnly: true,
      })
      const activities = response.data

      const events = getActivityEvents(activities, theme)
      return events
    } catch (error) {
      if (isAxiosError(error)) {
        return rejectWithValue(error.response?.data)
      } else {
        return rejectWithValue("Something went wrong")
      }
    }
  }
)
