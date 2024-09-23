import { createSlice } from "@reduxjs/toolkit"

import { RequestStatuses } from "@enums/requestStatuses.enum"

import { InitialState } from "./historyCalendar.types"
import { getHistoryEventsForCurrentMonthAction } from "./historyCalendarActions"

const initialState: InitialState = {
  events: [],
  eventsStatus: RequestStatuses.IDLE,
  eventsError: "",
}

export const historyCalendarSlice = createSlice({
  name: "historyCalendar",
  initialState,
  reducers: {
    addHistoryEvent(state, action) {
      state.events = [action.payload, ...state.events]
    },
    removeHistoryEvent(state, action) {
      state.events = state.events.filter((event) => event.id !== action.payload)
    },
    editHistoryEvent(state, action) {
      const isEventInThePast = new Date(action.payload.date) <= new Date()

      if (isEventInThePast) {
        state.events = state.events.map((event) => {
          if (event.id === action.payload.id) {
            return action.payload
          }
          return event
        })
      } else {
        state.events = state.events.filter((event) => event.id !== action.payload.id)
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getHistoryEventsForCurrentMonthAction.pending, (state) => {
      state.eventsStatus = RequestStatuses.LOADING
    })
    builder.addCase(getHistoryEventsForCurrentMonthAction.fulfilled, (state, action) => {
      state.eventsStatus = RequestStatuses.SUCCESS
      state.events = action.payload
    })
    builder.addCase(getHistoryEventsForCurrentMonthAction.rejected, (state, action) => {
      if (action.payload) {
        state.eventsStatus = RequestStatuses.FAILED
        state.eventsError = action.payload
      }
    })
  },
})
export const { addHistoryEvent, removeHistoryEvent, editHistoryEvent } =
  historyCalendarSlice.actions

export default historyCalendarSlice.reducer
