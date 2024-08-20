import { isAxiosError } from "axios"

import { getActivitiesForCurrentUser } from "@api/activitiesService"
import { createAppAsyncThunk } from "@app/hooks"
import { getBorderColor } from "@features/historyCalendar/utils"

import { GetEventsForCurrentMonthParams } from "./calendarScheduler.types"

export const getEventsForCurrentMonthAction = createAppAsyncThunk(
  "getEventsForCurrentMonth",
  async (data: GetEventsForCurrentMonthParams, { rejectWithValue }) => {
    const { startDate, endDate, theme } = data
    try {
      const response = await getActivitiesForCurrentUser({
        startDate,
        endDate,
      })
      const events = response.data.map((activity) => {
        const {
          _id,
          date,
          type: { type },
        } = activity
        return {
          id: _id,
          borderColor: getBorderColor(type, theme),
          date,
        }
      })
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
