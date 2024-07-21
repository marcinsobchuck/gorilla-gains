import { createSlice, isAnyOf } from "@reduxjs/toolkit"

import { RequestStatuses } from "@enums/requestStatuses.enum"
import {
  createActivityAction,
  deleteActivityAction,
  editActivityAction,
} from "@features/activities/activitiesActions"

import { InitialState } from "./activitiesSummary.types"
import {
  getActivitiesSummaryAction,
  getWeeklyActivitiesDataAction,
} from "./activitiesSummaryActions"

const initialState: InitialState = {
  lastActivity: null,
  musclesHit: null,
  activitiesSummaryData: null,
  activitiesSummaryStatus: RequestStatuses.IDLE,
  weeklyActivitiesDataStatus: RequestStatuses.IDLE,
  shouldRefetchSummary: true,
}

export const activitiesSummarySlice = createSlice({
  name: "activitiesSummary",
  initialState,
  reducers: {
    setShouldRefetchSummary(state, action) {
      state.shouldRefetchSummary = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getActivitiesSummaryAction.pending, (state) => {
      state.activitiesSummaryStatus = RequestStatuses.LOADING
    })
    builder.addCase(getActivitiesSummaryAction.fulfilled, (state, action) => {
      state.activitiesSummaryData = action.payload
      state.activitiesSummaryStatus = RequestStatuses.SUCCESS
    })
    builder.addCase(getActivitiesSummaryAction.rejected, (state, action) => {
      if (action.payload) {
        state.activitiesSummaryError = action.payload
      }
      state.activitiesSummaryStatus = RequestStatuses.FAILED
    })
    builder.addCase(getWeeklyActivitiesDataAction.pending, (state) => {
      state.weeklyActivitiesDataStatus = RequestStatuses.LOADING
    })
    builder.addCase(getWeeklyActivitiesDataAction.fulfilled, (state, action) => {
      state.lastActivity = action.payload.lastActivity
      state.musclesHit = action.payload.musclesHit
      state.weeklyActivitiesDataStatus = RequestStatuses.SUCCESS
    })
    builder.addCase(getWeeklyActivitiesDataAction.rejected, (state, action) => {
      if (action.payload) {
        state.weeklyActivitiesDataError = action.payload
      }
      state.weeklyActivitiesDataStatus = RequestStatuses.FAILED
    })
    builder.addMatcher(
      isAnyOf(
        createActivityAction.fulfilled,
        deleteActivityAction.fulfilled,
        editActivityAction.fulfilled
      ),
      (state) => {
        state.shouldRefetchSummary = true
      }
    )
  },
})

export default activitiesSummarySlice.reducer

export const { setShouldRefetchSummary } = activitiesSummarySlice.actions
