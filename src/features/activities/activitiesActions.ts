import { isAxiosError } from "axios"
import { isWithinInterval, parseISO } from "date-fns"

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
  toggleIsPreset,
} from "./activitiesSlice"
import { CreateActivityParams } from "./activitiesSlice.types"

const isNewActivityWithinInterval = ({
  start,
  end,
  activityDate,
}: {
  start: string
  end: string
  activityDate: Date
}) => {
  return isWithinInterval(activityDate, {
    start: parseISO(start),
    end: parseISO(end),
  })
}

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

      if (activities.length > 0 && !selectedDate) {
        const activityDate = data.data.date
        const start = activities[activities.length - 1].date
        const end = new Date().toISOString()
        const limit = getState().activities.limit

        if (
          isNewActivityWithinInterval({ activityDate, start, end }) ||
          activities.length < limit
        ) {
          dispatch(resetActivitiesData())
          dispatch(setShouldFetchActivities(true))
        }
      }

      if (getState().activitiesOverview.activities.length === 0) {
        dispatch(setActiveFilterExercise(response.data.exercises[0].exercise._id))
      }

      if (data.data.type === activeFilterTab) {
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

export const getPresetsForCurrentUserAction = createAppAsyncThunk(
  "getPresetsForCurrentUser",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getActivitiesForCurrentUser({
        isPreset: true,
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
export const getActivitiesForCurrentUserAction = createAppAsyncThunk(
  "getActivitiesForCurrentUser",
  async (data: GetActivitiesForCurrentUserParams, { rejectWithValue, dispatch, getState }) => {
    try {
      const limit = getState().activities.limit

      const response = await getActivitiesForCurrentUser(data)

      if (response.data.length < limit) {
        dispatch(setHasMore(false))
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
      const {
        activities: { isEditing },
      } = getState()
      dispatch(setCurrentlyProcessedActivityId(data.activityId))
      const response = await editActivity(data)

      dispatch(editHistoryEvent(response.data))

      const activeFilterTab = getState().activitiesOverview.activeFilterTab
      const activities = getState().activities.activitiesData
      const activityDate = data.dataToEdit.date
      const selectedDate = getState().activities.selectedDate

      if (activityDate && activities.length > 0 && !selectedDate) {
        const start = activities[activities.length - 1].date
        const end = new Date().toISOString()

        const isEditedActivityInThePast = new Date(response.data.date) < new Date()

        if (
          isNewActivityWithinInterval({ activityDate, start, end }) ||
          isEditedActivityInThePast
        ) {
          dispatch(resetActivitiesData())
          dispatch(setShouldFetchActivities(true))
        }
      }

      if (data.dataToEdit.type === activeFilterTab) {
        dispatch(editChartActivity(response.data))
      }

      if (!isEditing) {
        dispatch(toggleIsPreset())
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
