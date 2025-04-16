import { ActivityTypes } from "@enums/activityTypes.enum"

export interface ExerciseSet {
  reps?: number
  load?: number
  duration?: Duration
  distance?: number
  break?: number
  repeatCount?: number
}

export interface Duration {
  hours?: number
  minutes?: number
  seconds?: number
}

interface Exercise {
  exercise: string
  sets: ExerciseSet[]
  withBreaks: boolean
}

export interface CreateActivityData {
  title: string
  type: string
  exercises?: Exercise[]
  date: Date
  notes?: string
  exertionRating?: number
  warmup: boolean
  repeatExercisesCount?: number
  makePresetFrom?: boolean
}

export interface EditActivityData {
  title?: string
  type?: string
  exercises?: Exercise[]
  date?: Date
  notes?: string
  exertionRating?: number
  warmup?: boolean
  repeatExercisesCount?: number
  isDone?: boolean
}

export interface EditActivityParams {
  dataToEdit: EditActivityData
  activityId: string
}

export interface GetActivitiesForCurrentUserParams {
  type?: string
  offset?: number
  limit?: number
  startDate?: Date
  endDate?: Date
  pastOnly?: boolean
  isDone?: boolean
}

export interface ResponseExercise {
  exercise: {
    _id: string
    name: string
    isStatic?: boolean
    additionalInfo?: string
    musclesHit?: {
      primary: string[]
      secondary: string[]
    }
  }
  sets: ExerciseSet[]
  withBreaks: boolean
}

export interface Activity {
  _id: string
  title: string
  type: {
    _id: string
    type: ActivityTypes
  }
  date: string
  exercises: ResponseExercise[]
  notes?: string
  warmup: boolean
  repeatExercisesCount: number
  isDone: boolean
  exertionRating?: number
  createdAt: string
  updatedAt?: string
}
