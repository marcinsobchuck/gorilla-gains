import { ActivityType } from "@api/types/activityTypesService.types"
import { RequestStatuses } from "@enums/requestStatuses.enum"

export interface InitialState {
  data?: ActivityType[]
  status: RequestStatuses
  error?: string
}
