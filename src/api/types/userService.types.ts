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
  age?: string
  gender?: string
  height?: string
  weight?: string
  desiredWeight?: string
  dueDateWeight?: Date | string
  activityLevel?: {
    label: string
  }
  goals?: string[]
}
