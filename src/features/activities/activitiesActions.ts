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
import { addEvent, editEvent, removeEvent } from "@features/historyCalendar/historyCalendarSlice"
import { getBorderColor } from "@features/historyCalendar/utils"

import { setCurrentlyProcessedActivityId, setHasMore, toggleIsPreset } from "./activitiesSlice"
import { CreateActivityParams } from "./activitiesSlice.types"

export const createActivityAction = createAppAsyncThunk(
  "createActivity",
  async (data: CreateActivityParams, { rejectWithValue, dispatch, getState }) => {
    try {
      const response = await createActivity(data.data)
      dispatch(
        addEvent({
          id: response.data._id,
          borderColor: getBorderColor(response.data.type.type, data.theme),
          date: response.data.date,
        })
      )

      const activeFilterTab = getState().activitiesOverview.activeFilterTab

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

      dispatch(
        editEvent({
          id: response.data._id,
          borderColor: getBorderColor(response.data.type.type, data.theme),
          date: response.data.date,
        })
      )

      const activeFilterTab = getState().activitiesOverview.activeFilterTab

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
      const activeFilterTab = getState().activitiesOverview.activeFilterTab

      dispatch(removeEvent(activityId))
      if (response.data.type._id === activeFilterTab) {
        dispatch(deleteChartActivity(activityId))
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
