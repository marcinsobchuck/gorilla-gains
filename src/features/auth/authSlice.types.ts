interface UserInfo {
  id: string
  name: string
  email: string
}

export interface InitialState {
  accessToken: string | null
  loading: boolean
  success: boolean
  userInfo: UserInfo | null
  error: unknown
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
