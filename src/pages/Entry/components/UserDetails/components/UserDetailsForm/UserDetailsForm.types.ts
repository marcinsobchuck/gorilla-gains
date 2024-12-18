export interface UserDetailsFormProps {
  step: JSX.Element
  currentStep: number
  isFirstStep: boolean
  isLastStep: boolean
  handleNextStep: () => void
  handlePreviousStep: () => void
}

type AllInputs = keyof UserDetailsFormValues

export type InputsNames = AllInputs[]

export interface UserDetailsFormValues {
  name: string
  surname?: string
  dob: Date
  gender: string
  height: number
  weight: number
  desiredWeight?: number
  dueDateWeight?: Date
  activityLevel: {
    label: string
    value: string
  }
  goals: string[]
}
