export interface UserDetailsFormProps {
  step: JSX.Element
  currentStep: number
  isFirstStep: boolean
  isLastStep: boolean
  handleNextStep: () => void
  handlePreviousStep: () => void
}

type AllInputs =
  | "name"
  | "surname"
  | "age"
  | "gender"
  | "height"
  | "weight"
  | "activityLevel"
  | "desiredWeight"
  | "dueDateWeight"
  | "goals"

export type InputsNames = AllInputs[]
