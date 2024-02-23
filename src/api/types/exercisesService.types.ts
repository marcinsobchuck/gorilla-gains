export interface Exercise {
  _id: string
  name: string
  isStatic?: boolean
  additionalInfo?: string
}

export interface GetExercisesByActivityTypeQueryParams {
  activityTypeId?: string
  filterText?: string
}
