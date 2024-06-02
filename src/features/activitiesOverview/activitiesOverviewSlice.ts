import { createSlice } from "@reduxjs/toolkit"

import { ActivityTypes } from "@enums/activityTypes.enum"
import { RequestStatuses } from "@enums/requestStatuses.enum"

import { InitialState } from "./activitiesOverview.types"
import { getActivitiesForActivityTypeAction } from "./activitiesOverviewActions"

const initialState: InitialState = {
  activitiesStatus: RequestStatuses.IDLE,
  activities: [],
  activeFilterTab: ActivityTypes.STRENGTH,
}

export const activitiesOverviewSlice = createSlice({
  name: "activitiesOverview",
  initialState,
  reducers: {
    setActiveFilterTab(state, action) {
      state.activeFilterTab = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getActivitiesForActivityTypeAction.pending, (state) => {
      state.activitiesStatus = RequestStatuses.LOADING
    })
    builder.addCase(getActivitiesForActivityTypeAction.fulfilled, (state, action) => {
      state.activities = action.payload
      state.activitiesStatus = RequestStatuses.SUCCESS
    })
    builder.addCase(getActivitiesForActivityTypeAction.rejected, (state, action) => {
      state.activitiesStatus = RequestStatuses.FAILED
      if (action.payload) {
        state.activitiesError = action.payload
      }
    })
  },
})

export const { setActiveFilterTab } = activitiesOverviewSlice.actions
export default activitiesOverviewSlice.reducer
