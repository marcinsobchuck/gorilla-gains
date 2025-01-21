import { ActivityTypes } from "@enums/activityTypes.enum"

export interface Exercise {
  _id: string
  name: string
  isStatic?: boolean
  additionalInfo?: string
  activityType: {
    type: ActivityTypes
  }
  description?: string
  videoURL?: string
  musclesHit?: {
    primary: string[]
    secondary: string[]
  }
}

export interface GetExercisesQueryParams {
  activityType?: string | string[]
  filterText?: string
  offset?: number
  limit?: number
}
