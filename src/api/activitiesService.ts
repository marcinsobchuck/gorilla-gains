import { AxiosResponse } from "axios"

import { privateApiService } from "./api"
import { Activity } from "./types/activitiesService.types"

export const getActivitiesForCurrentUser = async (): Promise<AxiosResponse<Activity[]>> =>
  await privateApiService.get("/users/activities")
