import { User } from "@api/types/userService.types"
import { RequestStatuses } from "@enums/requestStatuses.enum"

export interface InitialState {
  data?: User
  status: RequestStatuses
  error?: string

  changePasswordStatus: RequestStatuses
  changePasswordMessage: string
  changePasswordError?: string | null
}
