import { Exercise } from "@api/types/exercisesService.types"
import { RequestStatuses } from "@enums/requestStatuses.enum"

export interface InitialState {
  selectInputData: Exercise[]
  selectInputStatus: RequestStatuses
  selectInputError?: string
  hasMore: boolean
  limit: number
  activeActivityTypeFilter: string | string[]
  searchExercisesInputValue: string
  searchExercisesData: Exercise[]
  searchExercisesDataStatus: RequestStatuses
  searchExercisesDataError?: string
  activeExercise: Exercise | null
}
