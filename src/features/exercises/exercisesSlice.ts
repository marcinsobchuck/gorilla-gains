import { createSlice } from "@reduxjs/toolkit"

import { RequestStatuses } from "@enums/requestStatuses.enum"

import { InitialState } from "./exercises.types"
import { getExercisesAction } from "./exercisesActions"

const initialState: InitialState = {
  status: RequestStatuses.IDLE,
}

export const exercisesSlice = createSlice({
  name: "exercises",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getExercisesAction.pending, (state) => {
      state.status = RequestStatuses.LOADING
    })
    builder.addCase(getExercisesAction.fulfilled, (state, action) => {
      state.status = RequestStatuses.SUCCESS
      state.data = action.payload
    })
    builder.addCase(getExercisesAction.rejected, (state, action) => {
      state.status = RequestStatuses.FAILED
      if (action.payload) {
        state.error = action.payload
      }
    })
  },
})

export default exercisesSlice.reducer
