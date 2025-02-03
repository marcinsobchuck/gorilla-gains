import { createSlice } from "@reduxjs/toolkit"
import { toast } from "react-toastify"

import { RequestStatuses } from "@enums/requestStatuses.enum"

import { InitialState } from "./exercises.types"
import {
  getExercisesAction,
  getExercisesForActivityTypeAction,
  getFavouriteExercisesAction,
  toggleFavouriteExerciseAction,
} from "./exercisesActions"

const initialState: InitialState = {
  selectInputStatus: RequestStatuses.IDLE,
  searchExercisesDataStatus: RequestStatuses.IDLE,
  favouriteExercisesStatus: RequestStatuses.IDLE,
  toggleFavouriteExerciseStatus: RequestStatuses.IDLE,
  activeExercise: null,
  activeActivityTypeFilter: [],
  hasMore: true,
  limit: 9,
  selectInputData: [],
  searchExercisesData: [],
  favouriteExercises: [],
  shouldFetchFavouriteExercises: true,
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
    setShouldFetchFavouriteExercises(state, action) {
      state.shouldFetchFavouriteExercises = action.payload
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
    builder.addCase(getFavouriteExercisesAction.pending, (state) => {
      state.favouriteExercisesStatus = RequestStatuses.LOADING
    })
    builder.addCase(getFavouriteExercisesAction.fulfilled, (state, action) => {
      state.favouriteExercisesStatus = RequestStatuses.SUCCESS
      state.favouriteExercises = action.payload
      state.shouldFetchFavouriteExercises = false
    })
    builder.addCase(getFavouriteExercisesAction.rejected, (state, action) => {
      state.favouriteExercisesStatus = RequestStatuses.FAILED
      if (action.payload) {
        state.favouriteExercisesError = action.payload
      }
    })
    builder.addCase(toggleFavouriteExerciseAction.pending, (state) => {
      state.toggleFavouriteExerciseStatus = RequestStatuses.LOADING
    })
    builder.addCase(toggleFavouriteExerciseAction.fulfilled, (state, action) => {
      state.toggleFavouriteExerciseStatus = RequestStatuses.SUCCESS
      state.shouldFetchFavouriteExercises = true

      toast(`Successfully ${action.payload === "delete" ? "deleted" : "added"} to favourites`)
    })
    builder.addCase(toggleFavouriteExerciseAction.rejected, (state, action) => {
      state.toggleFavouriteExerciseStatus = RequestStatuses.FAILED
      if (action.payload) {
        state.toggleFavouriteExerciseError = action.payload
        toast("There was a problem adding exercise to favourites")
      }
    })
  },
})

export const {
  setSearchExercisesInputValue,
  toggleAddRemoveActivityTypeFilter,
  resetSearchExercisesData,
  setActiveExercise,
  setShouldFetchFavouriteExercises,
} = exercisesSlice.actions
export default exercisesSlice.reducer
