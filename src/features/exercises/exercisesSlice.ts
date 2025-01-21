import { createSlice } from "@reduxjs/toolkit"

import { RequestStatuses } from "@enums/requestStatuses.enum"

import { InitialState } from "./exercises.types"
import { getExercisesAction, getExercisesForActivityTypeAction } from "./exercisesActions"

const initialState: InitialState = {
  selectInputStatus: RequestStatuses.IDLE,
  searchExercisesDataStatus: RequestStatuses.IDLE,
  activeExercise: null,
  activeActivityTypeFilter: [],
  hasMore: true,
  limit: 9,
  selectInputData: [],
  searchExercisesData: [],
  searchExercisesInputValue: "",
}

export const exercisesSlice = createSlice({
  name: "exercises",
  initialState,
  reducers: {
    setSearchExercisesInputValue(state, action) {
      state.searchExercisesInputValue = action.payload
    },
    toggleAddRemoveActivityTypeFilter(state, action) {
      if (Array.isArray(state.activeActivityTypeFilter)) {
        if (state.activeActivityTypeFilter.includes(action.payload)) {
          state.activeActivityTypeFilter = state.activeActivityTypeFilter.filter(
            (activityType) => activityType !== action.payload
          )
        } else {
          state.activeActivityTypeFilter.push(action.payload)
        }
      }
    },
    resetSearchExercisesData(state) {
      state.searchExercisesData = []
    },
    setActiveExercise(state, action) {
      state.activeExercise = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getExercisesAction.pending, (state) => {
      state.searchExercisesDataStatus = RequestStatuses.LOADING
    })
    builder.addCase(getExercisesAction.fulfilled, (state, action) => {
      state.searchExercisesDataStatus = RequestStatuses.SUCCESS
      state.hasMore = action.payload.length > 0
      state.searchExercisesData = [...state.searchExercisesData, ...action.payload]
    })
    builder.addCase(getExercisesAction.rejected, (state, action) => {
      state.searchExercisesDataStatus = RequestStatuses.FAILED
      if (action.payload) {
        state.searchExercisesDataError = action.payload
      }
    })
    builder.addCase(getExercisesForActivityTypeAction.pending, (state) => {
      state.selectInputStatus = RequestStatuses.LOADING
    })
    builder.addCase(getExercisesForActivityTypeAction.fulfilled, (state, action) => {
      state.selectInputStatus = RequestStatuses.SUCCESS
      state.selectInputData = action.payload
    })
    builder.addCase(getExercisesForActivityTypeAction.rejected, (state, action) => {
      state.selectInputStatus = RequestStatuses.FAILED
      if (action.payload) {
        state.selectInputError = action.payload
      }
    })
  },
})

export const {
  setSearchExercisesInputValue,
  toggleAddRemoveActivityTypeFilter,
  resetSearchExercisesData,
  setActiveExercise,
} = exercisesSlice.actions
export default exercisesSlice.reducer
