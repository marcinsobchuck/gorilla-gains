import { isAxiosError } from "axios"

import {
  createActivityPreset,
  deleteActivityPreset,
  getActivityPresets,
} from "@api/activityPresetsService"
import { CreateActivityPresetData } from "@api/types/activityPresets.types"
import { createAppAsyncThunk } from "@app/hooks"

export const getActivityPresetsAction = createAppAsyncThunk(
  "getActivityPresets",
  async (_, { rejectWithValue }) => {
    try {
      const activityPresets = await getActivityPresets()
      return activityPresets.data
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

export const createActivityPresetAction = createAppAsyncThunk(
  "createActivityPreset",
  async (activity: CreateActivityPresetData, { rejectWithValue }) => {
    try {
      const response = await createActivityPreset(activity)
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

export const deleteActivityPresetAction = createAppAsyncThunk(
  "deleteActivityPreset",
  async (presetId: string, { rejectWithValue }) => {
    try {
      const response = await deleteActivityPreset(presetId)
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
