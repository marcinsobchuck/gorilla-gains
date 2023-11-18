import { ChangeUserInfoData } from "@api/types/userService.types"
import { RequestStatuses } from "@enums/requestStatuses.enum"

export interface InitialState {
  data?: ChangeUserInfoData
  status: RequestStatuses
  error?: string
}
