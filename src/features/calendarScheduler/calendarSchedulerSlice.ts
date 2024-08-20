import { createSlice } from "@reduxjs/toolkit"

import { RequestStatuses } from "@enums/requestStatuses.enum"

import { InitialState } from "./calendarScheduler.types"
import { getEventsForCurrentMonthAction } from "./calendarSchedulerActions"

const initialState: InitialState = {
  events: [],
  eventsStatus: RequestStatuses.IDLE,
  eventsError: "",
  selectedDate: "",
}

export const calendarSchedulerSlice = createSlice({
  name: "calendarScheduler",
  initialState,
  reducers: {
    setSelectedDate(state, action) {
      state.selectedDate = action.payload
    },
    addEvent(state, action) {
      state.events = [action.payload, ...state.events]
    },
    removeEvent(state, action) {
      state.events = state.events.filter((event) => event.id !== action.payload)
    },
    editEvent(state, action) {
      state.events = state.events.map((event) => {
        if (event.id === action.payload.id) {
          return action.payload
        }
        return event
      })
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getEventsForCurrentMonthAction.pending, (state) => {
      state.eventsStatus = RequestStatuses.LOADING
    })
    builder.addCase(getEventsForCurrentMonthAction.fulfilled, (state, action) => {
      state.eventsStatus = RequestStatuses.SUCCESS
      state.events = action.payload
    })
    builder.addCase(getEventsForCurrentMonthAction.rejected, (state, action) => {
      if (action.payload) {
        state.eventsStatus = RequestStatuses.FAILED
        state.eventsError = action.payload
      }
    })
  },
})

export const { addEvent, editEvent, removeEvent, setSelectedDate } = calendarSchedulerSlice.actions

export default calendarSchedulerSlice.reducer
