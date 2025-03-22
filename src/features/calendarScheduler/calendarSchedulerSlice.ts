import { createSlice } from "@reduxjs/toolkit"
import { format, parseISO } from "date-fns"

import { RequestStatuses } from "@enums/requestStatuses.enum"
import {
  createActivityAction,
  deleteActivityAction,
  editActivityAction,
} from "@features/activities/activitiesActions"

import { InitialState } from "./calendarScheduler.types"
import { getEventsForCurrentMonthAction } from "./calendarSchedulerActions"

const initialState: InitialState = {
  events: [],
  eventsStatus: RequestStatuses.IDLE,
  eventsError: "",
  selectedDate: format(new Date(), "yyyy-MM-dd"),
  dayEvents: [],
}

export const calendarSchedulerSlice = createSlice({
  name: "calendarScheduler",
  initialState,
  reducers: {
    setSelectedDate(state, action) {
      state.selectedDate = action.payload
      state.dayEvents = state.events.filter((event) => {
        return format(parseISO(event.date as string), "yyyy-MM-dd") === action.payload
      })
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getEventsForCurrentMonthAction.pending, (state) => {
      state.eventsStatus = RequestStatuses.LOADING
    })
    builder.addCase(getEventsForCurrentMonthAction.fulfilled, (state, action) => {
      state.eventsStatus = RequestStatuses.SUCCESS
      state.events = action.payload.events

      if (action.payload.shouldSetDayEvents) {
        state.dayEvents = state.events.filter(
          (event) => format(parseISO(event.date as string), "yyyy-MM-dd") === state.selectedDate
        )
      }
    })
    builder.addCase(getEventsForCurrentMonthAction.rejected, (state, action) => {
      if (action.payload) {
        state.eventsStatus = RequestStatuses.FAILED
        state.eventsError = action.payload
      }
    })
    builder.addCase(createActivityAction.fulfilled, (state, action) => {
      state.events = [...state.events, action.payload]

      if (state.selectedDate === format(new Date(action.payload.date), "yyyy-MM-dd")) {
        state.dayEvents = [...state.dayEvents, action.payload]
      }
    })
    builder.addCase(editActivityAction.fulfilled, (state, action) => {
      const newDate = format(new Date(action.payload.date), "yyyy-MM-dd")

      state.events = state.events.map((event) =>
        event._id === action.payload._id ? action.payload : event
      )

      if (newDate !== state.selectedDate) {
        state.dayEvents = state.dayEvents.filter((dayEvent) => dayEvent._id !== action.payload._id)
      } else {
        state.dayEvents = state.dayEvents.map((dayEvent) =>
          dayEvent._id === action.payload._id ? action.payload : dayEvent
        )
      }
    })
    builder.addCase(deleteActivityAction.fulfilled, (state, action) => {
      state.events = state.events.filter((event) => event._id !== action.payload._id)
      state.dayEvents = state.dayEvents?.filter((dayEvent) => dayEvent._id !== action.payload._id)
    })
  },
})

export const { setSelectedDate } = calendarSchedulerSlice.actions

export default calendarSchedulerSlice.reducer
