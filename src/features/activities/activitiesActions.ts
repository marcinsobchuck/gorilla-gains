import { isAxiosError } from "axios"

import {
  createActivity,
  deleteActivity,
  editActivity,
  getActivitiesForCurrentUser,
} from "@api/activitiesService"
import {
  CreateActivityData,
  EditActivityParams,
  GetActivitiesForCurrentUserParams,
} from "@api/types/activitiesService.types"
import { createAppAsyncThunk } from "@app/hooks"

import { setCurrentlyProcessedActivityId, setHasMore, toggleIsPreset } from "./activitiesSlice"

export const createActivityAction = createAppAsyncThunk(
  "createActivity",
  async (data: CreateActivityData, { rejectWithValue }) => {
    try {
      const response = await createActivity(data)
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

export const editActivityAction = createAppAsyncThunk(
  "editActivity",
  async (data: EditActivityParams, { rejectWithValue, dispatch, getState }) => {
    try {
      const {
        activities: { isEditing },
      } = getState()
      dispatch(setCurrentlyProcessedActivityId(data.activityId))
      const response = await editActivity(data)

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
  async (activityId: string, { rejectWithValue, dispatch }) => {
    try {
      dispatch(setCurrentlyProcessedActivityId(activityId))

      const response = await deleteActivity(activityId)
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
