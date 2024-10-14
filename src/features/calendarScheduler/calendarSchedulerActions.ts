import { isAxiosError } from "axios"

import { getActivitiesForCurrentUser } from "@api/activitiesService"
import { createAppAsyncThunk } from "@app/hooks"
import { getActivityEvents } from "@features/utils/utils"

import { GetEventsForCurrentMonthParams } from "./calendarScheduler.types"

export const getEventsForCurrentMonthAction = createAppAsyncThunk(
  "getEventsForCurrentMonth",
  async (
    { startDate, endDate, theme, shouldSetDayEvents = false }: GetEventsForCurrentMonthParams,
    { rejectWithValue }
  ) => {
    try {
      const response = await getActivitiesForCurrentUser({
        startDate,
        endDate,
      })
      const activities = response.data

      const events = getActivityEvents(activities, theme)

      return { events, shouldSetDayEvents }
    } catch (error) {
      if (isAxiosError(error)) {
        return rejectWithValue(error.response?.data)
      } else {
        return rejectWithValue("Something went wrong")
      }
    }
  }
)
