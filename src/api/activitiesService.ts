import { AxiosResponse } from "axios"

import { privateApiService } from "./api"
import { Activity } from "./types/activitiesService.types"
import { ApiEndpoints } from "../enums/apiEndpoints.enum"

export const getActivitiesForCurrentUser = async (): Promise<AxiosResponse<Activity[]>> =>
  await privateApiService.get(ApiEndpoints.ACTIVITIES)
