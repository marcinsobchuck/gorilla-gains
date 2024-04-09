import { Activity } from "@api/types/activitiesService.types"
import { RequestStatuses } from "@enums/requestStatuses.enum"

export interface InitialState {
  data?: string[]
  presetsData?: Activity[]
  status: RequestStatuses
  presetsStatus: RequestStatuses
  error?: string
  presetsError?: string
}
