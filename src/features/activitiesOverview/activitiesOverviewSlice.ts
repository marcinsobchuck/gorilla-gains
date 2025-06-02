import { createSlice, isAnyOf } from "@reduxjs/toolkit"
import uniqBy from "lodash.uniqby"

import { ExerciseSet } from "@api/types/activitiesService.types"
import { RequestStatuses } from "@enums/requestStatuses.enum"
import {
  createActivityAction,
  deleteActivityAction,
  editActivityAction,
} from "@features/activities/activitiesActions"
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
  chartFilters: [],
  shouldRefetchActivitiesForActivityType: true,
}

export const activitiesOverviewSlice = createSlice({
  name: "activitiesOverview",
  initialState,
  reducers: {
    setActiveFilterTab(state, action) {
      state.activeFilterTab = action.payload
      state.shouldRefetchActivitiesForActivityType = true
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
    setShouldRefetchActivitiesForActivityType(state, action) {
      state.shouldRefetchActivitiesForActivityType = action.payload
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
        const exercisesNames = action.payload.flatMap((activity) =>
          activity.exercises.map((ex) => {
            return { value: ex.exercise._id, labelText: ex.exercise.name }
          })
        )

        const chartFilters = uniqBy(exercisesNames, (ex) => ex.value).sort((a, b) =>
          a.labelText.localeCompare(b.labelText)
        )

        state.chartFilters = chartFilters
        state.activeFilterExercise = chartFilters[0].value
        state.activeChartCombination = {
          xAxis: "date",
          yAxis: getAvailableChartOptions(
            getAvailableChartMetrics(action.payload, chartFilters[0].value)
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
    builder.addMatcher(
      isAnyOf(
        createActivityAction.fulfilled,
        deleteActivityAction.fulfilled,
        editActivityAction.fulfilled
      ),
      (state, action) => {
        if (action.payload.type._id === state.activeFilterTab) {
          state.shouldRefetchActivitiesForActivityType = true
          state.activeFilterExercise = state.chartFilters[0].value
          if (state.activities.length > 0) {
            state.activeChartCombination = {
              xAxis: "date",
              yAxis: getAvailableChartOptions(
                getAvailableChartMetrics(state.activities, state.chartFilters[0].value)
              )[0].value as keyof ExerciseSet,
            }
          }
        }
      }
    )
  },
})

export const {
  setActiveFilterTab,
  setActiveFilterExercise,
  setActiveChartCombination,
  addChartActivity,
  editChartActivity,
  deleteChartActivity,
  setShouldRefetchActivitiesForActivityType,
} = activitiesOverviewSlice.actions
export default activitiesOverviewSlice.reducer
