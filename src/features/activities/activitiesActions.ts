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

import {
  addActivity,
  editCurrentActivity,
  removeActivity,
  setHasMore,
  toggleIsPreset,
} from "./activitiesSlice"

export const createActivityAction = createAppAsyncThunk(
  "createActivity",
  async (data: CreateActivityData, { rejectWithValue, dispatch }) => {
    try {
      const response = await createActivity(data)
      dispatch(addActivity(response.data))
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
  async (data: GetActivitiesForCurrentUserParams, { rejectWithValue, dispatch }) => {
    try {
      const response = await getActivitiesForCurrentUser(data)

      if (response.data.length < 6) {
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

      const response = await editActivity(data)
      dispatch(editCurrentActivity(response.data))
      //ty przeciez tutaj activity ci zedytowane zwraca no to dispaczujesz  editCurrentActivity(response) dosłownie???? łotego

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
      const response = await deleteActivity(activityId)
      dispatch(removeActivity(activityId))
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
