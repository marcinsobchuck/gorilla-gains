import { AxiosResponse } from "axios"

import { ApiEndpoints } from "@enums/apiEndpoints.enum"

import { privateApiService } from "./api"
import { ActivityType } from "./types/activityTypesService.types"

export const getActivityTypes = async (): Promise<AxiosResponse<ActivityType[]>> =>
  await privateApiService.get(ApiEndpoints.ACTIVITIY_TYPES)
