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
  isActiveEventOpen: false,
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
    setActiveEvent(state, action) {
      state.activeEvent = state.dayEvents.find((dayEvent) => dayEvent._id === action.payload)
    },
    setIsActiveEventOpen(state, action) {
      state.isActiveEventOpen = action.payload
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
      state.isActiveEventOpen = false

      if (format(new Date(action.payload.date), "yyyy-MM-dd") !== state.selectedDate) {
        state.dayEvents = state.dayEvents.filter(
          (dayEvent) => dayEvent._id !== state.activeEvent?._id
        )
        state.events = state.events.filter((event) => event._id !== state.activeEvent?._id)
        state.events = [...state.events, action.payload]
      } else {
        state.dayEvents = state.dayEvents.map((dayEvent) =>
          dayEvent._id === action.payload._id ? action.payload : dayEvent
        )
        state.events = state.events.map((event) =>
          event._id === action.payload._id ? action.payload : event
        )
      }
      state.activeEvent = undefined
    })
    builder.addCase(deleteActivityAction.fulfilled, (state, action) => {
      state.isActiveEventOpen = false
      state.events = state.events.filter((event) => event._id !== action.payload._id)
      if (action.payload._id === state.activeEvent?._id) {
        state.activeEvent = undefined
      }
      state.dayEvents = state.dayEvents?.filter((dayEvent) => dayEvent._id !== action.payload._id)
    })
  },
})

export const { setSelectedDate, setActiveEvent, setIsActiveEventOpen } =
  calendarSchedulerSlice.actions

export default calendarSchedulerSlice.reducer
