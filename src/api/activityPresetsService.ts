import { AxiosResponse } from "axios"

import { ApiEndpoints } from "@enums/apiEndpoints.enum"

import { privateApiService } from "./api"
import { ActivityPreset, CreateActivityPresetData } from "./types/activityPresets.types"

export const getActivityPresets = async (): Promise<AxiosResponse<ActivityPreset[]>> => {
  return privateApiService.get(ApiEndpoints.ACTIVITY_PRESETS)
}

export const createActivityPreset = async (
  activity: CreateActivityPresetData
): Promise<AxiosResponse<ActivityPreset>> => {
  return privateApiService.post(ApiEndpoints.ACTIVITY_PRESETS, activity)
}

export const deleteActivityPreset = async (
  activityPresetId: string
): Promise<AxiosResponse<ActivityPreset>> => {
  return privateApiService.delete(`${ApiEndpoints.ACTIVITY_PRESETS}/${activityPresetId}`)
}
