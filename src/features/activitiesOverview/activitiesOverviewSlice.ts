import { createSlice } from "@reduxjs/toolkit"

import { ExerciseSet } from "@api/types/activitiesService.types"
import { RequestStatuses } from "@enums/requestStatuses.enum"
import {
  getAvailableChartMetrics,
  getAvailableChartOptions,
} from "@pages/ActivityHistory/components/ActivitiesInfo/components/ActivitiesOverview/components/ActivitiesCharts/utils"

import { InitialState } from "./activitiesOverview.types"
import { getActivitiesForActivityTypeAction } from "./activitiesOverviewActions"

const initialState: InitialState = {
  activitiesStatus: RequestStatuses.IDLE,
  activities: [],
  activeFilterTab: "",
  activeFilterExercise: "",
  activeChartCombination: {
    xAxis: "",
    yAxis: "",
  },
}

export const activitiesOverviewSlice = createSlice({
  name: "activitiesOverview",
  initialState,
  reducers: {
    setActiveFilterTab(state, action) {
      state.activeFilterTab = action.payload
    },
    setActiveFilterExercise(state, action) {
      state.activeFilterExercise = action.payload
    },
    setActiveChartCombination(state, action) {
      state.activeChartCombination = action.payload
    },
    addChartActivity(state, action) {
      state.activities = [action.payload, ...state.activities]
    },
    editChartActivity(state, action) {
      const isActivityInPast = new Date(action.payload.date) < new Date()
      if (isActivityInPast) {
        state.activities = state.activities?.map((activity) => {
          if (activity._id === action.payload._id) {
            return action.payload
          }
          return activity
        })
      } else {
        state.activities = state.activities.filter(
          (activity) => activity._id !== action.payload._id
        )
      }
    },
    deleteChartActivity(state, action) {
      state.activities = state.activities.filter((activity) => activity._id !== action.payload)
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getActivitiesForActivityTypeAction.pending, (state) => {
      state.activitiesStatus = RequestStatuses.LOADING
    })
    builder.addCase(getActivitiesForActivityTypeAction.fulfilled, (state, action) => {
      state.activitiesStatus = RequestStatuses.SUCCESS
      state.activities = action.payload

      if (action.payload.length > 0) {
        state.activeFilterExercise = action.payload[0].exercises[0].exercise._id
        state.activeChartCombination = {
          xAxis: "date",
          yAxis: getAvailableChartOptions(
            getAvailableChartMetrics(action.payload, action.payload[0].exercises[0].exercise._id)
          )[0].value as keyof ExerciseSet,
        }
      }
    })
    builder.addCase(getActivitiesForActivityTypeAction.rejected, (state, action) => {
      state.activitiesStatus = RequestStatuses.FAILED
      if (action.payload) {
        state.activitiesError = action.payload
      }
    })
  },
})

export const {
  setActiveFilterTab,
  setActiveFilterExercise,
  setActiveChartCombination,
  addChartActivity,
  editChartActivity,
  deleteChartActivity,
} = activitiesOverviewSlice.actions
export default activitiesOverviewSlice.reducer
