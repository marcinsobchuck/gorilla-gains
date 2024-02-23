export interface User {
  _id: string
  name: string
  surname: string
  email: string
  age: number
  gender: string
  weight: number
  activityLevel: string
  desiredWeight: number
  height: number
  dueDateWeight: Date
  goals: string[]
}

export interface ChangeUserInfoData {
  name?: string
  surname?: string
  age?: number
  gender?: string
  height?: number
  weight?: number
  desiredWeight?: number
  dueDateWeight?: Date | null
  activityLevel?: string
  goals?: string[]
}
