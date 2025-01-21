import { AxiosResponse } from "axios"

import { ApiEndpoints } from "@enums/apiEndpoints.enum"

import { privateApiService } from "./api"
import { Exercise, GetExercisesQueryParams } from "./types/exercisesService.types"

export const getExercises = (
  params: GetExercisesQueryParams
): Promise<AxiosResponse<Exercise[]>> => {
  return privateApiService.get(ApiEndpoints.EXERCISES, { params })
}
