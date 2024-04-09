import { isAxiosError } from "axios"

import { createActivity, editActivity, getActivitiesForCurrentUser } from "@api/activitiesService"
import {
  CreateActivityData,
  EditActivityParams,
  GetActivitiesForCurrentUserParams,
} from "@api/types/activitiesService.types"
import { createAppAsyncThunk } from "@app/hooks"

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

export const getActivitiesForCurrentUserAction = createAppAsyncThunk(
  "getPresetsForCurrentUser",
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

export const editActivityAction = createAppAsyncThunk(
  "editActivity",
  async (data: EditActivityParams, { rejectWithValue }) => {
    try {
      const response = await editActivity(data)
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
