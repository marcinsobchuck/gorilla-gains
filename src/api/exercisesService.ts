import { AxiosResponse } from "axios"

import { ApiEndpoints } from "@enums/apiEndpoints.enum"

import { privateApiService } from "./api"
import {
  Exercise,
  GetExercisesQueryParams,
  ToggleFavouriteExerciseParams,
} from "./types/exercisesService.types"

export const getExercises = (
  params: GetExercisesQueryParams
): Promise<AxiosResponse<Exercise[]>> => {
  return privateApiService.get(ApiEndpoints.EXERCISES, { params })
}

export const toggleFavouriteExercise = (
  params: ToggleFavouriteExerciseParams
): Promise<AxiosResponse<Exercise>> => {
  return privateApiService.patch(`${ApiEndpoints.TOGGLE_FAVOURITE_EXERCISE}/${params.exerciseId}`)
}

export const getFavouriteExercises = (): Promise<AxiosResponse<Exercise[]>> => {
  return privateApiService.get(ApiEndpoints.FAVOURITE_EXERCISES)
}
