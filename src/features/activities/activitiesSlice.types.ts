import { Activity } from "@api/types/activitiesService.types"
import { RequestStatuses } from "@enums/requestStatuses.enum"

export interface InitialState {
  activitiesData?: Activity[]
  activitiesStatus: RequestStatuses
  activitiesError?: string

  createEditStatus: RequestStatuses
  createEditData?: Activity
  createEditError?: string

  presetsData?: Activity[]
  presetsStatus: RequestStatuses
  presetsError?: string

  activitiesPage: number
  hasMore: boolean
}
