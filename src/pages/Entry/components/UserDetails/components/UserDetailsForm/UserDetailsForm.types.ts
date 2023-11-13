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
  surname: string
  age: string
  gender: string
  height: string
  weight: string
  desiredWeight: string
  dueDateWeight: Date | string
  activityLevel: string
  goals: string[] | string
}
