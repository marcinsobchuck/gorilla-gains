import { createSlice, isAnyOf } from "@reduxjs/toolkit"

import { RequestStatuses } from "@enums/requestStatuses.enum"

import { createActivityAction } from "./activitiesActions"
import { InitialState } from "./activitiesSlice.types"

const initialState: InitialState = {
  status: RequestStatuses.IDLE,
}

export const userSlice = createSlice({
  name: "activities",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(isAnyOf(createActivityAction.pending), (state) => {
      state.status = RequestStatuses.LOADING
    })
    builder.addMatcher(isAnyOf(createActivityAction.fulfilled), (state, action) => {
      state.data = action.payload
      state.status = RequestStatuses.SUCCESS
    })
    builder.addMatcher(isAnyOf(createActivityAction.rejected), (state, action) => {
      state.status = RequestStatuses.FAILED
      if (action.payload) {
        state.error = action.payload
      }
    })
  },
})

export default userSlice.reducer
