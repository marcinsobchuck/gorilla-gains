import { ActivityTypes } from "@enums/activityTypes.enum"

export interface Exercise {
  _id: string
  name: string
  isStatic?: boolean
  additionalInfo?: string
  activityType: {
    _id: string
    type: ActivityTypes
  }
  description?: string
  videoURL?: string
  musclesHit: {
    primary: string[]
    secondary: string[]
  }
  isFavourite?: boolean
}

export interface GetExercisesQueryParams {
  activityType?: string | string[]
  filterText?: string
  offset?: number
  limit?: number
  exclude?: string[]
}

export interface ToggleFavouriteExerciseParams {
  exerciseId: string
  operation: "add" | "delete"
}
