export interface Exercise {
  _id: string
  name: string
  areasFatigued?: string[]
}

export interface GetExercisesByActivityTypeQueryParams {
  activityTypeId: string
  filterText?: string
}
