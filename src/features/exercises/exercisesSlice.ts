import { createSlice } from "@reduxjs/toolkit"

import { RequestStatuses } from "@enums/requestStatuses.enum"

import { InitialState } from "./exercises.types"
import { getExercisesByActivityTypeAction } from "./exercisesActions"

const initialState: InitialState = {
  status: RequestStatuses.IDLE,
}

export const exercisesSlice = createSlice({
  name: "exercises",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getExercisesByActivityTypeAction.pending, (state) => {
      state.status = RequestStatuses.LOADING
    })
    builder.addCase(getExercisesByActivityTypeAction.fulfilled, (state, action) => {
      state.status = RequestStatuses.SUCCESS
      state.data = action.payload
    })
    builder.addCase(getExercisesByActivityTypeAction.rejected, (state, action) => {
      state.status = RequestStatuses.FAILED
      if (action.payload) {
        state.error = action.payload
      }
    })
  },
})

export default exercisesSlice.reducer
