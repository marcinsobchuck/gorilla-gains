import { PayloadAction, createSlice, isAnyOf } from "@reduxjs/toolkit"

import { RequestStatuses } from "@enums/requestStatuses.enum"

import {
  createActivityAction,
  editActivityAction,
  getActivitiesForCurrentUserAction,
  getPresetsForCurrentUserAction,
} from "./activitiesActions"
import { InitialState } from "./activitiesSlice.types"

const initialState: InitialState = {
  activitiesStatus: RequestStatuses.IDLE,
  createEditStatus: RequestStatuses.IDLE,
  presetsStatus: RequestStatuses.IDLE,
  activitiesPage: 1,
  hasMore: true,
}

export const userSlice = createSlice({
  name: "activities",
  initialState,
  reducers: {
    removePreset(state, action: PayloadAction<string>) {
      state.presetsData = state.presetsData?.filter((preset) => preset._id !== action.payload)
    },
    setActivitiesPage(state, action) {
      state.activitiesPage = action.payload
    },
    setHasMore(state, action) {
      state.hasMore = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getActivitiesForCurrentUserAction.pending, (state) => {
      state.activitiesStatus = RequestStatuses.LOADING
    })
    builder.addCase(getActivitiesForCurrentUserAction.fulfilled, (state, action) => {
      state.activitiesData = [...(state.activitiesData || []), ...action.payload]
      state.activitiesStatus = RequestStatuses.SUCCESS
    })
    builder.addCase(getActivitiesForCurrentUserAction.rejected, (state, action) => {
      state.activitiesStatus = RequestStatuses.FAILED
      if (action.payload) {
        state.activitiesError = action.payload
      }
    })

    builder.addCase(getPresetsForCurrentUserAction.pending, (state) => {
      state.presetsStatus = RequestStatuses.LOADING
    })
    builder.addCase(getPresetsForCurrentUserAction.fulfilled, (state, action) => {
      state.presetsData = action.payload
      state.presetsStatus = RequestStatuses.SUCCESS
    })
    builder.addCase(getPresetsForCurrentUserAction.rejected, (state, action) => {
      state.presetsStatus = RequestStatuses.FAILED
      if (action.payload) {
        state.presetsError = action.payload
      }
    })

    builder.addMatcher(
      isAnyOf(createActivityAction.pending, editActivityAction.pending),
      (state) => {
        state.createEditStatus = RequestStatuses.LOADING
      }
    )
    builder.addMatcher(
      isAnyOf(createActivityAction.fulfilled, editActivityAction.fulfilled),
      (state, action) => {
        state.createEditData = action.payload
        state.createEditStatus = RequestStatuses.SUCCESS
      }
    )
    builder.addMatcher(
      isAnyOf(createActivityAction.rejected, editActivityAction.rejected),
      (state, action) => {
        state.createEditStatus = RequestStatuses.FAILED
        if (action.payload) {
          state.createEditError = action.payload
        }
      }
    )
  },
})

export default userSlice.reducer
export const { removePreset, setActivitiesPage, setHasMore } = userSlice.actions
