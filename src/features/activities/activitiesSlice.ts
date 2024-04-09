import { PayloadAction, createSlice, isAnyOf } from "@reduxjs/toolkit"

import { RequestStatuses } from "@enums/requestStatuses.enum"

import {
  createActivityAction,
  editActivityAction,
  getActivitiesForCurrentUserAction,
} from "./activitiesActions"
import { InitialState } from "./activitiesSlice.types"

const initialState: InitialState = {
  status: RequestStatuses.IDLE,
  presetsStatus: RequestStatuses.IDLE,
}

export const userSlice = createSlice({
  name: "activities",
  initialState,
  reducers: {
    removePreset(state, action: PayloadAction<string>) {
      state.presetsData = state.presetsData?.filter((preset) => preset._id !== action.payload)
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getActivitiesForCurrentUserAction.pending, (state) => {
      state.presetsStatus = RequestStatuses.LOADING
    })
    builder.addCase(getActivitiesForCurrentUserAction.fulfilled, (state, action) => {
      state.presetsData = action.payload
      state.presetsStatus = RequestStatuses.SUCCESS
    })
    builder.addCase(getActivitiesForCurrentUserAction.rejected, (state, action) => {
      state.presetsStatus = RequestStatuses.FAILED
      if (action.payload) {
        state.error = action.payload
      }
    })
    builder.addMatcher(
      isAnyOf(createActivityAction.pending, editActivityAction.pending),
      (state) => {
        state.status = RequestStatuses.LOADING
      }
    )
    builder.addMatcher(
      isAnyOf(createActivityAction.fulfilled, editActivityAction.fulfilled),
      (state, action) => {
        state.data = action.payload
        state.status = RequestStatuses.SUCCESS
      }
    )
    builder.addMatcher(
      isAnyOf(createActivityAction.rejected, editActivityAction.rejected),
      (state, action) => {
        state.status = RequestStatuses.FAILED
        if (action.payload) {
          state.error = action.payload
        }
      }
    )
  },
})

export default userSlice.reducer
export const { removePreset } = userSlice.actions
