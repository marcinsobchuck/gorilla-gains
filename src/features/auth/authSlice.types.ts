import { RequestStatuses } from "@enums/requestStatuses.enum"

interface UserInfo {
  id: string
  name: string
  email: string
}

export interface InitialState {
  accessToken: string | null
  status: RequestStatuses
  userInfo: UserInfo | null
  error: string
}

export interface RegisterUserData {
  name: string
  email: string
  password: string
}

export interface LoginUserData {
  email: string
  password: string
}
