export interface UserDetailsFormProps {
  currentStep: number
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>
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
