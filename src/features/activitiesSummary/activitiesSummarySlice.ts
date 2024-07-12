import { createSlice } from "@reduxjs/toolkit"

import { RequestStatuses } from "@enums/requestStatuses.enum"

import { InitialState } from "./activitiesSummary.types"
import { getActivitiesSummaryAction } from "./activitiesSummaryActions"

const initialState: InitialState = {
  activitiesSummaryData: null,
  activitiesSummaryStatus: RequestStatuses.IDLE,
}

export const activitiesSummarySlice = createSlice({
  name: "activitiesSummary",
  initialState,
  reducers: {},
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
  },
})

export default activitiesSummarySlice.reducer
