import { AxiosResponse } from "axios"

import { ApiEndpoints } from "@enums/apiEndpoints.enum"

import { privateApiService } from "./api"
import {
  Activity,
  CreateActivityData,
  EditActivityParams,
  GetActivitiesForCurrentUserParams,
} from "./types/activitiesService.types"

export const getActivitiesForCurrentUser = async (
  params: GetActivitiesForCurrentUserParams
): Promise<AxiosResponse<Activity[]>> =>
  await privateApiService.get(ApiEndpoints.USER_ACTIVITIES, { params })

export const createActivity = async (data: CreateActivityData): Promise<AxiosResponse<Activity>> =>
  await privateApiService.post(ApiEndpoints.ACTIVITIES, data)

export const editActivity = async (data: EditActivityParams): Promise<AxiosResponse<Activity>> =>
  await privateApiService.patch(
    `${ApiEndpoints.USER_ACTIVITIES}/${data.activityId}`,
    data.dataToEdit
  )

export const deleteActivity = async (activityId: string): Promise<AxiosResponse<Activity>> =>
  await privateApiService.delete(`${ApiEndpoints.USER_ACTIVITIES}/${activityId}`)
