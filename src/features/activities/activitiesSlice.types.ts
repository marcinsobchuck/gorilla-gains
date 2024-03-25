import { RequestStatuses } from "@enums/requestStatuses.enum"

export interface InitialState {
  data?: string[]
  status: RequestStatuses
  error?: string
}
