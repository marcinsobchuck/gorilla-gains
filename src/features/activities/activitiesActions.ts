import { isAxiosError } from "axios"

import {
  createActivity,
  deleteActivity,
  editActivity,
  getActivitiesForCurrentUser,
} from "@api/activitiesService"
import {
  EditActivityParams,
  GetActivitiesForCurrentUserParams,
} from "@api/types/activitiesService.types"
import { createAppAsyncThunk } from "@app/hooks"
import {
  addChartActivity,
  deleteChartActivity,
  editChartActivity,
  setActiveFilterExercise,
} from "@features/activitiesOverview/activitiesOverviewSlice"
import {
  addHistoryEvent,
  editHistoryEvent,
  removeHistoryEvent,
} from "@features/historyCalendar/historyCalendarSlice"

import {
  resetActivitiesData,
  setActiveActivity,
  setCurrentlyProcessedActivityId,
  setHasMore,
  setShouldFetchActivities,
} from "./activitiesSlice"
import { CreateActivityParams } from "./activitiesSlice.types"
import { isNewActivityWithinInterval } from "./utils"

export const createActivityAction = createAppAsyncThunk(
  "createActivity",
  async (data: CreateActivityParams, { rejectWithValue, dispatch, getState }) => {
    try {
      const response = await createActivity(data.data)

      if (data.data.date < new Date()) {
        dispatch(addHistoryEvent(response.data))
      }

      const activeFilterTab = getState().activitiesOverview.activeFilterTab
      const activities = getState().activities.activitiesData
      const selectedDate = getState().activities.selectedDate
      const isNewActivityInThePast = new Date(response.data.date) < new Date()

      if (!selectedDate) {
        const activityDate = data.data.date
        const start =
          activities.length > 0
            ? activities[activities.length - 1].date
            : activityDate.toISOString()
        const end = new Date().toISOString()

        if (isNewActivityWithinInterval({ activityDate, start, end })) {
          dispatch(resetActivitiesData())
          dispatch(setShouldFetchActivities(true))
          dispatch(setHasMore(true))
        } else if (isNewActivityInThePast) {
          dispatch(setHasMore(true))
        }
      }

      if (getState().activitiesOverview.activities.length === 0) {
        dispatch(setActiveFilterExercise(response.data.exercises[0].exercise._id))
      }

      if (data.data.type === activeFilterTab && isNewActivityInThePast) {
        dispatch(addChartActivity(response.data))
      }

      return response.data
    } catch (error) {
      if (isAxiosError(error)) {
        return rejectWithValue(error.response?.data)
      } else {
        console.log(error)
        return rejectWithValue("Something went wrong")
      }
    }
  }
)

export const getActivitiesForCurrentUserAction = createAppAsyncThunk(
  "getActivitiesForCurrentUser",
  async (data: GetActivitiesForCurrentUserParams, { rejectWithValue }) => {
    try {
      const response = await getActivitiesForCurrentUser(data)

      return response.data
    } catch (error) {
      if (isAxiosError(error)) {
        return rejectWithValue(error.response?.data)
      } else {
        return rejectWithValue("Something went wrong")
      }
    }
  }
)

export const getActivitiesForSelectedDate = createAppAsyncThunk(
  "getActivitiesForSelectedDate",
  async (data: GetActivitiesForCurrentUserParams, { rejectWithValue }) => {
    try {
      const response = await getActivitiesForCurrentUser({
        startDate: data.startDate,
        endDate: data.endDate,
        pastOnly: data.pastOnly,
      })
      return response.data
    } catch (error) {
      if (isAxiosError(error)) {
        return rejectWithValue(error.response?.data)
      } else {
        return rejectWithValue("Something went wrong")
      }
    }
  }
)

export const editActivityAction = createAppAsyncThunk(
  "editActivity",
  async (data: EditActivityParams, { rejectWithValue, dispatch, getState }) => {
    try {
      dispatch(setCurrentlyProcessedActivityId(data.activityId))
      const response = await editActivity(data)

      dispatch(editHistoryEvent(response.data))

      const activeFilterTab = getState().activitiesOverview.activeFilterTab
      const activities = getState().activities.activitiesData
      const activityDate = data.dataToEdit.date
      const selectedDate = getState().activities.selectedDate
      const isEditedActivityInThePast = new Date(response.data.date) < new Date()

      if (activityDate && !selectedDate) {
        const start =
          activities.length > 0
            ? activities[activities.length - 1].date
            : activityDate.toISOString()
        const end = new Date().toISOString()

        if (
          isNewActivityWithinInterval({ activityDate, start, end }) ||
          isEditedActivityInThePast
        ) {
          dispatch(resetActivitiesData())
          dispatch(setShouldFetchActivities(true))
          dispatch(setHasMore(true))
        }
      }

      if (data.dataToEdit.type === activeFilterTab && isEditedActivityInThePast) {
        dispatch(editChartActivity(response.data))
      }

      return response.data
    } catch (error) {
      if (isAxiosError(error)) {
        return rejectWithValue(error.response?.data)
      } else {
        return rejectWithValue("Something went wrong")
      }
    }
  }
)

export const deleteActivityAction = createAppAsyncThunk(
  "deleteActivity",
  async (activityId: string, { rejectWithValue, dispatch, getState }) => {
    try {
      dispatch(setCurrentlyProcessedActivityId(activityId))

      const response = await deleteActivity(activityId)

      dispatch(removeHistoryEvent(activityId))
      dispatch(deleteChartActivity(activityId))

      if (activityId === getState().activities.activeActivity?._id) {
        dispatch(setActiveActivity({}))
      }

      return response.data
    } catch (error) {
      if (isAxiosError(error)) {
        return rejectWithValue(error.response?.data)
      } else {
        return rejectWithValue("Something went wrong")
      }
    }
  }
)
