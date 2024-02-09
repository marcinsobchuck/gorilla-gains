export interface Exercise {
  _id: string
  name: string
  isStatic?: boolean
}

export interface GetExercisesByActivityTypeQueryParams {
  activityTypeId: string
  filterText?: string
}
