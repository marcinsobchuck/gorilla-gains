import { isAxiosError } from "axios"

import { getExercises, getFavouriteExercises, toggleFavouriteExercise } from "@api/exercisesService"
import {
  GetExercisesQueryParams,
  ToggleFavouriteExerciseParams,
} from "@api/types/exercisesService.types"
import { createAppAsyncThunk } from "@app/hooks"

export const getExercisesAction = createAppAsyncThunk(
  "getExercises",
  async (params: GetExercisesQueryParams, { rejectWithValue }) => {
    try {
      const exercisesResponse = await getExercises(params)
      const exercises = exercisesResponse.data

      return exercises
    } catch (error) {
      if (isAxiosError(error)) {
        return rejectWithValue(error.response?.data)
      } else {
        return rejectWithValue("Something went wrong")
      }
    }
  }
)

export const getExercisesForActivityTypeAction = createAppAsyncThunk(
  "getExercisesForActivityType",
  async (params: GetExercisesQueryParams, { rejectWithValue }) => {
    const { activityType, filterText } = params
    try {
      const exercisesResponse = await getExercises({ activityType, filterText })
      const exercises = exercisesResponse.data

      return exercises
    } catch (error) {
      if (isAxiosError(error)) {
        return rejectWithValue(error.response?.data)
      } else {
        return rejectWithValue("Something went wrong")
      }
    }
  }
)
export const getFavouriteExercisesAction = createAppAsyncThunk(
  "getFavouriteExercises",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getFavouriteExercises()
      const favouriteExercises = response.data.map((ex) => ({ ...ex, isFavourite: true }))
      return favouriteExercises
    } catch (error) {
      if (isAxiosError(error)) {
        return rejectWithValue(error.response?.data)
      } else {
        return rejectWithValue("Something went wrong")
      }
    }
  }
)
export const toggleFavouriteExerciseAction = createAppAsyncThunk(
  "toggleFavouriteExercise",
  async ({ exerciseId, operation }: ToggleFavouriteExerciseParams, { rejectWithValue }) => {
    try {
      await toggleFavouriteExercise({ exerciseId, operation })
      return operation
    } catch (error) {
      if (isAxiosError(error)) {
        return rejectWithValue(error.response?.data)
      } else {
        return rejectWithValue("Something went wrong")
      }
    }
  }
)
