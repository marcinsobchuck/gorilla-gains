import { Exercise } from "@api/types/exercisesService.types"
import { RequestStatuses } from "@enums/requestStatuses.enum"

export interface InitialState {
  data?: Exercise[]
  status: RequestStatuses
  error?: string
}
