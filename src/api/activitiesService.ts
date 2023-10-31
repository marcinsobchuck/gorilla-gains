import { AxiosResponse } from "axios"

import { ApiEndpoints } from "@enums/apiEndpoints.enum"

import { privateApiService } from "./api"
import { Activity } from "./types/activitiesService.types"

export const getActivitiesForCurrentUser = async (): Promise<AxiosResponse<Activity[]>> =>
  await privateApiService.get(ApiEndpoints.ACTIVITIES)
