export interface User {
  _id: string
  name: string
  surname: string
  email: string
  dob: string
  gender: string
  weight: number
  activityLevel: string
  desiredWeight: number
  height: number
  dueDateWeight: string
  goals: string[]
}

export interface ChangeUserInfoData {
  name?: string
  surname?: string
  dob?: string
  gender?: string
  height?: number
  weight?: number
  desiredWeight?: number
  dueDateWeight?: Date | null
  activityLevel?: string
  goals?: string[]
}
