export interface Exercise {
  _id: string
  name: string
  isStatic?: boolean
  additionalInfo?: string
}

export interface GetExercisesQueryParams {
  activityType?: string | string[]
  filterText?: string
}
