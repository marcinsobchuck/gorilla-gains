import { isAxiosError } from "axios"

import { getActivitiesForCurrentUser } from "@api/activitiesService"
import { createAppAsyncThunk } from "@app/hooks"
import { getBorderColor } from "@features/historyCalendar/utils"

import { ActivityEvent, GetEventsForCurrentMonthParams } from "./calendarScheduler.types"

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
      const events = response.data.map((activity): ActivityEvent => {
        const {
          type: { type },
        } = activity
        return {
          ...activity,
          color: getBorderColor(type, theme),
          allDay: true,
        }
      })

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
