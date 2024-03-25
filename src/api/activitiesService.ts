import { AxiosResponse } from "axios"

import { ApiEndpoints } from "@enums/apiEndpoints.enum"

import { privateApiService } from "./api"
import { CreateActivityData } from "./types/activitiesService.types"

export const getActivitiesForCurrentUser = async (): Promise<AxiosResponse<string[]>> =>
  await privateApiService.get(ApiEndpoints.USER_ACTIVITIES)

export const createActivity = async (data: CreateActivityData): Promise<AxiosResponse<string[]>> =>
  await privateApiService.post(ApiEndpoints.ACTIVITIES, data)
