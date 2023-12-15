import { createSlice } from "@reduxjs/toolkit"

import { RequestStatuses } from "@enums/requestStatuses.enum"

import { InitialState } from "./activityTypes.types"
import { getActivityTypesAction } from "./activityTypesActions"

const initialState: InitialState = {
  status: RequestStatuses.IDLE,
}

export const activityTypesSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getActivityTypesAction.pending, (state) => {
      state.status = RequestStatuses.LOADING
    })
    builder.addCase(getActivityTypesAction.fulfilled, (state, action) => {
      state.status = RequestStatuses.SUCCESS
      state.data = action.payload
    })
    builder.addCase(getActivityTypesAction.rejected, (state, action) => {
      state.status = RequestStatuses.FAILED
      if (action.payload) {
        state.error = action.payload
      }
    })
  },
})

export default activityTypesSlice.reducer
