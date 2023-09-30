export interface InitialState {
  accessToken: string | null
  loading: boolean
  success: boolean
  userInfo: {
    id: string
    name: string
    email: string
  } | null
  error: unknown
}
