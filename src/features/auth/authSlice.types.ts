import { RequestStatuses } from "@enums/requestStatuses.enum"

export interface InitialState {
  accessToken: string | null

  registerStatus: RequestStatuses
  loginStatus: RequestStatuses
  forgotPasswordStatus: RequestStatuses
  verifyPasswordResetTokenStatus: RequestStatuses

  registerError?: string | null
  loginError?: string | null
  forgotPasswordError?: string | null
  verifyPasswordResetTokenError?: string | null

  isPasswordResetTokenValid: boolean
  forgotPasswordSuccessMessage: string
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
